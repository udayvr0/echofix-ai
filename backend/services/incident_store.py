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