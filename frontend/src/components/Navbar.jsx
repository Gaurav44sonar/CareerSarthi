

// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";

// function Navbar() {

//   const navigate = useNavigate();
//   const location = useLocation();

//   const userName = localStorage.getItem("user_name") || "User";
//   const userEmail = localStorage.getItem("user_email") || "";

//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef();

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (!dropdownRef.current?.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const navItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Careers", path: "/careers" },
//     { name: "Mentor", path: "/mentor" }
//   ];

//   return (

//     <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">

//       {/* 🔥 LOGO */}
//       <div
//         onClick={() => navigate("/dashboard")}
//         className="flex items-center gap-2 cursor-pointer"
//       >
//         <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//           CareerAI
//         </span>
//         <span className="text-xl">🚀</span>
//       </div>

//       {/* 🔥 NAVIGATION */}
//       <div className="flex gap-6 relative">

//         {navItems.map((item, index) => {

//           const isActive = location.pathname === item.path;

//           return (
//             <div key={index} className="relative">

//               <button
//                 onClick={() => navigate(item.path)}
//                 className={`
//                   px-4 py-2 font-medium transition-all duration-300
//                   ${isActive
//                     ? "text-indigo-600"
//                     : "text-gray-600 hover:text-indigo-600"}
//                 `}
//               >
//                 {item.name}
//               </button>

//               {/* Active underline */}
//               {isActive && (
//                 <div className="absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
//               )}

//             </div>
//           );
//         })}

//       </div>

//       {/* 🔥 RIGHT SECTION */}
//       <div className="flex items-center gap-4">

//         {/* 🔔 Notification (placeholder) */}
//         <div className="relative cursor-pointer hover:scale-110 transition">
//           <span className="text-xl">🔔</span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
//             1
//           </span>
//         </div>

//         {/* 👤 PROFILE */}
//         <div className="relative" ref={dropdownRef}>

//           <div
//             onClick={() => setOpen(!open)}
//             className="flex items-center gap-2 cursor-pointer group"
//           >
//             {/* Avatar */}
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition">
//               {userName.charAt(0).toUpperCase()}
//             </div>

//             {/* Name (hidden on small screens optional) */}
//             <span className="hidden md:block text-gray-700 font-medium">
//               {userName}
//             </span>
//           </div>

//           {/* DROPDOWN */}
//           {open && (
//             <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border p-3 animate-fadeIn">

//               {/* USER INFO */}
//               <div className="px-2 pb-3 border-b">
//                 <p className="font-semibold text-gray-800">
//                   {userName}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {userEmail}
//                 </p>
//               </div>

//               {/* MENU */}
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="w-full text-left px-3 py-2 mt-2 rounded-lg hover:bg-gray-100 transition"
//               >
//                 👤 Profile
//               </button>

//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition"
//               >
//                 📊 Dashboard
//               </button>

//               <button
//                 onClick={() => navigate("/mentor")}
//                 className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition"
//               >
//                 🤖 AI Mentor
//               </button>

//               <hr className="my-2" />

//               <button
//                 onClick={() => {
//                   localStorage.clear();
//                   navigate("/");
//                 }}
//                 className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 transition"
//               >
//                 🚪 Logout
//               </button>

//             </div>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Navbar;

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("user_name") || "User";
  const userEmail = localStorage.getItem("user_email") || "";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Careers", path: "/careers" },
    { name: "Mentor", path: "/mentor" }
  ];

  return (

    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 px-8 py-2 flex justify-between items-center shadow-sm">

      {/* LOGO */}
      <div
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer text-xl font-bold text-indigo-600"
      >
        CareerAI 🚀
      </div>

      {/* NAV */}
      <div className="flex gap-2  p-1 rounded-xl">

        {navItems.map((item, index) => {

          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                bg-purple-600 text-white hover:bg-purple-700
              `}
            >
              {item.name}
            </button>
          );
        })}

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            1
          </span>
        </div>

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>

            <span className="hidden md:block text-gray-800 font-medium">
              {userName}
            </span>
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border p-4">

              <div className="mb-3">
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>

              <div className="flex flex-col gap-1">

                <button
                  onClick={() => navigate("/profile")}
                  className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  👤 Profile
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  📊 Dashboard
                </button>

                <button
                  onClick={() => navigate("/mentor")}
                  className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  🤖 AI Mentor
                </button>

              </div>

              <hr className="my-3" />

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className="w-full text-left px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;