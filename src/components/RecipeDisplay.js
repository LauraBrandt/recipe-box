import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editRecipe, deleteRecipe } from '../actions/recipeActions';

class RecipeDisplay extends Component {
  constructor() {
    super();

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    this.props.editRecipe(this.props.recipe);
  }

  handleDelete() {
    const isDeleting = window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.');
    if (!isDeleting) return;
    this.props.deleteRecipe(this.props.recipe.id);
  }

  render() {
    const { recipe } = this.props;

    return (
      <div className="recipe-display">
        {recipe && recipe.id && <div>
          <div className="display-header">
            <div className="display-name">{recipe.name}</div>
            <div className="display-buttons">
              <button className="edit" title="Edit" onClick={this.handleEdit}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="delete" title="Delete" onClick={this.handleDelete}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div className="display-ingredients">
            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.map((ingredient, i)=> 
                <li key={i}>{ingredient}</li>
              )}
            </ul>
          </div>
          <div className="display-directions">
            <h4>Directions:</h4>
            <ol>
              {recipe.directions.map((step, i)=> 
                <li key={i}>{step}</li>
              )}
            </ol>
          </div>
        </div>}
      </div>
    );
  }
}

RecipeDisplay.propTypes = {
  recipe: PropTypes.object,
  deleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipes.currentRecipe
});

const matchDispatchToProps = dispatch => ({
  editRecipe: recipeId => dispatch(editRecipe(recipeId)),
  deleteRecipe: recipeId => dispatch(deleteRecipe(recipeId))
});

export default connect(mapStateToProps, matchDispatchToProps)(RecipeDisplay);
