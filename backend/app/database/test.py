from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

try:
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)

    # Test connection
    client.admin.command("ping")
    print("✅ MongoDB connection successful!")

    # Access database
    db = client["career_ai_test"]
    collection = db["test_collection"]

    # Insert test document
    test_doc = {"name": "Gaurav", "status": "Mongo Connected"}
    insert_result = collection.insert_one(test_doc)

    print("✅ Document inserted with ID:", insert_result.inserted_id)

    # Read document back
    fetched_doc = collection.find_one({"name": "Gaurav"})
    print("✅ Document fetched:", fetched_doc)

except Exception as e:
    print("❌ MongoDB connection failed!")
    print("Error:", e)