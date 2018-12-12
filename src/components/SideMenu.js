import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRecipes } from '../actions/index';

import { Select, Button } from 'antd';
const Option = Select.Option;

class  SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: true,
      recipes: null
    };

    this.renderRecipes = this.renderRecipes.bind(this);
  }

  async componentDidMount() {
    if (await this.props.fetchRecipes()) {
      this.setState({ recipes: this.renderRecipes(this.props.recipeItems)});
      this.setState({ isLoading: false });
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, isLoading:false });
  }

  renderRecipes(recipeItems) {
    if (recipeItems === null || recipeItems.error ||
      recipeItems.count < 1 || recipeItems.recipes === null
    ) {
      console.log('Error!');
      this.setState({ hasError: true });
      return null;
    }

    return recipeItems.recipes.map((recipe, index) => {
      return <Option value={recipe.id} key={recipe.id} className="recipe-option">{recipe.name}</Option>
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return  (
      !this.state.isLoading && (
        <div>
          <Select
            placeholder="Recipe List"
            className="recipe-select"
            onChange={this.props.handleRecipeChange}
          >
            {this.state.recipes}
          </Select>
          <Button
            className="recipe-add"
            onClick={this.props.addRecipe}
          >
            Add Recipe
          </Button>
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    recipeItems: state.recipeItems
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRecipes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
