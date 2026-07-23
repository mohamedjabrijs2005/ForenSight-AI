from fastapi import APIRouter
from .endpoints import dashboard

api_router = APIRouter()
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
