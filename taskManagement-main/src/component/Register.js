import "./register.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer , toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register(){
  let nav = useNavigate()
  const   [password  , setpassword] = useState("")
  const [eye , seteye] = useState("password")
  const [Firstname , setFirstname] = useState("")
  const [Lastname , setLastname] = useState("")
  const [Number , setNumber] = useState("")
  const [Email , setEmail] = useState("")
  function Registration(){

    let obj = {fname:Firstname , lname:Lastname , email:Email , password:password , number:Number}
    if(Firstname && Lastname && Number && Email){
    axios.post("http://localhost:2001/user/register" , obj).then((data , err)=>{
if(err){
  
  
}
else{
  console.log(data)
  if(data.data.masssage){

    toast.success("user already registered")
  }
  else{
    toast.success("User registred successfully")
  nav("/")
  }
}

    })
  }
  else{
    toast.error("Please fill-up the Details")
  }
}
    return(<><div>
     <div className="row justify-content-md-center " style={{marginTop:"50px"}}>
        <div className="col-4 reg">

              <p className="h3 mb-4 my-3">Create an account</p>

              <input type="name" className="form-control mb-4" placeholder="First Name" onInput={(e)=>{setFirstname(e.target.value)}}/>
              <input type="name" className="form-control mb-4" placeholder="Last Name" onInput={(e)=>{setLastname(e.target.value)}}/>
              <input type="email" className="form-control mb-4" placeholder="E-mail" onInput={(e)=>{setEmail(e.target.value)}}/>
              <div className="d-flex"> <input type={eye} id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password"  onInput={(e)=>{setpassword(e.target.value)}}/>
             <img src="../Eye.jpg" onClick={()=>{seteye(eye=="password"?"text":"password")}} style={{height:"37px", borderRadius:"4px"}}></img></div>   
             <input type="Number" className="form-control mb-4" placeholder="Number" onInput={(e)=>{setNumber(e.target.value)}}/>
              <button className="btn btn-info btn-block my-4" onClick={()=>{Registration()}} type="submit">Register</button>

              <p>Already have an account?
                <Link to="/userlogin"><span>Sign-In</span></Link>
              </p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
      </div>
    </>)
}

export default Register;