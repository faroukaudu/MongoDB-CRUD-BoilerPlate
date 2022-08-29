const MongoClient = require('mongodb').MongoClient;
//needed for testing
const  assert = require('assert');

// Connect local URL
const url = 'mongodb://127.0.0.1:27017';
//DataBase
const dbName = "follow";
//client
const client = new MongoClient(url);

//Connecting to Database Mongosh
//Create a new database using DataBase name if not exisiting
 client.connect(function(err){
  assert.equal(null, err);
  console.log("connected to sever successfully");

  const db = client.db(dbName);

  //INSERTING DOCUMENTS
  insertDocuments(db, function() {
    client.close();
  });


// READING DOCUMENTS
  // readData(db, function(){
  //  //client.close();
  // })

  //DELETING DOCUMENTS
  // deleteData(db, function(){
  //   client.close();
  // })


})

//INSERTING DATA INTO NODEJS
const insertDocuments = function(db, callback){

  //collection new or exisiting
  const collection = db.collection("fruit");

  //Inserting Many in Array
  collection.insertMany([
  {name:"Banana", color:"green", type:"vitamin"},
  {name:"apple", color:"red", type:"protein"},
  {name:"melon", color:"white", type:"water"}

],
//checking if null
function(err, result){
  assert.equal(err, null);
  //assert.equal(3, result.result.n);
  //assert.equal(3, result.ops.length);
  console.log("documents inserted");
  callback(result);
}
)

}

//READ DATA FROM DATABASE
const readData = function(db, callback){
  const collection = db.collection("fruit");

  //finding anf converting result to array
  collection.find().toArray((err, results) => {
    console.log(results);
});
}


//DELETING DATAFROM DATABASE
const deleteData = function (db, callback){

  //collection
  const collection = db.collection("fruit");
  //deleting document where name===Banana
  collection.deleteMany({name: "Banana"});
  console.log("Specified Data document Deleted!!!");

}
