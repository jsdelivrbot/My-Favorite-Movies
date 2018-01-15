
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import MediaQuery           from 'react-responsive';

import * as actions from '../actions';
import ListPanel    from './list_panel';
import MoviePanel   from './movie_panel';
import SearchBar    from './search_bar';
import {
    CLEAR_FAVE_MOVIES,
    FAVE_MOVIE_KEY,
    FAVE_MOVIES_CLEARED,
    FAVE_MOVIES_NON,
    MOVIE_REMOVED,
    MOVIE_UNFOUND,
    REMOVE_MOVIE_YESNO,
    SAVE_MOVIE
} from '../constants/constants';


class App extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            buttonClick   : false,
            movies        : [],
            favoriteMovies: JSON.parse( localStorage.getItem( FAVE_MOVIE_KEY ) ) || [],
            page          : 0,
            searchKeyword : '', searchStarted: false, searchDone: false,
            selectedMovie : null,
            startTime     : 0, endTime: 0
        };

        this.onFavoritesClear = this.onFavoritesClear.bind( this );
        this.onSearch         = this.onSearch.bind( this );
        this.onMovieRemove    = this.onMovieRemove.bind( this );
        this.onMovieSave      = this.onMovieSave.bind( this );
        this.onMovieSelect    = this.onMovieSelect.bind( this );
    }

    render() {
        let searchData = this.props.movieSearchData;

        this.interpolate( searchData );

        return (
            <div>
                <div className='row col-md-8 search-bar-parent'>
                    <SearchBar onSearch={ this.onSearch }/>
                </div>

                <div className='row'>
                    <div className='col-md-8'>
                        <MoviePanel
                            favoriteMovies  ={ this.state.favoriteMovies }
                            movie           ={ this.state.selectedMovie }
                            playTrailer     ={ this.props.trailerSearchData }

                            onFavoritesClear={ this.onFavoritesClear }
                            onMovieRemove   ={ this.onMovieRemove }
                            onMovieSave     ={ this.onMovieSave }
                            />
                    </div>

                    <div className='col-md-4 list-panel'>
                        <ListPanel
                            activeTab     ={ this.getActiveTab() }
                            favoriteMovies={ this.state.favoriteMovies }
                            favoritesLabel={ 'Favorite Movies (' + this.state.favoriteMovies.length + ')' }
                            searchLabel   ={ this.getSearchLabel( searchData ) }
                            searchMovies  ={ this.state.searchDone && searchData && this.state.movies }

                            onMovieSelect ={ this.onMovieSelect }
                            />
                    </div>
                </div>

                <div>Device Test!</div>

                <MediaQuery minDeviceWidth={1224}>
                    <div>You are a desktop or laptop</div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    <div>You are a tablet or mobile phone</div>
                </MediaQuery>

                <MediaQuery orientation='portrait'>
                    <div>You are portrait</div>
                </MediaQuery>
                <MediaQuery orientation='landscape'>
                    <div>You are landscape</div>
                </MediaQuery>

                <MediaQuery minResolution='2dppx'>
                    <div>You are retina</div>
                </MediaQuery>

            </div>
        );
    }

    onSearch( searchKeyword ) {
        this.setState(
            {
                buttonClick: false,
                movies: [],
                page  : 0,
                searchKeyword, searchStarted: true, searchDone: false,
                selectedMovie: null,
                startTime    : new Date()
            },
            () => this.props.fetchMovies( searchKeyword )
        );
    }

    onMovieSelect( movie ) {
        let newState = { buttonClick: false };
        const id = movie.id;
        const fmovie = this.state.favoriteMovies.find( m => id === m.id );
        if ( fmovie && movie !== fmovie ) {
            const index = this.state.movies.findIndex( m => id === m.id );
            newState.selectedMovie = fmovie;
            newState.movies = [
                ...this.state.movies.slice( 0, index ),
                fmovie,
                ...this.state.movies.slice( index + 1 )
            ];
        }
        else
            newState.selectedMovie = movie;
        
        this.props.fetchTrailers( id );
        this.setState( newState );
    }

    onMovieSave() {
        const selectedMovie = this.state.selectedMovie;
        let newState = { buttonClick: true };
        const movie = this.state.favoriteMovies.find( m => m.id === selectedMovie.id );

        if ( undefined === movie )
            newState.favoriteMovies = [ ...this.state.favoriteMovies, selectedMovie ];

        this.setState(
            newState,
            () => {
                this.saveMovies();
                alert( SAVE_MOVIE );
            }
        )
    }

    onMovieRemove() {
        const movie = this.state.selectedMovie;

        if( undefined === this.state.favoriteMovies.find( m => m.id === movie.id ) ) {
            this.setState( { buttonClick: true } );
            alert( MOVIE_UNFOUND );
        }
        else if ( confirm( REMOVE_MOVIE_YESNO ) ) {
            const favoriteMovies = this.state.favoriteMovies.filter( m => m.id !== movie.id );
            this.setState(
                { buttonClick: true, favoriteMovies },
                this.saveMovies
            );
            alert( MOVIE_REMOVED );
        }
    }

    onFavoritesClear() {
        if ( this.state.favoriteMovies.length ) {
            if ( confirm( CLEAR_FAVE_MOVIES ) ) {
                localStorage.removeItem( FAVE_MOVIE_KEY );
                this.setState( { buttonClick: true, favoriteMovies: [] } );
                alert( FAVE_MOVIES_CLEARED );
            }
        }
        else
            alert( FAVE_MOVIES_NON );
    }

    interpolate( searchData ) {
        let page = searchData.page;

        // refresh the previously cached movie search
        if ( page - this.state.page > 1 || ( this.state.searchDone && !this.state.searchStarted ) )
            page = searchData.page = 0, searchData.results = [], searchData.total_pages = 2;

        // fetch the rest of the search results
        if ( page && page <= searchData.total_pages && this.state.page < page ) {
            setImmediate(
                () => {
                    this.setState(
                        { buttonClick: false, page, movies: [ ...this.state.movies, ...searchData.results ] },
                        () => {
                            const totalPages = searchData.total_pages;
                            if ( page < totalPages )
                                this.props.fetchMovies( this.state.searchKeyword, page + 1 );
                            else if ( page === totalPages && !this.state.searchDone ) {
                                let newState = {
                                    buttonClick: false,
                                    endTime    : new Date(),
                                    searchDone : true, searchStarted: false,
                                };
                                if ( this.state.movies.length ) {
                                    const selectedMovie = this.state.movies[ 0 ];
                                    const id = selectedMovie.id;
                                    let movie = this.state.favoriteMovies.find( m => id === m.id );
                                    if ( undefined === movie )
                                        newState.selectedMovie = selectedMovie;
                                    else {
                                        newState.selectedMovie = movie;
                                        newState.movies = [ movie, ...this.state.movies.slice( 1 ) ];
                                    }
                                    this.props.fetchTrailers( id );
                                }
                                else
                                    newState.selectedMovie = null;
                                this.setState( newState );
                                searchData.page = 2;
                            }
                        }
                    );
                }
            );
        }
    }

    saveMovies() {
        localStorage.setItem( FAVE_MOVIE_KEY, JSON.stringify( this.state.favoriteMovies ) );
    }

    getActiveTab = () => this.state.searchStarted ? 
                        'searches' : !this.state.searchDone || this.state.buttonClick ?
                            'favorites' : ''

    getSearchLabel = data => this.state.searchDone && data ?
                            'About ' + data.total_results + ' results (' +
                                this.getUnitTime( this.state.endTime - this.state.startTime ) + ')' :
                            this.state.searchStarted && !this.state.searchDone ? 'Searching... Please wait.' : 'Movie Searches'

    getUnitTime( time ) {
        let unit = 'msec';
        if ( time >= 31536000000 )   time = time / 31536000000, unit = 'year';
        else if ( time >= 86400000 ) time = time / 86400000,    unit = 'day';
        else if ( time >= 3600000 )  time = time / 3600000,     unit = 'hour';
        else if ( time >= 60000 )    time = time / 60000,       unit = 'min';
        else if ( time >= 1000 )     time = time / 1000,        unit = 'sec';
        return time.toFixed( 2 ) + ' ' + unit;
    }
}

function mapStateToProps( state ) {
    return {
        movieSearchData  : state.movieSearchData,
        trailerSearchData: state.trailerSearchData
    };
}

export default connect( mapStateToProps, actions )( App );
