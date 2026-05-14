export default function SectionContainer({
  title,
  subtitle,
  children
}) {

  return (
    <div className="mt-12">

      <div className="mb-6">

        <h2 className="text-3xl font-bold text-cyan-400">
          {title}
        </h2>

        <p className="text-slate-400 mt-2">
          {subtitle}
        </p>

      </div>

      <div className="
        bg-slate-900/40
        border
        border-slate-800
        rounded-3xl
        p-6
        backdrop-blur-sm
      ">
        {children}
      </div>

    </div>
  )
}