# import google.generativeai as genai
# import uuid
# import json
# import re

# from app.config import settings
# from app.database.mongo import sessions_collection

# # Configure Gemini
# genai.configure(api_key=settings.GEMINI_API_KEY)
# model = genai.GenerativeModel("gemini-2.5-flash")

# MAX_QUESTIONS = 10


# def extract_json(text):
#     try:
#         return json.loads(text)
#     except:
#         match = re.search(r'\{.*\}', text, re.DOTALL)
#         if match:
#             return json.loads(match.group())
#         return None


# def generate_next_question(session):

#     question_count = session["question_count"]
#     answers = session["answers"]

#     if question_count < 4:
#         stage = "background"
#     elif question_count < 7:
#         stage = "path_shaping"
#     else:
#         stage = "deep_exploration"

#     prompt = f"""
#     You are an expert career psychologist AI.

#     The user has answered:
#     {answers}

#     Current Stage: {stage}
#     Question Number: {question_count + 1} out of 10

#     Instructions:
#     - Ask ONE relevant question.
#     - The question MUST depend on previous answers.
#     - For background: ask about education, subjects, skills.
#     - For path_shaping: narrow interest direction.
#     - For deep_exploration: ask specific domain-based question.
#     - Do NOT repeat previous questions.
#     - Keep it short and conversational.

#     Return JSON:
#     {{
#         "question": "..."
#     }}
#     """

#     response = model.generate_content(prompt)
#     parsed = extract_json(response.text)

#     if parsed:
#         return parsed["question"]
#     else:
#         return response.text


# def generate_profile(answers):

#     prompt = f"""
#     You are a professional career psychologist.

#     Based on these answers:
#     {answers}

#     Generate structured career profile.

#     Return JSON:
#     {{
#         "interest_summary": "...",
#         "personality_type": "...",
#         "dominant_domains": ["..."],
#         "recommended_career_paths": ["..."],
#         "strengths_detected": ["..."],
#         "growth_areas": ["..."]
#     }}
#     """

#     response = model.generate_content(prompt)
#     parsed = extract_json(response.text)

#     if parsed:
#         return parsed
#     else:
#         return {"raw_response": response.text}


# def start_session():

#     session_id = str(uuid.uuid4())

#     session = {
#         "session_id": session_id,
#         "question_count": 0,
#         "answers": {},
#         "last_question": "What is your current education level?"
#     }

#     sessions_collection.insert_one(session)

#     return {
#         "session_id": session_id,
#         "question": session["last_question"]
#     }


# def process_answer(session_id: str, answer: str):

#     session = sessions_collection.find_one({"session_id": session_id})

#     if not session:
#         return {"error": "Invalid session_id"}

#     last_question = session["last_question"]

#     # Save answer
#     session["answers"][last_question] = answer
#     session["question_count"] += 1

#     if session["question_count"] >= MAX_QUESTIONS:

#         profile = generate_profile(session["answers"])

#         sessions_collection.update_one(
#             {"session_id": session_id},
#             {"$set": session}
#         )

#         return {
#             "message": "Profile Generated Successfully",
#             "profile": profile
#         }

#     # Generate adaptive next question
#     next_question = generate_next_question(session)

#     session["last_question"] = next_question

#     sessions_collection.update_one(
#         {"session_id": session_id},
#         {"$set": session}
#     )

#     return {
#         "question": next_question,
#         "question_number": session["question_count"] + 1
#     }


# import google.generativeai as genai
# import uuid
# import json
# import re
# from datetime import datetime

# from app.config import settings
# from app.database.mongo import sessions_collection, profiles_collection

# genai.configure(api_key=settings.GEMINI_API_KEY)
# model = genai.GenerativeModel("gemini-2.5-flash")

# MAX_QUESTIONS = 10


# def extract_json(text):
#     try:
#         return json.loads(text)
#     except:
#         match = re.search(r'\{.*\}', text, re.DOTALL)
#         if match:
#             return json.loads(match.group())
#         return None


# def generate_next_question(session):

#     question_count = session["question_count"]
#     answers = session["answers"]

#     if question_count < 4:
#         stage = "background"
#     elif question_count < 7:
#         stage = "path_shaping"
#     else:
#         stage = "deep_exploration"

#     prompt = f"""
#     You are an expert career psychologist AI.

#     User Answers:
#     {answers}

#     Current Stage: {stage}
#     Question Number: {question_count + 1} out of 10

#     Ask ONE relevant question.
#     It must depend on previous answers.
#     Do not repeat questions.
#     Keep it short and conversational.

#     Return JSON:
#     {{
#         "question": "..."
#     }}
#     """

#     response = model.generate_content(prompt)
#     parsed = extract_json(response.text)

#     if parsed:
#         return parsed["question"]
#     else:
#         return response.text


# def generate_profile(session):

#     answers = session["answers"]
#     user_name = session["user_name"]

#     prompt = f"""
#     You are a professional career psychologist.

#     User Name: {user_name}

#     Answers:
#     {answers}

#     Generate structured career profile.

#     Return JSON:
#     {{
#         "interest_summary": "...",
#         "personality_type": "...",
#         "dominant_domains": ["..."],
#         "recommended_career_paths": ["..."],
#         "strengths_detected": ["..."],
#         "growth_areas": ["..."]
#     }}
#     """

#     response = model.generate_content(prompt)
#     parsed = extract_json(response.text)

#     if parsed:
#         return parsed
#     else:
#         return {"raw_response": response.text}


# def start_session(user_name: str):

#     session_id = str(uuid.uuid4())

#     session = {
#         "session_id": session_id,
#         "user_name": user_name,
#         "question_count": 0,
#         "answers": {},
#         "last_question": "What is your current education level?",
#         "created_at": datetime.utcnow()
#     }

#     sessions_collection.insert_one(session)

#     return {
#         "session_id": session_id,
#         "question": session["last_question"]
#     }


# def process_answer(session_id: str, answer: str):

#     session = sessions_collection.find_one({"session_id": session_id})

#     if not session:
#         return {"error": "Invalid session_id"}

#     last_question = session["last_question"]

#     session["answers"][last_question] = answer
#     session["question_count"] += 1

#     if session["question_count"] >= MAX_QUESTIONS:

#         profile = generate_profile(session)

#         # Store profile in user_profiles collection
#         profile_document = {
#             "session_id": session_id,
#             "user_name": session["user_name"],
#             "answers": session["answers"],
#             "profile": profile,
#             "created_at": datetime.utcnow()
#         }

#         profiles_collection.insert_one(profile_document)

#         sessions_collection.update_one(
#             {"session_id": session_id},
#             {"$set": session}
#         )

#         return {
#             "message": "Profile Generated Successfully",
#             "profile": profile
#         }

#     next_question = generate_next_question(session)
#     session["last_question"] = next_question

#     sessions_collection.update_one(
#         {"session_id": session_id},
#         {"$set": session}
#     )

#     return {
#         "question": next_question,
#         "question_number": session["question_count"] + 1
#     }

import google.generativeai as genai
import json
import re
from datetime import datetime

from app.config import settings
from app.database.mongo import profiles_collection

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

MAX_QUESTIONS = 10


# ----------------------------------
# Extract JSON from Gemini response
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
# Generate Next Question
# ----------------------------------
def generate_next_question(profile_doc):

    question_count = profile_doc["question_count"]
    answers = profile_doc["answers"]

    if question_count < 4:
        stage = "background"
    elif question_count < 7:
        stage = "path_shaping"
    else:
        stage = "deep_exploration"

    prompt = f"""
You are an expert career psychologist AI.

User Answers:
{answers}

Current Stage: {stage}
Question Number: {question_count + 1} out of 10

Ask ONE relevant question.
It must depend on previous answers.
Do not repeat questions.
Keep it short and conversational.

Return JSON:
{{
  "question": "..."
}}
"""

    response = model.generate_content(prompt)
    parsed = extract_json(response.text)

    if parsed:
        return parsed["question"]
    else:
        return response.text


# ----------------------------------
# Generate User Profile
# ----------------------------------
def generate_profile(profile_doc):

    answers = profile_doc["answers"]
    user_name = profile_doc["user_name"]

    prompt = f"""
You are a professional career psychologist.

User Name: {user_name}

Answers:
{answers}

Generate structured career profile.

Return JSON:
{{
  "interest_summary": "...",
  "personality_type": "...",
  "dominant_domains": ["..."],
  "recommended_career_paths": ["..."],
  "strengths_detected": ["..."],
  "growth_areas": ["..."]
}}
"""

    response = model.generate_content(prompt)
    parsed = extract_json(response.text)

    if parsed:
        return parsed
    else:
        return {"raw_response": response.text}


# ----------------------------------
# Start Interest Session
# ----------------------------------
def start_session(user_email: str, user_name: str):

    existing_profile = profiles_collection.find_one({"user_email": user_email})

    if existing_profile:
        # If profile is complete, return message
        if existing_profile.get("profile"):
            return {
                "message": "Profile already exists for this user",
                "complete": True
            }
        # If profile is incomplete, return the last question
        return {
            "question": existing_profile["last_question"]
        }

    profile_doc = {
        "user_email": user_email,
        "user_name": user_name,
        "question_count": 0,
        "answers": {},
        "last_question": "What is your current education level?",
        "profile": None,
        "created_at": datetime.utcnow()
    }

    profiles_collection.insert_one(profile_doc)

    return {
        "question": profile_doc["last_question"]
    }


# ----------------------------------
# Process User Answer
# ----------------------------------
def process_answer(user_email: str, answer: str):

    profile_doc = profiles_collection.find_one({"user_email": user_email})

    if not profile_doc:
        return {"error": "User profile session not found"}

    last_question = profile_doc["last_question"]

    profile_doc["answers"][last_question] = answer
    profile_doc["question_count"] += 1

    # If questions finished
    if profile_doc["question_count"] >= MAX_QUESTIONS:

        profile = generate_profile(profile_doc)

        profiles_collection.update_one(
            {"user_email": user_email},
            {
                "$set": {
                    "answers": profile_doc["answers"],
                    "question_count": profile_doc["question_count"],
                    "profile": profile
                }
            }
        )

        return {
            "message": "Profile Generated Successfully",
            "profile": profile
        }

    # Generate next question
    next_question = generate_next_question(profile_doc)

    profiles_collection.update_one(
        {"user_email": user_email},
        {
            "$set": {
                "answers": profile_doc["answers"],
                "question_count": profile_doc["question_count"],
                "last_question": next_question
            }
        }
    )

    return {
        "question": next_question,
        "question_number": profile_doc["question_count"] + 1
    }