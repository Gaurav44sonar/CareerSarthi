

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateProfile() {

  const userEmail = localStorage.getItem("user_email");
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [profileComplete, setProfileComplete] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    startSession();
  }, []);

  const startSession = async () => {

    try {

      const res = await API.post("/interest/start", null, {
        params: {
          user_email: userEmail,
          user_name: "User"
        }
      });

      if (res.data.complete) {

        setMessages([
          { sender: "ai", text: "🎉 Profile generated successfully! Click below to see career recommendations." }
        ]);
        setProfileComplete(true);
        setQuestionNumber(10);

      } else {

        setMessages([
          { sender: "ai", text: res.data.question }
        ]);

        if (res.data.question_number) {
          setQuestionNumber(res.data.question_number);
        }

      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const sendAnswer = async () => {

    if (!input || loading) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    setInput("");
    setLoading(true);

    try {

      const res = await API.post("/interest/next", null, {
        params: {
          user_email: userEmail,
          answer: input
        }
      });

      if (res.data.profile) {

        setMessages([
          ...newMessages,
          { sender: "ai", text: "🎉 Profile generated successfully!" }
        ]);

        setQuestionNumber(10);
        setProfileComplete(true);

      } else {

        setMessages([
          ...newMessages,
          { sender: "ai", text: res.data.question }
        ]);

        if (res.data.question_number) {
          setQuestionNumber(res.data.question_number);
        }

      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendAnswer();
    }
  };

  return (

    <div className="h-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">

      {/* Progress Bar */}

      <div className="w-full max-w-3xl mb-4">

        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Profile Completion</span>
          <span>Question {questionNumber} / 10</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">

          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / 10) * 100}%` }}
          ></div>

        </div>

      </div>


      {/* Chat Container */}

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl flex flex-col h-[500px]">

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-6">

          {loading && messages.length === 0 && (
            <p className="text-gray-400">AI preparing your first question...</p>
          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >

              {msg.sender === "ai" && (
                <div className="mr-2 text-xl">🤖</div>
              )}

              <div
                className={`px-4 py-2 rounded-xl max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>

            </div>

          ))}

          {loading && messages.length > 0 && (
            <p className="text-gray-400 text-sm">AI thinking...</p>
          )}

          <div ref={chatEndRef}></div>

        </div>


        {/* Input or Navigation Button */}

        {profileComplete ? (
          <div className="border-t p-4 flex justify-center">
            <button
              onClick={() => navigate("/career-recommendations")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
            >
              See Career Recommendations
            </button>
          </div>
        ) : (
          <div className="border-t flex">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your answer..."
              disabled={loading}
              className="flex-1 p-4 outline-none"
            />

            <button
              onClick={sendAnswer}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 disabled:opacity-50"
            >
              Send
            </button>

          </div>
        )}

      </div>

    </div>

  );
}

export default CreateProfile;


