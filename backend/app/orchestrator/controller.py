# from app.agents.interest_agent import analyze_interest
# from app.database.mongo import profiles_collection

# class Orchestrator:

#     def process_interest(self, user_id: str, conversation: str):
#         profile_json = analyze_interest(conversation)

#         profiles_collection.update_one(
#             {"user_id": user_id},
#             {"$set": {"profile_data": profile_json}},
#             upsert=True
#         )

#         return profile_json

from app.database.mongo import users_collection
from app.agents.interest_agent import (
    generate_question,
    evaluate_answer,
    update_beliefs,
    generate_final_profile
)

class Orchestrator:

    def start_interest_session(self, user_id):
        state = {
            "user_id": user_id,
            "question_count": 0,
            "asked_questions": [],
            "answers": [],
            "belief_scores": {
                "technical": 50,
                "creative": 50,
                "analytical": 50,
                "social": 50,
                "management": 50
            },
            "is_completed": False
        }

        users_collection.update_one(
            {"user_id": user_id},
            {"$set": state},
            upsert=True
        )

        question = generate_question(state)
        return {"question": question}

    def submit_answer(self, user_id, answer):

        state = users_collection.find_one({"user_id": user_id})

        if not state or state["is_completed"]:
            return {"error": "Session not active"}

        # Update answer history
        state["answers"].append(answer)
        state["question_count"] += 1

        # Evaluate answer
        delta = evaluate_answer(answer)
        state = update_beliefs(state, delta)

        # If 10 questions done → generate profile
        if state["question_count"] >= 10:
            profile = generate_final_profile(state)
            state["is_completed"] = True

            users_collection.update_one(
                {"user_id": user_id},
                {"$set": state}
            )

            return {"final_profile": profile}

        # Otherwise generate next question
        next_question = generate_question(state)

        users_collection.update_one(
            {"user_id": user_id},
            {"$set": state}
        )

        return {"question": next_question}