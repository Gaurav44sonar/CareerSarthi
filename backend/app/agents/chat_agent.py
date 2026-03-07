# import google.generativeai as genai
# from datetime import datetime

# from app.config import settings
# from app.database.mongo import (
#     profiles_collection,
#     skill_gap_collection,
#     roadmap_collection
# )

# genai.configure(api_key=settings.GEMINI_API_KEY)

# model = genai.GenerativeModel("gemini-2.5-flash")


# def chat_with_mentor(session_id: str, user_message: str):

#     # Fetch user profile
#     profile_doc = profiles_collection.find_one(
#         {"session_id": session_id}, {"_id": 0}
#     )

#     # Fetch skill gap
#     skill_gap_doc = skill_gap_collection.find_one(
#         {"session_id": session_id}, {"_id": 0}
#     )

#     # Fetch roadmap
#     roadmap_doc = roadmap_collection.find_one(
#         {"session_id": session_id}, {"_id": 0}
#     )

#     if not profile_doc:
#         return {"error": "User profile not found"}

#     prompt = f"""
# You are an AI Career Mentor helping a student grow in their career.

# User Profile:
# {profile_doc}

# Skill Gap:
# {skill_gap_doc}

# Roadmap:
# {roadmap_doc}

# User Question:
# {user_message}

# Instructions:
# - Give clear career guidance
# - Suggest skills to learn
# - Suggest projects when relevant
# - Encourage the user
# - Keep answers concise and practical
# """

#     response = model.generate_content(prompt)

#     return {
#         "mentor_response": response.text
#     }

import google.generativeai as genai
from datetime import datetime

from app.config import settings
from app.database.mongo import (
    profiles_collection,
    skill_gap_collection,
    roadmap_collection,
    mentor_chats_collection
)

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def chat_with_mentor(session_id: str, user_message: str):

    # Fetch profile
    profile_doc = profiles_collection.find_one(
        {"session_id": session_id}, {"_id": 0}
    )

    # Fetch skill gap
    skill_gap_doc = skill_gap_collection.find_one(
        {"session_id": session_id}, {"_id": 0}
    )

    # Fetch roadmap
    roadmap_doc = roadmap_collection.find_one(
        {"session_id": session_id}, {"_id": 0}
    )

    if not profile_doc:
        return {"error": "User profile not found"}

    # Fetch last 5 conversations
    previous_chats = list(
        mentor_chats_collection.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", -1).limit(5)
    )

    conversation_history = ""

    for chat in previous_chats[::-1]:
        conversation_history += f"""
User: {chat['user_message']}
Mentor: {chat['mentor_response']}
"""

    prompt = f"""
You are an AI Career Mentor helping a student grow.

User Profile:
{profile_doc}

Skill Gap:
{skill_gap_doc}

Roadmap:
{roadmap_doc}

Previous Conversation:
{conversation_history}

User Question:
{user_message}

Instructions:
- Give practical advice
- Suggest skills, projects, learning steps
- Keep response concise
- Encourage the user
"""

    response = model.generate_content(prompt)

    mentor_reply = response.text

    # Store chat in MongoDB
    mentor_chats_collection.insert_one({
        "session_id": session_id,
        "user_message": user_message,
        "mentor_response": mentor_reply,
        "timestamp": datetime.utcnow()
    })

    return {
        "mentor_response": mentor_reply
    }