import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
    username: '',
    password: '',
    redirectToMainPage: false
  };


  handleSubmit = async (event) => {
    event.preventDefault();
    const data=new FormData(event.target);
    const username=data.get('username');
    const password=data.get('password');



    const values=await axios.post('api/login',{},{
      auth: {
        username: username,
        password: password 
      }}
    );
    console.log(values);
    this.setState({ index: values.data.token });
    localStorage.setItem('challange_token', values.data.token);

 //   this.setState({redirectToMainPage: true});
  };


 


  render() {
    if(this.state.redirectToMainPage){
      console.log("salam");
      return <Redirect to="/home" />
    }
    return (
      <div>
        <form  onSubmit={this.handleSubmit}>
          <input type="text" name="username" id="username" />
          <input type="password" name="password" id="password" />
          <input type="submit" value="Submit" />
        </form>
      <div>
          <h1>{this.state.index}</h1>
        </div>
      </div>

    );
  }
}

export default Fib;
