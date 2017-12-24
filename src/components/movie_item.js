
import React, { Component } from 'react';


export default class VideoItem extends Component {
    render() {
        const found = !!this.props.data.poster_path;
        const imgUrl = found ? `https://image.tmdb.org/t/p/w92${ this.props.data.poster_path }` : '';
        return (
            <li
                className='list-group-item list-group-item-override'
                onClick  ={ () => this.props.onMovieSelect( this.props.data ) }
                >

                <div className='video-list media'>
                    <div className='media-top text-attribute'>
                        { this.props.data.title }
                    </div>
                    <div className='media-left'>
                        <img
                            alt      ={ found ? this.props.data.title : 'Poster not found' }
                            className='media-object text-attribute'
                            src      ={ imgUrl }
                            />
                    </div>
                </div>
            </li>
        );
    }
}
