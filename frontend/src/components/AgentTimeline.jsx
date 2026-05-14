const timelineSteps = [
    {
        key: "monitoring_result",
        title: "Monitoring Agent"
    },
    {
        key: "rootcause_result",
        title: "Root Cause Agent"
    },
    {
        key: "recovery_result",
        title: "Recovery Planner"
    },
    {
        key: "security_result",
        title: "Security Validator"
    },
    {
        key: "confidence_result",
        title: "Confidence Engine"
    },
    {
        key: "execution_result",
        title: "Recovery Execution"
    },
    {
        key: "validation_result",
        title: "Validation"
    }
]


export default function AgentTimeline({ result }) {

    return (
        <div className="space-y-4">

            {timelineSteps.map((step) => {

                const data = result[step.key]

                if (!data) return null

                return (

                    <div
                        key={step.key}
                        className="
                        bg-slate-950
                        border
                        border-slate-800
                        rounded-2xl
                        p-5
                        hover:border-cyan-500/40
                        transition-all
                        duration-300
                        "
                    >

                        <div className="flex items-center justify-between">

                            <h3 className="text-lg font-semibold text-cyan-400">
                                {step.title}
                            </h3>

                            <div className="flex items-center gap-2">

                                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                                <div className="text-green-400 text-sm font-medium">
                                    COMPLETED
                                </div>

                            </div>

                        </div>

                        <div className="mt-3 text-slate-300 text-sm">

                            {data.summary && (
                                <p>{data.summary}</p>
                            )}

                            {data.approval_recommendation && (
                                <p>
                                    Recommendation:
                                    {" "}
                                    {data.approval_recommendation}
                                </p>
                            )}
                            {data.confidence_score && (
                                <p>
                                    Confidence Score:
                                    {" "}
                                    {data.confidence_score}%
                                </p>
                            )}

                            {data.operational_risk && (
                                <p>
                                    Operational Risk:
                                    {" "}
                                    {data.operational_risk}
                                </p>
                            )}

                            {data.execution_status && (
                                <p>
                                    Execution Status:
                                    {" "}
                                    {data.execution_status}
                                </p>
                            )}

                            {data.validationStatus && (
                                <p>
                                    Validation:
                                    {" "}
                                    {data.validationStatus}
                                </p>
                            )}

                        </div>

                    </div>
                )
            })}

        </div>
    )
}