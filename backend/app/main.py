from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import pdfextract, prerequisites

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pdfextract.router, prefix="/pdf", tags=["pdf"])
app.include_router(prerequisites.router, prefix="/prerequisites", tags=["prerequisites"])

@app.get("/")
async def root():
    return {"message": "Hello World"}