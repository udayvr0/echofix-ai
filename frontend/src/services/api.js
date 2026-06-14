const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getIncidents() {

  const response = await fetch(
    `${API_BASE_URL}/get_incidents_api`
  )

  if (!response.ok) {

    console.error(
      "Failed to fetch incidents",
      response.status
    )

    return []
  }

  return response.json()
}


export async function triggerIncident() {

  const response = await fetch(
    `${API_BASE_URL}/trigger_incident_api`
  )
  if (!response.ok)
    throw new Error("Trigger failed")

  return response.json()
}


export async function orchestrateIncident(incidentId) {

  const response = await fetch(
    `${API_BASE_URL}/orchestrate_incident_api?incidentId=${incidentId}`
  )
  if (!response.ok)
    throw new Error("Orchestration failed")

  return response.json()
}

export async function approveRecovery(incidentId) {

  const response = await fetch(
    `${API_BASE_URL}/approve_recovery_api?incidentId=${incidentId}`
  )
  if (!response.ok)
    throw new Error("Recovery failed")

  return response.json()
}