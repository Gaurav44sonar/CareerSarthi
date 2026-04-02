import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CareerRecommendations() {

  const navigate = useNavigate();

  const [careers,setCareers] = useState([]);
  const [loading,setLoading] = useState(true);

  const userEmail = localStorage.getItem("user_email");

  useEffect(()=>{

    fetchCareers();

  },[]);

  const fetchCareers = async ()=>{

    try{

      const res = await API.post("/career/recommend",null,{
        params:{ user_email:userEmail }
      });

      setCareers(res.data.top_careers);

    }catch(err){
      console.log(err);
    }

    setLoading(false);
  };


  const pursueCareer = async (careerName)=>{

    try{

      const res = await API.post("/career/select",null,{
        params:{
          user_email:userEmail,
          career_name:careerName
        }
      });

      // Navigate to skill gap page
      navigate("/skill-gap",{
        state:{
          data:res.data.analysis,
          career:careerName
        }
      });

    }catch(err){
      console.log(err);
    }

  };


  return(

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-0 px-10 pb-10">

      <h1 className="text-3xl font-bold mb-8">
        Recommended Careers 🚀
      </h1>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 gap-6">

        {careers.map((career,index)=>(

          <div key={index}
               className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h2 className="text-xl font-semibold mb-2">
              {career.career_name}
            </h2>

            <p className="text-indigo-600 font-bold mb-2">
              Match Score: {career.match_score}%
            </p>

            <p className="text-gray-600 mb-4">
              {career.reason}
            </p>

            <button
              onClick={()=>pursueCareer(career.career_name)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              Pursue Career
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default CareerRecommendations;