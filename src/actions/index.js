
import axios from 'axios';

import { FETCH_MOVIES, FETCH_TRAILER } from './types';


const API_KEY = '1ead321d1e40808c6125eba384d2242f';
const URL     = 'https://api.themoviedb.org/3';

export function fetchMovies( keyword, page = 1 ) {
    const request = axios.get( `${ URL }/search/movie?api_key=${ API_KEY }&query=${ keyword }&page=${ page }` );
    return {
        type   : FETCH_MOVIES, 
        payload: request
    }
}

export function fetchTrailers( movieId ) {
    const request = axios.get( `${ URL }/movie/${ movieId }?api_key=${ API_KEY }&append_to_response=videos` );
    return {
        type   : FETCH_TRAILER, 
        payload: request
    }
}
