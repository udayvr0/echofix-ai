export default function MetricCard({
  title,
  value,
  subtitle
}) {

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[160px]">

      <div className="text-slate-400 text-sm">
        {title}
      </div>

      <div className="text-3xl font-bold text-cyan-400 mt-2">
        {value}
      </div>

      <div className="text-slate-500 text-sm mt-2">
        {subtitle}
      </div>

    </div>
  )
}