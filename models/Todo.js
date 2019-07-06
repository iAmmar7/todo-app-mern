const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = ({
  text: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('todo', TodoSchema);