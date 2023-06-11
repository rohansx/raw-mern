const mongodb = require('mongodb')
const { MONGO_URL } = require('./config')

mongodb.MongoClient.connect(MONGO_URL, {})
.then(client => {
    console.log("MongoDB Connected ------", client.db("mongo_app").databaseName);
    // console.log("MongoDB Connected =========", client);

    db = client.db("mongo_app")
    return db.collections()
})
.then(collections => {
    console.log("---Existing collections--", collections);

    return db.collection("metahumans").insertOne({name: "Arthur Curry", alter_ego:"Aquaman"})
})
.then(insertedResponse => {
    console.log("--Inserted -> ", insertedResponse);

    return db.collections()
})
.then(collections => {
    // console.log("--Existing collections-- ", collections);

    return db.collection("metahumans").findOne({name: "Arthur Curry"})
})
.then(caughtResponse => {
    console.log("Found : ", caughtResponse);
})
.catch(error => {
    console.log("!! MongoDB Connection Failed !!");
});