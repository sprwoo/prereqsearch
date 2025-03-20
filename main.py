import os
from dotenv import load_dotenv, dotenv_values 
import requests
from pdfextract import pdf_to_base64 
from fastapi import FastAPI
 
# Create a FastAPI application
app = FastAPI()

load_dotenv() 
apikey = os.getenv("apikey")

url = 'https://api.anthropic.com/v1/messages'
headers = {
    'x-api-key': apikey, 
    'anthropic-version': '2023-06-01', 
    'content-type' : 'application/json'
}

@app.get("/")
def get_prerequisites(paper):
    pdf_text, pdf_images = pdf_to_base64(paper)

    content = []
    for image in pdf_images:
        content.append({
            "type" : "image",
            "source" : {
                "type" : "base64",
                "media_type" : "image/png",
                "data" : image,
            },
        })

    prompt = """
        The provided images are the images of a research paper. 
        Pretend the user is an undergraduate student with limited knowledge in the field of the paper. 
        I want you to analyze the paper and identify the 3 key prerequisites that the reader should know to help the reader understand the key ideas of the paper. 
        These prerequisites MUST 
            - Have a WIKIPEDIA page (or have an abundance of sources for information). 
            - Be RELEVANT to the topic of the paper.
            - Be methods, algorithms, theorems, or results.
            - Prioritize the prerequisites in the order: methods, algorithms, theorems, results.
            - These prerequisites should also not be explicitly explained within the paper itself.
        Here is a specific format I want you to follow:
        
        Paper name: <NAME OF THE PAPER>
        Paper author: <ONLY THE FIRST AUTHOR>
        Context: <SINGLE SENTENCE ABOUT THE PAPER'S GOAL AND TOPIC>
        P1. <NAME OF PREREQUISITE 1>
        P2. <NAME OF PREREQUISITE 2>
        P3. <NAME OF PREREQUISITE 3>
        L1. <LINK TO P1'S WIKIPEDIA PAGE>
        L2. <LINK TO P2'S WIKIPEDIA PAGE>
        L3. <LINK TO P3'S WIKIPEDIA PAGE>
        E1. <BRIEF EXPLAINATION WHY P1 WAS CHOSEN>
        E2. <BRIEF EXPLAINATION WHY P2 WAS CHOSEN>
        E3. <BRIEF EXPLAINATION WHY P3 WAS CHOSEN>

        Please provide the information in the specified format, do NOT add extra text or explanations. Thank you.
    """

    content.append({
        "type": "text",
        "text": prompt
    })

    payload = {
        "model" : "claude-3-7-sonnet-20250219",
        "max_tokens": 1024,
        "messages": [
            {
                "role": "user", 
                "content": content
            },
        ]
    }

    r = requests.post(url, json=payload, headers=headers)
    print(r.json())
    print(r.json()['content'][0]['text'])

    return r.json()


# TODO use regex to check if the returned format is correct
# Maybe check if the prerequisites are existing wikipedia sites? I
