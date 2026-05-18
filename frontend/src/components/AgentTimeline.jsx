export default function AgentTimeline({
    result,
    visibleAgents,
    animationComplete,
    runningAgentIndex,
    executionVisibleAgents,
    executionRunningIndex,
    executionComplete
}) {

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

    const executionAgents = [
        {
            title: "Execution Agent",
            description:
                "Executing approved recovery workflow against affected operational systems."
        },
        {
            title: "Validation Agent",
            description:
                "Validating post-recovery system health and operational stability."
        },
        {
            title: "Resolution Agent",
            description:
                "Finalizing incident lifecycle and updating operational state."
        }
    ]

    const isFailureFlow =
        result?.final_status === "MANUAL_INTERVENTION_REQUIRED"

    return (

        <div className="space-y-6">

            {/* ANALYSIS PHASE */}

            <div>

                <div className="mb-5">

                    <h2 className="text-2xl font-bold text-cyan-400">
                        AI Analysis Phase
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Multi-agent orchestration for incident diagnosis,
                        recovery planning, risk analysis, and governance validation.
                    </p>

                </div>

                <div className="space-y-4">

                    {agents
                        .slice(0, visibleAgents)
                        .map((agent, index) => (

                            <div
                                key={index}
                                className="
                                    bg-slate-950
                                    border
                                    border-slate-800
                                    rounded-2xl
                                    p-4
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
                                                : "bg-emerald-400/20"
                                            }
                                        `}></div>

                                        <div className={`
                                            text-sm
                                            font-semibold

                                            ${index === runningAgentIndex
                                                ? "text-yellow-400"
                                                : "text-emerald-300 border border-emerald-400/20"
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

            </div>
            <div className="border-t border-white/10 pt-8"></div>


            {/* EXECUTION PHASE */}

            {executionVisibleAgents > 0 && (

                <div className="animate-fadeIn">

                    <div className="mb-5">

                        <h2 className={`
                                text-2xl
                                font-bold
                                ${isFailureFlow
                                ? "text-red-400"
                                : "text-green-400"
                            }
                            `}>
                            {isFailureFlow
                                ? "Recovery Failure Orchestration"
                                : "Recovery Execution Phase"
                            }
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Approved recovery workflow execution,
                            operational validation, and resolution finalization.
                        </p>

                    </div>

                    <div className="space-y-4">

                        {executionAgents
                            .slice(0, executionVisibleAgents)
                            .map((agent, index) => (

                                <div
                                    key={index}
                                    className={`
                                        bg-slate-950
                                        border
                                        ${isFailureFlow
                                            ? "border-red-500/20"
                                            : "border-green-500/20"
                                        }
                                        rounded-2xl
                                        p-4
                                        animate-fadeIn
                                        `}
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h3 className="text-green-400 font-bold text-lg">
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

                                                ${index === executionRunningIndex
                                                    ? "bg-yellow-400"

                                                    : isFailureFlow && index === 0
                                                        ? "bg-red-400"

                                                        : isFailureFlow && index === 1
                                                            ? "bg-orange-400"

                                                            : isFailureFlow && index === 2
                                                                ? "bg-purple-400"

                                                                : "bg-green-400"
                                                }
                                            `}></div>

                                            <div className={`
                                                    text-xs
                                                    font-semibold
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    border

                                                    ${index === executionRunningIndex

                                                    ? "bg-amber-400/10 text-amber-300 border-amber-400/20"

                                                    : isFailureFlow && index === 0

                                                        ? "bg-rose-400/10 text-rose-300 border-rose-400/20"

                                                        : isFailureFlow && index === 1

                                                            ? "bg-orange-400/10 text-orange-300 border-orange-400/20"

                                                            : isFailureFlow && index === 2

                                                                ? "bg-purple-400/10 text-purple-300 border-purple-400/20"

                                                                : "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
                                                    }
                                                `}>

                                                {index === executionRunningIndex

                                                    ? "RUNNING"

                                                    : isFailureFlow && index === 0
                                                        ? "FAILED"

                                                        : isFailureFlow && index === 1
                                                            ? "ROLLED BACK"

                                                            : isFailureFlow && index === 2
                                                                ? "ESCALATED"

                                                                : "COMPLETED"
                                                }

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                    </div>

                </div>

            )}

        </div>

    )
}