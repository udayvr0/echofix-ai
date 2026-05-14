from models.agent_result import AgentResult

def run_monitoring_agent(state):

    return AgentResult(
        agent_name="MonitoringAgent",
        success=True,
        confidence=0.98,
        summary="Incident detected and classified successfully.",
        details={
            "severity": state["severity"],
            "incidentType": state["incident_type"]
        }
    )