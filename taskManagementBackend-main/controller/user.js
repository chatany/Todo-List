const exp = require("express")
const userRouter = exp.Router()
const usermodel = require("../schema/userschema")
const bcrypt = require("bcryptjs")
const taskmodel = require("../schema/taskschema")
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chatany2003@gmail.com',
      pass: 'sglp zlww yqkz rzec'
    }
  });
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
userRouter.post("/list" , (req , res)=>{
    var newtask = taskmodel({
        date:req.body.date,
    Category:req.body.Category,
    Title:req.body.Title,
    Description:req.body.Description,
    user_id:req.body.user_id
    })
    newtask.save().then((data , err)=>{
if(err){
    res.json({message:"Something went wrong"})
}
else{
res.json({message:"Task Successfully added"})
}
    })
})

userRouter.get("/getTask/:id",(req,res)=>{
    console.log(req.params)
    taskmodel.find({user_id:req.params.id}).then((data,err)=>{
        if(data){
            res.json({code:1,message:"task fetched",result:data})
        }
        else{
        res.json({code:0,message:"something went wrong"})

        }
    })
})

userRouter.post("/editask/:id" , (req ,res)=>{
    taskmodel.updateOne({user_id:req.params.id} , {$set:{date:req.body.date , Category:req.body.Category , Title:req.body.Title , Description:req.body.Description}}).then((data , err)=>{
        if(err){
            res.json({message:"Something went wrong" , result:err})
        }
        else{
            res.json({message:"Successfully edit" , result:data})
        }
    })
})

userRouter.post("/deletetask/:id" ,(req , res)=>{
    taskmodel.deleteOne({user_id:req.params.id} , {date:req.body.date , Category:req.body.Category , Title:req.body.Title , Description:req.body.Description}).then((data , err)=>{
if(err){
    res.json({message:"Something went wrong" , result:err})
}
else{
    res.json({message:"Task Deleted" , result:data})
}
    })
})




userRouter.post("/register" , (req , res)=>{
    usermodel.find({email:req.body.email}).then((data,err)=>{
        if(err){
            res.json({code:0})
        }
        else{
            if(data.length<=0){
                var newuser = usermodel({
                    first_name: req.body.fname,
                    last_name:req.body.lname,
                    email:req.body.email,
                    password:req.body.password,
                    number:req.body.number
                })
                
                newuser.save().then((data , err)=>{
                    if(err){
                        res.json({message:"Something went wrong" , error:err })
                        
                    }
                    else{
                        var rString = randomString(6, '0123456789');
            console.log(rString)
            var mailOptions = {
                from: 'chatany2003@gmail.com',
                to: req.body.email,
                subject: 'Task Management Register',
                text: `Congratulations you are successfully registered on this application ${rString}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
                        res.json({message:"Successfully registered" , result:data})
                    }
                })

            }
            else{
                console.log("already registerd")
                res.json({masssage:"already registered"})
            }
    
            
        }
    })
})
  




userRouter.post("/userlogin" , (req , res)=>{
    usermodel.find({email:req.body.email , password:req.body.password}).then((data , err)=>{
        if(err){
            res.json({err})
        }
        else{
            if(data.length>0){
                
                var rString = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                usermodel.updateOne({email:data[0].email},{$set:{token:rString}}).then((value,err)=>{
                    
                    res.json({code:1,message:"Successfully Login" , result:data,token:rString})
                })
            }
            else{
                res.json({code:0,message:"User not found" , err:err})
            }
        }
    })
})
userRouter.post("/logout",(req,res)=>{
usermodel.updateOne({email:req.body.email},{$set:{token:""}}).then((data,err)=>{
    if(err){
        res.json({code:0,message:"error"})
    }
    else{
        res.json({code:1,message:"logout successfully"})
    }
})
})



module.exports = userRouter