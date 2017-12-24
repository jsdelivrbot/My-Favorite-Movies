
import React, { Component } from 'react';

import CommentAndRating from './comment_rating';
import MovieProfile     from './movie_profile';


export default class MoviePanel extends Component {
    constructor( props ) {
        super( props );

        this.state = { comment: '', movie: null, rating: 0 };

        this.onRatingChange  = this.onRatingChange.bind( this );
        this.onCommentChange = this.onCommentChange.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        let comment = '', fmovie, fmovies = this.props.favoriteMovies, rating = 0, movie = nextProps.movie;

        if ( this.props.movie !== movie && movie ) {
            if ( fmovies.length ) {
                fmovie = fmovies.find( m => m.id === movie.id );
                if ( undefined !== fmovie ) {
                    comment = fmovie.comment || comment;
                    rating = fmovie.rating || rating;
                }
            }
            this.setState( { movie, comment: movie.comment || comment, rating: movie.rating || rating } );
        }
    }

    render() {
        const trailer = this.props.playTrailer, hasTrailer = trailer && trailer.id;
        return (
            <div className='video-detail col-md-8'>
                { this.getTrailerVideoHeader( hasTrailer ) }

                <MovieProfile trailer={ trailer } />

                {
                    hasTrailer ?
                    <div>
                        <CommentAndRating
                            comment        ={ this.state.comment }
                            rating         ={ this.state.rating }

                            onCommentChange={ this.onCommentChange }
                            onRatingChange ={ this.onRatingChange }
                            />
                        <button
                            className='btn btn-secondary'

                            onClick  ={ this.props.onMovieSave }
                            >
                            Save to favorite movies
                        </button>
                        <button
                            className='btn btn-secondary'

                            onClick  ={ this.props.onMovieRemove }
                            >
                            Remove from favorite movies
                        </button>
                        <button
                            className='btn btn-secondary'

                            onClick={ this.props.onFavoritesClear }
                            >
                            Clear favorite movies
                        </button>
                    </div>
                    : ''
                }
            </div>
        );
    }

    onRatingChange( rating ) {
        this.state.movie.rating = rating;
        this.setState( { rating } );
    }

    onCommentChange( comment ) {
        this.state.movie.comment = comment;
        this.setState( { comment } );
    }

    getTrailerVideoHeader = hasTrailer => !hasTrailer ?
                                        <label className='text-attribute'>Trailer Video</label> :
                                        this.props.playTrailer.videos.results.length ? '' :
                                            <label className='text-attribute'>Trailer video not found</label>
}
