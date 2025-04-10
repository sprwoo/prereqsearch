import pymongo
import gridfs
from datetime import datetime
import dotenv
import os
from bson.binary import Binary  
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import StreamingResponse
from bson.objectid import ObjectId

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
fs = gridfs.GridFS(prereq_db)

@router.get("/")
async def test():
    return {"message": "This is the database endpoint"}

@router.get("/check_for_paper/{author}&{title}")
async def check_paper(author, title):
    results = papers_col.find_one({
        "author": author,
        "title": title,
    })

    if results:
        return {"message": "Found in database. "}
    return {"message": "Paper not found in database, will upload now. "}

# Sends the paper to the MongoDB backend
# GridFS stores the pdf, papers collection stores the metadata
@router.post("/send_paper")
async def send_paper(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        file_id = fs.put(contents, filename=datetime.now().strftime("%Y-%m-%d_%H-%M-%S"))
    except FileNotFoundError:
        print("File not found. ")
        return None
    
    pdf_document = {
        "author": "John",
        "title": "Sample PDF",
        "file_id": file_id
    }

    result = papers_col.insert_one(pdf_document)
    print("Uploaded metadata. ")
    return {"inserted_id": str(result.inserted_id)}

@router.get("/get_pdf/{pdf_id}")
async def get_pdf(pdf_id: str):
    # Retrieve the document from MongoDB
    retrieved_document = papers_col.find_one({"_id": ObjectId(pdf_id)})
    if retrieved_document and "file" in retrieved_document:
        # Return the PDF as a streaming response
        pdf_content = retrieved_document["file"]
        return StreamingResponse(
            iter([pdf_content]),
            media_type="application/pdf",
            headers={"Content-Disposition": f"inline; filename={retrieved_document.get('title', 'document')}.pdf"}
        )
    return {"message": "PDF not found"}