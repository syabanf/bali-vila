import { type FC, useState } from 'react'
import { ArrowLeft, Camera, Plus, Minus, AlertTriangle, Check } from 'lucide-react'
import clsx from 'clsx'

const categories = ['Linen', 'Kitchen', 'Amenities', 'Consumables', 'Operational']

const standardItems: Record<string, Array<{ name: string; standard: number }>> = {
  Linen: [
    { name: 'Bath Towels', standard: 12 },
    { name: 'Hand Towels', standard: 12 },
    { name: 'Bed Sheets (King)', standard: 6 },
    { name: 'Pillowcases', standard: 12 },
  ],
  Kitchen: [
    { name: 'Dinner Plates', standard: 8 },
    { name: 'Wine Glasses', standard: 10 },
    { name: 'Cutlery Sets', standard: 8 },
  ],
  Amenities: [
    { name: 'Shampoo 200ml', standard: 20 },
    { name: 'Conditioner 200ml', standard: 20 },
    { name: 'Body Wash 200ml', standard: 20 },
    { name: 'Soap Bar', standard: 24 },
  ],
  Consumables: [
    { name: 'Coffee Capsules', standard: 30 },
    { name: 'Tea Bags (box)', standard: 4 },
    { name: 'Toilet Paper', standard: 24 },
  ],
  Operational: [
    { name: 'Pool Net', standard: 2 },
    { name: 'Cleaning Spray', standard: 6 },
  ],
}

const InventoryUpdate: FC = () => {
  const [villa, setVilla] = useState('Villa Tirta 05')
  const [category, setCategory] = useState('Linen')
  const [counts, setCounts] = useState<Record<string, number>>({ 'Bath Towels': 9, 'Hand Towels': 12, 'Bed Sheets (King)': 4, 'Pillowcases': 10 })
  const [submitted, setSubmitted] = useState(false)

  const items = standardItems[category] || []

  const getCount = (name: string, standard: number) => counts[name] ?? standard
  const setCount = (name: string, value: number) => setCounts(prev => ({ ...prev, [name]: Math.max(0, value) }))

  return (
    <div className="min-h-screen bg-sand-50 pb-24">
      {/* Header */}
      <div className="bg-navy-900 px-4 pt-12 pb-5 bg-batik">
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-navy-300">Inventory Update</div>
            <h2 className="font-display text-lg font-semibold text-white">Stock Count</h2>
          </div>
        </div>

        {/* Villa selector */}
        <select
          className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
          value={villa}
          onChange={e => setVilla(e.target.value)}
        >
          {['Villa Tirta 05', 'Villa Puri 12', 'Villa Sawah 03', 'Villa Lumbung 08', 'Villa Seminyak 07'].map(v => (
            <option key={v} value={v} className="text-navy-900">{v}</option>
          ))}
        </select>
      </div>

      {/* Category tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={clsx(
              'flex-shrink-0 text-xs px-3 py-2 rounded-full font-medium border transition-all duration-200',
              category === cat ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-cocoa-600 border-sand-300'
            )}
          >{cat}</button>
        ))}
      </div>

      {/* Items */}
      <div className="px-4 space-y-3">
        {items.map((item) => {
          const current = getCount(item.name, item.standard)
          const diff = current - item.standard
          const isLow = diff < 0

          return (
            <div key={item.name} className={clsx(
              'bg-white rounded-2xl border shadow-card p-4',
              isLow ? 'border-terra-200' : 'border-sand-300'
            )}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-sm text-cocoa-800">{item.name}</div>
                  <div className="text-xs text-cocoa-500">Standard: {item.standard} units</div>
                </div>
                {isLow && (
                  <div className="flex items-center gap-1 badge-danger">
                    <AlertTriangle className="w-3 h-3" />
                    {diff}
                  </div>
                )}
                {!isLow && current > 0 && (
                  <Check className="w-5 h-5 text-teal-500" />
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCount(item.name, current - 1)}
                  className="w-10 h-10 rounded-xl bg-sand-100 border border-sand-300 flex items-center justify-center hover:bg-sand-200 transition-colors active:scale-95"
                >
                  <Minus className="w-4 h-4 text-cocoa-600" />
                </button>

                <div className="flex-1 text-center">
                  <div className={clsx(
                    'font-display text-3xl font-semibold',
                    diff < 0 ? 'text-terra-600' : 'text-cocoa-800'
                  )}>{current}</div>
                  <div className="text-xs text-cocoa-500">current count</div>
                </div>

                <button
                  onClick={() => setCount(item.name, current + 1)}
                  className="w-10 h-10 rounded-xl bg-sand-100 border border-sand-300 flex items-center justify-center hover:bg-sand-200 transition-colors active:scale-95"
                >
                  <Plus className="w-4 h-4 text-cocoa-600" />
                </button>
              </div>

              {isLow && (
                <div className="mt-3 flex gap-2">
                  <button className="btn-secondary flex-1 text-xs py-2 justify-center">
                    <Camera className="w-3.5 h-3.5" /> Photo Proof
                  </button>
                  <button className="flex-1 text-xs py-2 rounded-xl bg-terra-50 border border-terra-200 text-terra-700 font-medium">
                    Request Restock
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Notes & submit */}
      <div className="px-4 mt-4">
        <textarea
          className="input-field resize-none text-sm w-full"
          rows={2}
          placeholder="Add notes (damage, missing items, etc.)…"
        />
      </div>

      <div className="px-4 mt-3">
        <button
          onClick={() => setSubmitted(true)}
          className={clsx('w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300',
            submitted ? 'bg-teal-500 text-white' : 'bg-navy-800 text-white hover:bg-navy-700'
          )}
        >
          {submitted ? <><Check className="w-4 h-4" /> Submitted!</> : 'Submit Inventory Update'}
        </button>
      </div>
    </div>
  )
}

export default InventoryUpdate
