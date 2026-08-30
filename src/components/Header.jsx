import React from 'react'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Exam Records Integrity System</h1>
        <p className="text-xs text-slate-500 mt-0.5">Tamper-evident cryptographic audit trail engine</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          ● Live Blockchain Sync
        </span>
      </div>
    </header>
  )
}
