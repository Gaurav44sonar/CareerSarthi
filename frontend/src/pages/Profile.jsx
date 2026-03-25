

// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Profile() {

//   const userEmail = localStorage.getItem("user_email");

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     image: "",
//     skills: []
//   });

//   const [stats, setStats] = useState({
//     careers: 0,
//     roadmaps: 0,
//     avgMatch: 0,
//     streak: 0
//   });

//   const [file, setFile] = useState(null);
//   const [showMenu, setShowMenu] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//     fetchStats();
//     fetchSkills();
//   }, []);

//   // =========================
//   // FETCH PROFILE
//   // =========================
//   const fetchProfile = async () => {
//     const res = await API.get("/user/profile", {
//       params: { user_email: userEmail }
//     });

//     setUser({
//       name: "",
//       email: "",
//       image: "",
//       skills: [],
//       ...res.data
//     });
//   };

//   const fetchSkills = async () => {
//     try {
//       const res = await API.get("/user/skills", {
//         params: { user_email: userEmail }
//       });

//       setUser(prev => ({
//         ...prev,
//         skills: res.data.skills || []
//       }));

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =========================
//   // FETCH STATS
//   // =========================
//   const fetchStats = async () => {
//     const res = await API.get("/user/stats", {
//       params: { user_email: userEmail }
//     });
//     setStats(res.data);
//   };

//   // =========================
//   // UPDATE PROFILE
//   // =========================
//   const updateProfile = async () => {

//     const formData = new FormData();
//     formData.append("name", user.name);
//     if (file) formData.append("file", file);

//     await API.post("/user/profile/update", formData, {
//       params: { user_email: userEmail }
//     });

//     fetchProfile(); // refresh
//     setFile(null);

//     alert("Profile Updated 🚀");
//   };

//   // =========================
//   // IMAGE URL FIX
//   // =========================
//   const imageUrl = user.image
//     ? `http://localhost:8000/${user.image}`
//     : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10">

//       <div className="max-w-4xl mx-auto">

//         {/* HEADER */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">

//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-36 relative">

//             {/* PROFILE IMAGE */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 top-20">

//               <div className="relative">

//                 <img
//                   src={imageUrl}
//                   className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer"
//                   onClick={() => setShowMenu(!showMenu)}
//                 />

//                 {/* DROPDOWN */}
//                 {showMenu && (
//                   <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl p-3 w-44 z-50">

//                     <label className="block text-sm cursor-pointer hover:bg-gray-100 p-2 rounded">
//                       📤 Upload Image
//                       <input
//                         type="file"
//                         className="hidden"
//                         onChange={(e) => {
//                           setFile(e.target.files[0]);
//                           setShowMenu(false);
//                         }}
//                       />
//                     </label>

//                     <button
//                       className="w-full text-left text-sm text-red-500 hover:bg-gray-100 p-2 rounded"
//                       onClick={() => {
//                         setUser({ ...user, image: "" });
//                         setShowMenu(false);
//                       }}
//                     >
//                       ❌ Remove
//                     </button>

//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>

//           <div className="pt-24 pb-6 text-center">

//             <h2 className="text-2xl font-bold text-gray-800">
//               {user.name || "User"}
//             </h2>

//             <p className="text-gray-400 text-sm">
//               {user.email}
//             </p>

//           </div>

//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-4 gap-4 mb-8">

//           <StatCard title="Careers" value={stats.careers} />
//           <StatCard title="Roadmaps" value={stats.roadmaps} />
//           <StatCard title="Avg Match" value={`${stats.avgMatch}%`} />
//           <StatCard title="Streak 🔥" value={`${stats.streak} days`} />

//         </div>

//         {/* SKILLS */}
//         <div className="bg-white rounded-2xl shadow p-6 mb-8">

//           <h3 className="font-bold text-xl text-gray-800 mb-4">
//             🧠 Your Skills
//           </h3>

//           {user.skills.length === 0 ? (
//             <p className="text-gray-400">No skills detected yet</p>
//           ) : (
//             <div className="flex flex-wrap gap-3">
//               {user.skills.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           )}

//         </div>

//         {/* EDIT */}
//         <div className="bg-white rounded-2xl shadow p-6">

//           <h3 className="font-bold text-lg mb-4">
//             Edit Profile
//           </h3>

//           <div className="space-y-4">

//             <input
//               value={user.name || ""}
//               placeholder="Your Name"
//               onChange={(e) =>
//                 setUser({ ...user, name: e.target.value })
//               }
//               className="w-full border p-2 rounded"
//             />

//             <button
//               onClick={updateProfile}
//               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
//             >
//               Save Changes
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// // STAT CARD
// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow text-center">
//       <p className="text-gray-500 text-sm">{title}</p>
//       <h3 className="text-xl font-bold text-indigo-600">{value}</h3>
//     </div>
//   );
// }

// export default Profile;
import { useEffect, useState } from "react";
import API from "../services/api";
import HeatMap from "../components/Heatmap";

function Profile() {

  const userEmail = localStorage.getItem("user_email");

  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    skills: []
  });

  const [stats, setStats] = useState({
    careers: 0,
    roadmaps: 0,
    avgMatch: 0,
    streak: 0
  });

  const [activity, setActivity] = useState([]);
  const [file, setFile] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchStats();
    fetchSkills();
    fetchActivity();
  }, []);

  // =========================
  // FETCH PROFILE
  // =========================
  const fetchProfile = async () => {
    const res = await API.get("/user/profile", {
      params: { user_email: userEmail }
    });

    setUser(prev => ({
      ...prev,
      name: res.data.name || "",
      email: res.data.email || "",
      image: res.data.image || ""
    }));
  };

  // =========================
  // FETCH SKILLS
  // =========================
  const fetchSkills = async () => {
    const res = await API.get("/user/skills", {
      params: { user_email: userEmail }
    });

    setUser(prev => ({
      ...prev,
      skills: res.data.skills || []
    }));
  };

  // =========================
  // FETCH STATS
  // =========================
  const fetchStats = async () => {
    const res = await API.get("/user/stats", {
      params: { user_email: userEmail }
    });

    setStats(res.data);
  };

  // =========================
  // FETCH ACTIVITY
  // =========================
  const fetchActivity = async () => {
    const res = await API.get("/user/activity", {
      params: { user_email: userEmail }
    });

    setActivity(res.data.activity || []);
  };

  // =========================
  // UPDATE PROFILE
  // =========================
  const updateProfile = async () => {

    const formData = new FormData();
    formData.append("name", user.name);

    if (file) {
      formData.append("file", file);
    }

    await API.post("/user/profile/update", formData, {
      params: { user_email: userEmail }
    });

    fetchProfile();
    setFile(null);
  };

  // =========================
  const imageUrl = user.image
    ? `http://localhost:8000/${user.image}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 text-gray-800">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-36 relative">

            <div className="absolute left-1/2 transform -translate-x-1/2 top-20">

              <div className="relative">

                <img
                  src={imageUrl}
                  alt="profile"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                />

                {showMenu && (
                  <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl p-3 w-44 z-50">

                    <label className="block text-sm cursor-pointer hover:bg-gray-100 p-2 rounded">
                      📤 Upload Image
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          setShowMenu(false);
                        }}
                      />
                    </label>

                    <button
                      className="w-full text-left text-sm text-red-500 hover:bg-gray-100 p-2 rounded"
                      onClick={() => {
                        setUser({ ...user, image: "" });
                        setShowMenu(false);
                      }}
                    >
                      ❌ Remove
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* NAME */}
          <div className="pt-24 pb-6 text-center">

            <h2
              className="text-2xl font-bold cursor-pointer"
              onClick={() => setEditingName(true)}
            >
              {editingName ? (
                <input
                  value={user.name}
                  autoFocus
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                  onBlur={() => {
                    setEditingName(false);
                    updateProfile();
                  }}
                  className="text-center border-b outline-none"
                />
              ) : (
                user.name || "User"
              )}
            </h2>

            <p className="text-gray-400 text-sm">
              {user.email}
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard title="Careers" value={stats.careers} />
          <StatCard title="Roadmaps" value={stats.roadmaps} />
          <StatCard title="Avg Match" value={`${stats.avgMatch}%`} />
          <StatCard title="Streak 🔥" value={`${stats.streak} days`} />
        </div>

        {/* SKILLS */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <h3 className="font-bold text-xl mb-4">
            🧠 Your Skills
          </h3>

          {user.skills.length === 0 ? (
            <p className="text-gray-400">No skills detected yet</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* 🔥 HEATMAP (FIXED) */}
        <HeatMap activity={activity} />

      </div>

    </div>
  );
}

// STAT CARD
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold text-indigo-600">{value}</h3>
    </div>
  );
}

export default Profile;