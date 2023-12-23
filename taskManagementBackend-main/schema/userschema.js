const mong = require("mongoose")
const userschema = mong.Schema({
    first_name:{type:String , required:true},
    last_name:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    number:{type:String , unique:true},
    token:{type:String}
})


var usermodel = mong.model("/base" , userschema)

module.exports = usermodel;