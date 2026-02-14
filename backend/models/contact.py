from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service_type: str
    message: str
    file_name: Optional[str] = None
    file_path: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    service_type: str
    message: str
    created_at: datetime
    status: str
