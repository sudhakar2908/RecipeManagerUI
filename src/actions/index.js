import axios from 'axios';

export const RECIPE_LIST_REQUST = 'RECIPE_LIST_REQUST';
export const RECIPE_LIST_SUCCESS = 'RECIPE_LIST_SUCCESS';
export const RECIPE_LIST_ERROR = 'RECIPE_LIST_ERROR';
export const RECIPE_CREATE_REQUST = 'RECIPE_CREATE_REQUST';
export const RECIPE_CREATE_SUCCESS = 'RECIPE_CREATE_SUCCESS';
export const RECIPE_CREATE_ERROR = 'RECIPE_CREATE_ERROR';
export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const FETCH_RECIPE_ERROR = 'FETCH_RECIPE_ERROR';
export const FETCH_RECIPE_REQUEST = 'FETCH_RECIPE_REQUEST';
export const RECIPE_API_URL='http://localhost:8080/recipes'

export function fetchRecipes() {
  const url = RECIPE_API_URL;
  const request = axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return {
        type: RECIPE_LIST_SUCCESS,
        payload: response,
        error: false
      };
    })
    .catch(error => {
      return {
        type: RECIPE_LIST_ERROR,
        payload: error.response,
        error: true
      };
    });
  return request;
}

export function fetchRecipeDetail(recipeId) {
  const url = RECIPE_API_URL+'/'+recipeId;
  const request = axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return {
        type: FETCH_RECIPE_SUCCESS,
        payload: response,
        error: false
      };
    })
    .catch(error => {
      return {
        type: FETCH_RECIPE_ERROR,
        payload: error.response,
        error: true
      };
    });
  return request;
}

export function createRecipe(recipeRequest) {
  const url = RECIPE_API_URL;
  const request = axios
    .post(
      url,
      recipeRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  return request;
}
