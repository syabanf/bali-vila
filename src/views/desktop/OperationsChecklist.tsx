import { type FC, useState } from 'react'
import { CheckCircle, Circle, AlertCircle, Clock, Camera, ChevronDown, ChevronRight } from 'lucide-react'
import { checklistVillas, mepItems } from '../../data/mockData'
import clsx from 'clsx'

const supervisorChecklist = [
  'Living room condition', 'Bedroom cleanliness', 'Bathroom amenities',
  'Pool readiness', 'Air conditioning status', 'Kitchen cleanliness',
  'Welcome setup', 'Photo proof uploaded'
]

const OperationsChecklist: FC = () => {
  const [activeVilla, setActiveVilla] = useState(checklistVillas[1])
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set(['Living room condition', 'Bedroom cleanliness', 'Bathroom amenities', 'Pool readiness']))
  const [expandedMep, setExpandedMep] = useState<string | null>('Electrical')

  const toggleItem = (item: string) => {
    const next = new Set(checkedItems)
    next.has(item) ? next.delete(item) : next.add(item)
    setCheckedItems(next)
  }

  const completionPct = Math.round((checkedItems.size / supervisorChecklist.length) * 100)

  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Check-ins Today', value: '23', badge: 'badge-info' },
          { label: 'Check-outs Today', value: '18', badge: 'badge-info' },
          { label: 'Supervisor Rate', value: '82%', badge: 'badge-success' },
          { label: 'MEP Completion', value: '76%', badge: 'badge-warning' },
        ].map((item) => (
          <div key={item.label} className="kpi-card">
            <div className="font-display text-3xl font-semibold text-cocoa-800">{item.value}</div>
            <div className="text-xs text-cocoa-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Villa List */}
        <div className="col-span-12 md:col-span-4 xl:col-span-3 space-y-3">
          <div className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
            <div className="p-4 border-b border-sand-100">
              <h3 className="font-display text-base font-semibold text-cocoa-800">Today's Villas</h3>
            </div>
            <div className="divide-y divide-sand-100">
              {checklistVillas.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVilla(v)}
                  className={clsx(
                    'w-full p-4 text-left hover:bg-sand-50 transition-colors',
                    activeVilla.id === v.id && 'bg-navy-50 border-l-2 border-navy-600'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-cocoa-800">{v.villa}</span>
                    <span className={clsx(
                      'text-xs px-1.5 py-0.5 rounded-full font-medium',
                      v.type === 'Check-in' ? 'bg-teal-50 text-teal-700' : 'bg-gold-50 text-gold-700'
                    )}>{v.type}</span>
                  </div>
                  <div className="text-xs text-cocoa-500 mb-2">{v.supervisor} · {v.time}</div>
                  <div className="h-1.5 bg-sand-100 rounded-full overflow-hidden">
                    <div
                      className={clsx('h-full rounded-full', v.completion === 100 ? 'bg-teal-400' : v.completion > 0 ? 'bg-gold-400' : 'bg-sand-300')}
                      style={{ width: `${v.completion}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={clsx('text-xs font-medium', v.status === 'Completed' ? 'text-teal-600' : v.status === 'In Progress' ? 'text-gold-700' : 'text-cocoa-500')}>
                      {v.status}
                    </span>
                    <span className="text-xs text-cocoa-500">{v.completion}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Supervisor Checklist */}
        <div className="col-span-12 md:col-span-8 xl:col-span-5 bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden min-w-0">
          <div className="p-5 border-b border-sand-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-cocoa-800">{activeVilla.villa}</h3>
                <p className="text-xs text-cocoa-500">{activeVilla.type} · {activeVilla.supervisor}</p>
              </div>
              {/* Ring */}
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#D9E2EC" strokeWidth="4" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke={completionPct === 100 ? '#2E8B57' : '#C9A84C'} strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - completionPct / 100)}`}
                    strokeLinecap="round" className="transition-all duration-500" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cocoa-800">
                  {completionPct}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-2">
            {supervisorChecklist.map((item) => {
              const done = checkedItems.has(item)
              return (
                <button
                  key={item}
                  onClick={() => toggleItem(item)}
                  className={clsx(
                    'w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200',
                    done ? 'bg-teal-50 border-teal-200' : 'bg-white border-sand-300 hover:border-navy-200 hover:bg-sand-50'
                  )}
                >
                  {done
                    ? <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    : <Circle className="w-5 h-5 text-sand-400 flex-shrink-0" />
                  }
                  <span className={clsx('text-sm flex-1 text-left', done ? 'text-teal-700 line-through decoration-teal-400 decoration-1' : 'text-navy-700')}>
                    {item}
                  </span>
                  {item === 'Photo proof uploaded' && (
                    <Camera className="w-4 h-4 text-cocoa-500" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="p-5 pt-0 flex gap-3">
            <button className="btn-secondary flex-1 justify-center text-sm">Save Draft</button>
            <button className="btn-primary flex-1 justify-center text-sm">Submit Inspection</button>
          </div>
        </div>

        {/* MEP Checklist */}
        <div className="col-span-12 xl:col-span-4 bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
          <div className="p-5 border-b border-sand-100">
            <h3 className="font-display text-lg font-semibold text-cocoa-800">Daily MEP Checklist</h3>
            <p className="text-xs text-cocoa-500 mt-0.5">Mechanical · Electrical · Plumbing</p>
          </div>
          <div className="divide-y divide-sand-100">
            {mepItems.map((category) => {
              const isExpanded = expandedMep === category.category
              return (
                <div key={category.category}>
                  <button
                    className="w-full flex items-center justify-between p-4 hover:bg-sand-50 transition-colors"
                    onClick={() => setExpandedMep(isExpanded ? null : category.category)}
                  >
                    <span className="text-sm font-semibold text-cocoa-800">{category.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="badge-success text-xs">{category.items.length}/{category.items.length}</span>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-cocoa-500" /> : <ChevronRight className="w-4 h-4 text-cocoa-500" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-3 space-y-1.5 bg-sand-50">
                      {category.items.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 py-1.5">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span className="text-xs text-navy-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="p-4 bg-teal-50 border-t border-teal-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-800">16/16 items completed today</span>
            </div>
            <p className="text-xs text-teal-600 mt-0.5">Last updated by Wayan D. at 09:45</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperationsChecklist
