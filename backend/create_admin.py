"""
Script to create initial admin user
Run this once to set up the admin account
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_admin_user():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if admin already exists
    existing_admin = await db.users.find_one({"username": "admin"})
    if existing_admin:
        print("❌ Admin user already exists!")
        return
    
    # Create admin user
    admin_user = {
        "id": str(uuid.uuid4()),
        "email": "admin@3dprintpro.com",
        "username": "admin",
        "hashed_password": pwd_context.hash("Admin123!"),
        "role": "admin",
        "created_at": datetime.utcnow(),
        "is_active": True
    }
    
    await db.users.insert_one(admin_user)
    print("✅ Admin user created successfully!")
    print("\n📋 Admin Credentials:")
    print("   Username: admin")
    print("   Password: Admin123!")
    print("\n⚠️  Please change the password after first login!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_admin_user())
