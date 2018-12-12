import { FETCH_RECIPE_SUCCESS, FETCH_RECIPE_ERROR } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_RECIPE_SUCCESS: return action.payload.data;
    case FETCH_RECIPE_ERROR:
      action.payload.error=true;
      return action.payload.data;
    default:
      return state;
  }
}
