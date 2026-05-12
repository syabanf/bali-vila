import { type FC, useState } from 'react'
import {
  Plus, Search, Clock, Sparkles, AlertTriangle,
  Wrench, CheckCircle, Loader, PackageSearch, User, Trash2,
} from 'lucide-react'
import { maintenanceTickets, vendors, villasMaster } from '../../data/mockData'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import clsx from 'clsx'

interface Ticket {
  id: string
  villa: string
  villaId: string
  issue: string
  category: string
  priority: string
  status: 'open' | 'in-progress' | 'pending-parts' | 'scheduled' | 'resolved'
  createdAt: string
  createdBy: string
  assignedTo: string | null
  vendorId: string | null
  estimatedCost: number | null
  actualCost: number | null
  estimatedTime: string
  aiDiagnosis: string
  slaDeadline: string
  notes: string
  photos: number
}

// ─── Config ───────────────────────────────────────────────────────────────────
const categories = ['All', 'Plumbing', 'Electrical', 'Air Conditioning', 'Pool', 'Carpentry', 'IT / WiFi']
const ticketCategories = ['Plumbing', 'Electrical', 'Air Conditioning', 'Pool', 'Carpentry', 'IT & WiFi', 'Civil']
const priorities = ['All', 'high', 'medium', 'low']

const priorityConfig = {
  high:   { dot: 'bg-terra-400', badge: 'bg-terra-50 text-terra-700 border-terra-200', label: 'High' },
  medium: { dot: 'bg-gold-400',  badge: 'bg-gold-50 text-gold-700 border-gold-200',   label: 'Medium' },
  low:    { dot: 'bg-teal-400',  badge: 'bg-teal-50 text-teal-700 border-teal-200',   label: 'Low' },
}

const statusConfig = {
  'open':          { label: 'Open',          col: 'terra', icon: AlertTriangle },
  'in-progress':   { label: 'In Progress',   col: 'gold',  icon: Wrench },
  'pending-parts': { label: 'Pending Parts', col: 'navy',  icon: PackageSearch },
  'scheduled':     { label: 'Scheduled',     col: 'navy',  icon: Loader },
  'resolved':      { label: 'Resolved',      col: 'teal',  icon: CheckCircle },
}

const colHeaderStyle = {
  terra: 'bg-terra-50 border-terra-200 text-terra-700',
  gold:  'bg-gold-50  border-gold-200  text-gold-700',
  navy:  'bg-navy-50  border-navy-200  text-navy-700',
  teal:  'bg-teal-50  border-teal-200  text-teal-700',
}

const kanbanColumns: Array<{ status: Ticket['status']; label: string; col: string }> = [
  { status: 'open',          label: 'Open',          col: 'terra' },
  { status: 'in-progress',   label: 'In Progress',   col: 'gold' },
  { status: 'pending-parts', label: 'Pending Parts', col: 'navy' },
  { status: 'resolved',      label: 'Resolved',      col: 'teal' },
]

const formatIDR = (n: number | null) =>
  n == null ? '—' : `IDR ${n.toLocaleString('id-ID')}`

const isSlaOverdue = (deadline: string) => {
  const parts = deadline.split(' ')
  if (parts.length < 2) return false
  const [datePart, timePart] = [parts[0] + ' ' + parts[1], parts[2] ?? '']
  try {
    const d = new Date(`${datePart} ${timePart} 2026`)
    return d < new Date()
  } catch {
    return false
  }
}

// ─── Ticket Form ──────────────────────────────────────────────────────────────
const TicketForm: FC<{
  form: Partial<Ticket>
  onChange: (patch: Partial<Ticket>) => void
}> = ({ form, onChange }) => {
  const f =
    (field: keyof Ticket) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ [field]: e.target.value } as Partial<Ticket>)

  return (
    <div className="space-y-4">
      {/* Row 1: Villa / Category / Priority */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Villa</label>
          <select className="input-field" value={form.villa ?? ''} onChange={f('villa')}>
            <option value="">Select villa…</option>
            {villasMaster.map((v) => (
              <option key={v.id} value={v.name}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Category</label>
          <select className="input-field" value={form.category ?? ''} onChange={f('category')}>
            <option value="">Select category…</option>
            {ticketCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Priority</label>
          <select className="input-field" value={form.priority ?? ''} onChange={f('priority')}>
            <option value="">Select priority…</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Row 2: Issue Description */}
      <div>
        <label className="text-xs font-medium text-cocoa-600 mb-1 block">Issue Description *</label>
        <input
          type="text"
          className="input-field w-full"
          value={form.issue ?? ''}
          onChange={f('issue')}
          placeholder="Describe the issue…"
        />
      </div>

      {/* AI info box */}
      <div className="flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-xl p-3.5">
        <Sparkles className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-teal-700 leading-relaxed">
          Describe the issue in detail for AI-assisted diagnosis. Diagnosis will be generated after submission.
        </p>
      </div>

      {/* Row 3: Vendor / Cost */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Assign Vendor</label>
          <select className="input-field" value={form.vendorId ?? ''} onChange={f('vendorId')}>
            <option value="">Unassigned</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Estimated Cost IDR</label>
          <input
            type="number"
            className="input-field"
            value={form.estimatedCost ?? ''}
            onChange={(e) => onChange({ estimatedCost: e.target.value ? Number(e.target.value) : null as unknown as number })}
            placeholder="350000"
          />
        </div>
      </div>

      {/* Row 4: Est. Time / SLA */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Est. Completion Time</label>
          <input
            type="text"
            className="input-field"
            value={form.estimatedTime ?? ''}
            onChange={f('estimatedTime')}
            placeholder="2h"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">SLA Deadline</label>
          <input
            type="datetime-local"
            className="input-field"
            value={form.slaDeadline ?? ''}
            onChange={f('slaDeadline')}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-xs font-medium text-cocoa-600 mb-1 block">Notes</label>
        <textarea
          rows={3}
          className="input-field resize-none w-full"
          value={form.notes ?? ''}
          onChange={f('notes')}
          placeholder="Additional notes…"
        />
      </div>
    </div>
  )
}

// ─── Ticket Card ─────────────────────────────────────────────────────────────
const TicketCard: FC<{ ticket: Ticket; selected: boolean; onClick: () => void }> = ({
  ticket, selected, onClick,
}) => {
  const pc = priorityConfig[ticket.priority as keyof typeof priorityConfig]
  const overdue = isSlaOverdue(ticket.slaDeadline)

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full text-left bg-white rounded-2xl border p-3.5 shadow-card hover:shadow-card-hover transition-all duration-200 space-y-2.5',
        selected ? 'border-navy-300 ring-2 ring-navy-200' : 'border-sand-300',
      )}
    >
      {/* Top row: priority dot + ID */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', pc.dot)} />
          <span className="text-xs font-mono text-cocoa-500">{ticket.id}</span>
        </div>
        <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full border', pc.badge)}>
          {pc.label}
        </span>
      </div>

      {/* Issue */}
      <p className="text-sm font-semibold text-cocoa-800 leading-snug line-clamp-2">{ticket.issue}</p>

      {/* Villa + Category */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-cocoa-500">{ticket.villa}</span>
        <span className="badge-info text-xs">{ticket.category}</span>
      </div>

      {/* Assignee */}
      <div className="flex items-center gap-1.5">
        <User className="w-3 h-3 text-cocoa-500" />
        {ticket.assignedTo ? (
          <span className="text-xs text-cocoa-600 font-medium">{ticket.assignedTo}</span>
        ) : (
          <span className="text-xs font-medium text-terra-600 bg-terra-50 border border-terra-200 px-1.5 py-0.5 rounded-full">
            Unassigned
          </span>
        )}
      </div>

      {/* SLA + Cost */}
      <div className="flex items-center justify-between gap-2 pt-0.5 border-t border-sand-100">
        <div className={clsx('flex items-center gap-1 text-xs', overdue ? 'text-terra-600' : 'text-cocoa-500')}>
          <Clock className="w-3 h-3" />
          <span>{ticket.slaDeadline}</span>
        </div>
        <span className="text-xs font-semibold text-navy-700">
          {formatIDR(ticket.estimatedCost)}
        </span>
      </div>
    </button>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
const TicketDetail: FC<{
  ticket: Ticket
  onStatusChange: (id: string, status: Ticket['status']) => void
  onEdit: () => void
  onClose: () => void
  onDelete: () => void
}> = ({ ticket, onStatusChange, onEdit, onClose, onDelete }) => {
  const [notes, setNotes] = useState(ticket.notes)
  const [actualCost, setActualCost] = useState(ticket.actualCost?.toString() ?? '')
  const pc = priorityConfig[ticket.priority as keyof typeof priorityConfig]
  const overdue = isSlaOverdue(ticket.slaDeadline)

  const assignedVendor = vendors.find((v) => v.id === ticket.vendorId)

  return (
    <div className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-navy-900 px-5 py-4 bg-batik">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-navy-300">{ticket.id}</span>
              <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full border', pc.badge)}>
                {pc.label} Priority
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold text-white leading-tight">
              {ticket.issue}
            </h3>
            <p className="text-xs text-navy-300 mt-1">{ticket.villa} &middot; {ticket.category}</p>
          </div>
        </div>

        {/* Status Selector + Edit btn */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-navy-400">Status:</span>
          <select
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value as Ticket['status'])}
            className="text-xs bg-white/10 text-white border border-white/20 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="pending-parts">Pending Parts</option>
            <option value="scheduled">Scheduled</option>
            <option value="resolved">Resolved</option>
          </select>
          <button onClick={onEdit} className="btn-secondary text-xs py-1.5 px-3">
            Edit Ticket
          </button>
        </div>
      </div>

      <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-320px)]">
        {/* AI Diagnosis */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">AI Diagnosis</span>
          </div>
          <p className="text-sm text-teal-800 italic leading-relaxed">{ticket.aiDiagnosis}</p>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-sand-50 rounded-xl p-3 border border-sand-300">
            <div className="text-xs text-cocoa-500 mb-0.5">Created by</div>
            <div className="text-xs font-semibold text-cocoa-800">{ticket.createdBy}</div>
            <div className="text-xs text-cocoa-500 mt-0.5">{ticket.createdAt}</div>
          </div>
          <div className="bg-sand-50 rounded-xl p-3 border border-sand-300">
            <div className="text-xs text-cocoa-500 mb-0.5">Est. Time</div>
            <div className="text-xs font-semibold text-cocoa-800">{ticket.estimatedTime}</div>
          </div>
        </div>

        {/* SLA Deadline */}
        <div className={clsx(
          'flex items-center gap-3 rounded-xl p-3 border',
          overdue
            ? 'bg-terra-50 border-terra-200'
            : 'bg-sand-50 border-sand-300',
        )}>
          <Clock className={clsx('w-4 h-4 flex-shrink-0', overdue ? 'text-terra-500' : 'text-cocoa-500')} />
          <div>
            <div className="text-xs text-cocoa-500">SLA Deadline</div>
            <div className={clsx('text-sm font-semibold', overdue ? 'text-terra-700' : 'text-cocoa-800')}>
              {ticket.slaDeadline}
            </div>
          </div>
          {overdue && (
            <span className="ml-auto badge-danger text-xs">Overdue</span>
          )}
          {!overdue && (
            <span className="ml-auto badge-success text-xs">On Track</span>
          )}
        </div>

        {/* Assignee / Vendor */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-2">Assigned Vendor</h4>
          {assignedVendor ? (
            <div className="flex items-center gap-3 bg-sand-50 border border-sand-300 rounded-xl p-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-xs font-bold text-navy-700">
                  {assignedVendor.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-cocoa-800">{assignedVendor.name}</div>
                <div className="text-xs text-cocoa-500">{assignedVendor.specialty} &middot; {assignedVendor.area}</div>
              </div>
              <span className={clsx(
                'text-xs font-medium px-2 py-0.5 rounded-full border',
                assignedVendor.available
                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                  : 'bg-sand-100 text-cocoa-500 border-sand-300',
              )}>
                {assignedVendor.available ? 'Available' : 'Busy'}
              </span>
            </div>
          ) : (
            <div>
              <select className="input-field text-sm">
                <option value="">— Assign Vendor —</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.specialty})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Cost Tracking */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-2">Cost Tracking</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-sand-50 rounded-xl p-3 border border-sand-300">
              <div className="text-xs text-cocoa-500 mb-1">Estimated</div>
              <div className="text-sm font-semibold text-cocoa-800">{formatIDR(ticket.estimatedCost)}</div>
            </div>
            <div className="bg-sand-50 rounded-xl p-3 border border-sand-300">
              <div className="text-xs text-cocoa-500 mb-1">Actual</div>
              {ticket.status === 'resolved' ? (
                <input
                  type="number"
                  placeholder="Enter actual…"
                  value={actualCost}
                  onChange={(e) => setActualCost(e.target.value)}
                  className="input-field text-xs py-1.5"
                />
              ) : (
                <div className="text-sm font-semibold text-cocoa-500">
                  {ticket.actualCost != null ? formatIDR(ticket.actualCost) : 'Pending'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-2">Notes</h4>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field text-xs resize-none"
            placeholder="Add notes…"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1 flex-wrap">
          <button className="btn-primary flex-1 justify-center text-xs py-2.5">
            <CheckCircle className="w-3.5 h-3.5" />Update Status
          </button>
          <button onClick={onClose} className="btn-gold flex-1 justify-center text-xs py-2.5">
            <CheckCircle className="w-3.5 h-3.5" />Close Ticket
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-terra-200 bg-terra-50 text-terra-600 text-xs font-medium hover:bg-terra-100"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main View ────────────────────────────────────────────────────────────────
const MaintenanceTickets: FC = () => {
  const [tickets, setTickets] = useState(maintenanceTickets as Ticket[])
  const [selectedTicket, setSelectedTicket] = useState<Ticket>(maintenanceTickets[0] as Ticket)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [closeId, setCloseId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Ticket>>({})

  const handleStatusChange = (id: string, status: Ticket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    )
    setSelectedTicket((prev) => (prev.id === id ? { ...prev, status } : prev))
  }

  const openCreate = () => {
    setForm({})
    setCreateOpen(true)
  }

  const openEdit = () => {
    setForm({ ...selectedTicket })
    setEditOpen(true)
  }

  const handleCreate = () => {
    const selectedVendor = vendors.find((v) => v.id === form.vendorId)
    const newTicket: Ticket = {
      id: `TK${String(tickets.length + 1).padStart(3, '0')}`,
      villa: form.villa ?? '',
      villaId: villasMaster.find((v) => v.name === form.villa)?.id ?? '',
      issue: form.issue ?? '',
      category: form.category ?? '',
      priority: (form.priority as Ticket['priority']) ?? 'medium',
      status: 'open',
      createdAt: 'Today',
      createdBy: 'Made Suarjana',
      assignedTo: selectedVendor?.name ?? null,
      vendorId: form.vendorId ?? null,
      estimatedCost: form.estimatedCost ?? null,
      actualCost: null,
      estimatedTime: form.estimatedTime ?? '',
      aiDiagnosis: 'Pending AI analysis — submitted for review.',
      slaDeadline: form.slaDeadline ?? '',
      notes: form.notes ?? '',
      photos: 0,
    }
    setTickets((prev) => [newTicket, ...prev])
    setSelectedTicket(newTicket)
    setCreateOpen(false)
  }

  const handleEdit = () => {
    const selectedVendor = vendors.find((v) => v.id === form.vendorId)
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              ...form,
              assignedTo: selectedVendor?.name ?? t.assignedTo,
            }
          : t,
      ),
    )
    setSelectedTicket((prev) => ({
      ...prev,
      ...form,
      assignedTo: selectedVendor?.name ?? prev.assignedTo,
    }))
    setEditOpen(false)
  }

  const handleClose = () => {
    setTickets((prev) =>
      prev.map((t) => (t.id === closeId ? { ...t, status: 'resolved' } : t)),
    )
    if (selectedTicket.id === closeId) {
      setSelectedTicket((prev) => ({ ...prev, status: 'resolved' }))
    }
    setCloseId(null)
  }

  const handleDelete = () => {
    const remaining = tickets.filter((t) => t.id !== deleteId)
    setTickets(remaining)
    setSelectedTicket(remaining[0])
    setDeleteId(null)
  }

  const filtered = tickets.filter((t) => {
    const matchCat = categoryFilter === 'All' || t.category === categoryFilter
    const matchPri = priorityFilter === 'All' || t.priority === priorityFilter
    const matchSearch =
      search === '' ||
      t.issue.toLowerCase().includes(search.toLowerCase()) ||
      t.villa.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchPri && matchSearch
  })

  // KPI stats
  const openCount       = tickets.filter((t) => t.status === 'open').length
  const inProgressCount = tickets.filter((t) => t.status === 'in-progress').length
  const pendingCount    = tickets.filter((t) => t.status === 'pending-parts' || t.status === 'scheduled').length
  const resolvedCount   = tickets.filter((t) => t.status === 'resolved').length
  const avgTime         = '2.4h'

  const kpis = [
    { label: 'Open',          value: openCount,       icon: AlertTriangle, style: 'text-terra-500' },
    { label: 'In Progress',   value: inProgressCount, icon: Wrench,        style: 'text-gold-500' },
    { label: 'Pending',       value: pendingCount,    icon: PackageSearch, style: 'text-navy-500' },
    { label: 'Resolved',      value: resolvedCount,   icon: CheckCircle,   style: 'text-teal-500' },
    { label: 'Avg Resolution',value: avgTime,         icon: Clock,         style: 'text-cocoa-500' },
  ]

  return (
    <div className="space-y-4 animate-fade-in">
      {/* KPI Chips */}
      <div className="flex flex-wrap gap-2">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <div key={k.label} className="flex items-center gap-2 bg-white border border-sand-300 rounded-xl px-4 py-2.5 shadow-card">
              <Icon className={clsx('w-4 h-4', k.style)} />
              <span className="font-display text-lg font-semibold text-cocoa-800">{k.value}</span>
              <span className="text-xs text-cocoa-500">{k.label}</span>
            </div>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={openCreate} className="btn-primary py-2">
          <Plus className="w-4 h-4" />New Ticket
        </button>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-500" />
          <input
            type="text"
            placeholder="Search tickets…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm w-48"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={clsx(
                'flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200',
                categoryFilter === c
                  ? 'bg-navy-800 text-white border-navy-800'
                  : 'bg-white text-cocoa-600 border-sand-300 hover:border-navy-300',
              )}
            >{c}</button>
          ))}
        </div>

        {/* Priority filter */}
        <div className="flex items-center gap-1.5 ml-1">
          {priorities.map((p) => {
            const label = p === 'All' ? 'All Priority' : priorityConfig[p as keyof typeof priorityConfig].label
            return (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={clsx(
                  'flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200',
                  priorityFilter === p
                    ? 'bg-navy-800 text-white border-navy-800'
                    : p === 'high'   ? 'bg-terra-50 text-terra-700 border-terra-200 hover:bg-terra-100'
                    : p === 'medium' ? 'bg-gold-50 text-gold-700 border-gold-200 hover:bg-gold-100'
                    : p === 'low'    ? 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100'
                    : 'bg-white text-cocoa-600 border-sand-300 hover:border-navy-300',
                )}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* Kanban + Detail */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Kanban Board */}
        <div className="col-span-12 xl:col-span-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 min-h-[400px]">
            {kanbanColumns.map((col) => {
              const colTickets = filtered.filter((t) => t.status === col.status)
              const hStyle = colHeaderStyle[col.col as keyof typeof colHeaderStyle]

              return (
                <div key={col.status} className="flex flex-col gap-2">
                  {/* Column Header */}
                  <div className={clsx('flex items-center justify-between px-3 py-2 rounded-xl border', hStyle)}>
                    <span className="text-xs font-semibold">{col.label}</span>
                    <span className="text-xs font-bold w-5 h-5 rounded-full bg-white/60 flex items-center justify-center">
                      {colTickets.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-2 flex-1">
                    {colTickets.length === 0 && (
                      <div className="border-2 border-dashed border-sand-300 rounded-2xl p-4 text-center">
                        <p className="text-xs text-cocoa-300">No tickets</p>
                      </div>
                    )}
                    {colTickets.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        selected={selectedTicket.id === ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-12 xl:col-span-4 sticky top-20">
          <TicketDetail
            ticket={selectedTicket}
            onStatusChange={handleStatusChange}
            onEdit={openEdit}
            onClose={() => setCloseId(selectedTicket?.id ?? null)}
            onDelete={() => setDeleteId(selectedTicket?.id ?? null)}
          />
        </div>
      </div>

      {/* Create Ticket Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Maintenance Ticket"
        subtitle="Log a new issue and assign to a vendor"
        size="xl"
        footer={
          <>
            <button onClick={() => setCreateOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleCreate} className="btn-primary">Create Ticket</button>
          </>
        }
      >
        <TicketForm form={form} onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))} />
      </Modal>

      {/* Edit Ticket Modal */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Ticket"
        size="xl"
        footer={
          <>
            <button onClick={() => setEditOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleEdit} className="btn-primary">Save Changes</button>
          </>
        }
      >
        <TicketForm form={form} onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))} />
      </Modal>

      {/* Close Ticket Confirm */}
      <ConfirmDialog
        open={closeId !== null}
        onClose={() => setCloseId(null)}
        onConfirm={handleClose}
        title="Close Ticket"
        message="Mark this ticket as resolved? Confirm the final resolution."
        confirmLabel="Close Ticket"
        variant="warning"
      />

      {/* Delete Ticket Confirm */}
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Ticket"
        message={`Permanently delete ticket ${tickets.find((t) => t.id === deleteId)?.id ?? ''}?`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}

export default MaintenanceTickets
