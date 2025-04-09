import pymongo
import dotenv
import os
from bson.binary import Binary  
from fastapi import APIRouter

router = APIRouter()

# Get the MongoDB Atlas connection string from the environment variables
dotenv.load_dotenv()
mongo_uri = os.getenv("MONGO_URI")

if not mongo_uri:
    raise ValueError("MONGO_URI is not set in the environment variables.")

mongodb_client = pymongo.MongoClient(mongo_uri)

# Access the database and collection
prereq_db = mongodb_client["prerequisearch"]
papers_col = prereq_db["papers"]

# with open(pdf_path, "rb") as pdf_file:
#     pdf_data = pdf_file.read()

@router.get("/")
async def test():
    return {"message": "hello world!"}

@router.post("/post_pdf")
async def post_pdf(pdf_data):
    pdf_document = {
        "author": "John",
        "title": "Sample PDF",
        "file": Binary(pdf_data), 
        "file_type": "application/pdf"
    }

    result = papers_col.insert_one(pdf_document)

    print(f"PDF uploaded with ID: {result.inserted_id}")

    retrieved_document = papers_col.find_one({"_id": result.inserted_id})

    if retrieved_document and "file" in retrieved_document:
        with open("retrieved_sample.pdf", "wb") as pdf_file:
            pdf_file.write(retrieved_document["file"]) 
        print("PDF successfully retrieved and saved as 'retrieved_sample.pdf'")
    else:
        print("Document not found or does not contain a PDF file.")