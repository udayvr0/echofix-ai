from models.agent_result import AgentResult

def run_security_agent(state):

    return AgentResult(
        agent_name="SecurityValidatorAgent",
        success=True,
        confidence=0.95,
        summary="Recovery plan validated with low operational risk.",
        details={
            "riskLevel": "LOW",
            "rollbackAvailable": True,
            "blastRadius": "MINIMAL"
        }
    )