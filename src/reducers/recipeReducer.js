import { FETCH_RECIPE, ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE, SAVE_RECIPE } from '../actions/types';
import { recipeList } from '../data';

const defaultRecipeList = JSON.parse(localStorage.getItem('recipes')) || recipeList;

const initialState = {
  recipeList: defaultRecipeList,
  currentRecipe: {},
  isEditing: false,
  recipeToEdit: {},
  currId: 8
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPE:
      const currentRecipe = state.recipeList.find(recipe => recipe.id === action.payload)
      return Object.assign({}, state, { 
        currentRecipe,
        isEditing: false,
        recipeToEdit: {}
      });
    case ADD_RECIPE:
      return Object.assign({}, state, { 
        isEditing: 'add',
        recipeToEdit: {}
      });
    case EDIT_RECIPE:
      return Object.assign({}, state, { 
        isEditing: 'edit', 
        recipeToEdit: action.payload 
      });
    case SAVE_RECIPE: // make sure all this works
      if (state.isEditing === 'add') {
        const newId = state.currId++;
        const newRecipe = {
          id: newId,
          name: action.payload.name,
          ingredients: action.payload.ingredients,
          directions: action.payload.directions
        }
        const newRecipeList = state.recipeList.concat(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(newRecipeList));
        return Object.assign({}, state, {
          isEditing: false,
          recipeToEdit: {},
          recipeList: newRecipeList,
          currentRecipe: newRecipe
        });
      } else if (state.isEditing === 'edit') {
        const currRecipe = {
          id: state.currentRecipe.id,
          name: action.payload.name,
          ingredients: action.payload.ingredients,
          directions: action.payload.directions
        }
        const currIndex = state.recipeList.findIndex(recipe => recipe.id === currRecipe.id);
        const newRecipeList = [...state.recipeList.slice(0, currIndex), currRecipe, ...state.recipeList.slice(currIndex + 1)];
        localStorage.setItem('recipes', JSON.stringify(newRecipeList));
        return Object.assign({}, state, { 
          isEditing: false,
          recipeToEdit: {},
          recipeList : newRecipeList,
          currentRecipe: currRecipe
        });
      } else {
        return state;
      }
    case DELETE_RECIPE:
      let index;
      const remainingRecipes = state.recipeList.filter((recipe, i) => {
        if (recipe.id === action.payload) {
          index = i;
          return false;
        } else {
          return true;
        }
      });
      index = index >= remainingRecipes.length ? remainingRecipes.length - 1 : index;
      localStorage.setItem('recipes', JSON.stringify(remainingRecipes));
      return Object.assign({}, state, { 
        recipeList: remainingRecipes,
        currentRecipe: remainingRecipes[index]
      });
    default:
      return state;
  }
}