from models.agent_result import AgentResult


def run_recovery_agent(state):

    incident_type = state["incident_type"]

    recovery_map = {

        "API_AUTH_FAILURE": [
            "Refresh expired API credentials",
            "Restart authentication workflow",
            "Validate downstream API connectivity"
        ],

        "DATABASE_CONNECTION_FAILURE": [
            "Reconnect primary database cluster",
            "Restart failed transaction services",
            "Validate database replication health"
        ],

        "HIGH_MEMORY_USAGE": [
            "Restart affected container workload",
            "Clear excessive memory allocation",
            "Scale application replicas horizontally"
        ],

        "SERVICE_BUS_QUEUE_BACKLOG": [
            "Scale queue consumers",
            "Reprocess delayed messages",
            "Validate queue throughput stabilization"
        ],

        "DEPLOYMENT_FAILURE": [
            "Rollback failed deployment",
            "Restore previous production release",
            "Validate deployment pipeline integrity"
        ],

        "API_LATENCY_SPIKE": [
            "Restart degraded API instances",
            "Clear overloaded request queues",
            "Validate latency recovery metrics"
        ],

        "CONTAINER_CRASH": [
            "Restart failed container runtime",
            "Reallocate orchestration resources",
            "Validate Kubernetes node stability"
        ],

        "TOKEN_EXPIRATION": [
            "Refresh OAuth access token",
            "Reinitialize identity session",
            "Validate authentication recovery"
        ]
    }

    recovery_steps = recovery_map.get(
        incident_type,
        [
            "Perform operational diagnostics",
            "Restart affected systems",
            "Validate platform health"
        ]
    )

    summary = (
        f"Generated AI-assisted recovery strategy. "
        f"{incident_type.replace('_', ' ')}."
    )

    return AgentResult(
        agent_name="RecoveryPlannerAgent",
        success=True,
        confidence=0.89,
        summary=summary,
        details={
            "recoverySteps": recovery_steps
        }
    )