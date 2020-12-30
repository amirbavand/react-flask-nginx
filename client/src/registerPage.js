import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


class registerPage extends Component {
  state = {
    username: '',
    password: '',
  };


  handleSubmit = async (event) => {
    event.preventDefault();
    const data=new FormData(event.target);
    const username=data.get('username');
    const password=data.get('password');
    const passwordConfirm=data.get('repeatPassword');
    if(password==passwordConfirm){
        console.log("password_is_valid");
    }
    else{
        console.log("repeat_password");
    }




    const values=await axios.post('api/login',{},{
      auth: {
        username: username,
        password: password 
      }}
    );
    console.log(values);
    this.setState({ index: values.data.token });
    this.setState({redirectToMainPage: true});
  };


 


  render() {
    if(this.state.redirectToMainPage){
      console.log("salam");
      return <Redirect to="/home" />
    }
    return (
      <div>
        <form  onSubmit={this.handleSubmit}>
            <div>
                usernme:
                <input type="text" name="username" id="username" />
            </div>
            <div>
                password:
                <input type="password" name="password" id="password" />
            </div>
            <div>
                password:
                <input type="password" name="repeatPassword" id="repeatPassword" />
            </div>

          <input type="submit" value="Submit" />
        </form>
      <div>
          <h1>{this.state.index}</h1>
        </div>
      </div>

    );
  }
}

export default registerPage;
