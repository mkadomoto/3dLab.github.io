from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
import os
from pathlib import Path
from models.contact import ContactSubmission, ContactResponse
from motor.motor_asyncio import AsyncIOMotorClient
import logging

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

logger = logging.getLogger(__name__)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/contact", response_model=ContactResponse)
async def create_contact_submission(
    name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    service_type: str = Form(...),
    message: str = Form(...),
    file: Optional[UploadFile] = File(None)
):
    """
    Create a new contact submission with optional file upload
    """
    try:
        file_name = None
        file_path = None
        
        # Handle file upload if provided
        if file:
            # Validate file extension
            allowed_extensions = ['.stl', '.obj', '.3mf', '.step', '.stp']
            file_ext = os.path.splitext(file.filename)[1].lower()
            
            if file_ext not in allowed_extensions:
                raise HTTPException(
                    status_code=400, 
                    detail=f"File type {file_ext} not allowed. Allowed types: {', '.join(allowed_extensions)}"
                )
            
            # Generate unique filename
            file_name = f"{ContactSubmission().id}_{file.filename}"
            file_path = str(UPLOAD_DIR / file_name)
            
            # Save file
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            logger.info(f"File saved: {file_path}")
        
        # Create contact submission
        contact = ContactSubmission(
            name=name,
            email=email,
            phone=phone,
            service_type=service_type,
            message=message,
            file_name=file_name,
            file_path=file_path
        )
        
        # Save to database
        result = await db.contact_submissions.insert_one(contact.dict())
        logger.info(f"Contact submission created: {contact.id}")
        
        return ContactResponse(
            id=contact.id,
            name=contact.name,
            email=contact.email,
            service_type=contact.service_type,
            message=contact.message,
            created_at=contact.created_at,
            status=contact.status
        )
    
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/contact")
async def get_contact_submissions():
    """
    Get all contact submissions
    """
    try:
        submissions = await db.contact_submissions.find().sort("created_at", -1).to_list(100)
        return [ContactResponse(**submission) for submission in submissions]
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/contact/{submission_id}")
async def get_contact_submission(submission_id: str):
    """
    Get a specific contact submission by ID
    """
    try:
        submission = await db.contact_submissions.find_one({"id": submission_id})
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
        return ContactResponse(**submission)
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error fetching contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
