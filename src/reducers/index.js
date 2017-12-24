
import { combineReducers } from 'redux';

import movieSearchData   from './movies';
import trailerSearchData from './trailer';


export default combineReducers( { movieSearchData, trailerSearchData } );
