from models.agent_result import AgentResult

def run_recovery_agent(state):

    return AgentResult(
        agent_name="RecoveryPlannerAgent",
        success=True,
        confidence=0.89,
        summary="Recommended credential refresh and workflow restart.",
        details={
            "recoverySteps": [
                "Refresh API secret",
                "Restart failed workflow",
                "Validate API health"
            ]
        }
    )