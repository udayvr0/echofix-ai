import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"
import IncidentCard from "../components/IncidentCard"
import AgentTimeline from "../components/AgentTimeline"

import {
  getIncidents,
  triggerIncident,
  orchestrateIncident
} from "../services/api"


export default function Dashboard() {

  const [incidents, setIncidents] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)


  async function loadIncidents() {

    const data = await getIncidents()

    setIncidents(data)
  }


  async function handleTriggerIncident() {

    await triggerIncident()

    await loadIncidents()
  }


  async function handleOrchestrate(incidentId) {

    const result = await orchestrateIncident(incidentId)

    setSelectedResult(result)
  }


  useEffect(() => {
    loadIncidents()
  }, [])


  return (
    <MainLayout>

      <div className="p-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold text-cyan-400">
              EchoFix AI
            </h1>

            <p className="text-slate-400 mt-2">
              Autonomous Self-Healing Operations Platform
            </p>
          </div>

          <button
            onClick={handleTriggerIncident}
            className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold px-5 py-3 rounded-xl"
          >
            Simulate Incident
          </button>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {incidents.map((incident) => (
            <IncidentCard
              key={incident.incidentId}
              incident={incident}
              onOrchestrate={handleOrchestrate}
            />
          ))}

        </div>


        {selectedResult && (

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-6">

            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Recovery Orchestration Result
            </h2>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-bold text-cyan-400">
                    Incident Status
                  </h3>

                  <p className="text-slate-400 mt-1">
                    Final orchestration lifecycle status
                  </p>

                </div>

                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-semibold">
                  {selectedResult.final_status}
                </div>

              </div>

            </div>

            <AgentTimeline result={selectedResult} />

          </div>

        )}

      </div>

    </MainLayout>
  )
}