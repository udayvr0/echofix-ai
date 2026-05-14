const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getIncidents() {

  const response = await fetch(
    `${API_BASE_URL}/get_incidents_api`
  )

  return response.json()
}


export async function triggerIncident() {

  const response = await fetch(
    `${API_BASE_URL}/trigger_incident_api`
  )

  return response.json()
}


export async function orchestrateIncident(incidentId) {

  const response = await fetch(
    `${API_BASE_URL}/orchestrate_incident_api?incidentId=${incidentId}`
  )

  return response.json()
}