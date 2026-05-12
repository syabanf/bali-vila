import { type FC, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Search, Filter, AlertTriangle, Package, TrendingDown, Camera, ChevronDown } from 'lucide-react'
import { inventoryItems } from '../../data/mockData'
import clsx from 'clsx'

const statusConfig = {
  OK: { badge: 'badge-success', dot: 'bg-teal-400' },
  Low: { badge: 'badge-warning', dot: 'bg-gold-400' },
  Critical: { badge: 'badge-danger', dot: 'bg-terra-400' },
  Breakage: { badge: 'badge-danger', dot: 'bg-terra-600' },
}

const varianceData = [
  { villa: 'V.Seminyak 07', variance: -25, color: '#C4664A' },
  { villa: 'V.Sawah 03', variance: -14, color: '#C4664A' },
  { villa: 'V.Tirta 05', variance: -8, color: '#C9A84C' },
  { villa: 'V.Bukit 11', variance: -5, color: '#C9A84C' },
  { villa: 'V.Tebing 01', variance: -3, color: '#D4C4A0' },
]

const InventoryManagement: FC = () => {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Linen', 'Kitchen', 'Amenities', 'Consumables', 'Operational']

  const filtered = filter === 'All' ? inventoryItems : inventoryItems.filter(i => i.category === filter)

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Items Tracked', value: '2,847', icon: Package, accent: 'navy' as const },
          { label: 'Low Stock Items', value: '34', icon: AlertTriangle, accent: 'gold' as const },
          { label: 'Critical Items', value: '8', icon: TrendingDown, accent: 'terra' as const },
          { label: 'Breakage This Month', value: '7', icon: Camera, accent: 'terra' as const },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="kpi-card">
              <div className="flex items-center justify-between mb-2">
                <Icon className={clsx('w-5 h-5', item.accent === 'terra' ? 'text-terra-400' : item.accent === 'gold' ? 'text-gold-500' : 'text-navy-500')} />
              </div>
              <div className="font-display text-3xl font-semibold text-navy-800">{item.value}</div>
              <div className="text-xs text-cocoa-400 mt-1">{item.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Main Table */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
          <div className="p-5 border-b border-sand-100 flex items-center gap-3">
            <h3 className="font-display text-lg font-semibold text-navy-800 flex-1">Villa Inventory</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-400" />
                <input type="text" placeholder="Search items…" className="input-field pl-9 py-2 text-xs w-48" />
              </div>
              <button className="btn-secondary text-xs py-2 px-3"><Filter className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Category filters */}
          <div className="px-5 py-2.5 border-b border-sand-100 flex items-center gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={clsx(
                  'flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200',
                  filter === c
                    ? 'bg-navy-800 text-white border-navy-800'
                    : 'bg-white text-cocoa-600 border-sand-200 hover:border-navy-300',
                )}
              >{c}</button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sand-50 border-b border-sand-200">
                  <th className="table-header text-left">Villa</th>
                  <th className="table-header text-left">Category</th>
                  <th className="table-header text-left">Item</th>
                  <th className="table-header text-center">Standard</th>
                  <th className="table-header text-center">Current</th>
                  <th className="table-header text-center">Diff</th>
                  <th className="table-header text-left">Status</th>
                  <th className="table-header text-left">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const cfg = statusConfig[item.status as keyof typeof statusConfig]
                  return (
                    <tr key={item.id} className="hover:bg-sand-50 transition-colors cursor-pointer">
                      <td className="table-cell font-medium text-navy-800">{item.villa}</td>
                      <td className="table-cell">
                        <span className="badge-info">{item.category}</span>
                      </td>
                      <td className="table-cell text-cocoa-700">{item.item}</td>
                      <td className="table-cell text-center text-cocoa-600">{item.standard}</td>
                      <td className="table-cell text-center font-semibold text-navy-800">{item.current}</td>
                      <td className={clsx('table-cell text-center font-semibold', item.diff < 0 ? 'text-terra-600' : 'text-teal-600')}>
                        {item.diff > 0 ? '+' : ''}{item.diff}
                      </td>
                      <td className="table-cell">
                        <span className={cfg.badge}>{item.status}</span>
                      </td>
                      <td className="table-cell">
                        <div className="text-xs text-cocoa-400">{item.lastUpdate}</div>
                        <div className="text-xs text-cocoa-500 mt-0.5">{item.updatedBy}</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-4">
          {/* Variance Chart */}
          <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-card">
            <h4 className="font-display text-base font-semibold text-navy-800 mb-1">Stock Variance</h4>
            <p className="text-xs text-cocoa-400 mb-3">Top 5 villas with issues</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={varianceData} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#9A8868' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="villa" tick={{ fontSize: 10, fill: '#6A4030' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} formatter={(v) => [`${v} units`, 'Variance']} />
                <Bar dataKey="variance" radius={[0, 4, 4, 0]}>
                  {varianceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Restock Recommendations */}
          <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-card">
            <h4 className="font-display text-base font-semibold text-navy-800 mb-3">AI Restock Recommendations</h4>
            <div className="space-y-2.5">
              {[
                { item: 'Shampoo 200ml', qty: '100 units', urgency: 'critical', est: 'IDR 420K' },
                { item: 'Coffee Capsules', qty: '200 units', urgency: 'critical', est: 'IDR 185K' },
                { item: 'Bath Towels', qty: '24 pcs', urgency: 'high', est: 'IDR 1.28M' },
                { item: 'Toilet Paper', qty: '48 rolls', urgency: 'medium', est: 'IDR 96K' },
              ].map((rec) => (
                <div key={rec.item} className="flex items-center gap-3 p-2.5 rounded-xl bg-sand-50 border border-sand-200">
                  <div className={clsx(
                    'w-2 h-2 rounded-full flex-shrink-0',
                    rec.urgency === 'critical' ? 'bg-terra-400' : rec.urgency === 'high' ? 'bg-gold-400' : 'bg-teal-400',
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-navy-800">{rec.item}</div>
                    <div className="text-xs text-cocoa-400">{rec.qty} — {rec.est}</div>
                  </div>
                  <button className="text-xs text-teal-600 font-medium hover:text-teal-800 whitespace-nowrap">Order</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventoryManagement
