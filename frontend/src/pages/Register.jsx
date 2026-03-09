// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Register() {

//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {

//     try {

//       await API.post("/auth/register", {
//         name,
//         email,
//         password
//       });

//       alert("Registration Successful");

//       navigate("/");

//     } catch (error) {

//       alert("Registration Failed");

//     }

//   };

//   return (
//     <div style={{textAlign:"center", marginTop:"100px"}}>

//       <h2>Register</h2>

//       <input
//         placeholder="Name"
//         onChange={(e)=>setName(e.target.value)}
//       />

//       <br/><br/>

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

//       <button onClick={handleRegister}>
//         Register
//       </button>

//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration Successful");

      navigate("/");

    }
    catch{

      alert("Registration Failed");

    }

  };

  return(

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96">

        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          className="w-full p-3 rounded-lg mb-4 outline-none"
          onChange={(e)=>setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold"
        >
          Register
        </button>

        <p className="text-white text-center mt-6">
          Already have an account?
        </p>

        <button
          onClick={()=>navigate("/")}
          className="mt-2 w-full bg-white text-indigo-600 p-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Register;