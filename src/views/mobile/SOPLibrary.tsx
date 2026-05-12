import { type FC, useState } from 'react'
import { Search, ArrowLeft, ChevronRight, AlertCircle, Clock, BookOpen, BedDouble, Wrench, Waves, Users, Shield, ShieldAlert, type LucideIcon } from 'lucide-react'
import { sopCategories, recentSOPs, emergencySOPs } from '../../data/mockData'
import clsx from 'clsx'

const sopIconMap: Record<string, LucideIcon> = {
  BedDouble,
  Wrench,
  Waves,
  Users,
  Shield,
  ShieldAlert,
}

const sopSteps = [
  'Arrive at villa 2 hours before guest check-in time',
  'Conduct full villa walkthrough with supervisor checklist',
  'Verify all linen and amenities are at standard stock levels',
  'Ensure pool is clean, pH balanced, and temperature correct',
  'Set air conditioning to 23°C in all rooms',
  'Place welcome fruit bowl and welcome note on dining table',
  'Confirm all electronics and remotes are functional',
  'Upload photo evidence to BAV OS inventory system',
  'Report any issues to supervisor before guest arrival',
  'Brief incoming shift on any special guest requests',
]

const SOPLibrary: FC = () => {
  const [query, setQuery] = useState('')
  const [viewingSOP, setViewingSOP] = useState<string | null>(null)

  if (viewingSOP) {
    return (
      <div className="min-h-screen bg-sand-50 pb-24">
        <div className="bg-navy-900 px-4 pt-12 pb-5 bg-batik">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewingSOP(null)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div className="flex-1">
              <div className="text-xs text-navy-300">SOP · Housekeeping</div>
              <h2 className="font-display text-lg font-semibold text-white">Pre-Arrival Checklist</h2>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4 p-3 bg-teal-50 border border-teal-200 rounded-xl">
            <Clock className="w-4 h-4 text-teal-600" />
            <span className="text-xs text-teal-700 font-medium">Estimated time: 45–60 minutes</span>
          </div>

          <div className="space-y-3">
            {sopSteps.map((step, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-2xl p-4 border border-sand-300 shadow-card">
                <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-navy-700">{i + 1}</span>
                </div>
                <p className="text-sm text-navy-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50 pb-24">
      {/* Header */}
      <div className="bg-navy-900 px-4 pt-12 pb-5 bg-batik">
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h2 className="font-display text-lg font-semibold text-white flex-1">SOP Library</h2>
          <span className="text-xs text-navy-300">84 SOPs</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Search procedures…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-navy-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Emergency SOPs */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-terra-500" />
          <h3 className="font-semibold text-sm text-terra-700">Emergency SOPs</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {emergencySOPs.map((sop) => (
            <button
              key={sop.id}
              onClick={() => setViewingSOP(sop.id)}
              className="bg-terra-50 border border-terra-200 rounded-2xl p-3.5 text-left hover:bg-terra-100 transition-colors active:scale-98"
            >
              <div className="text-sm font-semibold text-terra-800 leading-tight mb-1">{sop.title}</div>
              <div className="text-xs text-terra-600">{sop.steps} steps</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recently viewed */}
      <div className="px-4 mt-5">
        <h3 className="font-semibold text-sm text-cocoa-800 mb-2">Recently Viewed</h3>
        <div className="space-y-2">
          {recentSOPs.map((sop) => (
            <button
              key={sop.id}
              onClick={() => setViewingSOP(sop.id)}
              className="w-full flex items-center gap-3 bg-white rounded-2xl p-3.5 border border-sand-300 shadow-card text-left hover:shadow-card-hover transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-navy-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-cocoa-800 truncate">{sop.title}</div>
                <div className="text-xs text-cocoa-500">{sop.category} · {sop.lastViewed}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-cocoa-500 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-5">
        <h3 className="font-semibold text-sm text-cocoa-800 mb-2">All Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {sopCategories.map((cat) => (
            <button
              key={cat.id}
              className={clsx(
                'bg-white rounded-2xl p-4 border shadow-card text-left hover:shadow-card-hover transition-all duration-200 active:scale-98',
                cat.color === 'terra' ? 'border-terra-200' : cat.color === 'gold' ? 'border-gold-200' : 'border-sand-300'
              )}
            >
              {(() => { const Icon = sopIconMap[cat.icon] ?? BookOpen; return <Icon className="w-5 h-5 text-navy-600 mb-2" /> })()}
              <div className="text-sm font-semibold text-cocoa-800">{cat.name}</div>
              <div className="text-xs text-cocoa-500 mt-0.5">{cat.count} procedures</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SOPLibrary
