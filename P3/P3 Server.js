//libraries required
const express = require('express')
let blogs = [{text:'',publish:false},{text:'',publish:false},{text:'',publish:false}]
let favWords = []


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

//port
let exPort = 4222

//function to recieve post
server.post('/update',(req,res)=>{
  console.log(req.body)
  //get blog
  let numb = req.body.numb
  let blog = req.body.text


  //saving blog to server
  blogs[numb-1].text=blog

  //all is good
  res.status(200).send(blogs)
})

//Functions to update publish buttons
server.post('/pub1',(req,res)=>{
  //getting publish publish var from client
  let publish = req.body.publish
  //making the string a bool
  let pubBool = (publish==='true')
  //udate the server accordingly
  if(pubBool){
    blogs[0].publish=true
  }else{
    blogs[0].publish=false
  }

  //send results back
  res.status(200).send(blogs)
})
//Same As '/pub1'
server.post('/pub2',(req,res)=>{
  let publish = req.body.publish
  let pubBool = (publish==='true')
  if(pubBool){
    blogs[1].publish=true
  }else{
    blogs[1].publish=false
  }

  res.status(200).send(blogs)
})
//same as '/pub2'
server.post('/pub3',(req,res)=>{
  let publish = req.body.publish
  let pubBool = (publish==='true')
  if(pubBool){
    blogs[2].publish=true
  }else{
    blogs[2].publish=false
  }

  res.status(200).send(blogs)
})


server.post('/favWord',(req,res)=>{
  //adding new word to end of the array
  favWords.push(req.body.word)
  res.status(200).send(favWords)
})

server.post('/delFavWord',(req,res)=>{
  let numb = req.body.numb
  favWords.splice(numb,1)

  res.status(200).send(favWords)
})



//function to blogs onload
server.get('/onload',(req,res)=>{
  //create object to send
  let obj = {words:favWords,blogs:blogs}

  //all is good
  res.status(200).send(obj)
})


//listening
server.listen(exPort,()=>{
  console.log('listening on port 4222.')
})