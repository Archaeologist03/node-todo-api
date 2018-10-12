const mongoose = require("mongoose");

let Todo = mongoose.model("Todo", {
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    complited: {
        type: Boolean,
        default: false
    },
    complitedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};
