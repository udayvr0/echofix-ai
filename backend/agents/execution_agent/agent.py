# Future v2 implementation.
# Current remediation flow is executed through execution_service.py

from services.azure_remediation_service import update_worker_count


def run_execution_agent(state):

    incident_type = state["incident_type"]

    result = {
        "success": True,
        "actions": []
    }

    if incident_type == "SERVICE_BUS_QUEUE_BACKLOG":

        update_worker_count(3)

        result["actions"].append(
            "Updated Azure worker count from 1 to 3"
        )

    return result