
import { FETCH_TRAILER } from '../actions/types';


export default function( state = {}, action ) {
    switch ( action.type ) {
        case FETCH_TRAILER:
            return action.payload.data;
        }

    return state;
}
