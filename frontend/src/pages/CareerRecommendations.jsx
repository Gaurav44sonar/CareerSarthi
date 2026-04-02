// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";


// function CareerRecommendations() {

//   const [careers, setCareers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedCareer, setSelectedCareer] = useState(null);
//   const [skillGapData, setSkillGapData] = useState(null);
//   const [loadingGap, setLoadingGap] = useState(false);
//   const [gapError, setGapError] = useState("");

//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("user_email");

//   useEffect(() => {
//     fetchCareers();
//   }, []);

//   const fetchCareers = async () => {
//     try {
//       const res = await API.post("/career/recommend", null, {
//         params: { user_email: userEmail }
//       });

//       const recommendedCareers = Array.isArray(res?.data?.top_careers)
//         ? res.data.top_careers
//         : [];

//       setCareers(recommendedCareers);

//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   };

//   const handleGapAnalysis = async (careerName) => {

//     setSelectedCareer(careerName);
//     setLoadingGap(true);
//     setSkillGapData(null);
//     setGapError("");

//     try {
//       const res = await API.post("/career/select", null, {
//         params: {
//           user_email: userEmail,
//           career_name: careerName
//         }
//       });

//       setSkillGapData(res.data.analysis);

//     } catch (err) {
//       console.log(err);
//       setGapError("Failed to fetch skill gap.");
//     }

//     setLoadingGap(false);
//   };

//   // const pursueCareer = (careerName) => {
//   //   handleGapAnalysis(careerName);
//   // };

//   const pursueCareer = (careerName) => {

//   navigate("/roadmap", {
//     state: { career: careerName }
//   });

// };

//   const normalizedSkillGapData = skillGapData
//     ? {
//         skillsUserHas: skillGapData.skills_user_has || [],
//         missingSkills: skillGapData.missing_skills || [],
//         matchPercentage: skillGapData.skill_match_percentage ?? "N/A"
//       }
//     : null;

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 pt-0 px-10 pb-10">

//       <Navbar />

//       {/* 🔥 Title */}
//       <h1 className="text-4xl font-bold text-gray-900 mb-10">
//         Recommended Careers 🚀
//       </h1>

//       {loading && <p className="text-gray-600">Loading...</p>}

//       {/* 🔥 Cards */}
//       <div className="grid grid-cols-2 gap-8">

//         {careers.map((career, index) => (

//           <div
//             key={index}
//             className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-2xl transition border border-gray-100"
//           >

//             {/* Career Name */}
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               {career.career_name}
//             </h2>

//             {/* Match */}
//             <p className="text-indigo-700 font-semibold mb-2">
//               Match Score: {career.match_score}%
//             </p>

//             {/* Description */}
//             <p className="text-gray-700 leading-relaxed mb-5">
//               {career.reason}
//             </p>

//             {/* Buttons */}
//             <div className="flex gap-3 mt-4">

//               <button
//                 onClick={() => handleGapAnalysis(career.career_name)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition"
//               >
//                 See Gap Analysis
//               </button>

//               <button
//                 onClick={() => pursueCareer(career.career_name)}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
//               >
//                 Pursue Career
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>


//       {/* 🔥 MODAL */}
//       {selectedCareer && (

//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">

//           <div className="bg-white rounded-2xl w-[450px] p-6 shadow-2xl">

//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               {selectedCareer}
//             </h2>

//             <p className="text-gray-500 mb-5">
//               Skill Gap Analysis
//             </p>

//             {loadingGap ? (

//               <p className="text-gray-400">Analyzing...</p>

//             ) : gapError ? (

//               <p className="text-red-600">{gapError}</p>

//             ) : skillGapData ? (

//               <div className="space-y-5">

//                 {/* Skills */}
//                 <div>
//                   <h3 className="text-green-600 font-semibold mb-2">
//                     ✔ Skills You Have
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {normalizedSkillGapData.skillsUserHas.map((s, i) => (
//                       <span
//                         key={i}
//                         className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
//                       >
//                         {s}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Missing */}
//                 <div>
//                   <h3 className="text-red-600 font-semibold mb-2">
//                     ❌ Missing Skills
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {normalizedSkillGapData.missingSkills.map((s, i) => (
//                       <span
//                         key={i}
//                         className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
//                       >
//                         {s}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Match */}
//                 <div className="bg-indigo-50 p-4 rounded-xl text-center">
//                   <p className="text-gray-600 text-sm">Skill Match</p>
//                   <p className="text-2xl font-bold text-indigo-600">
//                     {normalizedSkillGapData.matchPercentage}%
//                   </p>
//                 </div>

//               </div>

//             ) : (

//               <p className="text-gray-500">No data available</p>

//             )}

//             <button
//               onClick={() => setSelectedCareer(null)}
//               className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
//             >
//               Close
//             </button>

//           </div>

//         </div>

//       )}

//     </div>

//   );
// }

// export default CareerRecommendations;

import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CareerRecommendations() {

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [skillGapData, setSkillGapData] = useState(null);
  const [loadingGap, setLoadingGap] = useState(false);
  const [gapError, setGapError] = useState("");

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user_email");

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await API.post("/career/recommend", null, {
        params: { user_email: userEmail }
      });

      const recommendedCareers = res?.data?.top_careers || [];
      setCareers(recommendedCareers);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleGapAnalysis = async (careerName) => {
    setSelectedCareer(careerName);
    setLoadingGap(true);
    setSkillGapData(null);
    setGapError("");

    try {
      const res = await API.post("/career/select", null, {
        params: {
          user_email: userEmail,
          career_name: careerName
        }
      });

      setSkillGapData(res.data.analysis);

    } catch (err) {
      setGapError("Failed to fetch skill gap.");
    }

    setLoadingGap(false);
  };

  const pursueCareer = (careerName) => {
    navigate("/roadmap", {
      state: { career: careerName }
    });
  };

  const normalizedSkillGapData = skillGapData
    ? {
        skillsUserHas: skillGapData.skills_user_has || [],
        missingSkills: skillGapData.missing_skills || [],
        matchPercentage: skillGapData.skill_match_percentage ?? "N/A"
      }
    : null;

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-10 pb-10">

      <Navbar />

      {/* HEADER */}
      <div className="mb-10 mt-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Recommended Careers 🚀
        </h1>
        <p className="text-gray-600 mt-2">
          Personalized suggestions based on your skills & interests
        </p>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-8">

        {careers.map((career, index) => {

          const isTop = index === 0;

          return (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-6 shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isTop ? "border-indigo-300" : "border-gray-100"
              }`}
            >

              {/* TOP BADGE */}
              {isTop && (
                <span className="absolute top-4 right-4 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
                  Top Match
                </span>
              )}

              {/* TITLE */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {career.career_name}
              </h2>

              {/* MATCH BAR */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-indigo-600 font-medium">
                  <span>Match Score</span>
                  <span>{career.match_score}%</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${career.match_score}%` }}
                  ></div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {career.reason}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3">

                <button
                  onClick={() => handleGapAnalysis(career.career_name)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition shadow-sm"
                >
                  Gap Analysis
                </button>

                <button
                  onClick={() => pursueCareer(career.career_name)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition shadow-sm"
                >
                  Pursue
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {/* MODAL */}
      {selectedCareer && (

        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl w-[450px] p-6 shadow-xl">

            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCareer}
            </h2>
            <p className="text-gray-500 mb-4">Skill Gap Analysis</p>

            {loadingGap ? (
              <p className="text-gray-400">Analyzing...</p>
            ) : gapError ? (
              <p className="text-red-600">{gapError}</p>
            ) : skillGapData ? (

              <div className="space-y-4">

                <div>
                  <h3 className="text-green-600 font-medium mb-2">
                    Skills You Have
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {normalizedSkillGapData.skillsUserHas.map((s, i) => (
                      <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-red-600 font-medium mb-2">
                    Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {normalizedSkillGapData.missingSkills.map((s, i) => (
                      <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Match</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {normalizedSkillGapData.matchPercentage}%
                  </p>
                </div>

              </div>

            ) : (
              <p className="text-gray-500">No data</p>
            )}

            <button
              onClick={() => setSelectedCareer(null)}
              className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default CareerRecommendations;