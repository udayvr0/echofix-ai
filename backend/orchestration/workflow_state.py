from typing import TypedDict, List

class WorkflowState(TypedDict):
    incident_id: str
    incident_type: str
    severity: str
    description: str

    monitoring_result: dict
    rootcause_result: dict
    recovery_result: dict
    security_result: dict
    confidence_result: dict

    execution_result: dict
    validation_result: dict
    
    approval_status: str

    final_status: str