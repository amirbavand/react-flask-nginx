import React, { Component } from 'react';


class Anotherpage extends Component {
    state = {
      seenIndexes: [],
      values: {},
      index: '',
      username: '',
      password: ''
    };


    render() {
        return (
          <div>
              <h4>"I am another page"</h4>
          </div>
    
        );
      }

}
export default Anotherpage;
