import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import isEmpty from './Validation/is-empty';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: '',
      todoText: '',
      editTodoID: '',
      loading: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });

    axios.get('/api/todo/all-todos')
      .then(res => this.setState({ todoList: res.data, editTodoID: '', loading: false }))
      .catch(err => console.log(err));
  }

  itemClick = id => {
    console.log(id);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addTodo = () => {
    this.setState({ loading: true });

    var newTodo;

    if (!isEmpty(this.state.todoText)) {
      
      if(isEmpty(this.state.editTodoID)) {        
        newTodo = {
          text: this.state.todoText
        }
      } else {
        newTodo = {
          text: this.state.todoText,
          _id: this.state.editTodoID
        }
      }

      axios.post('/api/todo/add', newTodo)
        .then(res => this.fetchData())
        .catch(err => console.log(err));
    }
  }

  deleteTodo = (id) => {
    this.setState({ loading: true });

    axios.delete(`/api/todo/remove-todo/${id}`)
      .then(res => this.fetchData())
      .catch(err => console.log(err))
  }

  editTodo = (id, text) => {
    console.log(id, text);

    this.setState({ todoText: text, editTodoID: id });
  }

  render() {
    const { todoList, todoText, loading } = this.state;
    console.log(todoList, todoText);

    let listItem;
    
    if(loading) {
      listItem = "Loading..."
    } else {
      listItem =
        Object.keys(todoList).map((key, index) => {
          return (
            <li
              key={todoList[key]._id}
              onClick={() => this.itemClick(todoList[key]._id)}
            >
              <p>{todoList[key].text}</p>
              <button onClick={() => this.deleteTodo(todoList[key]._id)}>D</button>
              <button onClick={() => this.editTodo(todoList[key]._id, todoList[key].text)}>E</button>
            </li>
          )
        });
    }

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
                <input
                  type="text"
                  value={this.state.todoText}
                  placeholder="Add to-do"
                  name="todoText"
                  onChange={this.onChange}
                />
                <button onClick={() => this.addTodo()}>Add</button>
              <ul>{listItem}</ul>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
