import { RECIPE_LIST_SUCCESS, RECIPE_LIST_ERROR } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case RECIPE_LIST_SUCCESS: return action.payload.data;
    case RECIPE_LIST_ERROR:
      action.payload.error=true;
      return action.payload;
    default:
        return state;
  }
}
