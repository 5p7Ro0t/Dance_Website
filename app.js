const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
//const fs = require('fs')
const mongoose = require('mongoose');
const { double } = require('webidl-conversions')
main().catch(err => console.log(err));
  
  async function main() {
    await mongoose.connect('mongodb://localhost:27017/ContactInfo');
    console.log("");
  }
const port = 2500;

  app.use('/public', express.static('public'))
  app.use(express.urlencoded())

const contSchema = new mongoose.Schema({
  name: String ,
  Phone: String ,
  Email: String ,
  Address: String ,
  About: String
});
var cont = mongoose.model('contact', contSchema);

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home.pug')
})
app.get('/cont', (req, res) => {
  res.render('contact.pug')
})
app.post('/cont', (req, res) => {
 let Mydata = new cont(req.body)
   Mydata.save().then((msg)=>{
    res.send("Your Data Has Been Saved In The DataBase") , 
    (msg)=>{
    res.send("Opps There Is Some Error!");
    }
   })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})