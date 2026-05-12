import { type FC, useState } from 'react'
import { ShoppingCart, CheckCircle, Clock, Truck, Star, TrendingUp, TrendingDown, Minus, Plus, Filter, Edit2, Trash2 } from 'lucide-react'
import { purchaseRequests, suppliers } from '../../data/mockData'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import clsx from 'clsx'

const statusConfig = {
  Pending:  { badge: 'badge-warning', icon: Clock },
  Approved: { badge: 'badge-success', icon: CheckCircle },
  Ordered:  { badge: 'badge-info', icon: Truck },
  Received: { badge: 'badge-success', icon: CheckCircle },
}

const urgencyConfig = {
  Critical: 'bg-terra-400',
  High:     'bg-gold-400',
  Medium:   'bg-teal-400',
  Low:      'bg-sand-400',
}

interface PurchaseRequest {
  id: string
  item: string
  villa: string
  requestedBy: string
  amount: number
  status: string
  date: string
  category: string
  urgency: string
}

// augment form with optional notes field
interface PurchaseForm extends Partial<PurchaseRequest> {
  notes?: string
}

const emptyForm: PurchaseForm = {
  item: '', villa: 'Multiple', category: 'Linen', urgency: 'Medium',
  amount: 0, requestedBy: '', notes: '',
}

const Purchasing: FC = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [requests, setRequests] = useState<PurchaseRequest[]>(purchaseRequests as PurchaseRequest[])
  const [addOpen, setAddOpen] = useState(false)
  const [editItem, setEditItem] = useState<PurchaseRequest | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<PurchaseForm>({ ...emptyForm })

  const filtered = activeTab === 'All' ? requests : requests.filter(r => r.status === activeTab)

  const handleAdd = () => {
    const newReq: PurchaseRequest = {
      id: `PR${Date.now().toString().slice(-3)}`,
      item: form.item ?? '',
      villa: form.villa ?? 'Multiple',
      requestedBy: form.requestedBy ?? '',
      amount: Number(form.amount) || 0,
      status: 'Pending',
      date: 'Today',
      category: form.category ?? 'Linen',
      urgency: form.urgency ?? 'Medium',
    }
    setRequests(prev => [newReq, ...prev])
    setAddOpen(false)
    setForm({ ...emptyForm })
  }

  const handleEdit = () => {
    if (!editItem) return
    setRequests(prev => prev.map(r =>
      r.id === editItem.id
        ? { ...r, item: form.item ?? r.item, villa: form.villa ?? r.villa, requestedBy: form.requestedBy ?? r.requestedBy, amount: Number(form.amount) || r.amount, category: form.category ?? r.category, urgency: form.urgency ?? r.urgency }
        : r
    ))
    setEditItem(null)
    setForm({ ...emptyForm })
  }

  const handleDelete = () => {
    setRequests(prev => prev.filter(r => r.id !== deleteId))
    setDeleteId(null)
  }

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
  }

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r))
  }

  const openEdit = (pr: PurchaseRequest) => {
    setEditItem(pr)
    setForm({ item: pr.item, villa: pr.villa, requestedBy: pr.requestedBy, amount: pr.amount, category: pr.category, urgency: pr.urgency, notes: '' })
  }

  const requestForm = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-cocoa-600 mb-1">Item Description *</label>
          <input type="text" className="input-field" value={form.item ?? ''} onChange={e => setForm(f => ({ ...f, item: e.target.value }))} placeholder="e.g. Bath Towels x24" />
        </div>
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1">Villa</label>
          <select className="input-field" value={form.villa ?? 'Multiple'} onChange={e => setForm(f => ({ ...f, villa: e.target.value }))}>
            {['Multiple','Villa Tirta 05','Villa Puri 12','Villa Sawah 03','Villa Lumbung 08','Villa Tebing 01','Villa Bukit 11','Villa Canggu 04','Villa Seminyak 07'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1">Category</label>
          <select className="input-field" value={form.category ?? 'Linen'} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {['Linen','Amenities','Consumables','Kitchen','Pool','Operational','Maintenance'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1">Urgency</label>
          <select className="input-field" value={form.urgency ?? 'Medium'} onChange={e => setForm(f => ({ ...f, urgency: e.target.value }))}>
            {['Critical','High','Medium','Low'].map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1">Amount IDR</label>
          <input type="number" className="input-field" value={form.amount ?? 0} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} placeholder="0" />
        </div>
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1">Requested By</label>
          <input type="text" className="input-field" value={form.requestedBy ?? ''} onChange={e => setForm(f => ({ ...f, requestedBy: e.target.value }))} placeholder="e.g. Made S." />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-cocoa-600 mb-1">Notes</label>
          <textarea className="input-field resize-none" rows={2} value={(form as PurchaseForm).notes ?? ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Additional notes…" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Monthly Spend', value: 'IDR 28.4M', change: null, icon: ShoppingCart, accent: 'navy' as const },
          { label: 'Pending Approvals', value: '7', change: null, icon: Clock, accent: 'gold' as const },
          { label: 'Potential Savings', value: 'IDR 3.2M', change: '+12%', icon: TrendingDown, accent: 'teal' as const },
          { label: 'Price Alerts', value: '3', change: null, icon: TrendingUp, accent: 'terra' as const },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="kpi-card">
              <div className="flex items-center gap-2 mb-3">
                <div className={clsx(
                  'w-9 h-9 rounded-xl flex items-center justify-center',
                  item.accent === 'terra' ? 'bg-terra-50 text-terra-500' :
                  item.accent === 'gold' ? 'bg-gold-50 text-gold-600' :
                  item.accent === 'teal' ? 'bg-teal-50 text-teal-600' : 'bg-navy-50 text-navy-600'
                )}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="font-display text-2xl font-semibold text-navy-800">{item.value}</div>
              <div className="text-xs text-cocoa-400 mt-1">{item.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Purchase Request Queue */}
        <div className="col-span-12 xl:col-span-7 bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
          <div className="p-5 border-b border-sand-100 flex items-center gap-3">
            <h3 className="font-display text-lg font-semibold text-navy-800 flex-1">Purchase Request Queue</h3>
            <button className="btn-secondary text-xs py-1.5 px-3"><Filter className="w-3.5 h-3.5" /> Filter</button>
            <button className="btn-primary text-xs py-1.5 px-3" onClick={() => { setForm({ ...emptyForm }); setAddOpen(true) }}>
              <Plus className="w-3.5 h-3.5" /> New Request
            </button>
          </div>

          {/* Status tabs */}
          <div className="flex items-center gap-1 px-5 py-2.5 border-b border-sand-100 overflow-x-auto">
            {['All', 'Pending', 'Approved', 'Ordered', 'Received'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200',
                  activeTab === tab ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-cocoa-600 border-sand-200 hover:border-navy-300'
                )}
              >{tab}</button>
            ))}
          </div>

          <div className="divide-y divide-sand-100">
            {filtered.map((pr) => {
              const cfg = statusConfig[pr.status as keyof typeof statusConfig] ?? statusConfig.Pending
              const IconComp = cfg.icon
              return (
                <div key={pr.id} className="p-4 hover:bg-sand-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={clsx('w-2 h-2 rounded-full mt-2 flex-shrink-0', urgencyConfig[pr.urgency as keyof typeof urgencyConfig] ?? 'bg-sand-400')} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-navy-800">{pr.item}</span>
                        <span className="badge-info text-xs">{pr.category}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-cocoa-500">
                        <span>{pr.villa}</span>
                        <span>·</span>
                        <span>By {pr.requestedBy}</span>
                        <span>·</span>
                        <span>{pr.date}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 flex items-start gap-2">
                      <div>
                        <div className="text-sm font-bold text-navy-800 mb-1">IDR {pr.amount.toLocaleString()}</div>
                        <span className={cfg.badge}>
                          <IconComp className="w-3 h-3 mr-1" />
                          {pr.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 ml-1 mt-0.5">
                        <button
                          onClick={() => openEdit(pr)}
                          className="w-7 h-7 rounded-lg bg-sand-100 hover:bg-navy-50 flex items-center justify-center text-cocoa-500 hover:text-navy-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(pr.id)}
                          className="w-7 h-7 rounded-lg bg-sand-100 hover:bg-terra-50 flex items-center justify-center text-cocoa-500 hover:text-terra-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {pr.status === 'Pending' && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-sand-100">
                      <button
                        onClick={() => handleApprove(pr.id)}
                        className="text-xs font-medium px-3 py-1 rounded-lg border bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 transition-colors flex-1"
                      >Approve</button>
                      <button className="btn-secondary text-xs py-1 px-3 flex-1">Request Info</button>
                      <button
                        onClick={() => handleReject(pr.id)}
                        className="text-xs font-medium px-3 py-1 rounded-lg border bg-terra-50 text-terra-600 border-terra-200 hover:bg-terra-100 transition-colors"
                      >Reject</button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Supplier Intelligence */}
        <div className="col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
            <div className="p-5 border-b border-sand-100">
              <h3 className="font-display text-lg font-semibold text-navy-800">Supplier Intelligence</h3>
              <p className="text-xs text-cocoa-400 mt-0.5">Preferred vendors & price trends</p>
            </div>
            <div className="divide-y divide-sand-100">
              {suppliers.map((s) => (
                <div key={s.id} className="p-4 hover:bg-sand-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-navy-600">{s.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-navy-800">{s.name}</span>
                        {s.preferred && <span className="badge-success text-xs">Preferred</span>}
                      </div>
                      <div className="text-xs text-cocoa-400">{s.specialty}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gold-600">
                          <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                          {s.rating}
                        </span>
                        <span className="text-xs text-cocoa-400">Response: {s.response}</span>
                        <span className="text-xs text-cocoa-500 font-medium">{s.lastPrice}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      {s.trend === 'up' && <TrendingUp className="w-4 h-4 text-terra-500 ml-auto" />}
                      {s.trend === 'down' && <TrendingDown className="w-4 h-4 text-teal-500 ml-auto" />}
                      {s.trend === 'stable' && <Minus className="w-4 h-4 text-cocoa-300 ml-auto" />}
                      <span className="text-xs text-cocoa-400 mt-1 block">
                        {s.trend === 'up' ? '↑ Prices up' : s.trend === 'down' ? '↓ Prices down' : '— Stable'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-generated Shopping List */}
          <div className="bg-navy-900 rounded-2xl p-5 border border-navy-700 shadow-card bg-batik">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-gold-400/20 flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5 text-gold-400" />
              </div>
              <h4 className="font-display text-base font-semibold text-white">Auto Shopping List</h4>
              <span className="ml-auto badge-success text-teal-300 border-teal-500/30 bg-teal-500/10 text-xs">AI Generated</span>
            </div>
            <div className="space-y-2">
              {[
                { item: 'Shampoo 200ml', qty: '100 units', urgency: 'Critical' },
                { item: 'Coffee Capsules', qty: '200 units', urgency: 'Critical' },
                { item: 'Bath Towels', qty: '24 pcs', urgency: 'High' },
                { item: 'Bed Sheets King', qty: '12 sets', urgency: 'High' },
                { item: 'Toilet Paper', qty: '48 rolls', urgency: 'Medium' },
              ].map((item) => (
                <div key={item.item} className="flex items-center justify-between py-2 border-b border-white/8 last:border-0">
                  <div>
                    <span className="text-sm font-medium text-white">{item.item}</span>
                    <span className="text-xs text-navy-300 ml-2">{item.qty}</span>
                  </div>
                  <span className={clsx(
                    'text-xs font-medium px-2 py-0.5 rounded-full',
                    item.urgency === 'Critical' ? 'bg-terra-500/20 text-terra-300' :
                    item.urgency === 'High' ? 'bg-gold-500/20 text-gold-300' : 'bg-white/10 text-navy-200'
                  )}>{item.urgency}</span>
                </div>
              ))}
            </div>
            <button className="btn-gold w-full mt-4 justify-center text-sm">Create Purchase Order</button>
          </div>
        </div>
      </div>

      {/* Add Request Modal */}
      <Modal
        open={addOpen}
        onClose={() => { setAddOpen(false); setForm({ ...emptyForm }) }}
        title="New Purchase Request"
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => { setAddOpen(false); setForm({ ...emptyForm }) }}>Cancel</button>
            <button className="btn-primary" onClick={handleAdd} disabled={!form.item?.trim()}>Create Request</button>
          </>
        }
      >
        {requestForm}
      </Modal>

      {/* Edit Request Modal */}
      <Modal
        open={!!editItem}
        onClose={() => { setEditItem(null); setForm({ ...emptyForm }) }}
        title="Edit Purchase Request"
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => { setEditItem(null); setForm({ ...emptyForm }) }}>Cancel</button>
            <button className="btn-primary" onClick={handleEdit}>Save Changes</button>
          </>
        }
      >
        {requestForm}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Request"
        message={`Delete request for "${requests.find(r => r.id === deleteId)?.item}"?`}
        variant="danger"
      />
    </div>
  )
}

export default Purchasing
