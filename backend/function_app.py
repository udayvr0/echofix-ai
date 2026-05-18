import azure.functions as func
import datetime
import json
import logging
import uuid

from simulators.api_failure_simulator.simulator import trigger_api_failure
from services.incident_store import get_all_incidents
from orchestration.langgraph_flow import graph
from services.incident_store import get_incident_by_id
from services.incident_store import update_incident_status
from services.execution_service import execute_recovery_plan
from services.validation_service import validate_recovery

app = func.FunctionApp()

@app.route(route="health_api", auth_level=func.AuthLevel.ANONYMOUS)
def health_api(req: func.HttpRequest) -> func.HttpResponse:

    return func.HttpResponse(
        json.dumps({
            "status": "healthy",
            "service": "EchoFix AI Backend"
        }),
        mimetype="application/json",
        status_code=200
    )


@app.route(route="trigger_incident_api", auth_level=func.AuthLevel.ANONYMOUS)
def trigger_incident_api(req: func.HttpRequest) -> func.HttpResponse:

    incident = trigger_api_failure()

    response = {
        "incidentId": incident.incident_id,
        "incidentType": incident.incident_type,
        "severity": incident.severity,
        "status": incident.status,
        "description": incident.description
    }

    return func.HttpResponse(
        json.dumps(response),
        mimetype="application/json",
        status_code=200
    )

@app.route(route="get_incidents_api", auth_level=func.AuthLevel.ANONYMOUS)
def get_incidents_api(req: func.HttpRequest) -> func.HttpResponse:

    incidents = get_all_incidents()

    response = []

    for incident in incidents:
        response.append({
            "incidentId": incident.incident_id,
            "incidentType": incident.incident_type,
            "severity": incident.severity,
            "status": incident.status,
            "description": incident.description,
            "affectedService": incident.affected_service
        })

    return func.HttpResponse(
        json.dumps(response),
        mimetype="application/json",
        status_code=200
    )

@app.route(route="orchestrate_incident_api", auth_level=func.AuthLevel.ANONYMOUS)
def orchestrate_incident_api(req: func.HttpRequest) -> func.HttpResponse:

    incident_id = req.params.get("incidentId")

    incident = get_incident_by_id(incident_id)

    if not incident:
        return func.HttpResponse(
            "Incident not found.",
            status_code=404
        )

    initial_state = {
        "incident_id": incident.incident_id,
        "incident_type": incident.incident_type,
        "severity": incident.severity,
        "description": incident.description,

        "monitoring_result": {},
        "rootcause_result": {},
        "recovery_result": {},
        "security_result": {},

        "approval_status": "APPROVED",
        "final_status": "PROCESSING"
    }

    result = graph.invoke(initial_state)
    update_incident_status(incident.incident_id, result["final_status"])

    return func.HttpResponse(
        json.dumps(result, default=str),
        mimetype="application/json",
        status_code=200
    )

@app.route(route="approve_recovery_api", auth_level=func.AuthLevel.ANONYMOUS)
def approve_recovery_api(req: func.HttpRequest) -> func.HttpResponse:

    incident_id = req.params.get("incidentId")

    incident = get_incident_by_id(incident_id)

    if not incident:
        return func.HttpResponse(
            "Incident not found.",
            status_code=404
        )

    execution_result = execute_recovery_plan({
        "incident_type": incident.incident_type
    })

    validation_result = validate_recovery({})

    update_incident_status(
        incident.incident_id,
        "RESOLVED"
    )

    response = {
        "execution_result": execution_result.__dict__,
        "validation_result": validation_result,
        "final_status": "RESOLVED"
    }

    return func.HttpResponse(
        json.dumps(response),
        mimetype="application/json",
        status_code=200
    )