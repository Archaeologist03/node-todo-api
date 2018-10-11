// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server..")
    } 
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp")


    // db.collection("Todos").findOneAndDelete({text: "Eat"}).then(item => console.log(item));

    // db.collection("Users").deleteMany({name: "Ilija"});

    db.collection("Users").findOneAndDelete({_id: ObjectID("5bbf3d34177caa1b900802c5")}).then(data => console.log(data));

    // client.close();
});

