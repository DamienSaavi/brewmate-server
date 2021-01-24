const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const Step = new Schema({
    instruction: String,
    ingredients: [{
        name:String, amount:Number, unit:String
    }],
    timer: {
        name:String,
        duration:{minutes:Number, seconds:Number},
        synced:Boolean}
})

const Recipe = new Schema({
    name: String,
    ingredients: [{name:String, amount:Number, unit:String}],
    steps: [Step]
})

const User = new Schema({
  username: {type:String, required:true, unique:true},
//   password: {type:String, required:true},
})

mongoose.connect('mongodb://localhost/brewmate',
  { useNewUrlParser: true, useUnifiedTopology: true })

User.plugin(passportLocalMongoose)
const Users = mongoose.model('user', User)

module.exports = Users