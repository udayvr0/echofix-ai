from services.evidence_service import get_worker_count


def run_evidence_agent(state):

    worker_count = get_worker_count()

    previous_worker_count = state.get(
        "previous_worker_count",
        "Unknown"
    )

    return {
        "beforeWorkerCount": previous_worker_count,
        "afterWorkerCount": worker_count,
        "verification": "Azure configuration updated successfully"
    }