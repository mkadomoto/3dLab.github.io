from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Optional
from models.product import Product, ProductCreate, ProductUpdate, ProductResponse
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
security = HTTPBearer()

def create_router(db):
    router = APIRouter()

    def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
        """Verify JWT token and return user"""
        from routes.auth import verify_token
        token = credentials.credentials
        user = verify_token(token, db)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user

    async def verify_admin(user: dict = Depends(get_current_user)):
        """Verify user is admin"""
        if user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        return user

    async def populate_categories(product: dict, db):
        """Populate category details for a product"""
        if product.get("category_ids"):
            categories = await db.categories.find(
                {"id": {"$in": product["category_ids"]}},
                {"_id": 0}
            ).to_list(100)
            product["categories"] = categories
        else:
            product["categories"] = []
        return product

    @router.get("/products", response_model=List[ProductResponse])
    async def get_products(
        search: Optional[str] = None,
        category_id: Optional[str] = None,
        active_only: bool = True
    ):
        """Get all products with optional search and category filter"""
        try:
            query = {}
            
            if active_only:
                query["is_active"] = True
            
            if search:
                query["$or"] = [
                    {"name": {"$regex": search, "$options": "i"}},
                    {"description": {"$regex": search, "$options": "i"}}
                ]
            
            if category_id:
                query["category_ids"] = category_id
            
            products = await db.products.find(query, {"_id": 0}).to_list(1000)
            
            # Populate categories for each product
            for product in products:
                await populate_categories(product, db)
            
            return [ProductResponse(**prod) for prod in products]
        except Exception as e:
            logger.error(f"Error fetching products: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

    @router.get("/products/{product_id}", response_model=ProductResponse)
    async def get_product(product_id: str):
        """Get product by ID"""
        try:
            product = await db.products.find_one({"id": product_id}, {"_id": 0})
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            
            await populate_categories(product, db)
            return ProductResponse(**product)
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error fetching product: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

    @router.post("/products", response_model=ProductResponse)
    async def create_product(
        product_data: ProductCreate,
        admin: dict = Depends(verify_admin)
    ):
        """Create new product (Admin only)"""
        try:
            product = Product(**product_data.model_dump())
            await db.products.insert_one(product.model_dump())
            logger.info(f"Product created: {product.id}")
            
            product_dict = product.model_dump()
            await populate_categories(product_dict, db)
            return ProductResponse(**product_dict)
        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

    @router.put("/products/{product_id}", response_model=ProductResponse)
    async def update_product(
        product_id: str,
        product_data: ProductUpdate,
        admin: dict = Depends(verify_admin)
    ):
        """Update product (Admin only)"""
        try:
            product = await db.products.find_one({"id": product_id}, {"_id": 0})
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            
            update_data = {k: v for k, v in product_data.model_dump().items() if v is not None}
            update_data["updated_at"] = datetime.utcnow()
            
            if update_data:
                await db.products.update_one(
                    {"id": product_id},
                    {"$set": update_data}
                )
            
            updated_product = await db.products.find_one({"id": product_id}, {"_id": 0})
            await populate_categories(updated_product, db)
            return ProductResponse(**updated_product)
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error updating product: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

    @router.delete("/products/{product_id}")
    async def delete_product(
        product_id: str,
        admin: dict = Depends(verify_admin)
    ):
        """Delete product (Admin only)"""
        try:
            result = await db.products.delete_one({"id": product_id})
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Product not found")
            
            return {"message": "Product deleted successfully"}
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error deleting product: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

    return router
