from dataclasses import dataclass

@dataclass
class ConfidenceResult:
    confidence_score: int
    operational_risk: str
    blast_radius: str
    rollback_available: bool
    recovery_complexity: str
    approval_recommendation: str