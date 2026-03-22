import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


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

      const recommendedCareers = Array.isArray(res?.data?.top_careers)
        ? res.data.top_careers
        : [];

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
      console.log(err);
      setGapError("Failed to fetch skill gap.");
    }

    setLoadingGap(false);
  };

  // const pursueCareer = (careerName) => {
  //   handleGapAnalysis(careerName);
  // };

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

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-10">

      {/* 🔥 Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        Recommended Careers 🚀
      </h1>

      {loading && <p className="text-gray-600">Loading...</p>}

      {/* 🔥 Cards */}
      <div className="grid grid-cols-2 gap-8">

        {careers.map((career, index) => (

          <div
            key={index}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-2xl transition border border-gray-100"
          >

            {/* Career Name */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {career.career_name}
            </h2>

            {/* Match */}
            <p className="text-indigo-700 font-semibold mb-2">
              Match Score: {career.match_score}%
            </p>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-5">
              {career.reason}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => handleGapAnalysis(career.career_name)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                See Gap Analysis
              </button>

              <button
                onClick={() => pursueCareer(career.career_name)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                Pursue Career
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* 🔥 MODAL */}
      {selectedCareer && (

        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl w-[450px] p-6 shadow-2xl">

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedCareer}
            </h2>

            <p className="text-gray-500 mb-5">
              Skill Gap Analysis
            </p>

            {loadingGap ? (

              <p className="text-gray-400">Analyzing...</p>

            ) : gapError ? (

              <p className="text-red-600">{gapError}</p>

            ) : skillGapData ? (

              <div className="space-y-5">

                {/* Skills */}
                <div>
                  <h3 className="text-green-600 font-semibold mb-2">
                    ✔ Skills You Have
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {normalizedSkillGapData.skillsUserHas.map((s, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div>
                  <h3 className="text-red-600 font-semibold mb-2">
                    ❌ Missing Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {normalizedSkillGapData.missingSkills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match */}
                <div className="bg-indigo-50 p-4 rounded-xl text-center">
                  <p className="text-gray-600 text-sm">Skill Match</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {normalizedSkillGapData.matchPercentage}%
                  </p>
                </div>

              </div>

            ) : (

              <p className="text-gray-500">No data available</p>

            )}

            <button
              onClick={() => setSelectedCareer(null)}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
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