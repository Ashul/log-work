const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name:{type:String},
    email:{type:String},
    userid:{type:String},
    tradename:{type:String},
    tradetype:{type:String},
    tradesession:{type:String},
    date:{type:String},
    day:{type:String},
    entrytime:{type:String},
    exittime:{type:String},
    entryprice:{type:String},
    exitprice:{type:String},
    targetprice:{type:String},
    stoploss:{type:String},
    tradestatus:{type:String},
    details:{type:String},
    created:{type:Date, default:Date.now}
    
})

module.exports =  mongoose.model('Ticket', ticketSchema)