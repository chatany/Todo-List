import { Link } from "react-router-dom";
import "./login.css"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Login(){
let nav = useNavigate()
  const   [email  , setemail] = useState("")
  const   [password  , setpassword] = useState("")
  const [eye , seteye] = useState("password")
  function  login(){
    if(email && email!="" && password && password!=""){
let obj= {email:email , password:password}
axios.post("http://localhost:2001/user/userlogin" , obj).then((data ,  err)=>{
  if(err){
    toast.error("something went wrong")
  }
  else{
    if(data.data.code==1){
      toast.success("Successfully Login")
      localStorage.setItem("userData",JSON.stringify(data.data.result))
     nav("/list")
    }else{
      toast.error("Incorrect User or Password")
    }
  }
})
  }
  else{
    toast.error("please check the credentials")
  }
}
    return(<><div >
    <div className="row justify-content-md-center" style={{marginTop:"120px"}}>
        <div className="col-4 sah">

              <p className="h3 mb-4 my-3">Sign In</p>

              <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" required placeholder="E-mail" onInput={(e)=>{setemail(e.target.value)}}/>

             <div className="d-flex"> <input type={eye} id="defaultLoginFormPassword" required className="form-control mb-4" placeholder="Password" style={{borderRight:"0px"}} onInput={(e)=>{setpassword(e.target.value)}}/>
             <img src="../Eye.jpg" onClick={()=>{seteye(eye=="password"?"text":"password")}} style={{height:"37px", borderRadius:"4px"}}></img></div>              
              <button className="btn btn-info btn-block my-4" type="submit"  onClick={()=>{login()}}>Sign in</button>

              <p>Not a member?
                 <Link to='/register' ><span>Register</span></Link >
              </p>
        </div>
        <div>
        <ToastContainer />
      </div>

      </div>
      </div>
   
    </>)
}

export default Login;