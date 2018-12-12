import React, { Component } from 'react';
import SideMenu from './components/SideMenu';
import Welcome from './components/Welcome';
import RecipeDetail from './components/RecipeDetail';
import AddRecipe from './components/AddRecipe';
import './App.css';
import { Layout, Form } from 'antd';

const {
  Header, Sider, Content,
} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeId: null,
      pageName: 'home'
    };

    this.handleRecipeChange = this.handleRecipeChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.pageName !== nextState.pageName || this.state.recipeId !== nextState.recipeId);
  }

  handleRecipeChange = (recipeId) => {
    this.setState((state, props) => {
      return {pageName: 'detail', recipeId};
    });
    console.log(this.state.recipeId);
  }

  addRecipe = () => {
    this.setState({pageName:'create',recipeId:null})
  }
  render() {
    let {pageName, recipeId} = this.state;
    const WrappedAddRecipeForm = Form.create()(AddRecipe);
    return (
      <Layout className="layout">
        <Header className="header"><h1>Recipe Manager</h1></Header>
        <Layout>
          <Sider className="sider">
            <SideMenu
              handleRecipeChange={this.handleRecipeChange}
              addRecipe={this.addRecipe}
            />
          </Sider>
          <Content className="content">
            {
              pageName === 'home' ? <Welcome /> :
              (
                  pageName === 'detail' && recipeId ?
                  <RecipeDetail recipeId={this.state.recipeId} key={Math.random()}/> :
                  <WrappedAddRecipeForm />
              )
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
