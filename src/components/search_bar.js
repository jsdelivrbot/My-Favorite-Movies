
import React, { Component } from 'react';


export default class SearchBar extends Component {
    constructor( props ) {
        super( props );

        this.state = { searchKey: '' };

        this.onSubmit = this.onSubmit.bind( this );
    }

    render() {
        return (
            <form className='search-bar' onSubmit={ this.onSubmit }>
                <input
                    placeholder='Enter movie keyword here'
                    value      ={ this.state.searchKey }

                    onChange   ={ e => this.onInputChange( e.target.value ) }
                    />
            </form>
        );
    }

    onInputChange( searchKey ) {
        this.setState( { searchKey } );
    }

    onSubmit( e ) {
        e.preventDefault();
        this.props.onSearch( this.state.searchKey );
    }
}
