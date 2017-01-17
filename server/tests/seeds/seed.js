const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const userOneId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'gabrielhlewis@gmail.com',
    password: 'password123',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
  },
  {
    _id: new ObjectID(),
    email: 'kellysheaff@gmail.com',
    password: 'password123'
  }

]

const todos = [
  {
    _id: new ObjectID(),
    text: 'First Test Todo'

  },
  {
    _id: new ObjectID(),
    text: 'Second Test Todo',
    completed: true,
    completedAt: 333
  },
  {
    _id: new ObjectID(),
    text: 'Third Test Todo'
  }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {
  todos,
  users,
  populateTodos,
  populateUsers
}
