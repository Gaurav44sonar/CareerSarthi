from fastapi import APIRouter, Query, HTTPException
from google.api_core.exceptions import ResourceExhausted

from app.agents.interest_agent import start_session, process_answer
from app.agents.career_agent import recommend_careers
from app.agents.skill_gap_agent import analyze_skill_gap
from app.agents.roadmap_agent import generate_roadmap, store_roadmap
from app.agents.chat_agent import chat_with_mentor
from app.database.mongo import roadmap_collection
from app.database.mongo import progress_collection

from app.database.mongo import (
    profiles_collection,
    users_collection,
    skill_gap_collection,
    roadmap_collection
)

router = APIRouter()

# =============================
# AUTH ROUTES
# =============================

@router.post("/auth/register")
def register(user: dict):

    existing = users_collection.find_one({"email": user["email"]})

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    users_collection.insert_one({
        "user_name": user["name"],
        "email": user["email"],
        "password": user["password"]
    })

    return {"message": "User registered successfully"}


@router.post("/auth/login")
def login(credentials: dict):

    user = users_collection.find_one({"email": credentials["email"]})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user["password"] != credentials["password"]:
        raise HTTPException(status_code=401, detail="Wrong password")

    return {
        "message": "Login successful",
        "email": credentials["email"],
        "user_name": user["user_name"]
    }


@router.get("/profile/check")
def check_profile(user_email: str):

    profile = profiles_collection.find_one(
        {"user_email": user_email},
        {"_id": 0}
    )

    if not profile or profile.get("profile") is None:
        return {"exists": False}

    return {"exists": True}


# =============================
# INTEREST AGENT
# =============================

@router.post("/interest/start")
def start(user_email: str = Query(...), user_name: str = Query(...)):
    try:
        return start_session(user_email, user_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/interest/next")
def next(user_email: str = Query(...), answer: str = Query(...)):
    try:
        return process_answer(user_email, answer)
    except ResourceExhausted:
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please wait."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =============================
# CAREER RECOMMENDATION
# =============================

@router.post("/career/recommend")
def recommend(user_email: str = Query(...)):
    try:
        return recommend_careers(user_email)
    except ResourceExhausted:
        raise HTTPException(status_code=429, detail="API quota exceeded")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =============================
# SKILL GAP ANALYSIS
# =============================

@router.post("/career/select")
def select_career(user_email: str = Query(...), career_name: str = Query(...)):

    try:
        # 🔍 Check existing
        existing = skill_gap_collection.find_one(
            {
                "user_email": user_email,
                "career": career_name
            },
            {"_id": 0}
        )

        if existing:
            return {
                "message": "Skill gap fetched from DB",
                "analysis": existing["analysis"]
            }

        # 🚀 Generate new
        result = analyze_skill_gap(user_email, career_name)

        return {
            "message": "Skill gap generated",
            "analysis": result
        }

    except ResourceExhausted:
        raise HTTPException(status_code=429, detail="API quota exceeded")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =============================
# ROADMAP AGENT (FIXED)
# =============================

# @router.get("/roadmap/generate")
# def generate_roadmap_route(
#     user_email: str = Query(...),
#     career_name: str = Query(...)
# ):

#     try:
#         # 🔍 1. Check DB first
#         existing = roadmap_collection.find_one(
#             {
#                 "user_email": user_email,
#                 "career": career_name
#             },
#             {"_id": 0}
#         )

#         if existing:
#             return {
#                 "message": "Roadmap fetched from DB",
#                 "roadmap": existing["roadmap"]
#             }

#         # 🚀 2. Generate roadmap
#         roadmap = generate_roadmap(user_email, career_name)

#         if "error" in roadmap:
#             raise HTTPException(status_code=400, detail=roadmap["error"])

#         # 💾 3. Store roadmap
#         store_roadmap(user_email, career_name, roadmap)

#         return {
#             "message": "Roadmap generated",
#             "roadmap": roadmap
#         }

#     except ResourceExhausted:
#         raise HTTPException(status_code=429, detail="API quota exceeded")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# -----------------------------
# ROADMAP AGENT (FIXED)
# -----------------------------



@router.get("/roadmap/generate")
def generate(user_email: str = Query(...), career_name: str = Query(...)):

    try:
        # 🔍 1. Check if roadmap already exists
        existing = roadmap_collection.find_one(
            {
                "user_email": user_email,
                "career": career_name
            },
            {"_id": 0}
        )

        if existing:
            return {
                "message": "Roadmap fetched from database",
                "roadmap": existing["roadmap"]
            }

        # 🚀 2. Generate new roadmap
        roadmap = generate_roadmap(user_email, career_name)

        if "error" in roadmap:
            raise HTTPException(status_code=400, detail=roadmap["error"])

        # 💾 3. Store roadmap
        store_roadmap(user_email, career_name, roadmap)

        return {
            "message": "Roadmap generated successfully",
            "roadmap": roadmap
        }

    except ResourceExhausted:
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please wait."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


# =============================
# ROADMAP PROGRESS
# =============================


@router.post("/roadmap/progress/update")
def update_progress(user_email: str, career_name: str, progress: dict):

    progress_collection.update_one(
        {
            "user_email": user_email,
            "career": career_name
        },
        {
            "$set": {
                "progress": progress
            }
        },
        upsert=True
    )

    return {"message": "Progress saved"}


@router.get("/roadmap/progress/get")
def get_progress(user_email: str, career_name: str):

    data = progress_collection.find_one(
        {
            "user_email": user_email,
            "career": career_name
        },
        {"_id": 0}
    )

    if not data:
        return {"progress": {}}

    return {"progress": data["progress"]}


# =============================
# AI MENTOR CHAT
# =============================

@router.post("/mentor/chat")
def mentor_chat(user_email: str, message: str):
    return chat_with_mentor(user_email, message)