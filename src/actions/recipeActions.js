import { FETCH_RECIPE, ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE, SAVE_RECIPE } from './types';

export const fetchRecipe = (recipeId) => {
  return {
    type: FETCH_RECIPE, 
    payload: recipeId
  }
}

export const addRecipe = () => {
  return {
    type: ADD_RECIPE
  }
}

export const editRecipe = (recipe) => {
  return {
    type: EDIT_RECIPE,
    payload: recipe
  }
}

export const saveRecipe = (recipe) => {
  return {
    type: SAVE_RECIPE,
    payload: recipe
  }
}

export const deleteRecipe = (recipeId) => {
  return {
    type: DELETE_RECIPE,
    payload: recipeId
  }
}