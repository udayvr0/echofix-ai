INCIDENT_TEMPLATES = [

    {
        "incident_type": "API_AUTH_FAILURE",
        "severity": "HIGH",
        "description":
            "External API returned 401 Unauthorized due to expired credential.",
        "affected_service": "Payment Gateway API"
    },

    {
        "incident_type": "DATABASE_CONNECTION_FAILURE",
        "severity": "CRITICAL",
        "description":
            "Primary database cluster became unreachable during transaction processing.",
        "affected_service": "Customer Orders Database"
    },

    {
        "incident_type": "HIGH_MEMORY_USAGE",
        "severity": "MEDIUM",
        "description":
            "Container memory usage exceeded operational threshold for 15 minutes.",
        "affected_service": "Recommendation Engine"
    },

    {
        "incident_type": "SERVICE_BUS_QUEUE_BACKLOG",
        "severity": "HIGH",
        "description":
            "Message queue backlog exceeded acceptable operational processing limits.",
        "affected_service": "Azure Service Bus Queue"
    },

    {
        "incident_type": "DEPLOYMENT_FAILURE",
        "severity": "CRITICAL",
        "description":
            "Production deployment validation failed during rollout.",
        "affected_service": "Frontend Production Cluster"
    },

    {
        "incident_type": "API_LATENCY_SPIKE",
        "severity": "MEDIUM",
        "description":
            "API response times exceeded SLA latency thresholds.",
        "affected_service": "Customer Profile API"
    },

    {
        "incident_type": "CONTAINER_CRASH",
        "severity": "HIGH",
        "description":
            "Container runtime terminated unexpectedly during workload execution.",
        "affected_service": "Kubernetes Worker Node"
    },

    {
        "incident_type": "TOKEN_EXPIRATION",
        "severity": "LOW",
        "description":
            "OAuth access token expired during downstream authentication request.",
        "affected_service": "Identity Provider"
    }
]