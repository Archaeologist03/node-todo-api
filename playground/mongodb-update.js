// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server..")
    } 
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp")

    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("5bbf9a63992df111c09da7a9")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then(res => console.log(res));

    db.collection("Users").findOneAndUpdate({
      _id: new ObjectID("5bbfcb2e992df111c09da7aa")  
    }, {
            $set: {
                name: "Ilija"
            },
            $inc: {
                age: 33
            }
        }, {
            returnOriginal: false
        }
    ).then(data => console.log(data));

    // client.close();
});

