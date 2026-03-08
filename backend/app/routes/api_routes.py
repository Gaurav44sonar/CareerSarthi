# from fastapi import APIRouter, Query, HTTPException
# from app.agents.interest_agent import start_session, process_answer
# from app.agents.career_agent import recommend_careers
# from app.database.mongo import profiles_collection
# from app.agents.skill_gap_agent import analyze_skill_gap
# from google.api_core.exceptions import ResourceExhausted
# from app.agents.roadmap_agent import generate_roadmap, store_roadmap
# from app.agents.chat_agent import chat_with_mentor

# router = APIRouter()




# @router.post("/interest/start")
# def start(user_name: str = Query(...)):
#     try:
#         return start_session(user_name)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/interest/next")
# def next(session_id: str = Query(...), answer: str = Query(...)):
#     try:
#         return process_answer(session_id, answer)
#     except ResourceExhausted as e:
#         raise HTTPException(status_code=429, detail="Gemini API quota exceeded. Please wait a minute and try again.")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/career/recommend")
# def recommend(session_id: str = Query(...)):
#     try:
#         profile_document = profiles_collection.find_one(
#             {"session_id": session_id},
#             {"_id": 0}
#         )

#         if not profile_document:
#             raise HTTPException(status_code=404, detail="Profile not found")

#         return recommend_careers(profile_document)
#     except ResourceExhausted as e:
#         raise HTTPException(status_code=429, detail="Gemini API quota exceeded. Please wait a minute and try again.")
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/career/select")
# def select_career(session_id: str = Query(...), career_name: str = Query(...)):
#     try:
#         result = analyze_skill_gap(session_id, career_name)
#         return result
#     except ResourceExhausted as e:
#         raise HTTPException(status_code=429, detail="Gemini API quota exceeded. Please wait a minute and try again.")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
# @router.get("/roadmap/generate")
# def generate(session_id: str):

#     roadmap = generate_roadmap(session_id)

#     return roadmap

# @router.post("/roadmap/store")
# def store(session_id: str, roadmap: dict):

#     result = store_roadmap(session_id, roadmap)

#     return result

# @router.post("/mentor/chat")
# def mentor_chat(session_id: str, message: str):

#     return chat_with_mentor(session_id, message)

from fastapi import APIRouter, Query, HTTPException
from google.api_core.exceptions import ResourceExhausted

from app.agents.interest_agent import start_session, process_answer
from app.agents.career_agent import recommend_careers
from app.agents.skill_gap_agent import analyze_skill_gap
from app.agents.roadmap_agent import generate_roadmap, store_roadmap
from app.agents.chat_agent import chat_with_mentor

from app.database.mongo import profiles_collection, users_collection

router = APIRouter()


# -----------------------------
# AUTH ROUTES
# -----------------------------

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


# -----------------------------
# INTEREST AGENT
# -----------------------------

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
            detail="Gemini API quota exceeded. Please wait a minute and try again."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# CAREER RECOMMENDATION
# -----------------------------

@router.post("/career/recommend")
def recommend(user_email: str = Query(...)):
    try:
        profile_document = profiles_collection.find_one(
            {"user_email": user_email},
            {"_id": 0}
        )

        if not profile_document:
            raise HTTPException(status_code=404, detail="Profile not found")

        return recommend_careers(profile_document)

    except ResourceExhausted:
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please wait a minute and try again."
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# SKILL GAP ANALYSIS
# -----------------------------

@router.post("/career/select")
def select_career(user_email: str = Query(...), career_name: str = Query(...)):
    try:
        return analyze_skill_gap(user_email, career_name)

    except ResourceExhausted:
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please wait a minute and try again."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# ROADMAP AGENT
# -----------------------------

@router.get("/roadmap/generate")
def generate(user_email: str):
    return generate_roadmap(user_email)


@router.post("/roadmap/store")
def store(user_email: str, roadmap: dict):
    return store_roadmap(user_email, roadmap)


# -----------------------------
# AI CAREER MENTOR CHAT
# -----------------------------

@router.post("/mentor/chat")
def mentor_chat(user_email: str, message: str):
    return chat_with_mentor(user_email, message)