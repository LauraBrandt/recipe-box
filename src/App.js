import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/css/App.css';
import RecipeList from './components/RecipeList';
import RecipeDisplay from './components/RecipeDisplay';
import RecipeEditor from './components/RecipeEditor';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1><i className="fab fa-free-code-camp"></i> Recipe Box</h1>
        </header>
        <div className="app-recipe-container">
          <RecipeList />
          {this.props.isEditing ? 
            <RecipeEditor /> :
            <RecipeDisplay />
          }
        </div>
        <footer className="app-footer"><p>Designed and coded by <a href="https://github.com/LauraBrandt">Laura Brandt</a> as part of the <a href="https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/build-a-recipe-box">FreeCodeCamp</a> curriculum.</p></footer>
      </div>
    );
  }
}

App.propTypes = {
  isEditing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired
};

const mapStateToProps = state => ({
  isEditing: state.recipes.isEditing
});

export default connect(mapStateToProps, null)(App);
