EXECUTION_PLAYBOOKS = {

    "SERVICE_BUS_QUEUE_BACKLOG": {
        "execution": [
            "Scaling queue consumers",
            "Reprocessing delayed messages",
            "Restoring queue throughput"
        ],
        "validation": [
            "Queue depth normalized",
            "Message latency recovered",
            "Health checks passed"
        ]
    },

    "DATABASE_CONNECTION_FAILURE": {
        "execution": [
            "Resetting connection pool",
            "Reconnecting database services",
            "Restoring transaction flow"
        ],
        "validation": [
            "Database connectivity restored",
            "Replication healthy",
            "Transaction tests passed"
        ]
    },

    "TOKEN_EXPIRATION": {
        "execution": [
            "Refreshing OAuth credentials",
            "Restarting authentication workflow",
            "Propagating updated token"
        ],
        "validation": [
            "Authentication restored",
            "Token validation passed",
            "Identity services healthy"
        ]
    },

    "API_LATENCY_SPIKE": {
        "execution": [
            "Restarting degraded API instances",
            "Clearing request backlog",
            "Optimizing routing path"
        ],
        "validation": [
            "Latency normalized",
            "Request success rate restored",
            "Health checks passed"
        ]
    },

    "CONTAINER_CRASH": {
        "execution": [
            "Restarting container workload",
            "Reallocating orchestration resources",
            "Recovering runtime services"
        ],
        "validation": [
            "Container healthy",
            "Runtime stable",
            "Monitoring restored"
        ]
    }
}