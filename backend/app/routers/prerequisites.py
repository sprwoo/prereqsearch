import os
from dotenv import load_dotenv
import requests
from fastapi import APIRouter, File, UploadFile
from .pdfextract import pdf_to_base64

router = APIRouter()

# Get environment variables
load_dotenv()
apikey = os.getenv("apikey")

# Anthropic API endpoint
url = 'https://api.anthropic.com/v1/messages'
headers = {
    'x-api-key': apikey,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json'
}

@router.post("/get_prerequisite")
async def get_prerequisites(file: UploadFile = File(...)):
    file_content = await file.read()
    pdf_text, pdf_images = pdf_to_base64(file_content)
    content = []

    for image in pdf_images:
        content.append({
            "type": "image",
            "source": {
                "type": "base64",
                "media_type": "image/png",
                "data": image,
            },
        })

    payload = {
        "model": "claude-3-7-sonnet-20250219",
        "max_tokens": 1024,
        "system": """
        You are an expert in the field of the given paper. The provided images are the images of a research paper. 
        Pretend the user is an undergraduate student with limited knowledge in the field of the paper. 
        Analyze the paper and identify the three most important prerequisites the student should understand to grasp the key ideas of the paper. These prerequisites MUST:
        
        These prerequisites MUST 
            - Have a WIKIPEDIA page (or be well-documented). 
            - Be relevant to the core concepts of the paper.
            - Prioritize methods, algorithms, theorems, and results in that order.
            - Not be explicitly explained within the paper itself.

        Follow this format and do NOT add extra text or explanations:
        Paper name: <NAME OF THE PAPER>
        Paper author: <ONLY THE FIRST AUTHOR>
        Context: <SINGLE SENTENCE ABOUT THE PAPER'S GOAL AND TOPIC>
        P1. <NAME OF PREREQUISITE 1>
        P2. <NAME OF PREREQUISITE 2>
        P3. <NAME OF PREREQUISITE 3>
        E1. <BRIEF EXPLAINATION WHY P1 WAS CHOSEN>
        E2. <BRIEF EXPLAINATION WHY P2 WAS CHOSEN>
        E3. <BRIEF EXPLAINATION WHY P3 WAS CHOSEN>""",

        "messages": [
            {
                "role": "user",
                "content": content
            },
        ]
    }

    r = requests.post(url, json=payload, headers=headers)
    return r.json()