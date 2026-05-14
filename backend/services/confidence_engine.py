from models.confidence_result import ConfidenceResult


def evaluate_recovery_confidence(state):

    incident_type = state["incident_type"]

    if incident_type == "API_AUTH_FAILURE":

        return ConfidenceResult(
            confidence_score=92,
            operational_risk="LOW",
            blast_radius="MINIMAL",
            rollback_available=True,
            recovery_complexity="LOW",
            approval_recommendation="SAFE_TO_EXECUTE"
        )

    return ConfidenceResult(
        confidence_score=60,
        operational_risk="MEDIUM",
        blast_radius="MODERATE",
        rollback_available=False,
        recovery_complexity="MEDIUM",
        approval_recommendation="MANUAL_REVIEW_REQUIRED"
    )