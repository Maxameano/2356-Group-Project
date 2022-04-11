/*
old temp variables
let blogs = [{text:'',publish:false},{text:'',publish:false},{text:'',publish:false}]
let favWords = []
*/

//libraries required
const express = require('express')
const mongodb = require('mongodb').MongoClient

//Credential string
let head = "mongodb://";
let user = "s_cox";
let password = "belgiumTOMORROWamount96";
let localHost = "127.0.0.1";
let localPort = "27017";
let database = "s_cox";
let connectionString = head + user + ":" + password + "@" + localHost + ":" + localPort + "/" + user;

//allow Cross-Origin Resource Sharing requests
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
};

//initializing server using cross domains
let server = express()
server.use(allowCrossDomain)

//allow the server to accept JSON
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//Global database variable
let globalDB

//port
let extPort = 4222

//function to recieve post
server.post('/update',(req,res)=>{
  console.log(req.body)
  //get blog
  let numb = parseInt(req.body.numb)
  let blog = req.body.text

  //place data into objects
  let blogObj = {text:blog}
  let query = {numb:numb}
  let value = {$set: blogObj}

  //sending object to database
  globalDB.collection('blogs').updateOne(query,value,(err)=>{
    if(err!=null){throw err}

    //all is good
    res.status(200).send(blogObj)
  })
  /* saving to old variables
  blogs[numb-1].text=blog
  */
  
})

//Functions to update publish buttons
server.post('/pub1',(req,res)=>{
  //getting publish publish var from client
  let publish = req.body.publish
  //making the string a bool
  let pubBool = (publish==='true')
  
  let pubObj = {publishVar:pubBool}
  let query = {numb:1}
  let value = {$set:pubObj}

globalDB.collection('blogs').updateOne(query,value,(err)=>{
  if(err!=null){throw err}
  res.status(200).send(pubObj)
})
  /*

  //udate the server accordingly
  if(pubBool){
    blogs[0].publish=true
  }else{
    blogs[0].publish=false
  }
*/
})
//Same As '/pub1'
server.post('/pub2',(req,res)=>{
    //getting publish publish var from client
    let publish = req.body.publish
    //making the string a bool
    let pubBool = (publish==='true')
    
    let pubObj = {publishVar:pubBool}
    let query = {numb:2}
    let value = {$set:pubObj}
  
  globalDB.collection('blogs').updateOne(query,value,(err)=>{
    if(err!=null){throw err}
    res.status(200).send(pubObj)
  })
  /*
  if(pubBool){
    blogs[1].publish=true
  }else{
    blogs[1].publish=false
  }
  */

})
//same as '/pub2'
server.post('/pub3',(req,res)=>{
    //getting publish publish var from client
    let publish = req.body.publish
    //making the string a bool
    let pubBool = (publish==='true')
    
    let pubObj = {publishVar:pubBool}
    let query = {numb:3}
    let value = {$set:pubObj}
  
  globalDB.collection('blogs').updateOne(query,value,(err)=>{
    if(err!=null){throw err}
    res.status(200).send(pubObj)
  })
  /*
  if(pubBool){
    blogs[2].publish=true
  }else{
    blogs[2].publish=false
  }
  */

})

server.post('/favWord',(req,res)=>{
  //getting word from client
  let word = req.body.word
  let temp
  globalDB.collection('favWords').findOne({},(err,dataReturned)=>{
    if(err!=null){throw err}
    //put the old array into temp variable
    temp = dataReturned.words
    //add new word to array
    temp.push(word)

    //update databse
    globalDB.collection('favWords').updateOne({},{$set:{words:temp}},(err)=>{
      if(err!=null){throw err}
      //send back array with new word
      res.status(200).send(temp)
    })
  })
  /*
  favWords.push(req.body.word)
  res.status(200).send(favWords)
  */
})

server.post('/delFavWord',(req,res)=>{
  //getting word from client
  let numb = req.body.numb
  let temp
  //querry database for favWords
  globalDB.collection('favWords').findOne({},(err,dataReturned)=>{
    if(err!=null){throw err}
    //place words array in temporary variable
    temp = dataReturned.words
    //splice out the word we don't want
    temp.splice(numb,1)
    //update the database with new array
    globalDB.collection('favWords').updateOne({},{$set:{words:temp}},(err)=>{
      if(err!=null){throw err}
      //send back new array
      res.status(200).send(temp)
    })
  })
  /*
  let numb = req.body.numb
  favWords.splice(numb,1)
  res.status(200).send(favWords)
*/
})



//function to blogs onload
server.get('/onload',(req,res)=>{
  //initialize blog object to send
  let blogs = [{text:'',publish:false},{text:'',publish:false},{text:'',publish:false}]

  //to loop through the 3 blogs
  for(let i=0;i<3;i++){

    //query to database for blogs
    globalDB.collection('blogs').findOne({numb:i+1},(err, foundRecord)=>{
      //catch errors
      if(err!=null){throw err}
      //placing data into object
      blogs[i].text = foundRecord.text
      blogs[i].publish = foundRecord.publishVar
      
    })
  }
  
  //initializing favWords
  let favWords
  //making a query for word bank array
  globalDB.collection('favWords').findOne({},(err,dataReturned)=>{
    //to catch an error
    if(err!=null){throw err}
    //putting array into favWords
    favWords = dataReturned.words

    //create object to send
    let obj = {words:favWords,blogs:blogs}
    res.status(200).send(obj)
  })
})

//function to give blog to display page
server.post('/reqBlog',(req,res)=>{
  //getting blog number for page
  let numb = parseInt(req.body.numb)
  console.log(numb)
  //querry database for blog
  globalDB.collection('blogs').findOne({numb:numb},(err, foundRecord)=>{
    if(err!=null){throw err}
    console.log(foundRecord)
    
    //get text from querry and place in object 
    let text = foundRecord.text
    let textObj = {text:text}
    //return object to client
    
    res.status(200).send(textObj)
  })

})
/*
old server listenning statement
//listening
server.listen(exPort,()=>{
  console.log('listening on port 4222.')
})
*/
// Create the connection to a mongoDB database instance
mongodb.connect(connectionString, function (error, client) {
  if (error) {
    throw error;
  }

  //getting client object from mongo
  globalDB = client.db("s_cox");

  //to shut down server if SIGTERM event occurs
  process.on("SIGTERM", function () {
    console.log("Shutting server down.");
    client.close();
    server.close();
  });

  // Start server listening on port 3026
  var serverside = server.listen(extPort, function () {
    console.log("Listening on port", serverside.address().port);
  });
});
