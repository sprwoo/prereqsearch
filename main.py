# import anthropic
import os
from dotenv import load_dotenv, dotenv_values 
import requests
from pdfextract import pdf_to_base64 

load_dotenv() 
apikey = os.getenv("apikey")

url = 'https://api.anthropic.com/v1/messages'
headers = {
    'x-api-key': apikey, 
    'anthropic-version': '2023-06-01', 
    'content-type' : 'application/json'
}

pdf_text, pdf_images = pdf_to_base64()

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

content.append({
    "type": "text",
    "text": pdf_text
})

content.append({
    "type": "text",
    "text": "Can you give me ONLY the title of the paper, NOTHING ELSE in the output, ONLY the title. Then, can you provide me with a list of 3 concepts that I should be familiar with before reading this paper to be able to understand. I ONLY want the TITLE or the NAME of said concept. These concepts should also be concepts that HAVE a wikipedia page."
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
# print(r.json().text)