// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Login(){

//   const navigate = useNavigate();

//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const handleLogin = async () => {

//     try{

//       const res = await API.post("/auth/login",{
//         email,
//         password
//       });

//       localStorage.setItem("user_email", res.data.email);
//       localStorage.setItem("user_name", res.data.user_name);

//       navigate("/dashboard");

//     }
//     catch{

//       alert("Login Failed");

//     }

//   };

//   return(

//     <div style={{textAlign:"center", marginTop:"100px"}}>

//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         onChange={(e)=>setEmail(e.target.value)}
//       />

//       <br/><br/>

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e)=>setPassword(e.target.value)}
//       />

//       <br/><br/>

//       <button onClick={handleLogin}>
//         Login
//       </button>

//       <br/><br/>

//       <button onClick={()=>navigate("/register")}>
//         Create Account
//       </button>

//     </div>

//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("user_email",res.data.email);
      localStorage.setItem("user_name",res.data.user_name);

      navigate("/dashboard");

    }
    catch{
      alert("Login Failed");
    }

  };

  return(

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96">

        <h1 className="text-3xl text-white font-bold text-center mb-6">
          CareerSarthi
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 outline-none"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-6 outline-none"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-white text-center mt-6">
          Don't have an account?
        </p>

        <button
          onClick={()=>navigate("/register")}
          className="mt-2 w-full bg-white text-indigo-600 p-3 rounded-lg font-semibold"
        >
          Register
        </button>

      </div>

    </div>

  );
}

export default Login;