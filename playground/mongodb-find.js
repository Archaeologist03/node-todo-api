// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server..")
    } 
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp")


    // db.collection("Todos").find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);

    // }, (err) => {
    //     console.log("unable to fetch todos", err)
    // })


    db.collection("Users").find({name: "Ilija"}).forEach(item => {
        console.log(item);
        console.log("---------------------")
    }).catch(err => console.log(`Oops we got an error ${err}`));
    
    // .toArray().then(data => console.log(data)).catch(err => console.log(`Erroring: ${err}`));


    // client.close();
});

