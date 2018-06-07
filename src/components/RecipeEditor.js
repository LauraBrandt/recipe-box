import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveRecipe } from '../actions/recipeActions';

class RecipeEditor extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      ingredients: [],
      directions: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.recipe.name || '',
      ingredients: this.props.recipe.ingredients || [],
      directions: this.props.recipe.directions || []
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.recipe.name || '',
      ingredients: nextProps.recipe.ingredients || [],
      directions: nextProps.recipe.directions || []
    });
  }

  handleChange(i, event) {
    const name = event.target.name.split('-')[0];
    if (name === 'title') {
      this.setState({ title: event.target.value });
    } else if (name === 'ingredient') {
      const ingredients = this.state.ingredients;
      ingredients[i] = event.target.value;
      this.setState({ ingredients });
    } else if (name === 'step') {
      const directions = this.state.directions;
      directions[i] = event.target.value;
      this.setState({ directions });
    }
  }

  handleAddNew(type) {
    this.setState(prevState => ({
      [type] : [...prevState[type], '']
    }));
  }

  handleDelete(i, type) {
    const currList = this.state[type];
    currList.splice(i, 1);
    this.setState({ [type]: currList });
  }

  handleSave() {
    this.props.saveRecipe({
      name: this.state.title,
      ingredients: this.state.ingredients,
      directions: this.state.directions
    });
  }

  renderIngredientList() {
    return (
      <ul>
        {this.state.ingredients.length > 0 && this.state.ingredients.map((ingredient, i)=>
          <li key={i}>
            <input 
              type="text" 
              name={`ingredient-${i}`}
              value={ingredient}
              onChange={this.handleChange.bind(this, i)}
              autoFocus
            />
            <button className="delete" title="Delete" onClick={this.handleDelete.bind(this, i, "ingredients")}>
              <i className="fas fa-times-circle"></i>
            </button>
          </li>
        )}
      </ul>
    );
  }

  renderDirectionList() {
    return(
      <ol>
        {this.state.directions.length > 0 && this.state.directions.map((step, i)=> 
          <li key={i}>
            <textarea
              name={`step-${i}`}
              value={step}
              onChange={this.handleChange.bind(this, i)}
              autoFocus
            />
            <button className="delete" title="Delete" onClick={this.handleDelete.bind(this, i, "directions")}>
              <i className="fas fa-times-circle"></i>
            </button>
          </li>
        )}
      </ol>
    );
  }

  render() {
    return (
      <div className="recipe-editor">
        <div className="editor-header">
          <div className="editor-name">
            <label>Name: </label>
            <input 
              type="text" 
              name="title" 
              value={this.state.title} 
              onChange={this.handleChange.bind(this, 0)}
              autoFocus
            />
          </div>
          <div className="editor-buttons">
            <button className="save" title="Save" onClick={this.handleSave}>
              <i className="fas fa-save"></i>
            </button>
          </div>
        </div>
        <div className="editor-ingredients">
          <h4>Ingredients:</h4>
          { this.renderIngredientList() }
          <button className="new-ingredient" onClick={this.handleAddNew.bind(this, "ingredients")}>
            <i className="fas fa-plus"></i> Add ingredient
          </button>
        </div>
        <div className="editor-directions">
          <h4>Directions:</h4>
          { this.renderDirectionList() }
          <button className="new-step" onClick={this.handleAddNew.bind(this, "directions")}>
            <i className="fas fa-plus"></i> Add step
          </button>
        </div>
      </div>
    );
  }
}

RecipeEditor.propTypes = {
  recipe: PropTypes.object,
  saveRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipes.recipeToEdit
});

const matchDispatchToProps = dispatch => ({
  saveRecipe: recipe => dispatch(saveRecipe(recipe))
});

export default connect(mapStateToProps, matchDispatchToProps)(RecipeEditor);
