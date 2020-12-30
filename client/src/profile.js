import React, { Component } from 'react';


class profile extends Component {
    state = {
      seenIndexes: [],
      values: {},
      index: '',
      username: '',
      password: ''
      

    };


    render() {
        const user_name = this.props.match.params.user_name;


        return (
          <div>
            <h3>ID: {user_name}</h3>
          </div>
    
        );
      }

}
export default profile;
