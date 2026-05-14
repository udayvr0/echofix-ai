import uuid
from datetime import datetime

from models.incident import Incident
from services.incident_store import add_incident

def trigger_api_failure():
    incident = Incident(
        incident_id=str(uuid.uuid4()),
        incident_type="API_AUTH_FAILURE",
        severity="HIGH",
        status="OPEN",
        created_at=datetime.utcnow(),
        description="External API returned 401 Unauthorized due to expired credential.",
        affected_service="External Customer API"
    )

    add_incident(incident)

    return incident