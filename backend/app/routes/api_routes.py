from fastapi import APIRouter, Query, HTTPException
from app.agents.interest_agent import start_session, process_answer
from app.agents.career_agent import recommend_careers
from app.database.mongo import profiles_collection
from app.agents.skill_gap_agent import analyze_skill_gap
from google.api_core.exceptions import ResourceExhausted
from app.agents.roadmap_agent import generate_roadmap, store_roadmap
from app.agents.chat_agent import chat_with_mentor

router = APIRouter()


@router.post("/interest/start")
def start(user_name: str = Query(...)):
    try:
        return start_session(user_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/interest/next")
def next(session_id: str = Query(...), answer: str = Query(...)):
    try:
        return process_answer(session_id, answer)
    except ResourceExhausted as e:
        raise HTTPException(status_code=429, detail="Gemini API quota exceeded. Please wait a minute and try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/career/recommend")
def recommend(session_id: str = Query(...)):
    try:
        profile_document = profiles_collection.find_one(
            {"session_id": session_id},
            {"_id": 0}
        )

        if not profile_document:
            raise HTTPException(status_code=404, detail="Profile not found")

        return recommend_careers(profile_document)
    except ResourceExhausted as e:
        raise HTTPException(status_code=429, detail="Gemini API quota exceeded. Please wait a minute and try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/career/select")
def select_career(session_id: str = Query(...), career_name: str = Query(...)):
    try:
        result = analyze_skill_gap(session_id, career_name)
        return result
    except ResourceExhausted as e:
        raise HTTPException(status_code=429, detail="Gemini API quota exceeded. Please wait a minute and try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/roadmap/generate")
def generate(session_id: str):

    roadmap = generate_roadmap(session_id)

    return roadmap

@router.post("/roadmap/store")
def store(session_id: str, roadmap: dict):

    result = store_roadmap(session_id, roadmap)

    return result

@router.post("/mentor/chat")
def mentor_chat(session_id: str, message: str):

    return chat_with_mentor(session_id, message)