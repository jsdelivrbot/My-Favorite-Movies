
import React, { Component } from 'react';


export default class MovieProfile extends Component {
    render() {
        const trailer = this.props.trailer, hasProfile = trailer && trailer.id;
        let url = 'https://www.youtube.com/embed/';

        if ( hasProfile && trailer.videos.results.length )
            url += trailer.videos.results[ 0 ].key;

        return (
            <div className='form-group'>
                <div className='embed-responsive embed-responsive-16by9'>
                    <iframe className='embed-responsive-item' src={ url }></iframe>
                </div>
                { hasProfile ? this.renderProfile( trailer ) : '' }
            </div>
        );
    }

    renderProfile( trailer ) {
        return (
            <div className='details text-attribute'>
                <div>
                    <strong>Title:</strong>&nbsp;{ trailer.title }
                </div>
                <div>
                    <strong>Overview:</strong>&nbsp;{ trailer.overview }
                </div>
                <div>
                    <strong>Language:</strong>&nbsp;{ this.getNames( trailer.spoken_languages ) }
                </div>
                <div>
                    <strong>Genre:</strong>&nbsp;{ this.getNames( trailer.genres ) }
                </div>
                <div>
                    <strong>Runtime:</strong>&nbsp;{ trailer.runtime ? trailer.runtime + ' mins' : '' }
                </div>
                <div>
                    <strong>Release Date:</strong>&nbsp;{ new Date( trailer.release_date ).toDateString() }
                </div>
                <div>
                    <strong>Budget:</strong>&nbsp;{ this.dollarFormat( trailer.budget ) }
                </div>
                <div>
                    <strong>Revenue:</strong>&nbsp;{ this.dollarFormat( trailer.revenue ) }
                </div>
            </div>
        );
    }

    getNames( profile ) {
        let str = profile.reduce( ( s, v ) => s += v.name + ', ', '' ).trim();
        return str.substr( 0, str.length - 1 ).trim();
    }

    dollarFormat = str => str ? 'US$ ' + str.toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, '$1,' ) : ''
}
