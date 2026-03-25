


// import Navbar from "../components/Navbar";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {

//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("user_email");

//   const [userName, setUserName] = useState("");
//   const [profileExists, setProfileExists] = useState(false);
//   const [careerProgress, setCareerProgress] = useState([]);

//   useEffect(() => {
//     loadUser();
//     checkProfile();
//     fetchCareerProgress();
//   }, []);

//   // =============================
//   // LOAD USER NAME (FIXED)
//   // =============================
//   const loadUser = async () => {
//     try {
//       const res = await API.get("/user/profile", {
//         params: { user_email: userEmail }
//       });

//       const latestName = res.data?.name || "";
//       setUserName(latestName);
//       localStorage.setItem("user_name", latestName);

//     } catch (err) {
//       console.log("User fetch error", err);
//     }
//   };

//   // =============================
//   const checkProfile = async () => {
//     try {
//       const res = await API.get("/profile/check", {
//         params: { user_email: userEmail }
//       });
//       setProfileExists(res.data.exists);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =============================
//   const fetchCareerProgress = async () => {
//     try {
//       const res = await API.get("/user/career-progress", {
//         params: { user_email: userEmail }
//       });
//       setCareerProgress(res.data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const primaryCareer = careerProgress[0];

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 text-gray-800">

//       <Navbar />

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-xl mb-10">

//         <h1 className="text-3xl font-bold">
//           Welcome back, {userName || "User"} 👋
//         </h1>

//         <p className="mt-2 text-indigo-100">
//           Stay consistent. Your future self is watching 🚀
//         </p>

//         {primaryCareer && (
//           <div className="mt-6">

//             <p className="text-sm text-indigo-200">
//               🎯 Current Focus
//             </p>

//             <h2 className="text-xl font-semibold">
//               {primaryCareer.career}
//             </h2>

//             <div className="mt-3">

//               <div className="flex justify-between text-sm">
//                 <span>Progress</span>
//                 <span>{primaryCareer.progress}%</span>
//               </div>

//               <div className="w-full bg-white/30 rounded-full h-2 mt-1">
//                 <div
//                   className="bg-white h-2 rounded-full"
//                   style={{ width: `${primaryCareer.progress}%` }}
//                 />
//               </div>

//             </div>

//             <button
//               onClick={() => navigate("/roadmap", {
//                 state: { career: primaryCareer.career }
//               })}
//               className="mt-4 bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
//             >
//               ▶ Resume Learning
//             </button>

//           </div>
//         )}

//       </div>

//       {/* AI SUGGESTION */}
//       <div className="bg-white p-6 rounded-2xl shadow mb-10">
//         <h2 className="text-lg font-semibold text-indigo-700 mb-2">
//           💡 AI Suggestion
//         </h2>
//         <p className="text-gray-600">
//           You're making great progress! Keep going 🚀
//         </p>
//       </div>

//       {/* Continue Journey */}
//       {careerProgress.length > 0 && (
//         <div className="mb-12">

//           <h2 className="text-2xl font-bold mb-6">
//             Continue Your Journey 🔥
//           </h2>

//           <div className="grid grid-cols-3 gap-6">

//             {careerProgress.map((item, index) => (

//               <div key={index}
//                    className="bg-white p-6 rounded-xl shadow hover:shadow-xl">

//                 <h3 className="font-semibold text-indigo-700">
//                   {item.career}
//                 </h3>

//                 <div className="mt-3">

//                   <div className="flex justify-between text-sm">
//                     <span>Progress</span>
//                     <span>{item.progress}%</span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-2 rounded">
//                     <div
//                       className="bg-indigo-600 h-2 rounded"
//                       style={{ width: `${item.progress}%` }}
//                     />
//                   </div>

//                 </div>

//                 <button
//                   onClick={() => navigate("/roadmap", {
//                     state: { career: item.career }
//                   })}
//                   className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Resume
//                 </button>

//               </div>

//             ))}

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// export default Dashboard;

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user_email");

  const [userName, setUserName] = useState("");
  const [profileExists, setProfileExists] = useState(false);
  const [careerProgress, setCareerProgress] = useState([]);

  useEffect(() => {
    loadUser();
    checkProfile();
    fetchCareerProgress();
  }, []);

  // =============================
  // LOAD USER NAME
  // =============================
  const loadUser = async () => {
    try {
      const res = await API.get("/user/profile", {
        params: { user_email: userEmail }
      });

      const latestName = res.data?.name || "";
      setUserName(latestName);
      localStorage.setItem("user_name", latestName);

    } catch (err) {
      console.log("User fetch error", err);
    }
  };

  // =============================
  const checkProfile = async () => {
    try {
      const res = await API.get("/profile/check", {
        params: { user_email: userEmail }
      });
      setProfileExists(res.data.exists);
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  const fetchCareerProgress = async () => {
    try {
      const res = await API.get("/user/career-progress", {
        params: { user_email: userEmail }
      });
      setCareerProgress(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const primaryCareer = careerProgress[0];

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 text-gray-800">

      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-xl mb-10">

        <h1 className="text-3xl font-bold">
          Welcome back, {userName || "User"} 👋
        </h1>

        <p className="mt-2 text-indigo-100">
          Stay consistent. Your future self is watching 🚀
        </p>

        {primaryCareer && (
          <div className="mt-6">

            <p className="text-sm text-indigo-200">
              🎯 Current Focus
            </p>

            <h2 className="text-xl font-semibold">
              {primaryCareer.career}
            </h2>

            <div className="mt-3">

              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{primaryCareer.progress}%</span>
              </div>

              <div className="w-full bg-white/30 rounded-full h-2 mt-1">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${primaryCareer.progress}%` }}
                />
              </div>

            </div>

            <button
              onClick={() => navigate("/roadmap", {
                state: { career: primaryCareer.career }
              })}
              className="mt-4 bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              ▶ Resume Learning
            </button>

          </div>
        )}

      </div>

      {/* 🔥 QUIZ CTA (ALWAYS VISIBLE) */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10 flex justify-between items-center border-l-4 border-indigo-500">

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {profileExists ? "Improve Your Career Path 🚀" : "Start Your Career Journey 🚀"}
          </h2>

          <p className="text-gray-500">
            {profileExists
              ? "Retake the AI quiz to get better recommendations"
              : "Take a quick AI quiz to discover your ideal career"}
          </p>
        </div>

        <button
          onClick={() => navigate("/create-profile")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
        >
          {profileExists ? "Retake Quiz" : "Take Quiz"}
        </button>

      </div>

      {/* AI SUGGESTION */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">
          💡 AI Suggestion
        </h2>
        <p className="text-gray-600">
          You're making great progress! Keep going 🚀
        </p>
      </div>

      {/* Continue Journey */}
      {careerProgress.length > 0 && (
        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-6">
            Continue Your Journey 🔥
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {careerProgress.map((item, index) => (

              <div key={index}
                   className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

                <h3 className="font-semibold text-indigo-700">
                  {item.career}
                </h3>

                <div className="mt-3">

                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-indigo-600 h-2 rounded"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                </div>

                <button
                  onClick={() => navigate("/roadmap", {
                    state: { career: item.career }
                  })}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Resume
                </button>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;