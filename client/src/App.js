import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import isEmpty from './Validation/is-empty';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: '',
      todoText: ''
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('/api/todo/all-todos')
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  }

  itemClick = id => {
    console.log(id);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addTodo = e => {
    e.preventDefault();

    if (!isEmpty(this.state.todoText)) {
      const newTodo = {
        text: this.state.todoText
      }

      axios.post('/api/todo/add', newTodo)
        .then(res => this.fetchData())
        .catch(err => console.log(err));
    }
  }

  render() {
    const { todoList, todoText } = this.state;
    console.log(todoList, todoText);

    let listItem =
      Object.keys(todoList).map((key, index) => {
        return (
          <li
            key={todoList[key]._id}
            onClick={() => this.itemClick(todoList[key]._id)}
          >
            <p>{todoList[index].text}</p>
          </li>
        )
      });

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form onSubmit={this.addTodo}>
                <input
                  type="text"
                  placeholder="Add to-do"
                  name="todoText"
                  onChange={this.onChange}
                />
              </form>
              <ul>{listItem}{console.log(listItem)}</ul>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
