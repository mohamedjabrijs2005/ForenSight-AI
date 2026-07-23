from fastapi import APIRouter
from typing import Any

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats() -> Any:
    """
    Get dashboard key statistics.
    """
    return {
        "today_crimes": 42,
        "total_crimes": 12845,
        "active_cases": 312,
        "solved_cases": 8430,
        "risk_score": 78
    }

@router.get("/hotspots")
def get_hotspots() -> Any:
    """
    Get predicted crime hotspots for GIS Map.
    """
    return [
        {"lat": 40.7128, "lng": -74.0060, "intensity": 0.8, "type": "Theft"},
        {"lat": 40.7328, "lng": -73.9960, "intensity": 0.6, "type": "Assault"}
    ]
