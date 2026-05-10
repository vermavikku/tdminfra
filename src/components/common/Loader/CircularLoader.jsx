const CircularLoader = ({ label = 'Loading equipments' }) => {
  return (
    <div className="min-h-[320px] flex items-center justify-center px-4 py-10" role="status" aria-live="polite" aria-label={label}>
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200/80 bg-white/95 px-8 py-10 shadow-xl shadow-slate-900/5">
        <div className="h-14 w-14 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
        <p className="text-sm font-medium text-slate-700">{label}</p>
      </div>
    </div>
  )
}

export default CircularLoader
