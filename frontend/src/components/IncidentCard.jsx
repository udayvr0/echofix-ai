export default function IncidentCard({
  incident,
  onOrchestrate
}) {

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            {incident.incidentType}
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            {incident.description}
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