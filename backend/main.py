import os
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SkillGap AI Cloud API",
    description="Cloud-based student skill assessment and career roadmap platform.",
    version="1.0.0",
)

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173",
)

allowed_origins = [
    origin.strip().rstrip("/")
    for origin in frontend_url.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "SkillGap AI",
        "theme": "Cloud Computing",
        "status": "Backend running",
        "message": "Welcome to the SkillGap AI API!",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "SkillGap AI Backend",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/api/cloud-info")
def cloud_info():
    is_deployed = bool(os.getenv("RENDER"))

    return {
        "project": "SkillGap AI",
        "architecture": {
            "frontend": "React + Vite",
            "backend": "Python + FastAPI",
            "database": "Firebase Cloud Firestore",
            "authentication": "Firebase Authentication",
            "deployment": (
                "Cloud hosting" if is_deployed
                else "Local development"
            ),
        },
        "cloud_features": [
            "Cloud database integration",
            "Managed authentication",
            "Remote API access",
            "Configurable frontend-backend communication",
            "Scalable application architecture",
        ],
    }
