from models.agent_result import AgentResult

from services.openai_service import generate_completion


def run_rootcause_agent(state):

    incident_description = state["description"]

    system_prompt = """
You are an enterprise AI operations engineer specializing in production incident analysis.
"""

    user_prompt = f"""
Analyze this operational incident:

Incident Type:
{state["incident_type"]}

Description:
{incident_description}

Determine:
- probable root cause
- operational impact
- recommended remediation
"""

    ai_response = generate_completion(
        system_prompt,
        user_prompt
    )

    return AgentResult(
        agent_name="RootCauseAgent",
        success=True,
        confidence=0.91,
        summary=ai_response,
        details={
            "analysis": ai_response
        }
    )