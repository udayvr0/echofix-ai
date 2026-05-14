export default function IncidentCard({
    incident,
    onOrchestrate
}) {

    return (
        <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-5
            hover:border-cyan-500
            hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]
            transition-all
            duration-300
            ">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {incident.incidentType}
                    </h2>

                    <p className="text-slate-400 text-sm mt-1">
                        {incident.description}
                    </p>
                    <p className="text-slate-500 text-xs mt-3">
                        Detected 12 seconds ago
                    </p>
                </div>

                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm">
                    {incident.severity}
                </div>

            </div>

            <div className="mt-4">
                <button
                    onClick={() => onOrchestrate(incident.incidentId)}
                    className="bg-cyan-500 hover:bg-cyan-400 transition px-4 py-2 rounded-lg text-black font-semibold"
                >
                    Start Recovery
                </button>
            </div>

        </div>
    )
}