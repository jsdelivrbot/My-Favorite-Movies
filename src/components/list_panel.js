
import React, { Component }             from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import MovieList from './movie_list';


export default class ListPanel extends Component {
    render() {
        return (
            <Tabs defaultTab={ this.props.activeTab }>
                <TabList className='text-attribute'>
                    <Tab tabFor="searches" >Searches</Tab>
                    <Tab tabFor="favorites" >Favorites</Tab>
                </TabList>
                <TabPanel tabId="searches">
                    <MovieList
                        label        ={ this.props.searchLabel }
                        movies       ={ this.props.searchMovies }

                        onMovieSelect={ this.props.onMovieSelect }
                        />
                </TabPanel>
                <TabPanel tabId="favorites">
                    <MovieList
                        label        ={ this.props.favoritesLabel }
                        movies       ={ this.props.favoriteMovies }

                        onMovieSelect={ this.props.onMovieSelect }
                        />
                </TabPanel>
            </Tabs>
        );
    }
}
