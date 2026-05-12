import { type FC, useState } from 'react'
import { CheckCircle, Circle, AlertTriangle, ArrowLeft, Wifi, WifiOff, ChevronDown, Zap, Droplets, Wind, Waves, type LucideIcon } from 'lucide-react'
import clsx from 'clsx'

const mepCategories: { icon: LucideIcon; title: string; items: { label: string; options: string[] }[] }[] = [
  {
    icon: Zap,
    title: 'Electrical',
    items: [
      { label: 'Main panel stable', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Backup generator tested', options: ['OK', 'Warning', 'Issue'] },
      { label: 'External lighting', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Indoor lighting all zones', options: ['OK', 'Warning', 'Issue'] },
    ],
  },
  {
    icon: Droplets,
    title: 'Water System',
    items: [
      { label: 'Water pressure normal', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Pump condition', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Hot water heater', options: ['OK', 'Warning', 'Issue'] },
      { label: 'No plumbing leaks', options: ['OK', 'Warning', 'Issue'] },
    ],
  },
  {
    icon: Wind,
    title: 'Air Conditioning',
    items: [
      { label: 'All units cooling', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Filters cleaned', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Thermostat calibrated', options: ['OK', 'Warning', 'Issue'] },
    ],
  },
  {
    icon: Waves,
    title: 'Pool',
    items: [
      { label: 'pH level balanced (7.2–7.6)', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Chlorine level OK', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Pump & filter running', options: ['OK', 'Warning', 'Issue'] },
      { label: 'Visual cleanliness', options: ['OK', 'Warning', 'Issue'] },
    ],
  },
]

type Status = 'OK' | 'Warning' | 'Issue' | null

const MEPChecklist: FC = () => {
  const [statuses, setStatuses] = useState<Record<string, Status>>({
    'Main panel stable': 'OK',
    'Backup generator tested': 'OK',
    'External lighting': 'OK',
    'Water pressure normal': 'Warning',
    'Pump condition': 'OK',
    'Hot water heater': 'OK',
    'No plumbing leaks': 'OK',
  })
  const [expanded, setExpanded] = useState<string[]>(['Electrical', 'Water System'])
  const [offline, setOffline] = useState(false)

  const setStatus = (item: string, val: Status) => {
    setStatuses(prev => ({ ...prev, [item]: val }))
  }

  const toggleExpand = (cat: string) => {
    setExpanded(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const allItems = mepCategories.flatMap(c => c.items)
  const done = Object.values(statuses).filter(Boolean).length
  const issues = Object.values(statuses).filter(s => s === 'Issue' || s === 'Warning').length

  return (
    <div className="min-h-screen bg-sand-50 pb-24">
      {/* Header */}
      <div className="bg-navy-900 px-4 pt-12 pb-5 bg-batik">
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-navy-300">Daily MEP Checklist</div>
            <h2 className="font-display text-lg font-semibold text-white">Villa Tirta 05</h2>
          </div>
          <button
            onClick={() => setOffline(!offline)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border',
              offline ? 'bg-gold-500/20 text-gold-300 border-gold-500/30' : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
            )}
          >
            {offline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            {offline ? 'Offline' : 'Live'}
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="font-display text-xl font-semibold text-white">{done}</div>
            <div className="text-xs text-navy-300">Checked</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="font-display text-xl font-semibold text-gold-300">{issues}</div>
            <div className="text-xs text-navy-300">Issues</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="font-display text-xl font-semibold text-navy-300">{allItems.length - done}</div>
            <div className="text-xs text-navy-300">Remaining</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-4 space-y-3">
        {mepCategories.map((cat) => {
          const isExpanded = expanded.includes(cat.title)
          const catDone = cat.items.filter(i => statuses[i.label]).length
          const catIssues = cat.items.filter(i => statuses[i.label] === 'Issue' || statuses[i.label] === 'Warning').length

          return (
            <div key={cat.title} className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
              <button
                className="w-full flex items-center gap-3 p-4"
                onClick={() => toggleExpand(cat.title)}
              >
                {(() => { const Icon = cat.icon; return <Icon className="w-5 h-5 text-navy-600 flex-shrink-0" /> })()}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm text-cocoa-800">{cat.title}</div>
                  <div className="text-xs text-cocoa-500">{catDone}/{cat.items.length} checked</div>
                </div>
                {catIssues > 0 && (
                  <span className="badge-warning text-xs"><AlertTriangle className="w-3 h-3 mr-1" />{catIssues}</span>
                )}
                {catIssues === 0 && catDone === cat.items.length && (
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                )}
                <ChevronDown className={clsx('w-4 h-4 text-cocoa-500 transition-transform', isExpanded ? 'rotate-180' : '')} />
              </button>

              {isExpanded && (
                <div className="border-t border-sand-100 divide-y divide-sand-100">
                  {cat.items.map((item) => {
                    const status = statuses[item.label]
                    return (
                      <div key={item.label} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-navy-700">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setStatus(item.label, opt as Status)}
                              className={clsx(
                                'flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-200',
                                status === opt
                                  ? opt === 'OK' ? 'bg-teal-500 text-white border-teal-500'
                                    : opt === 'Warning' ? 'bg-gold-400 text-navy-900 border-gold-400'
                                    : 'bg-terra-500 text-white border-terra-500'
                                  : 'bg-sand-50 text-cocoa-500 border-sand-300 hover:border-navy-200'
                              )}
                            >{opt}</button>
                          ))}
                        </div>
                        {(status === 'Issue' || status === 'Warning') && (
                          <textarea
                            className="input-field mt-2 text-xs resize-none"
                            rows={2}
                            placeholder="Describe the issue…"
                          />
                        )}
                        {(status === 'Issue' || status === 'Warning') && (
                          <button className="btn-secondary text-xs py-1.5 px-3 mt-2 w-full justify-center">
                            <AlertTriangle className="w-3 h-3" /> Escalate Issue
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit */}
      <div className="px-4 mt-4 flex gap-3">
        <button className="btn-secondary flex-1 justify-center py-3">Save Progress</button>
        <button className="btn-primary flex-1 justify-center py-3">Submit Report</button>
      </div>
    </div>
  )
}

export default MEPChecklist
