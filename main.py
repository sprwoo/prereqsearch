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

string = pdf_to_base64()

payload = {
    "model" : "claude-3-7-sonnet-20250219",
    "max_tokens": 1024,
    "messages": [
        {
            "role": "user", 
            "content": [
                {
                    "type" : "image",
                    "source" : {
                        "type" : "base64",
                        "media_type" : "image/png",
                        "data" : string,
                    },
                },
                {
                    "type" : "text",
                    "text" : "What is the title of this paper?"
                }
            ],
        }
    ],
}

r = requests.post(url, json=payload, headers=headers)
print(r.json())
