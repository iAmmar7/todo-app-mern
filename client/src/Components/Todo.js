import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


import isEmpty from '../Validation/is-empty';
import InputField from './InputField';
import Loader from './Loader';

// CheckBox Material-ui
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    },
    alignSelf: 'flex-start'
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);


class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todoList: '',
      todoText: '',
      editTodoID: '',
      loading: false,
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

      if (isEmpty(this.state.editTodoID)) {
        newTodo = {
          text: this.state.todoText
        }
      } else {
        newTodo = {
          text: this.state.todoText,
          done: false,
          _id: this.state.editTodoID
        }
      }
      console.log(newTodo);
      this.setState({ todoText: '' });
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

    this.myInp.focus();

    this.setState({ todoText: text, editTodoID: id });
  }

  todoComplete = (id, task, text) => {
    console.log(id, task);

    setTimeout(() => {
      this.setState({ loading: true })

      var editTodo = {
        text,
        done: !task,
        _id: id
      }

      axios.post('/api/todo/add', editTodo)
        .then(res => this.fetchData())
        .catch(err => console.log(err));
    }, 1000)
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addTodo();
    }
  }

  render() {
    const { todoList, todoText, loading } = this.state;

    console.log(todoList, todoText);

    let listItem;

    if (loading) {
      listItem = <Loader />
    } else {
      listItem =
        Object.keys(todoList).map((key, index) => {
          return (
            <li
              key={todoList[key]._id}
              onClick={() => this.itemClick(todoList[key]._id)}
            >
              <GreenCheckbox
                checked={todoList[key].done}
                onChange={() =>
                  this.todoComplete(todoList[key]._id, todoList[key].done, todoList[key].text)}
                value="checkedA"
              />
              <p>{todoList[key].text}</p>
              <div className="button-div">
                {/* <button onClick={() => this.deleteTodo(todoList[key]._id)}>D</button>
                <button onClick={() => this.editTodo(todoList[key]._id, todoList[key].text)}>E</button> */}
                <IconButton onClick={() => this.deleteTodo(todoList[key]._id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => this.editTodo(todoList[key]._id, todoList[key].text)} aria-label="Edit">
                  <EditIcon />
                </IconButton>
              </div>
            </li>
          )
        });
    }

    return (
      <div className="container">
        <div className="app-heading">
          <span>|</span><h2>To-do</h2><span>|</span>
        </div>
        <div className="input-div">
          <InputField
            type="text"
            value={this.state.todoText}
            placeholder="Add to-do"
            name="todoText"
            onChange={this.onChange}
            onKeyPress={this.handleKeyPress}
            refrence={(ip) => this.myInp = ip}
          />
        </div>
        {/* <button onClick={() => this.addTodo()}>Add</button> */}
        <ul>{listItem}</ul>
      </div >
    );
  }
}

export default Todo;
