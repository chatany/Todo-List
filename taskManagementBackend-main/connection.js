const mong = require("mongoose")
mong.connect("mongodb://127.0.0.1:27017/Data").then((data , err)=>{
if(err){
    console.log(err)
}
else{
    console.log("Connected to DB")
}
})