const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First Test Todo'

  },
  {
    _id: new ObjectID(),
    text: 'Second Test Todo'
  },
  {
    _id: new ObjectID(),
    text: 'Third Test Todo'
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);

  }).then(() => done());
});


describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    let text = 'Test your application';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(4);
          expect(todos[3].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it("should not create todo with invalid body data", (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(3);
        done();
      }).catch((e) => done(e));
    })
  });

});

describe("GET /todos", () => {
  it("should return all todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done)
  });
});

describe("GET /todos/:id", () => {
  it("should return a specific todo", (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done)
  });
  it("should return 404 if todo is not found", (done) => {
    let id = new ObjectID()
    request(app)
    .get(`/todos/${id.toHexString()}`)
    .expect(404)
    .end(done)
  });
  it("should return 404 from non-object ids", (done) => {
    let id = new ObjectID()
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done)
  });


});
