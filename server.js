const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save("Test", (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

var db

const uri = "mongodb+srv://dirkstahlecker24:wordfreq@wordfrequencies-xrlwj.mongodb.net/test?retryWrites=true";

mongoose.connect(uri, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});

var suggestionSchema = new mongoose.Schema({
  displayName: String,
  lastNames: [ String ]
});

var NameSuggestion = mongoose.model('NameSuggestion', suggestionSchema);

var personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  displayName: String,
});

personSchema.methods.makeMarkup = function () {
  return "[!!" + (this.displayName === "" ? this.firstName : this.displayName) + "|" + this.firstName + "_" + this.lastName + "!!]";
}

var Person = mongoose.model('Person', personSchema);

var dirk = new Person({ firstName: "dirk", lastName: "stahlecker", displayName: "dirk"})
console.log(dirk.makeMarkup())

// var silence = new Kitten({ name: 'Silence' });
// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.save();
// silence.save();
// Kitten.find({ name: 'fluffy' }, (err, kittens) => console.log(kittens));


