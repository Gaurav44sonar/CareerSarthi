# import json
# import google.generativeai as genai
# from app.config import settings
# from app.database.mongo import careers_collection

# genai.configure(api_key=settings.GEMINI_API_KEY)
# model = genai.GenerativeModel("gemini-2.5-flash")


# def recommend_careers(profile_document):

#     user_profile = profile_document["profile"]

#     careers = list(careers_collection.find({}, {"_id": 0}))

#     prompt = f"""
#     User Profile:
#     {user_profile}

#     Available Careers:
#     {careers}

#     Match and return TOP 4 careers.

#     Return JSON:
#     {{
#         "top_careers": [
#             {{
#                 "career_name": "...",
#                 "match_score": 0-100,
#                 "reason": "..."
#             }}
#         ]
#     }}
#     """

#     response = model.generate_content(prompt)

#     try:
#         return json.loads(response.text)
#     except:
#         return {"raw_response": response.text}

import json
import re
import google.generativeai as genai
from app.config import settings
from app.database.mongo import careers_collection

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def extract_json(text: str):
    """
    Extract JSON from Gemini response safely
    Handles markdown blocks like ```json ... ```
    """
    try:
        return json.loads(text)
    except:
        # Remove markdown formatting if present
        text = text.strip()

        # Extract JSON object using regex
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except:
                pass

    return None


def recommend_careers(profile_document):

    user_profile = profile_document["profile"]

    # Get career database
    careers = list(careers_collection.find({}, {"_id": 0}))

    prompt = f"""
You are an AI career recommendation system.

User Profile:
{json.dumps(user_profile, indent=2)}

Available Careers:
{json.dumps(careers, indent=2)}

Task:
1. Analyze user's dominant_domains, personality_type, strengths_detected
2. Compare with career domain, required_skills, personality_fit
3. Score careers from 0-100
4. Return ONLY the TOP 4 most suitable careers

IMPORTANT:
Return STRICT JSON only.

Format:
{{
  "top_careers": [
    {{
      "career_name": "...",
      "match_score": 0,
      "reason": "..."
    }}
  ]
}}
"""

    response = model.generate_content(prompt)

    parsed = extract_json(response.text)

    if parsed:
        return parsed

    return {
        "error": "Could not parse Gemini response",
        "raw_response": response.text
    }