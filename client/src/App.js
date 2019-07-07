import React, { Component } from 'react';
// import './App.css';
import './Sass/index.css';

import Todo from './Components/Todo';
import InputField from './Components/InputField';
import List from './Components/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todo />
        {/* <InputField /> */}
        {/* <List /> */}
      </div >
    );
  }
}

export default App;
