
from pymongo import MongoClient
from app.config import settings

client = MongoClient(settings.MONGO_URI)
db = client["career_ai"]

users_collection = db["users"]
sessions_collection = db["interest_sessions"]
profiles_collection = db["user_profiles"]
careers_collection = db["careers"]
skill_gap_collection = db["skill_gap_reports"]
roadmap_collection = db["roadmaps"]
mentor_chats_collection = db["mentor_chats"]