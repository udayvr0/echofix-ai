import { useEffect, useState, useRef } from "react"

import MainLayout from "../layouts/MainLayout"
import IncidentCard from "../components/IncidentCard"
import AgentTimeline from "../components/AgentTimeline"
import MetricCard from "../components/MetricCard"
import SectionContainer from "../components/SectionContainer"
import AIDecisionPanel from "../components/AIDecisionPanel"

import {
  getIncidents,
  triggerIncident,
  orchestrateIncident,
  approveRecovery
} from "../services/api"

function EvidenceCard({ evidence }) {

  if (!evidence) return null

  return (

    <div
      className="
      bg-slate-950
      border
      border-emerald-500/30
      rounded-2xl
      p-6
      mb-6
      "
    >

      <div className="flex items-center gap-2 mb-6">

        <span className="text-2xl">
          📊
        </span>

        <h3
          className="
          text-xl
          font-bold
          text-emerald-400
          "
        >
          Recovery Evidence
        </h3>

      </div>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <div
          className="
          bg-slate-900
          border
          border-slate-700
          rounded-xl
          p-5
          "
        >

          <div className="text-slate-400 text-sm mb-2">
            Previous State
          </div>

          <div className="text-3xl font-bold text-red-400">
            {evidence.beforeWorkerCount}
          </div>

          <div className="text-slate-300 mt-1">
            Worker Count
          </div>

        </div>

        <div
          className="
          bg-slate-900
          border
          border-slate-700
          rounded-xl
          p-5
          "
        >

          <div className="text-slate-400 text-sm mb-2">
            Current State
          </div>

          <div className="text-3xl font-bold text-green-400">
            {evidence.afterWorkerCount}
          </div>

          <div className="text-slate-300 mt-1">
            Worker Count
          </div>

        </div>

      </div>

      <div
        className="
        mt-6
        flex
        items-center
        gap-3
        text-green-400
        font-medium
        "
      >

        <span>✓</span>

        <span>
          {evidence.verification}
        </span>

      </div>

    </div>

  )
}

export default function Dashboard() {

  const [incidents, setIncidents] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)
  const [executionPlaybook, setExecutionPlaybook] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [metrics, setMetrics] = useState({
    resolved: 0,
    confidence: 0,
    recoveries: 0
  })
  const [visibleAgents, setVisibleAgents] = useState(0)
  const [runningAgentIndex, setRunningAgentIndex] = useState(-1)
  const orchestrationRef = useRef(null)
  const timelineScrollRef = useRef(null)
  const incidentListRef = useRef(null)
  const evidenceRef = useRef(null)
  const evidenceResult = selectedResult?.evidence_result
  const [executionVisibleAgents, setExecutionVisibleAgents] = useState(0)
  const [executionRunningIndex, setExecutionRunningIndex] = useState(-1)
  const [executionComplete, setExecutionComplete] = useState(false)

  const [lifecycleStatus, setLifecycleStatus] = useState("")

  const [visibleExecutionSteps, setVisibleExecutionSteps] = useState(0)
  const [visibleValidationSteps, setVisibleValidationSteps] = useState(0)
  const [visibleResolutionSteps, setVisibleResolutionSteps] = useState(0)
  const [incidentTimeline, setIncidentTimeline] = useState([])


  async function loadIncidents() {

    try {

      const data = await getIncidents()

      setIncidents(data)

    } catch (error) {

      console.error(error)

    }

  }


  async function handleTriggerIncident() {

    await triggerIncident()

    await loadIncidents()

    setTimeout(() => {

      incidentListRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })

    }, 300)
  }


  async function handleOrchestrate(incidentId) {

    setVisibleAgents(0)
    setRunningAgentIndex(-1)
    setAnimationComplete(false)

    setExecutionVisibleAgents(0)
    setExecutionRunningIndex(-1)
    setExecutionComplete(false)
    setLifecycleStatus(
      ""
    )

    const result = await orchestrateIncident(incidentId)

    setSelectedResult(result)
    const now = new Date()

    setIncidentTimeline([
      {
        time: new Date().toLocaleTimeString(),
        event: "Incident Generated"
      }
    ])
    setLifecycleStatus(
      result.final_status
    )
    setExecutionPlaybook(
      result.execution_playbook || null
    )
    setVisibleExecutionSteps(0)
    setVisibleValidationSteps(0)
    setVisibleResolutionSteps(0)
    console.log(
      "PLAYBOOK",
      result.execution_playbook
    )

    setTimeout(() => {

      orchestrationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })

    }, 300)

    for (let i = 0; i < 5; i++) {

      setTimeout(() => {

        setVisibleAgents(i + 1)
        setRunningAgentIndex(i)
        const events = [
          "Monitoring Analysis Completed",
          "Root Cause Identified",
          "Recovery Plan Generated",
          "Security Validation Passed",
          "Approval Requested"
        ]

        setIncidentTimeline(prev => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            event: events[i]
          }
        ])
        setTimeout(() => {

          if (timelineScrollRef.current) {

            timelineScrollRef.current.scrollTo({
              top: timelineScrollRef.current.scrollHeight,
              behavior: "smooth"
            })
          }
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
          })

        }, 150)

      }, (i + 1) * 1200)

    }

    setTimeout(() => {

      setRunningAgentIndex(-1)
      setAnimationComplete(true)

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

    }, 7800)


    await loadIncidents()
  }

  async function handleApproveRecovery(incidentId) {

    setExecutionVisibleAgents(1)
    setExecutionRunningIndex(0)
    setExecutionComplete(false)

    setVisibleExecutionSteps(0)
    setVisibleValidationSteps(0)
    setVisibleResolutionSteps(0)

    setLifecycleStatus("EXECUTING_RECOVERY")

    setIncidentTimeline(prev => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        event: "Approval Granted"
      }
    ])

    setTimeout(() => {

      orchestrationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })

    }, 300)

    const executionCount =
      executionPlaybook?.execution?.length || 0

    const validationCount =
      executionPlaybook?.validation?.length || 0

    // EXECUTION STEPS

    for (let i = 1; i <= executionCount; i++) {

      setTimeout(() => {

        setVisibleExecutionSteps(i)

      }, i * 1300)

    }

    // SHOW VALIDATION AGENT

    setTimeout(() => {

      setExecutionVisibleAgents(2)
      setExecutionRunningIndex(1)

      setIncidentTimeline(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          event: "Recovery Validation Started"
        }
      ])

      setLifecycleStatus(
        "VALIDATING_RECOVERY"
      )

    }, executionCount * 1300)

    // VALIDATION STEPS

    for (let i = 1; i <= validationCount; i++) {

      setTimeout(() => {

        setVisibleValidationSteps(i)

      }, (executionCount * 1300) + (i * 1300))

    }

    // SHOW RESOLUTION AGENT

    setTimeout(() => {

      setExecutionVisibleAgents(3)
      setExecutionRunningIndex(2)

      setIncidentTimeline(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          event: "Resolution Finalization Started"
        }
      ])

    }, (executionCount + validationCount) * 1300)

    // RESOLUTION STEPS

    setTimeout(() => {

      setVisibleResolutionSteps(3)

    }, (executionCount + validationCount + 1) * 1300)

    // COMPLETE

    setTimeout(async () => {

      setExecutionVisibleAgents(4)
      setExecutionRunningIndex(3)

      setIncidentTimeline(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          event: "Evidence Verification Started"
        }
      ])

      await new Promise(
        resolve => setTimeout(resolve, 1500)
      )
      setExecutionRunningIndex(-1)

      setExecutionComplete(true)
      setLifecycleStatus("RESOLVED")

      setTimeout(() => {

        evidenceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })

      }, 500)

      setIncidentTimeline(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          event: "Azure Remediation Executed"
        },
        {
          time: new Date().toLocaleTimeString(),
          event: "Evidence Verification Completed"
        },
        {
          time: new Date().toLocaleTimeString(),
          event: "Incident Resolved"
        }
      ])

      const result =
        await approveRecovery(incidentId)
      console.log("APPROVE RESULT")
      console.log(result)

      setSelectedResult((prev) => ({
        ...prev,
        ...result
      }))

      await loadIncidents()

    }, (executionCount + validationCount + 3) * 1300)

  }

  useEffect(() => {

    setTimeout(() => {

      if (timelineScrollRef.current) {

        timelineScrollRef.current.scrollTo({
          top: timelineScrollRef.current.scrollHeight,
          behavior: "smooth"
        })

      }

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      })

    }, 100)

  }, [
    visibleExecutionSteps,
    visibleValidationSteps,
    visibleResolutionSteps
  ])

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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

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

          <div ref={incidentListRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {incidents.map((incident) => (
              <IncidentCard
                key={incident.incidentId}
                incident={incident}
                onOrchestrate={handleOrchestrate}
                onApprove={handleApproveRecovery}
              />
            ))}

          </div>

        </SectionContainer>

        {selectedResult && (

          <SectionContainer
            title="AI Decision Intelligence Center"
            subtitle="Explainable AI reasoning, operational analysis, and recovery strategy generation."
          >

            <AIDecisionPanel
              result={selectedResult}
              animationComplete={animationComplete}
            />

          </SectionContainer>

        )}


        {selectedResult && (

          <div ref={orchestrationRef}>

            <SectionContainer
              title="Recovery Orchestration Center"
              subtitle="AI agent swarm execution lifecycle and autonomous recovery coordination."
            >

              <div className={`
                transition-all
                duration-500
                ${animationComplete
                  ? "opacity-100 max-h-[300px]"
                  : "opacity-0 max-h-0 overflow-hidden"
                }
              `}
              >

                <div className="
                  bg-slate-950
                  border
                  border-slate-800
                  rounded-2xl
                  p-6
                  mb-6
                  "
                >

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
                      "
                    >
                      {lifecycleStatus}
                    </div>

                  </div>

                </div>
              </div>

              <div
                ref={timelineScrollRef}
                className="max-h-[700px] overflow-y-scroll pr-2"
              >

                <div className="
                  bg-slate-950
                  border
                  border-slate-800
                  rounded-2xl
                  p-6
                  mb-6
                  ">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">
                    Incident Timeline
                  </h3>

                  <div className="space-y-3">

                    {incidentTimeline.map((item, index) => (

                      <div
                        key={index}
                        className="
                        flex
                        items-center
                        gap-4
                        text-sm
                        "
                      >
                        <div className="text-cyan-400 font-mono">
                          {item.time}
                        </div>

                        <div className="text-green-400">
                          ✓
                        </div>

                        <div className="text-slate-300">
                          {item.event}
                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {
                  executionComplete &&
                  selectedResult?.evidence_result && (

                    <div ref={evidenceRef}>

                      <EvidenceCard
                        evidence={evidenceResult}
                      />

                    </div>

                  )
                }

                <AgentTimeline
                  result={selectedResult}
                  visibleAgents={visibleAgents}
                  animationComplete={animationComplete}
                  runningAgentIndex={runningAgentIndex}
                  executionVisibleAgents={executionVisibleAgents}
                  executionRunningIndex={executionRunningIndex}
                  executionComplete={executionComplete}
                  executionPlaybook={executionPlaybook}
                  visibleExecutionSteps={visibleExecutionSteps}
                  visibleValidationSteps={visibleValidationSteps}
                  visibleResolutionSteps={visibleResolutionSteps}
                  evidenceResult={selectedResult?.evidence_result}
                  lessonsResult={selectedResult?.lessons_result}
                />

              </div>

            </SectionContainer>
          </div>
        )
        }

      </div>

    </MainLayout>
  )
}