from dataclasses import dataclass
from typing import Any

@dataclass
class AgentResult:
    agent_name: str
    success: bool
    confidence: float
    summary: str
    details: Any