import React, { Component } from 'react';
import { createRecipe } from '../actions/index';
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkIngredient = this.checkIngredient.bind(this);

    this.state={
      ingredients: []
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {validateFields, setFieldsValue } = this.props.form;
    this.checkIngredient() && validateFields((err, values)=>{
      if(!err) {
        let recipeRequest = {
          name: values.name,
          ingredient1: values.ingredient1 ? values.ingredient1 : "",
          ingredient2: values.ingredient2 ? values.ingredient2 : "",
          ingredient3: values.ingredient3 ? values.ingredient3 : "",
          ingredient4: values.ingredient4 ? values.ingredient4 : ""
        };
        const request = Object.assign({}, recipeRequest);
        const response = createRecipe(request);

        response
        .then((response) => {
            console.log("Succe :>> ", response);
            const {success, message} = response.data;
            if(success) {
              notification.success({
               message: "Success!",
               description: message
              });

              setFieldsValue({
                name: "",
                ingredient1: "",
                ingredient2: "",
                ingredient3: "",
                ingredient4: ""
              })
            }
            else {
              notification.error({
               message: "Oops!",
               description: message
              });
            }
          },
          (error) => {
            notification.error({
             message: "Oops!",
             description: "Internal server Error"
            });
          }
        )

      }
  });
}
  validateValue = (val) => {
    return val && val.trim()!=="";
  }
  checkIngredient = () => {
    const form = this.props.form;
    let ingredient1 = form.getFieldValue('ingredient1');
    let ingredient2 = form.getFieldValue('ingredient2');
    let ingredient3 = form.getFieldValue('ingredient3');
    let ingredient4 = form.getFieldValue('ingredient4');

    if (
      !this.validateValue(ingredient1) &&
      !this.validateValue(ingredient2) &&
      !this.validateValue(ingredient3) &&
      !this.validateValue(ingredient4)
    ) {
      notification.error({
       message: "Requiring at least one Ingredient!",
      });
      return false;
    }
    else {
      let ingredients =[];

      if(this.validateValue(ingredient1))
        ingredients.push(ingredient1.trim().toLowerCase());

      if(this.validateValue(ingredient2)) {
        if(ingredients.length > 0 && ingredients.includes(ingredient2.trim().toLowerCase())) {
          notification.error({
           message: "Two ingredients not to be the same!",
          });
          return false;
        }
        ingredients.push(ingredient2.trim().toLowerCase());
      }

      if(this.validateValue(ingredient3)) {
        if(ingredients.length > 0 && ingredients.includes(ingredient3.trim().toLowerCase())) {
          notification.error({
           message: "Two ingredients not to be the same!",
          });
          return false;
        }
        ingredients.push(ingredient3.trim().toLowerCase());
      }

      if(this.validateValue(ingredient4)) {
        if(ingredients.length > 0 && ingredients.includes(ingredient4.trim().toLowerCase())) {
          notification.error({
           message: "Two ingredients not to be the same!!",
          });
          return false;
        }
      //  ingredients.push(ingredient4.trim().toLowerCase());
      }

      return true;
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name:">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input recipe name!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="ingredient1:">
          {getFieldDecorator('ingredient1', {
            rules: [{
              required: false, message: 'Please enter Ingredient.'
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="ingredient2:">
          {getFieldDecorator('ingredient2', {
            rules: [{
              required: false, message: 'Please enter Ingredient.'
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="ingredient3:">
          {getFieldDecorator('ingredient3', {
            rules: [{
              required: false, message: 'Please enter Ingredient.'
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="ingredient4:">
          {getFieldDecorator('ingredient4', {
            rules: [{
              required: false, message: 'Please enter Ingredient.'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Submit</Button>
      </Form>
    )

  }
}


export default AddRecipe;
