# MongoDB and Node Todo API

My experiments with creating an API with Node.js and MongoDB

Below is an example of the a todo action

```javascript
describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    let text = 'Test your application';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
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
```
