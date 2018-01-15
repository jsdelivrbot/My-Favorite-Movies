
import React, { Component } from 'react';
import MediaQuery           from 'react-responsive';

import MovieItem from './movie_item';


export default class MovieList extends Component {
    constructor( props ) {
        super( props );

        this.renderMovie = this.renderMovie.bind( this );
    }

    render() {
        const movies = this.props.movies;
        return (
            <div>
                <MediaQuery minDeviceWidth={1224}>
                    <div className='list-group'>
                        <label className='text-attribute'>{ this.props.label }</label>
                        { movies.length ? <ul>{ movies.map( this.renderMovie ) }</ul> : '' }
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    <div className='list-group-mobile'>
                        <label className='text-attribute'>{ this.props.label }</label>
                        { movies.length ? <ul>{ movies.map( this.renderMovie ) }</ul> : '' }
                    </div>
                </MediaQuery>
            </div>
        );
    }

    renderMovie( movie, key ) {
        return (
            <MovieItem
                data         ={ movie }
                key          ={ key }

                onMovieSelect={ this.props.onMovieSelect }
                />
        );
    }
}
