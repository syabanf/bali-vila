import { type FC, useState } from 'react'
import {
  Plus, Search, Clock, Sparkles, AlertTriangle,
  Wrench, CheckCircle, Loader, PackageSearch, User,
} from 'lucide-react'
import { maintenanceTickets, vendors } from '../../data/mockData'
import clsx from 'clsx'

type Ticket = typeof maintenanceTickets[number]

// ─── Config ───────────────────────────────────────────────────────────────────
const categories = ['All', 'Plumbing', 'Electrical', 'Air Conditioning', 'Pool', 'Carpentry', 'IT / WiFi']
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
        selected ? 'border-navy-300 ring-2 ring-navy-200' : 'border-sand-200',
      )}
    >
      {/* Top row: priority dot + ID */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', pc.dot)} />
          <span className="text-xs font-mono text-cocoa-400">{ticket.id}</span>
        </div>
        <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full border', pc.badge)}>
          {pc.label}
        </span>
      </div>

      {/* Issue */}
      <p className="text-sm font-semibold text-navy-800 leading-snug line-clamp-2">{ticket.issue}</p>

      {/* Villa + Category */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-cocoa-500">{ticket.villa}</span>
        <span className="badge-info text-xs">{ticket.category}</span>
      </div>

      {/* Assignee */}
      <div className="flex items-center gap-1.5">
        <User className="w-3 h-3 text-cocoa-400" />
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
        <div className={clsx('flex items-center gap-1 text-xs', overdue ? 'text-terra-600' : 'text-cocoa-400')}>
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
}> = ({ ticket, onStatusChange }) => {
  const [notes, setNotes] = useState(ticket.notes)
  const [actualCost, setActualCost] = useState(ticket.actualCost?.toString() ?? '')
  const pc = priorityConfig[ticket.priority as keyof typeof priorityConfig]
  const overdue = isSlaOverdue(ticket.slaDeadline)

  const assignedVendor = vendors.find((v) => v.id === ticket.vendorId)

  return (
    <div className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
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

        {/* Status Selector */}
        <div className="mt-3 flex items-center gap-2">
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
          <div className="bg-sand-50 rounded-xl p-3 border border-sand-200">
            <div className="text-xs text-cocoa-400 mb-0.5">Created by</div>
            <div className="text-xs font-semibold text-navy-800">{ticket.createdBy}</div>
            <div className="text-xs text-cocoa-400 mt-0.5">{ticket.createdAt}</div>
          </div>
          <div className="bg-sand-50 rounded-xl p-3 border border-sand-200">
            <div className="text-xs text-cocoa-400 mb-0.5">Est. Time</div>
            <div className="text-xs font-semibold text-navy-800">{ticket.estimatedTime}</div>
          </div>
        </div>

        {/* SLA Deadline */}
        <div className={clsx(
          'flex items-center gap-3 rounded-xl p-3 border',
          overdue
            ? 'bg-terra-50 border-terra-200'
            : 'bg-sand-50 border-sand-200',
        )}>
          <Clock className={clsx('w-4 h-4 flex-shrink-0', overdue ? 'text-terra-500' : 'text-cocoa-400')} />
          <div>
            <div className="text-xs text-cocoa-400">SLA Deadline</div>
            <div className={clsx('text-sm font-semibold', overdue ? 'text-terra-700' : 'text-navy-800')}>
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
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-400 mb-2">Assigned Vendor</h4>
          {assignedVendor ? (
            <div className="flex items-center gap-3 bg-sand-50 border border-sand-200 rounded-xl p-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-xs font-bold text-navy-700">
                  {assignedVendor.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-navy-800">{assignedVendor.name}</div>
                <div className="text-xs text-cocoa-400">{assignedVendor.specialty} &middot; {assignedVendor.area}</div>
              </div>
              <span className={clsx(
                'text-xs font-medium px-2 py-0.5 rounded-full border',
                assignedVendor.available
                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                  : 'bg-sand-100 text-cocoa-500 border-sand-200',
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
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-400 mb-2">Cost Tracking</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-sand-50 rounded-xl p-3 border border-sand-200">
              <div className="text-xs text-cocoa-400 mb-1">Estimated</div>
              <div className="text-sm font-semibold text-navy-800">{formatIDR(ticket.estimatedCost)}</div>
            </div>
            <div className="bg-sand-50 rounded-xl p-3 border border-sand-200">
              <div className="text-xs text-cocoa-400 mb-1">Actual</div>
              {ticket.status === 'resolved' ? (
                <input
                  type="number"
                  placeholder="Enter actual…"
                  value={actualCost}
                  onChange={(e) => setActualCost(e.target.value)}
                  className="input-field text-xs py-1.5"
                />
              ) : (
                <div className="text-sm font-semibold text-cocoa-400">
                  {ticket.actualCost != null ? formatIDR(ticket.actualCost) : 'Pending'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-400 mb-2">Notes</h4>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field text-xs resize-none"
            placeholder="Add notes…"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button className="btn-primary flex-1 justify-center text-xs py-2.5">
            <CheckCircle className="w-3.5 h-3.5" />Update Status
          </button>
          <button className="btn-gold flex-1 justify-center text-xs py-2.5">
            <CheckCircle className="w-3.5 h-3.5" />Close Ticket
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main View ────────────────────────────────────────────────────────────────
const MaintenanceTickets: FC = () => {
  const [tickets, setTickets] = useState(maintenanceTickets)
  const [selectedTicket, setSelectedTicket] = useState<Ticket>(maintenanceTickets[0])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const handleStatusChange = (id: string, status: Ticket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    )
    setSelectedTicket((prev) => (prev.id === id ? { ...prev, status } : prev))
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
    { label: 'Avg Resolution',value: avgTime,         icon: Clock,         style: 'text-cocoa-400' },
  ]

  return (
    <div className="space-y-4 animate-fade-in">
      {/* KPI Chips */}
      <div className="flex flex-wrap gap-2">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <div key={k.label} className="flex items-center gap-2 bg-white border border-sand-200 rounded-xl px-4 py-2.5 shadow-card">
              <Icon className={clsx('w-4 h-4', k.style)} />
              <span className="font-display text-lg font-semibold text-navy-800">{k.value}</span>
              <span className="text-xs text-cocoa-400">{k.label}</span>
            </div>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-primary py-2">
          <Plus className="w-4 h-4" />New Ticket
        </button>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-400" />
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
                  : 'bg-white text-cocoa-600 border-sand-200 hover:border-navy-300',
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
                    : 'bg-white text-cocoa-600 border-sand-200 hover:border-navy-300',
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
                      <div className="border-2 border-dashed border-sand-200 rounded-2xl p-4 text-center">
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
          />
        </div>
      </div>
    </div>
  )
}

export default MaintenanceTickets
