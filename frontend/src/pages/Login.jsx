import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("user_email", res.data.email);
      localStorage.setItem("user_name", res.data.user_name);

      navigate("/dashboard");

    }
    catch{

      alert("Login Failed");

    }

  };

  return(

    <div style={{textAlign:"center", marginTop:"100px"}}>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleLogin}>
        Login
      </button>

      <br/><br/>

      <button onClick={()=>navigate("/register")}>
        Create Account
      </button>

    </div>

  );
}

export default Login;