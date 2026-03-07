import json
import re
import google.generativeai as genai
from datetime import datetime

from app.config import settings
from app.database.mongo import profiles_collection, skill_gap_collection, roadmap_collection

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def extract_json(text):
    try:
        return json.loads(text)
    except:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
    return None


def generate_roadmap(session_id: str):

    profile_doc = profiles_collection.find_one(
        {"session_id": session_id}, {"_id": 0}
    )

    skill_gap_doc = skill_gap_collection.find_one(
        {"session_id": session_id}, {"_id": 0}
    )

    if not profile_doc:
        return {"error": "User profile not found"}

    if not skill_gap_doc:
        return {"error": "Skill gap report not found"}

    career = skill_gap_doc["career"]
    skill_gap = skill_gap_doc["analysis"]

    prompt = f"""
You are an AI Career Roadmap Generator.

User Career Goal:
{career}

Skill Gap Analysis:
{skill_gap}

Create a 6 month structured learning roadmap.

Include:
- skills to learn
- projects
- tools
- certifications
- timeline

Return STRICT JSON:

{{
  "career": "{career}",
  "roadmap": [
    {{
      "month": "Month 1",
      "focus": "...",
      "skills": [],
      "projects": [],
      "resources": []
    }}
  ]
}}
"""

    response = model.generate_content(prompt)

    parsed = extract_json(response.text)

    if parsed:
        return parsed

    return {"raw_response": response.text}


def store_roadmap(session_id: str, roadmap_data):

    roadmap_collection.insert_one({
        "session_id": session_id,
        "roadmap": roadmap_data,
        "created_at": datetime.utcnow()
    })

    return {
        "message": "Roadmap stored successfully"
    }