import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"
import IncidentCard from "../components/IncidentCard"
import AgentTimeline from "../components/AgentTimeline"
import MetricCard from "../components/MetricCard"
import SectionContainer from "../components/SectionContainer"

import {
  getIncidents,
  triggerIncident,
  orchestrateIncident
} from "../services/api"


export default function Dashboard() {

  const [incidents, setIncidents] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)
  const [metrics, setMetrics] = useState({
    resolved: 0,
    confidence: 0,
    recoveries: 0
  })


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
    
    const confidence =
    result?.confidence_result?.confidence_score || 0
    
    const resolved =
    result?.final_status === "RESOLVED" ? 1 : 0
    
    const recoveries =
    result?.execution_result?.success ? 1 : 0
    
    setMetrics((prev) => ({
      resolved: prev.resolved + resolved,
      confidence,
      recoveries: prev.recoveries + recoveries
    }))
    
    await loadIncidents()
  }


  useEffect(() => {
    loadIncidents()
  }, [])


  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h1 className="text-5xl font-bold text-cyan-400">
              EchoFix AI
            </h1>

            <p className="text-slate-400 mt-2">
              Autonomous Self-Healing Operations Platform
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <MetricCard
            title="Active Incidents"
            value={incidents.length}
            subtitle="Currently detected"
          />

          <MetricCard
            title="Resolved Today"
            value={metrics.resolved}
            subtitle="Recovery workflows completed"
          />

          <MetricCard
            title="Recovery Confidence"
            value={`${metrics.confidence}%`}
            subtitle="Average orchestration confidence"
          />

          <MetricCard
            title="Autonomous Recoveries"
            value={metrics.recoveries}
            subtitle="AI-assisted recoveries"
          />

        </div>
        <div className="border-t border-slate-800 mt-12"></div>

        <SectionContainer
          title="Incident Command Center"
          subtitle="Monitor active operational incidents and initiate AI-assisted recovery workflows."
        >

          <div className="flex items-center justify-between mb-6">

            <div>

              <h3 className="text-xl font-semibold text-white">
                Active Incident Queue
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Real-time operational failure detection
              </p>

            </div>

            <button
              onClick={handleTriggerIncident}
              className="
        bg-cyan-500
        hover:bg-cyan-400
        transition
        text-black
        font-semibold
        px-5
        py-3
        rounded-xl
      "
            >
              Simulate Incident
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {incidents.map((incident) => (
              <IncidentCard
                key={incident.incidentId}
                incident={incident}
                onOrchestrate={handleOrchestrate}
              />
            ))}

          </div>

        </SectionContainer>


        {selectedResult && (

          <SectionContainer
            title="Recovery Orchestration Center"
            subtitle="AI agent swarm execution lifecycle and autonomous recovery coordination."
          >

            <div className="
      bg-slate-950
      border
      border-slate-800
      rounded-2xl
      p-6
      mb-6
    ">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-2xl font-bold text-cyan-400">
                    Incident Lifecycle Status
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Final orchestration execution state
                  </p>

                </div>

                <div className="
          bg-green-500/20
          text-green-400
          px-5
          py-3
          rounded-2xl
          font-bold
        ">
                  {selectedResult.final_status}
                </div>

              </div>

            </div>

            <div className="max-h-[700px] overflow-y-auto pr-2">

              <AgentTimeline result={selectedResult} />

            </div>

          </SectionContainer>

        )}

      </div>

    </MainLayout>
  )
}