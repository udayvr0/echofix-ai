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
    },

    "HIGH_MEMORY_USAGE": {
        "execution": [
            "Scaling container memory allocation",
            "Restarting memory-intensive workloads",
            "Optimizing runtime resource consumption"
        ],
        "validation": [
            "Memory utilization normalized",
            "Container stability restored",
            "Resource monitoring healthy"
        ]
    },

    "API_AUTH_FAILURE": {
        "execution": [
            "Refreshing API credentials",
            "Re-establishing authentication session",
            "Validating authorization flow"
        ],
        "validation": [
            "Authentication successful",
            "API access restored",
            "Security validation passed"
        ]
    },

    "DEPLOYMENT_FAILURE": {
        "execution": [
            "Rolling back failed deployment",
            "Restoring previous stable release",
            "Reinitializing application services"
        ],
        "validation": [
            "Application availability restored",
            "Deployment health checks passed",
            "Production environment stable"
        ]
    }
}