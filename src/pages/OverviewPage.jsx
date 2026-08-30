import React from 'react'
import { useAuditStore } from '../context/AuditStore'

export default function OverviewPage() {
  const { overview, records, setActiveTab } = useAuditStore()
  const isBroken = overview?.chainStatus === 'broken'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clickable Total Records Card */}
        <div 
          onClick={() => setActiveTab('records')}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex justify-between items-center text-slate-500 font-medium text-sm">
            <span>TOTAL RECORDS</span>
            <span className="text-blue-600 group-hover:translate-x-1 transition-transform">View All →</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900 mt-4">
            {records?.length || overview?.totalRecords || 20}
          </div>
          <p className="text-xs text-slate-400 mt-2">Click to inspect individual student grade records</p>
        </div>

        {/* Chain Status Card */}
        <div 
          onClick={() => setActiveTab('chain')}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="flex justify-between items-center text-slate-500 font-medium text-sm">
            <span>CHAIN STATUS</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">SHA-256 Ledger</span>
          </div>
          <div className={`text-3xl font-extrabold mt-4 uppercase ${isBroken ? 'text-red-600' : 'text-emerald-600'}`}>
            {isBroken ? 'BROKEN' : 'VERIFIED'}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {isBroken ? 'Tampering detected in chain validation' : 'All cryptographic block hashes match'}
          </p>
        </div>
      </div>
    </div>
  )
}
