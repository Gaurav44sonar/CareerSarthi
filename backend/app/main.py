from fastapi import FastAPI
from app.routes.api_routes import router

app = FastAPI(title="Career AI System")

app.include_router(router)

@app.get("/")
def root():
    return {"message": "Career AI Backend Running 🚀"}