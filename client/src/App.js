import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: ''
    }
  }

  componentDidMount() {
    axios.get('/api/todo/all-todos')
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { todoList } = this.state;
    console.log(todoList);
    return (
      <div className="App">
        <input type="text" placeholder="Add To-do" />
      </div>
    );
  }
}

export default App;
