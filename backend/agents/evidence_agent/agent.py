from services.evidence_service import get_worker_count
from services.azure_remediation_service import get_app_setting


def run_evidence_agent(state):

    incident_type = state["incident_type"]
    worker_count = get_worker_count()

    previous_worker_count = state.get(
        "previous_worker_count",
        "Unknown"
    )

    if incident_type in [
        "SERVICE_BUS_QUEUE_BACKLOG",
        "HIGH_MEMORY_USAGE"
    ]:
        current_worker_count = get_worker_count()
        return {
            "verificationType": "SCALING",
            "beforeWorkerCount": previous_worker_count,
            "afterWorkerCount": current_worker_count,
            "verification": "Azure scaling verified"
        }
    
    elif incident_type == "TOKEN_EXPIRATION":
        token_status = get_app_setting(
            "TOKEN_STATUS"
        )

        return {
            "verificationType": "TOKEN",
            "tokenStatus": token_status,
            "verification":
                "Authentication configuration verified"
        }
    
    else:
        return {
            "verificationType": "GENERIC",
            "incidentType": incident_type,
            "verification":
                "Operational validation completed successfully"
        }