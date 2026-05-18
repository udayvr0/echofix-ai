
import { useEffect, useRef } from "react"

export default function AgentTimeline({
    result,
    visibleAgents,
    animationComplete,
    runningAgentIndex
}) {
    const timelineRef = useRef(null)

    useEffect(() => {

        if (timelineRef.current) {

            timelineRef.current.scrollTop =
                timelineRef.current.scrollHeight

        }

    }, [visibleAgents])

    if (!result) return null

    const agents = [
        {
            title: "Monitoring Agent",
            description: result?.monitoring_result?.summary
        },
        {
            title: "Root Cause Agent",
            description: result?.rootcause_result?.summary
        },
        {
            title: "Recovery Planner",
            description: result?.recovery_result?.summary
        },
        {
            title: "Security Validator",
            description: result?.security_result?.summary
        },
        {
            title: "Confidence Evaluator",
            description:
                result?.confidence_result?.approval_recommendation === "SAFE_TO_EXECUTE"
                    ? "Approved for Autonomous Recovery"
                    : "Requires Human Escalation"
        }
    ]

    return (

        <div
            ref={timelineRef}
            className="space-y-4"
        >

            {agents.slice(0, visibleAgents).map((agent, index) => (

                <div
                    key={index}
                    className="
                        bg-slate-950
                        border
                        border-slate-800
                        rounded-2xl
                        p-5
                        animate-fadeIn
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-cyan-400 font-bold text-lg">
                                {agent.title}
                            </h3>

                            <p className="text-slate-300 mt-3">
                                {agent.description}
                            </p>

                        </div>

                        <div className="flex items-center gap-3">

                            <div className={`
                                w-3
                                h-3
                                rounded-full
                                animate-pulse

                                ${index === runningAgentIndex
                                    ? "bg-yellow-400"
                                    : "bg-green-400"
                                }
                            `}></div>

                            <div className={`
                                text-sm
                                font-semibold

                                ${index === runningAgentIndex
                                    ? "text-yellow-400"
                                    : "text-green-400"
                                }
                            `}>

                                {index === runningAgentIndex
                                    ? "RUNNING"
                                    : "COMPLETED"
                                }

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    )
}