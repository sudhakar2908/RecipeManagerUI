import { RECIPE_CREATE_SUCCESS, RECIPE_CREATE_ERROR } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case RECIPE_CREATE_SUCCESS: return action.payload.data;
    case RECIPE_CREATE_ERROR:
    console.log("error :>> ", action.payload);
      action.payload.data.error=true;
      return action.payload.data;
    default:
      return state;
  }
}
