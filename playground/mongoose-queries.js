const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/server.js');
const {Todo} = require('./../server/models/todo');

var id = '5876a944b40182758a90c2ee'

if (!ObjectID.isValid(id)) {
  console.log('Invalid ID');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos: ', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  if (!todo) {
    return console.log('Todo not found');
  }
  console.log('todo: ', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Todo not found');
  }
  console.log('todo by id:', todo);
}).catch((e) => console.log(e))
