// function Dashboard(){

//   const user_name = localStorage.getItem("user_name");

//   return(

//     <div style={{textAlign:"center", marginTop:"100px"}}>

//       <h1>Dashboard</h1>

//       <p>User Name: {user_name}</p>

//       <button>
//         Create Profile
//       </button>

//     </div>

//   );

// }

// export default Dashboard;
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [profileExists,setProfileExists] = useState(false);

  const userEmail = localStorage.getItem("user_email");
  const userName = localStorage.getItem("user_name");

  useEffect(()=>{

    const checkProfile = async () =>{

      try{

        const res = await API.get("/profile/check",{
          params:{ user_email:userEmail }
        });

        console.log("Profile check response:", res.data);
        setProfileExists(res.data.exists);

      }catch(err){
        console.log("Profile check error:", err);
      }

    };

    console.log("User email:", userEmail);
    checkProfile();

  },[]);


  return(

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10">


      {/* Welcome Section */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome {userName} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Your AI powered career guidance dashboard
        </p>

      </div>


      {/* Profile Section */}

      {!profileExists && (

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10 flex justify-between items-center">

          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Create Your Career Profile
            </h2>

            <p className="text-gray-500 mt-1">
              Answer a few AI questions to discover your ideal career path.
            </p>

          </div>

          <button
            onClick={()=>navigate("/create-profile")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow"
          >
            Create Profile
          </button>

        </div>

      )}


      {/* Progress Section */}

      <div className="grid grid-cols-4 gap-6 mb-12">


        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">

          <h3 className="text-lg font-semibold text-gray-700">
            Profile
          </h3>

          <p className="text-green-500 font-semibold mt-2">
            Completed
          </p>

        </div>


        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">

          <h3 className="text-lg font-semibold text-gray-700">
            Career
          </h3>

          <p className="text-yellow-500 font-semibold mt-2">
            Pending
          </p>

        </div>


        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">

          <h3 className="text-lg font-semibold text-gray-700">
            Skill Gap
          </h3>

          <p className="text-yellow-500 font-semibold mt-2">
            Pending
          </p>

        </div>


        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">

          <h3 className="text-lg font-semibold text-gray-700">
            Roadmap
          </h3>

          <p className="text-yellow-500 font-semibold mt-2">
            Pending
          </p>

        </div>

      </div>


      {/* AI Mentor Section */}

      <div className="bg-white rounded-2xl shadow-lg p-10 flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            AI Career Mentor
          </h2>

          <p className="text-gray-500 mt-2">
            Ask questions about your career path, skills, projects, and roadmap.
          </p>

        </div>

        <button
          onClick={()=>navigate("/mentor")}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Chat With Mentor
        </button>

      </div>


    </div>

  );

}

export default Dashboard;