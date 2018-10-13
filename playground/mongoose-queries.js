const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// let id = '5bc116d1b8d79a1eb8e120061';

// if(!ObjectID.isValid(id)) {
//     console.log("Id not valid ...bitch!.. :)")
// }

// Todo.find({
//     _id: id
// }).then(todos => {
//     console.log("Todos", todos);
// });

// Todo.findOne({
//     _id: id
// }).then(todo => {
//     console.log("Todo", todo)
// });

// Todo.findById(id).then(todo => {
//     if (!todo) {
//         return console.log("Id not found");
//     }
//     console.log("Todo by id", todo);
// }).catch(e => console.log(e));



let userId = '5bc06268c90fd30ebc151d04';

User.findById(userId).then(user => {
    if (!user) {
        return console.log("There is no user with that ID.");
    }
    console.log("User found!", user);
}).catch(e => console.log(e));