var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('404 page not found')
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('404 page not found')
    }
    res.send({todo});
  }).catch((e) => res.send(e))
});

app.listen(port)

module.exports = {
  app
}
