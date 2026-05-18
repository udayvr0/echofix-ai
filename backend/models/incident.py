from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

@dataclass
class Incident:
    incident_id: str
    incident_type: str
    severity: str
    status: str
    created_at: datetime
    description: str
    affected_service: str
    root_cause: Optional[str] = None
    recovery_plan: Optional[str] = None
    
class Incident(BaseModel):

    incident_id: str
    incident_type: str
    severity: str
    description: str
    affected_service: str
    status: str