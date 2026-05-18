export default function IncidentCard({
    incident,
    onOrchestrate,
    onApprove
}) {

    return (

        <div className={`
            border
            rounded-2xl
            p-5
            transition-all
            duration-300
            hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]

            ${incident.status === "RESOLVED"

                ? "border-green-500/30 bg-green-500/5"

                : incident.status === "WAITING_FOR_APPROVAL"

                    ? "border-yellow-500/30 bg-yellow-500/5"

                    : incident.status === "MANUAL_INTERVENTION_REQUIRED"

                        ? "border-red-500/30 bg-red-500/5"

                        : "border-slate-800 bg-slate-950"
            }
        `}>

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-semibold text-white">
                        {incident.incidentType}
                    </h2>

                    <p className="text-slate-400 text-sm mt-1">
                        {incident.description}
                    </p>

                    <p className="text-slate-500 text-xs mt-2">
                        Affected Service: {incident.affectedService}
                    </p>

                    <p className="text-slate-500 text-xs mt-3">
                        Detected a few seconds ago
                    </p>

                </div>

                <div className="flex flex-col items-end gap-2">

                    <div className={`
                        px-3
                        py-1
                        rounded-lg
                        text-sm
                        font-semibold

                        ${incident.severity === "CRITICAL"

                            ? "bg-red-600/20 text-red-500"

                            : incident.severity === "HIGH"

                                ? "bg-orange-500/20 text-orange-400"

                                : incident.severity === "MEDIUM"

                                    ? "bg-yellow-500/20 text-yellow-400"

                                    : "bg-cyan-500/20 text-cyan-400"
                        }
                    `}>
                        {incident.severity}
                    </div>

                    <div className={`
                        px-3
                        py-1
                        rounded-lg
                        text-xs
                        font-semibold

                        ${incident.status === "RESOLVED"

                            ? "bg-green-500/20 text-green-400"

                            : incident.status === "WAITING_FOR_APPROVAL"

                                ? "bg-yellow-500/20 text-yellow-400"

                                : incident.status === "MANUAL_INTERVENTION_REQUIRED"

                                    ? "bg-red-500/20 text-red-400"

                                    : "bg-cyan-500/20 text-cyan-400"
                        }
                    `}>

                        {incident.status}

                    </div>

                </div>

            </div>

            <div className="mt-5">

                {incident.status === "RESOLVED" ? (

                    <div className="
                        bg-green-500/20
                        text-green-400
                        px-4
                        py-2
                        rounded-xl
                        inline-flex
                        items-center
                        font-semibold
                    ">
                        Recovery Completed
                    </div>

                ) : incident.status === "WAITING_FOR_APPROVAL" ? (

                    <button
                        onClick={() => onApprove(incident.incidentId)}
                        className="
                            bg-yellow-500
                            hover:bg-yellow-400
                            transition
                            px-4
                            py-2
                            rounded-xl
                            text-black
                            font-semibold
                        "
                    >
                        Approve Recovery
                    </button>

                ) : incident.status === "MANUAL_INTERVENTION_REQUIRED" ? (

                    <div className="
                        bg-red-500/20
                        text-red-400
                        px-4
                        py-2
                        rounded-xl
                        inline-flex
                        items-center
                        font-semibold
                    ">
                        Manual Intervention Required
                    </div>

                ) : (

                    <button
                        onClick={() => onOrchestrate(incident.incidentId)}
                        className="
                            bg-cyan-500
                            hover:bg-cyan-400
                            transition
                            px-4
                            py-2
                            rounded-xl
                            text-black
                            font-semibold
                        "
                    >
                        Start Recovery
                    </button>

                )}

            </div>

        </div>

    )
}