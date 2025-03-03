# import anthropic
import os
from dotenv import load_dotenv, dotenv_values 
import requests

load_dotenv() 
apikey = os.getenv("apikey")

url = 'https://api.anthropic.com/v1/messages'
headers = {
    'x-api-key': apikey, 
    'anthropic-version': '2023-06-01', 
    'content-type' : 'application/json'
}

payload = {
    "model" : "claude-3-7-sonnet-20250219",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "can anthropic read images?"}
    ]
}

r = requests.post(url, json=payload, headers=headers)
print(r.json())
