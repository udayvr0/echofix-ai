from services.openai_service import generate_completion


def run_lessons_learned_agent(state):

    incident_type = state["incident_type"]

    prompt = f"""
    Incident Type:
    {incident_type}

    Generate:

    1. Root Cause
    2. Preventive Action
    3. Monitoring Recommendation
    4. Business Benefit

    Keep concise.
    """

    result = generate_completion(
        "You are a Site Reliability Engineering expert.",
        prompt
    )

    return {
        "summary": result
    }