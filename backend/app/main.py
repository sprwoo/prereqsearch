from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import anthropic, mongodb
from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(mongodb.router, prefix="/db", tags=["db"])
app.include_router(anthropic.router, prefix="/prerequisites", tags=["prerequisites"])

# print("Routers:", app.routes)

@app.get("/")
async def root():
    return {"message": "API"}