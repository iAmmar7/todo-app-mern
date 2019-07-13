import React, { Component } from 'react';
// import './App.css';
import './Sass/index.css';

import Todo from './Components/Todo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todo />
      </div >
    );
  }
}

export default App;
