// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import API from "../services/api";

// function Roadmap() {

//   const { state } = useLocation();
//   const careerName = state?.career;

//   const userEmail = localStorage.getItem("user_email");

//   const [roadmap, setRoadmap] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchRoadmap();
//   }, []);

//   const fetchRoadmap = async () => {
//     try {
//       const res = await API.get("/roadmap/generate", {
//         params: {
//           user_email: userEmail,
//           career_name: careerName
//         }
//       });

//       setRoadmap(res.data.roadmap.roadmap);

//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   };

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-10">

//       {/* 🔥 HEADER */}
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
//         {careerName} Roadmap 🚀
//       </h1>

//       {loading && (
//         <p className="text-center text-gray-600">Generating roadmap...</p>
//       )}

//       {/* 🔥 TIMELINE */}
//       <div className="space-y-10">

//         {roadmap.map((month, index) => (

//           <div key={index} className="relative">

//             {/* Timeline Line */}
//             <div className="absolute left-4 top-0 bottom-0 w-1 bg-indigo-200"></div>

//             <div className="ml-12 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">

//               {/* Month Title */}
//               <h2 className="text-xl font-bold text-indigo-700 mb-2">
//                 {month.month}
//               </h2>

//               {/* Focus */}
//               <p className="text-gray-700 mb-5">
//                 {month.focus}
//               </p>

//               {/* Skills */}
//               <div className="mb-5">
//                 <h3 className="font-semibold text-green-600 mb-2">
//                   Skills
//                 </h3>

//                 <div className="flex flex-wrap gap-2">
//                   {month.skills.map((s, i) => (
//                     <span
//                       key={i}
//                       className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Projects */}
//               <div className="mb-5">
//                 <h3 className="font-semibold text-purple-600 mb-2">
//                   Projects
//                 </h3>

//                 <ul className="space-y-1 text-gray-700">
//                   {month.projects.map((p, i) => (
//                     <li key={i}>• {p}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Resources */}
//               <div>
//                 <h3 className="font-semibold text-blue-600 mb-2">
//                   Resources
//                 </h3>

//                 <ul className="space-y-1 text-gray-700">
//                   {month.resources.map((r, i) => (
//                     <li key={i}>• {r}</li>
//                   ))}
//                 </ul>
//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>

//   );
// }

// export default Roadmap;

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

function Roadmap() {

  const { state } = useLocation();
  const careerName = state?.career;

  const userEmail = localStorage.getItem("user_email");

  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
    fetchProgress();
  }, []);

  const fetchRoadmap = async () => {
    const res = await API.get("/roadmap/generate", {
      params: {
        user_email: userEmail,
        career_name: careerName
      }
    });

    setRoadmap(res.data.roadmap.roadmap);
    setLoading(false);
  };

  const fetchProgress = async () => {
    const res = await API.get("/roadmap/progress/get", {
      params: {
        user_email: userEmail,
        career_name: careerName
      }
    });

    setProgress(res.data.progress || {});
  };

  const toggleSkill = (mIndex, skill) => {

    const key = `${mIndex}-${skill}`;

    const updated = {
      ...progress,
      [key]: !progress[key]
    };

    setProgress(updated);

    API.post("/roadmap/progress/update", updated, {
      params: {
        user_email: userEmail,
        career_name: careerName
      }
    });
  };

  const calculateProgress = () => {
    let total = 0;
    let done = 0;

    roadmap.forEach((m, mi) => {
      m.skills.forEach(skill => {
        total++;
        if (progress[`${mi}-${skill}`]) done++;
      });
    });

    return total ? Math.round((done / total) * 100) : 0;
  };

  const percent = calculateProgress();

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 text-gray-800">

      <Navbar />

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        {careerName} Roadmap 🚀
      </h1>

      {/* PROGRESS */}
      <div className="max-w-xl mx-auto mb-12">

        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-3 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

      </div>

      {/* ROADMAP */}
      <div className="space-y-8">

        {roadmap.map((month, mIndex) => (

          <div key={mIndex} className="bg-white p-6 rounded-2xl shadow-md border">

            {/* MONTH */}
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              {month.month}
            </h2>

            {/* FOCUS */}
            <p className="text-gray-600 mb-4">
              {month.focus}
            </p>

            {/* SKILLS */}
            <div className="mb-5">
              <h3 className="font-semibold text-green-600 mb-2">
                Skills
              </h3>

              <div className="space-y-2">

                {month.skills.map((skill, sIndex) => {

                  const key = `${mIndex}-${skill}`;
                  const checked = progress[key];

                  return (
                    <label
                      key={sIndex}
                      className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={checked || false}
                        onChange={() => toggleSkill(mIndex, skill)}
                        className="w-4 h-4 accent-indigo-600"
                      />

                      <span className={`text-gray-700 ${checked ? "line-through text-gray-400" : ""}`}>
                        {skill}
                      </span>
                    </label>
                  );
                })}

              </div>
            </div>

            {/* PROJECTS */}
            <div className="mb-5">
              <h3 className="font-semibold text-purple-600 mb-2">
                Projects
              </h3>

              <ul className="space-y-1 text-gray-700">
                {month.projects.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">
                Resources
              </h3>

              <ul className="space-y-1 text-gray-700">
                {month.resources.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Roadmap;