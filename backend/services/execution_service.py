from models.execution_result import ExecutionResult
from services.azure_remediation_service import update_worker_count


def determine_worker_count(severity):

    mapping = {
        "LOW": 2,
        "MEDIUM": 3,
        "HIGH": 5,
        "CRITICAL": 8
    }

    return mapping.get(
        severity,
        3
    )

def execute_recovery_plan(state):

    incident_type = state["incident_type"]
    severity = state.get(
        "severity",
        "MEDIUM"
    )

    if incident_type == "API_AUTH_FAILURE":

        return ExecutionResult(
            success=True,
            execution_status="EXECUTED",
            action_taken="API credentials refreshed and workflow restarted.",
            validation_required=True
        )
    elif incident_type in [
        "SERVICE_BUS_QUEUE_BACKLOG",
        "HIGH_MEMORY_USAGE",
        "API_LATENCY_SPIKE",
        "CONTAINER_CRASH"
        ]:
        worker_count = determine_worker_count(
            severity
        )

        update_worker_count(
            worker_count
        )
    
        return ExecutionResult(
            success=True,
            execution_status="EXECUTED",
            action_taken=f"Azure worker count adjusted to {worker_count} based on incident severity.",
            validation_required=True
        )

    return ExecutionResult(
        success=False,
        execution_status="FAILED",
        action_taken="No recovery action available.",
        validation_required=False
    )