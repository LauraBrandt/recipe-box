import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipe, addRecipe } from '../actions/recipeActions';

class RecipeList extends Component {
  constructor() {
    super();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    const firstRecipeId = this.props.recipeList[0].id;
    this.props.fetchRecipe(firstRecipeId);
  }

  handleFetch(id) {
    let leave = true;
    if (this.props.isEditing) {
      leave = window.confirm("If you leave the editor your changes will not be saved. Continue anyway?");
    }
    if (leave) {
      this.props.fetchRecipe(id);
    }
  }

  handleAdd() {
    let leave = true;
    if (this.props.isEditing) {
      leave = window.confirm("If you leave the editor your changes will not be saved. Continue anyway?");
    }
    if (leave) {
      this.props.addRecipe();
    }
  }

  render() {
    const { recipeList, currentRecipe } = this.props;
    return (
      <div className="recipe-list">
        <ul>
          {recipeList.length === 0 && <li>There are no recipes yet.</li>}
          {recipeList.map(recipe => 
            <li key={recipe.id} className={currentRecipe.id === recipe.id ? 'current' : ''}>
              <button onClick={this.handleFetch.bind(this, recipe.id)} id={recipe.id}>{recipe.name}</button>
            </li>
          )}
        </ul>
        <button className="recipe-list-add-button" onClick={this.handleAdd}>
          <i className="fas fa-plus"></i> Add new recipe
        </button>
      </div>
    );
  }
}

RecipeList.propTypes = {
  recipeList: PropTypes.array.isRequired,
  currentRecipe: PropTypes.object.isRequired,
  isEditing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  fetchRecipe: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipeList: state.recipes.recipeList,
  currentRecipe: state.recipes.currentRecipe,
  isEditing: state.recipes.isEditing
});

const matchDispatchToProps = dispatch => ({
  fetchRecipe: recipeId => dispatch(fetchRecipe(recipeId)),
  addRecipe: () => dispatch(addRecipe())
});

export default connect(mapStateToProps, matchDispatchToProps)(RecipeList);
