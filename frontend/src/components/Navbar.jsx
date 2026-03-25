import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");
  const [open, setOpen] = useState(false);

  return (

    <div className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-indigo-600 cursor-pointer"
      >
        CareerAI 🚀
      </h1>

      {/* NAV LINKS */}
      <div className="flex gap-6 text-gray-700 font-medium">

        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/careers")}>
          Careers
        </button>

        <button onClick={() => navigate("/mentor")}>
          Mentor
        </button>

      </div>

      {/* PROFILE */}
      <div className="relative">

        <div
          onClick={() => setOpen(!open)}
          className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
        >
          {userName?.charAt(0)}
        </div>

        {open && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 p-2">

            <button
              onClick={() => navigate("/profile")}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Navbar;