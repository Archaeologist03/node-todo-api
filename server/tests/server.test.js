const expect = require("expect");
const request = require("supertest");
const {
    ObjectID
} = require("mongodb");

const {
    app
} = require("./../server");
const {
    Todo
} = require("./../models/todo");

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "Second test todo",
    complited: true,
    complitedAt: 333
}];

beforeEach(done => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe("POST /todos", () => {
    it("should crate new todo", (done) => {
        let text = "test todo text";

        request(app)
            .post("/todos")
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({
                    text
                }).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err => done(e));
            });
    });


    it("should not create todo with invalid data", (done) => {

        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));
            });
    });
});


describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


describe("GET /todos/:id", () => {
    it("should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it("should return 404 if todo not found", done => {
        let id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });


    it("should return 404 for non-object ids", done => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });

});


describe("DELETE /todos/:id", () => {
    it("should remove a todo", done => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then(todo => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(err => done(err));
            })
    });

    it("should return 404 if todo not found", done => {
        let id = new ObjectID();
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);

    });

    it("should return 404 if objectID  is invalid", done => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    })
});

describe("PATCH /todos/:id", () => {

    it("should update the todo", (done) => {
        let hexId = todos[0]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text: "Gorgonzola", 
                complited: true})
            .expect(200)
            .expect(res => {
                expect(res.body.todo.complited).toBe(true);
                expect(res.body.todo.text).toBe("Gorgonzola");
                expect(typeof res.body.todo.complitedAt).toBe("number");  
            })
            .end(done);
    });

    it("should clear complitedAt when todo is not completed", done => {
        let hexId = todos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text: "Albakrki",
                complited: false
            })
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe("Albakrki")
                expect(res.body.todo.complited).toBe(false)
                expect(res.body.todo.complitedAt).toBeFalsy();
            })
            .end(done);
    });

});