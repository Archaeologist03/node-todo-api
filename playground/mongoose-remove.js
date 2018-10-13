const {ObjectID} = require("mongodb");

const {mongoose} = require("../server/db/mongoose");
const {Todo} = require("../server/models/todo");
const {User} = require("../server/models/user");



// Todo.remove({}).then(res => {
//     console.log(res);
// });

Todo.findByIdAndRemove("5bc24915992df1124847c8dc").then(todo => {
    console.log(todo);
});