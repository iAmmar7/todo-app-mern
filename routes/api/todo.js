const express = require('express');
const router = express.Router();

// Todo Model
const Todo = require('../../models/Todo');

router.get('/test', (req, res) => res.json({ msg: "Router Works" }));

// Add or Edit Todo
router.post('/add', (req, res) => {
  const newTodo = {
    text: req.body.text,
    done: req.body.done
  };
  // if (req.body.text) newTodo.text = req.body.text;
  // if (req.body.done) newTodo.done = req.body.done;

  if (req.body._id) {
    Todo.findOne({ "_id": req.body._id })
      .then(todo => {
        if (!todo) {
          res.status(404).json({ msg: "Not found" });
        } else {
          Todo.updateOne({ "_id": req.body._id }, { $set: newTodo })
            .then(res.json(todo))
            .catch(err => console.log(err));
        }
      })
  } else {
    new Todo(newTodo).save()
      .then(todo => res.json(todo))
      .catch(err => console.log(err))
  }
});

// Get All Todos
router.get('/all-todos', (req, res) => {
  Todo.find()
    .then(todos => {
      if (!todos) {
        res.status(404).json({ msg: "No todos found" })
      }
      res.json(todos);
    })
    .catch(err => console.log(err));
})

// Delete Todo
router.delete('/remove-todo/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.remove()
        .then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ noTodoFound: "No todo found" }));
})

module.exports = router;