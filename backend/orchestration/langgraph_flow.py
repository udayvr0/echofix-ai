from langgraph.graph import StateGraph, END

from orchestration.workflow_state import WorkflowState

from agents.monitoring_agent.agent import run_monitoring_agent
from agents.rootcause_agent.agent import run_rootcause_agent
from agents.recovery_agent.agent import run_recovery_agent
from agents.security_agent.agent import run_security_agent
from services.confidence_engine import evaluate_recovery_confidence
from services.execution_service import execute_recovery_plan
from services.validation_service import validate_recovery


def monitoring_node(state):

    result = run_monitoring_agent(state)

    state["monitoring_result"] = result.__dict__

    return state


def rootcause_node(state):

    result = run_rootcause_agent(state)

    state["rootcause_result"] = result.__dict__

    return state


def recovery_node(state):

    result = run_recovery_agent(state)

    state["recovery_result"] = result.__dict__

    return state


def security_node(state):

    result = run_security_agent(state)

    state["security_result"] = result.__dict__

    return state

def confidence_node(state):

    result = evaluate_recovery_confidence(state)

    state["confidence_result"] = result.__dict__
    state["final_status"] = "WAITING_FOR_APPROVAL"

    return state

def execution_node(state):

    approval_status = state.get("approval_status")

    if approval_status != "APPROVED":

        state["execution_result"] = {
            "status": "WAITING_FOR_APPROVAL"
        }

        return state

    result = execute_recovery_plan(state)

    state["execution_result"] = result.__dict__

    return state

def validation_node(state):

    validation = validate_recovery(state)

    state["validation_result"] = validation

    state["final_status"] = "RESOLVED"

    return state


workflow = StateGraph(WorkflowState)

workflow.add_node("monitoring", monitoring_node)
workflow.add_node("rootcause", rootcause_node)
workflow.add_node("recovery", recovery_node)
workflow.add_node("security", security_node)
workflow.add_node("confidence", confidence_node)
workflow.add_node("execution", execution_node)
workflow.add_node("validation", validation_node)

workflow.set_entry_point("monitoring")

workflow.add_edge("monitoring", "rootcause")
workflow.add_edge("rootcause", "recovery")
workflow.add_edge("recovery", "security")
workflow.add_edge("security", "confidence")
workflow.add_edge("confidence", END)

graph = workflow.compile()