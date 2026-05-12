import { type FC, useState } from 'react'
import { CheckCircle, Circle, Camera, ArrowLeft, Send, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

const checklistSections = [
  {
    title: 'Living Areas',
    items: ['Living room clean & styled', 'Decorative items in place', 'Lights & switches functional', 'Curtains & blinds clean'],
  },
  {
    title: 'Bedroom & Linen',
    items: ['Bed made with fresh linen', 'Pillowcases clean & pressed', 'Wardrobe interior tidy', 'Bedside accessories complete'],
  },
  {
    title: 'Bathroom',
    items: ['Toiletries fully stocked', 'Towels clean & folded', 'Floor & walls spotless', 'Drainage clear'],
  },
  {
    title: 'Kitchen',
    items: ['Dishes cleaned & stored', 'Countertop clean', 'Fridge emptied & clean', 'Coffee station set up'],
  },
  {
    title: 'Pool & Outdoor',
    items: ['Pool clean & pH balanced', 'Outdoor furniture arranged', 'Garden area tidy', 'BBQ area ready'],
  },
  {
    title: 'Welcome Setup',
    items: ['Welcome note placed', 'Fresh fruit bowl set', 'Air conditioning pre-set', 'Photo proof uploaded'],
  },
]

const SupervisorInspection: FC = () => {
  const allItems = checklistSections.flatMap(s => s.items)
  const [checked, setChecked] = useState<Set<string>>(new Set(['Living room clean & styled', 'Decorative items in place', 'Bed made with fresh linen', 'Pillowcases clean & pressed']))
  const [activeSection, setActiveSection] = useState('Living Areas')

  const toggleItem = (item: string) => {
    const next = new Set(checked)
    next.has(item) ? next.delete(item) : next.add(item)
    setChecked(next)
  }

  const pct = Math.round((checked.size / allItems.length) * 100)
  const activeSectionData = checklistSections.find(s => s.title === activeSection)!

  return (
    <div className="min-h-screen bg-sand-50 pb-24">
      {/* Header */}
      <div className="bg-navy-900 px-4 pt-12 pb-5 bg-batik">
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-navy-300">Supervisor Inspection</div>
            <h2 className="font-display text-lg font-semibold text-white">Villa Tirta 05</h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-navy-300">Check-in</div>
            <div className="text-sm font-semibold text-gold-300">14:00 today</div>
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <circle cx="32" cy="32" r="27" fill="none" stroke={pct === 100 ? '#3D8B7A' : '#C9A84C'} strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 27}`} strokeDashoffset={`${2 * Math.PI * 27 * (1 - pct / 100)}`}
                strokeLinecap="round" className="transition-all duration-500" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{pct}%</span>
          </div>
          <div>
            <div className="text-white font-semibold">{checked.size} / {allItems.length} items</div>
            <div className="text-xs text-navy-300 mt-0.5 flex items-center gap-1">
              {pct === 100
                ? <><CheckCircle className="w-3.5 h-3.5 text-teal-400" /> All checks complete!</>
                : `${allItems.length - checked.size} remaining`}
            </div>
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        {checklistSections.map((section) => {
          const sectionDone = section.items.filter(i => checked.has(i)).length
          const allDone = sectionDone === section.items.length
          return (
            <button
              key={section.title}
              onClick={() => setActiveSection(section.title)}
              className={clsx(
                'flex-shrink-0 text-xs px-3 py-2 rounded-full font-medium border transition-all duration-200',
                activeSection === section.title
                  ? 'bg-navy-800 text-white border-navy-800'
                  : allDone ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-white text-cocoa-600 border-sand-300'
              )}
            >
              {allDone && <CheckCircle className="w-3 h-3 mr-1 inline-block" />}{section.title}
            </button>
          )
        })}
      </div>

      {/* Checklist items */}
      <div className="px-4 space-y-2">
        {activeSectionData.items.map((item) => {
          const done = checked.has(item)
          return (
            <button
              key={item}
              onClick={() => toggleItem(item)}
              className={clsx(
                'w-full flex items-center gap-3 p-4 rounded-2xl border bg-white shadow-card transition-all duration-200 active:scale-98',
                done ? 'border-teal-200 bg-teal-50' : 'border-sand-300 hover:border-navy-200'
              )}
            >
              {done
                ? <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                : <Circle className="w-5 h-5 text-sand-300 flex-shrink-0" />
              }
              <span className={clsx('text-sm flex-1 text-left font-medium', done ? 'text-teal-700 line-through decoration-teal-400 decoration-1' : 'text-navy-700')}>
                {item}
              </span>
              {item.includes('Photo') && (
                <div className="flex items-center gap-1 text-xs text-cocoa-500">
                  <Camera className="w-3.5 h-3.5" />
                  Upload
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Photo upload prompt */}
      <div className="px-4 mt-4">
        <button className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-sand-300 bg-white text-center hover:border-navy-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center">
            <Camera className="w-5 h-5 text-cocoa-500" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-navy-700">Upload inspection photos</div>
            <div className="text-xs text-cocoa-500">Tap to take photo or upload from gallery</div>
          </div>
        </button>
      </div>

      {/* Notes */}
      <div className="px-4 mt-3">
        <textarea
          className="w-full input-field resize-none text-sm"
          rows={3}
          placeholder="Add inspection notes or observations…"
        />
      </div>

      {/* Submit */}
      <div className="px-4 mt-4 flex gap-3">
        <button className="btn-secondary flex-1 justify-center py-3">Save Draft</button>
        <button className="btn-primary flex-1 justify-center py-3">
          <Send className="w-4 h-4" />
          Submit
        </button>
      </div>
    </div>
  )
}

export default SupervisorInspection
