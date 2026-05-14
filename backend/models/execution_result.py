from dataclasses import dataclass

@dataclass
class ExecutionResult:
    success: bool
    execution_status: str
    action_taken: str
    validation_required: bool