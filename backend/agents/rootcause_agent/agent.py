from models.agent_result import AgentResult
from services.openai_service import generate_completion


def run_rootcause_agent(state):

    incident_type = state["incident_type"]

    incident_description = state["description"]

    analysis_map = {

        "API_AUTH_FAILURE":
            "Expired API credentials detected in external integration configuration.",

        "DATABASE_CONNECTION_FAILURE":
            "Primary database connectivity failure detected across transaction nodes.",

        "HIGH_MEMORY_USAGE":
            "Memory leak pattern detected in containerized workload execution.",

        "SERVICE_BUS_QUEUE_BACKLOG":
            "Queue consumer throughput insufficient for incoming workload volume.",

        "DEPLOYMENT_FAILURE":
            "Deployment validation checks failed during production rollout.",

        "API_LATENCY_SPIKE":
            "Abnormal API latency caused by downstream dependency degradation.",

        "CONTAINER_CRASH":
            "Container runtime terminated unexpectedly due to orchestration instability.",

        "TOKEN_EXPIRATION":
            "OAuth token lifecycle exceeded configured expiration threshold."
    }

    fallback_analysis = analysis_map.get(
        incident_type,
        "Unknown operational failure detected."
    )

    system_prompt = """
                    You are an enterprise AI operations engineer specializing in production incident analysis.
                    """
    
    user_prompt = f"""
                    Analyze this enterprise operational incident.

                    Incident Type:
                    {state["incident_type"]}

                    Description:
                    {incident_description}

                    Respond STRICTLY in this format:

                    ROOT CAUSE:
                    <1 concise operational explanation, maximum 2 sentences>

                    OPERATIONAL IMPACT:
                    - bullet 1
                    - bullet 2
                    - bullet 3

                    RECOMMENDED REMEDIATION:
                    - bullet 1
                    - bullet 2
                    - bullet 3

                    IMPORTANT:
                    - Keep total response under 120 words
                    - Be concise and operational
                    - No long paragraphs
                    - No markdown formatting
                    - Focus on enterprise incident response language
                    """

    ai_response = generate_completion(
        system_prompt,
        user_prompt
    )

    final_analysis = (
        ai_response.strip()
        if ai_response and len(ai_response.strip()) > 0
        else fallback_analysis
    )

    return AgentResult(
        agent_name="RootCauseAgent",
        success=True,
        confidence=0.91,
        summary=final_analysis,
        details={
            "analysis": final_analysis
        }
    )