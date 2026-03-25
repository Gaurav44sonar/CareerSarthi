

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {

//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("user_email");
//   const userName = localStorage.getItem("user_name");

//   const [profileExists, setProfileExists] = useState(false);
//   const [careerProgress, setCareerProgress] = useState([]);

//   useEffect(() => {
//     checkProfile();
//     fetchCareerProgress();
//   }, []);

//   // -----------------------------
//   // CHECK PROFILE
//   // -----------------------------
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

//   // -----------------------------
//   // FETCH CAREER + PROGRESS
//   // -----------------------------
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

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 text-gray-800">

//       {/* HEADER */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-bold text-gray-900">
//           Welcome {userName} 👋
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Let’s continue your career journey 🚀
//         </p>
//       </div>

//       {/* CREATE PROFILE */}
//       {!profileExists && (
//         <div className="bg-white p-6 rounded-2xl shadow mb-8 flex justify-between items-center">

//           <div>
//             <h2 className="text-lg font-semibold">
//               Create your career profile
//             </h2>
//             <p className="text-gray-500">
//               Start your journey with AI-guided questions
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/create-profile")}
//             className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
//           >
//             Start
//           </button>

//         </div>
//       )}

//       {/* 🔥 CONTINUE JOURNEY */}
//       {careerProgress.length > 0 && (

//         <div className="mb-12">

//           <h2 className="text-2xl font-bold mb-6 text-gray-900">
//             Continue Your Journey 🔥
//           </h2>

//           <div className="grid grid-cols-3 gap-6">

//             {careerProgress.map((item, index) => (

//               <div key={index}
//                    className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

//                 <h3 className="font-semibold text-lg text-indigo-700 mb-2">
//                   {item.career}
//                 </h3>

//                 <p className="text-gray-500 text-sm mb-4">
//                   Continue your roadmap and track progress
//                 </p>

//                 {/* 🔥 Progress Bar */}
//                 <div className="mb-4">

//                   <div className="flex justify-between text-sm mb-1">
//                     <span className="text-gray-600">Progress</span>
//                     <span className="font-semibold text-indigo-600">
//                       {item.progress}%
//                     </span>
//                   </div>

//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-indigo-600 h-2 rounded-full transition-all"
//                       style={{ width: `${item.progress}%` }}
//                     ></div>
//                   </div>

//                 </div>

//                 <button
//                   onClick={() => navigate("/roadmap", {
//                     state: { career: item.career }
//                   })}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 >
//                   Resume
//                 </button>

//               </div>

//             ))}

//           </div>

//         </div>

//       )}

//       {/* QUICK ACTION */}
//       <div className="bg-white p-6 rounded-2xl shadow mb-10 flex justify-between items-center">

//         <div>
//           <h2 className="text-lg font-semibold">
//             Explore Career Options
//           </h2>
//           <p className="text-gray-500">
//             Discover AI-recommended careers
//           </p>
//         </div>

//         <button
//           onClick={() => navigate("/careers")}
//           className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
//         >
//           Open Careers
//         </button>

//       </div>

//       {/* PROGRESS CARDS */}
//       <div className="grid grid-cols-4 gap-6 mb-10">

//         <div className="bg-white p-5 rounded-xl shadow text-center">
//           <h3 className="text-gray-700">Profile</h3>
//           <p className="text-green-500 font-semibold mt-2">
//             {profileExists ? "Completed" : "Pending"}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow text-center">
//           <h3 className="text-gray-700">Careers</h3>
//           <p className="text-indigo-600 font-semibold mt-2">
//             {careerProgress.length}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow text-center">
//           <h3 className="text-gray-700">Skill Gap</h3>
//           <p className="text-yellow-500 mt-2">Active</p>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow text-center">
//           <h3 className="text-gray-700">Roadmaps</h3>
//           <p className="text-green-600 mt-2">
//             {careerProgress.length}
//           </p>
//         </div>

//       </div>

//       {/* AI MENTOR */}
//       <div className="bg-white p-8 rounded-2xl shadow flex justify-between items-center">

//         <div>
//           <h2 className="text-xl font-bold">
//             AI Career Mentor
//           </h2>
//           <p className="text-gray-500">
//             Get guidance anytime
//           </p>
//         </div>

//         <button
//           onClick={() => navigate("/mentor")}
//           className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition"
//         >
//           Chat Now
//         </button>

//       </div>

//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("user_email");
  const userName = localStorage.getItem("user_name");

  const [profileExists, setProfileExists] = useState(false);
  const [careerProgress, setCareerProgress] = useState([]);

  useEffect(() => {
    checkProfile();
    fetchCareerProgress();
  }, []);

  // -----------------------------
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

  // -----------------------------
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

  // -----------------------------
  const primaryCareer = careerProgress[0];

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 text-gray-800">

      {/* ================= HERO SECTION ================= */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-xl mb-10">

        <h1 className="text-3xl font-bold">
          Welcome back, {userName} 👋
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

            {/* Progress */}
            <div className="mt-3">

              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{primaryCareer.progress}%</span>
              </div>

              <div className="w-full bg-white/30 rounded-full h-2 mt-1">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${primaryCareer.progress}%` }}
                ></div>
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


      {/* ================= AI SUGGESTION ================= */}

      <div className="bg-white p-6 rounded-2xl shadow mb-10">

        <h2 className="text-lg font-semibold text-indigo-700 mb-2">
          💡 AI Suggestion
        </h2>

        <p className="text-gray-600">
          You're making great progress! Completing your current month's skills
          will unlock the next milestone 🚀
        </p>

      </div>


      {/* ================= CONTINUE JOURNEY ================= */}

      {careerProgress.length > 0 && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Continue Your Journey 🔥
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {careerProgress.map((item, index) => (

              <div key={index}
                   className="bg-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all">

                <h3 className="font-semibold text-lg text-indigo-700 mb-2">
                  {item.career}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  Continue your roadmap and track progress
                </p>

                {/* Progress */}
                <div className="mb-4">

                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-indigo-600">
                      {item.progress}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>

                </div>

                <button
                  onClick={() => navigate("/roadmap", {
                    state: { career: item.career }
                  })}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 hover:scale-105 transition"
                >
                  Resume
                </button>

              </div>

            ))}

          </div>

        </div>

      )}


      {/* ================= QUICK ACTION ================= */}

      <div className="bg-white p-6 rounded-2xl shadow mb-10 flex justify-between items-center">

        <div>
          <h2 className="text-lg font-semibold">
            Explore Career Options
          </h2>
          <p className="text-gray-500">
            Discover AI-recommended careers
          </p>
        </div>

        <button
          onClick={() => navigate("/careers")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition"
        >
          Open Careers
        </button>

      </div>


      {/* ================= STATS ================= */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-700">Profile</h3>
          <p className="text-green-500 font-semibold mt-2">
            {profileExists ? "Completed" : "Pending"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-700">Careers</h3>
          <p className="text-indigo-600 font-semibold mt-2">
            {careerProgress.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-700">Skill Gap</h3>
          <p className="text-yellow-500 mt-2">
            Active
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-700">Roadmaps</h3>
          <p className="text-green-600 mt-2">
            {careerProgress.length}
          </p>
        </div>

      </div>


      {/* ================= AI MENTOR ================= */}

      <div className="bg-white p-8 rounded-2xl shadow flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold">
            AI Career Mentor
          </h2>
          <p className="text-gray-500">
            Get guidance anytime
          </p>
        </div>

        <button
          onClick={() => navigate("/mentor")}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          Chat Now
        </button>

      </div>

    </div>
  );
}

export default Dashboard;