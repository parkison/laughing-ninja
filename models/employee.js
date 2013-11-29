// The Employee model
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
 
var employeeSchema = new Schema({
    first: String,
    last: String,
    age: Number
},{collection :'employeelist'});
 
module.exports = mongoose.model('Employee', employeeSchema);