import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRecipeDetail } from '../actions/index';
import { Row, Col } from 'antd';

class  RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: true,
      recipe: null
    };
  }

  async componentDidMount() {
    if (await this.props.fetchRecipeDetail(this.props.recipeId)) {
      if(
        typeof this.props.recipe === "undefined" ||
        this.props.recipe === null
      )
      {
        this.setState({ hasError: true, isLoading: false});
      }
      else {
        this.setState({ recipe: this.props.recipe, isLoading: false});
      }

    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, isLoading:false });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    if (!this.state.isLoading && this.state.hasError) {
      return <div>Not Found</div>;
    }
    let {recipe} = this.state;
    return  (
      !this.state.isLoading && (
        <div>
          <Row className="detail-row">
            <Col span={24}>{recipe.name} - Ingredient List</Col>
          </Row>
          <Row className="ing-row">
            <Col span={12}>Ingredient 1:</Col>
            <Col span={12}>{recipe.ingredient1}</Col>
          </Row>
          <Row className="ing-row">
            <Col span={12}>Ingredient 2:</Col>
            <Col span={12}>{recipe.ingredient2}</Col>
          </Row>
          <Row className="ing-row">
            <Col span={12}>Ingredient 3:</Col>
            <Col span={12}>{recipe.ingredient3}</Col>
          </Row>
          <Row className="ing-row">
            <Col span={12}>Ingredient 4:</Col>
            <Col span={12}>{recipe.ingredient4}</Col>
          </Row>
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRecipeDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
