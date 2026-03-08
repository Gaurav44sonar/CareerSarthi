# import json
# import re
# import google.generativeai as genai
# from datetime import datetime

# from app.config import settings
# from app.database.mongo import careers_collection, profiles_collection, skill_gap_collection

# genai.configure(api_key=settings.GEMINI_API_KEY)
# model = genai.GenerativeModel("gemini-2.5-flash")


# def extract_json(text):
#     try:
#         return json.loads(text)
#     except:
#         match = re.search(r'\{.*\}', text, re.DOTALL)
#         if match:
#             return json.loads(match.group())
#     return None


# def analyze_skill_gap(session_id: str, selected_career: str):

#     # Get user profile
#     profile_doc = profiles_collection.find_one({"session_id": session_id}, {"_id": 0})

#     if not profile_doc:
#         return {"error": "User profile not found"}

#     user_profile = profile_doc["profile"]

#     # Get career data
#     career_doc = careers_collection.find_one({"career_name": selected_career}, {"_id": 0})

#     if not career_doc:
#         return {"error": "Career not found"}

#     prompt = f"""
# You are an AI Skill Gap Analysis System.

# User Strengths:
# {user_profile["strengths_detected"]}

# Selected Career:
# {career_doc}

# Task:
# 1. Compare user strengths with career required_skills
# 2. Identify skills user already has
# 3. Identify missing skills
# 4. Calculate skill_match_percentage
# 5. Suggest learning priority

# Return STRICT JSON:

# {{
#   "career": "{selected_career}",
#   "skills_user_has": [],
#   "missing_skills": [],
#   "skill_match_percentage": 0,
#   "learning_priority": []
# }}
# """

#     response = model.generate_content(prompt)

#     parsed = extract_json(response.text)

#     if not parsed:
#         return {"raw_response": response.text}

#     # Store skill gap report
#     skill_gap_collection.insert_one({
#         "session_id": session_id,
#         "career": selected_career,
#         "analysis": parsed,
#         "created_at": datetime.utcnow()
#     })

#     return parsed

import json
import re
import google.generativeai as genai
from datetime import datetime

from app.config import settings
from app.database.mongo import (
    careers_collection,
    profiles_collection,
    skill_gap_collection
)

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")


# ----------------------------------
# Extract JSON safely from Gemini response
# ----------------------------------
def extract_json(text):

    try:
        return json.loads(text)

    except:
        match = re.search(r'\{.*\}', text, re.DOTALL)

        if match:
            return json.loads(match.group())

    return None


# ----------------------------------
# Skill Gap Analysis
# ----------------------------------
def analyze_skill_gap(user_email: str, selected_career: str):

    # Fetch user profile
    profile_doc = profiles_collection.find_one(
        {"user_email": user_email},
        {"_id": 0}
    )

    if not profile_doc:
        return {"error": "User profile not found"}

    if not profile_doc.get("profile"):
        return {"error": "User profile not generated yet"}

    user_profile = profile_doc["profile"]

    # Fetch career data
    career_doc = careers_collection.find_one(
        {"career_name": selected_career},
        {"_id": 0}
    )

    if not career_doc:
        return {"error": "Career not found"}

    prompt = f"""
You are an AI Skill Gap Analysis System.

User Strengths:
{user_profile["strengths_detected"]}

Selected Career:
{career_doc}

Task:
1. Compare user strengths with career required_skills
2. Identify skills user already has
3. Identify missing skills
4. Calculate skill_match_percentage
5. Suggest learning priority

Return STRICT JSON:

{{
  "career": "{selected_career}",
  "skills_user_has": [],
  "missing_skills": [],
  "skill_match_percentage": 0,
  "learning_priority": []
}}
"""

    response = model.generate_content(prompt)

    parsed = extract_json(response.text)

    if not parsed:
        return {"raw_response": response.text}

    # Store skill gap report
    skill_gap_collection.insert_one({
        "user_email": user_email,
        "career": selected_career,
        "analysis": parsed,
        "created_at": datetime.utcnow()
    })

    return parsed