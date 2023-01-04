const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String, trim:true, required:true},
    email:{type:String, trim:true, required:true, unique:true, lowercase:true},
    password:{type:String, required:true},

    // isAdmin:{type:Boolean, default:false},
    // mobile:{type:Number, required:true},
    // hash:{type:String, required:true},
    created:{type:Date, default:Date.now}
})


module.exports = mongoose.model('User', userSchema)
