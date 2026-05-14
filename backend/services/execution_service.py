from models.execution_result import ExecutionResult


def execute_recovery_plan(state):

    incident_type = state["incident_type"]

    if incident_type == "API_AUTH_FAILURE":

        return ExecutionResult(
            success=True,
            execution_status="EXECUTED",
            action_taken="API credentials refreshed and workflow restarted.",
            validation_required=True
        )

    return ExecutionResult(
        success=False,
        execution_status="FAILED",
        action_taken="No recovery action available.",
        validation_required=False
    )