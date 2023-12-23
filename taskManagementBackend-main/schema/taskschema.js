const mong = require("mongoose")
const taskschema = mong.Schema({
    date:{type:String , required:true},
    Category:{type:String , required:true},
    Title:{type:String , required:true},
    Description:{type:String , required:true},
    user_id:{type:String,required:true}
})

var taskmodel = mong.model("/todolist" , taskschema)

module.exports = taskmodel;