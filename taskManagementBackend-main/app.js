const cor= require("cors")
const exp = require("express")
const userRouter = require("./controller/user")
const user = exp()
user.use(cor())
user.use(exp.json())
user.use("/user" , userRouter)
require("./connection")


user.post("/" , (req , res)=>{
    res.json({status:"Sahil"})
} )

const port = 2001
user.listen(port , ()=>{
    console.log("Server is running at " +  port)
})