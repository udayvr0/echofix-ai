import uuid
import random
from datetime import datetime
from simulators.incident_templates import INCIDENT_TEMPLATES

from models.incident import Incident
from services.incident_store import add_incident

def trigger_api_failure():
    template = random.choice(INCIDENT_TEMPLATES)
    incident = Incident(
    incident_id=str(uuid.uuid4()),
    incident_type=template["incident_type"],
    severity=template["severity"],
    description=template["description"],
    affected_service=template["affected_service"],
    status="OPEN"
    )

    add_incident(incident)

    return incident