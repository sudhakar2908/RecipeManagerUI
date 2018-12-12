import { combineReducers } from 'redux';
import RecipeListReducer from './reducer_recipe_list';
import RecipeDetailReducer from './reducer_recipe_detail';
import RecipeCreateReducer from './reducer_recipe_create';

const rootReducer = combineReducers({
  recipeItems: RecipeListReducer,
  recipe: RecipeDetailReducer,
  addRecipe: RecipeCreateReducer
});

export default rootReducer;
