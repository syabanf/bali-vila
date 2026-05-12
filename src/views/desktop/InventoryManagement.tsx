import { type FC, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Search, Filter, AlertTriangle, Package, TrendingDown, Camera, ChevronDown, Plus, Edit2, Trash2 } from 'lucide-react'
import { inventoryItems as inventoryData } from '../../data/mockData'
import clsx from 'clsx'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'

// ─── Types ────────────────────────────────────────────────────────────────────

interface InventoryItem {
  id: string
  villa: string
  category: string
  item: string
  standard: number
  current: number
  diff: number
  status: string
  lastUpdate: string
  updatedBy: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeStatus(diff: number): string {
  if (diff >= 0) return 'OK'
  if (diff >= -5) return 'Low'
  return 'Critical'
}

// ─── Constants ────────────────────────────────────────────────────────────────

const statusConfig = {
  OK: { badge: 'badge-success', dot: 'bg-teal-400' },
  Low: { badge: 'badge-warning', dot: 'bg-gold-400' },
  Critical: { badge: 'badge-danger', dot: 'bg-terra-400' },
  Breakage: { badge: 'badge-danger', dot: 'bg-terra-600' },
}

const varianceData = [
  { villa: 'V.Seminyak 07', variance: -25, color: '#B85234' },
  { villa: 'V.Sawah 03', variance: -14, color: '#B85234' },
  { villa: 'V.Tirta 05', variance: -8, color: '#C9A84C' },
  { villa: 'V.Bukit 11', variance: -5, color: '#C9A84C' },
  { villa: 'V.Tebing 01', variance: -3, color: '#C0CFDB' },
]

const VILLA_OPTIONS = [
  'Villa Tirta 05',
  'Villa Puri 12',
  'Villa Sawah 03',
  'Villa Lumbung 08',
  'Villa Tebing 01',
  'Villa Bukit 11',
  'Villa Canggu 04',
  'Villa Seminyak 07',
]

const CATEGORY_OPTIONS = ['Linen', 'Kitchen', 'Amenities', 'Consumables', 'Operational']

// ─── Item Form ────────────────────────────────────────────────────────────────

function ItemForm({
  form,
  onChange,
}: {
  form: Partial<InventoryItem>
  onChange: (updated: Partial<InventoryItem>) => void
}) {
  const set = (field: keyof InventoryItem, value: string | number) =>
    onChange({ ...form, [field]: value })

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-cocoa-600">Villa</label>
        <select
          className="input-field"
          value={form.villa ?? ''}
          onChange={e => set('villa', e.target.value)}
        >
          <option value="">Select villa…</option>
          {VILLA_OPTIONS.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-cocoa-600">Category</label>
        <select
          className="input-field"
          value={form.category ?? ''}
          onChange={e => set('category', e.target.value)}
        >
          <option value="">Select category…</option>
          {CATEGORY_OPTIONS.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-cocoa-600">Item Name *</label>
        <input
          type="text"
          className="input-field"
          value={form.item ?? ''}
          onChange={e => set('item', e.target.value)}
          placeholder="e.g. Bath Towels"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-cocoa-600">Standard Qty</label>
        <input
          type="number"
          min={0}
          className="input-field"
          value={form.standard ?? ''}
          onChange={e => set('standard', Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-cocoa-600">Current Qty</label>
        <input
          type="number"
          min={0}
          className="input-field"
          value={form.current ?? ''}
          onChange={e => set('current', Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-cocoa-600">Updated By</label>
        <input
          type="text"
          className="input-field"
          value={form.updatedBy ?? ''}
          onChange={e => set('updatedBy', e.target.value)}
          placeholder="Staff name"
        />
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

const InventoryManagement: FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(inventoryData as InventoryItem[])
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Linen', 'Kitchen', 'Amenities', 'Consumables', 'Operational']

  // CRUD state
  const [addOpen, setAddOpen] = useState(false)
  const [editItem, setEditItem] = useState<InventoryItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<InventoryItem>>({})

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)

  // ── Handlers ──────────────────────────────────────────────────────────────

  function openAdd() {
    setForm({})
    setAddOpen(true)
  }

  function handleAdd() {
    const standard = form.standard ?? 0
    const current = form.current ?? 0
    const diff = current - standard
    const newItem: InventoryItem = {
      id: `I${Date.now().toString().slice(-3)}`,
      villa: form.villa ?? '',
      category: form.category ?? '',
      item: form.item ?? 'New Item',
      standard,
      current,
      diff,
      status: computeStatus(diff),
      lastUpdate: 'Just now',
      updatedBy: form.updatedBy ?? '',
    }
    setItems(prev => [newItem, ...prev])
    setAddOpen(false)
  }

  function openEdit(item: InventoryItem) {
    setEditItem(item)
    setForm({ ...item })
  }

  function handleEdit() {
    if (!editItem) return
    const standard = form.standard ?? editItem.standard
    const current = form.current ?? editItem.current
    const diff = current - standard
    setItems(prev =>
      prev.map(i =>
        i.id === editItem.id
          ? {
              ...i,
              villa: form.villa ?? i.villa,
              category: form.category ?? i.category,
              item: form.item ?? i.item,
              standard,
              current,
              diff,
              status: computeStatus(diff),
              updatedBy: form.updatedBy ?? i.updatedBy,
              lastUpdate: 'Just now',
            }
          : i,
      ),
    )
    setEditItem(null)
  }

  function handleDelete() {
    if (!deleteId) return
    setItems(prev => prev.filter(i => i.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Items Tracked', value: String(items.length), icon: Package, accent: 'navy' as const },
          { label: 'Low Stock Items', value: String(items.filter(i => i.status === 'Low').length), icon: AlertTriangle, accent: 'gold' as const },
          { label: 'Critical Items', value: String(items.filter(i => i.status === 'Critical').length), icon: TrendingDown, accent: 'terra' as const },
          { label: 'Breakage This Month', value: String(items.filter(i => i.status === 'Breakage').length), icon: Camera, accent: 'terra' as const },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="kpi-card">
              <div className="flex items-center justify-between mb-2">
                <Icon className={clsx('w-5 h-5', item.accent === 'terra' ? 'text-terra-400' : item.accent === 'gold' ? 'text-gold-500' : 'text-navy-500')} />
              </div>
              <div className="font-display text-3xl font-semibold text-cocoa-800">{item.value}</div>
              <div className="text-xs text-cocoa-500 mt-1">{item.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Main Table */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
          <div className="p-5 border-b border-sand-100 flex items-center gap-3">
            <h3 className="font-display text-lg font-semibold text-cocoa-800 flex-1">Villa Inventory</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-500" />
                <input type="text" placeholder="Search items…" className="input-field pl-9 py-2 text-xs w-48" />
              </div>
              <button className="btn-secondary text-xs py-2 px-3"><Filter className="w-3.5 h-3.5" /></button>
              <button className="btn-primary text-xs py-2 px-3" onClick={openAdd}>
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </button>
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
                    : 'bg-white text-cocoa-600 border-sand-300 hover:border-navy-300',
                )}
              >{c}</button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sand-50 border-b border-sand-300">
                  <th className="table-header text-left">Villa</th>
                  <th className="table-header text-left">Category</th>
                  <th className="table-header text-left">Item</th>
                  <th className="table-header text-center">Standard</th>
                  <th className="table-header text-center">Current</th>
                  <th className="table-header text-center">Diff</th>
                  <th className="table-header text-left">Status</th>
                  <th className="table-header text-left">Updated</th>
                  <th className="table-header text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const cfg = statusConfig[item.status as keyof typeof statusConfig] ?? statusConfig.OK
                  return (
                    <tr key={item.id} className="hover:bg-sand-50 transition-colors">
                      <td className="table-cell font-medium text-cocoa-800">{item.villa}</td>
                      <td className="table-cell">
                        <span className="badge-info">{item.category}</span>
                      </td>
                      <td className="table-cell text-cocoa-700">{item.item}</td>
                      <td className="table-cell text-center text-cocoa-600">{item.standard}</td>
                      <td className="table-cell text-center font-semibold text-cocoa-800">{item.current}</td>
                      <td className={clsx('table-cell text-center font-semibold', item.diff < 0 ? 'text-terra-600' : 'text-teal-600')}>
                        {item.diff > 0 ? '+' : ''}{item.diff}
                      </td>
                      <td className="table-cell">
                        <span className={cfg.badge}>{item.status}</span>
                      </td>
                      <td className="table-cell">
                        <div className="text-xs text-cocoa-500">{item.lastUpdate}</div>
                        <div className="text-xs text-cocoa-500 mt-0.5">{item.updatedBy}</div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openEdit(item)}
                            className="btn-secondary p-1.5 rounded-lg"
                            title="Edit item"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="p-1.5 rounded-lg border border-terra-200 bg-terra-50 text-terra-600 hover:bg-terra-100 transition-colors"
                            title="Delete item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
          <div className="bg-white rounded-2xl p-5 border border-sand-300 shadow-card">
            <h4 className="font-display text-base font-semibold text-cocoa-800 mb-1">Stock Variance</h4>
            <p className="text-xs text-cocoa-500 mb-3">Top 5 villas with issues</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={varianceData} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#52616B' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="villa" tick={{ fontSize: 10, fill: '#52616B' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} formatter={(v) => [`${v} units`, 'Variance']} />
                <Bar dataKey="variance" radius={[0, 4, 4, 0]}>
                  {varianceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Restock Recommendations */}
          <div className="bg-white rounded-2xl p-5 border border-sand-300 shadow-card">
            <h4 className="font-display text-base font-semibold text-cocoa-800 mb-3">AI Restock Recommendations</h4>
            <div className="space-y-2.5">
              {[
                { item: 'Shampoo 200ml', qty: '100 units', urgency: 'critical', est: 'IDR 420K' },
                { item: 'Coffee Capsules', qty: '200 units', urgency: 'critical', est: 'IDR 185K' },
                { item: 'Bath Towels', qty: '24 pcs', urgency: 'high', est: 'IDR 1.28M' },
                { item: 'Toilet Paper', qty: '48 rolls', urgency: 'medium', est: 'IDR 96K' },
              ].map((rec) => (
                <div key={rec.item} className="flex items-center gap-3 p-2.5 rounded-xl bg-sand-50 border border-sand-300">
                  <div className={clsx(
                    'w-2 h-2 rounded-full flex-shrink-0',
                    rec.urgency === 'critical' ? 'bg-terra-400' : rec.urgency === 'high' ? 'bg-gold-400' : 'bg-teal-400',
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-cocoa-800">{rec.item}</div>
                    <div className="text-xs text-cocoa-500">{rec.qty} — {rec.est}</div>
                  </div>
                  <button className="text-xs text-teal-600 font-medium hover:text-teal-800 whitespace-nowrap">Order</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Inventory Item"
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleAdd}>Add Item</button>
          </>
        }
      >
        <ItemForm form={form} onChange={setForm} />
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        open={editItem !== null}
        onClose={() => setEditItem(null)}
        title="Edit Item"
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setEditItem(null)}>Cancel</button>
            <button className="btn-primary" onClick={handleEdit}>Save Changes</button>
          </>
        }
      >
        <ItemForm form={form} onChange={setForm} />
      </Modal>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Item"
        message={`Remove "${items.find(i => i.id === deleteId)?.item ?? ''}" from ${items.find(i => i.id === deleteId)?.villa ?? ''}?`}
        variant="danger"
      />
    </div>
  )
}

export default InventoryManagement
