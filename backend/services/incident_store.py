incidents = []

def add_incident(incident):
    incidents.append(incident)

def get_all_incidents():
    return incidents

def get_incident_by_id(incident_id):
    for incident in incidents:
        if incident.incident_id == incident_id:
            return incident
    return None

def update_incident_status(incident_id, status):

    incident = get_incident_by_id(incident_id)

    if incident:
        incident.status = status

    return incident