import { useState, useMemo, type FC } from 'react'
import { bookings, villasMaster } from '../../data/mockData'
import {
  Plus, Search, Calendar, CalendarCheck, Sparkles, Send,
  Wrench, ChevronDown, DollarSign, Users, CheckCircle2, Clock,
  MapPin, MessageSquare, Filter,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingStatus = 'Confirmed' | 'Pending Payment' | 'Provisional' | 'Checked In' | 'Cancelled'
type Channel = 'Direct' | 'OTA' | 'WhatsApp' | 'Website' | 'Referral'

interface Booking {
  id: string
  guestName: string
  guestAvatar: string
  guestNationality: string
  villa: string
  villaId: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  channel: Channel
  status: BookingStatus
  value: number
  paid: number
  notes: string
  supervisor: string
  createdAt: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatIDR(n: number): string {
  if (n >= 1_000_000) return `IDR ${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `IDR ${(n / 1_000).toFixed(0)}K`
  return `IDR ${n}`
}

function channelBadgeClass(channel: Channel): string {
  switch (channel) {
    case 'Direct': return 'bg-navy-800 text-white'
    case 'OTA': return 'bg-teal-600 text-white'
    case 'WhatsApp': return 'bg-teal-50 text-teal-700 border border-teal-200'
    case 'Website': return 'bg-gold-100 text-gold-800 border border-gold-200'
    case 'Referral': return 'bg-terra-100 text-terra-700 border border-terra-200'
    default: return 'bg-sand-200 text-cocoa-600'
  }
}

function statusBadge(status: BookingStatus) {
  switch (status) {
    case 'Confirmed': return 'badge-success'
    case 'Pending Payment': return 'badge-warning'
    case 'Provisional': return 'badge-info'
    case 'Checked In': return 'bg-navy-800 text-white rounded-full px-2.5 py-0.5 text-xs font-medium inline-flex items-center'
    case 'Cancelled': return 'badge-danger'
    default: return 'badge-info'
  }
}

const STATUS_FLOW: BookingStatus[] = ['Provisional', 'Confirmed', 'Checked In', 'Cancelled']
const ALL_STATUSES: BookingStatus[] = ['Confirmed', 'Pending Payment', 'Provisional', 'Checked In', 'Cancelled']
const ALL_CHANNELS: Channel[] = ['Direct', 'OTA', 'WhatsApp', 'Website', 'Referral']

// ─── Booking Row Card ─────────────────────────────────────────────────────────

function BookingCard({
  booking,
  selected,
  onClick,
}: {
  booking: Booking
  selected: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-navy-400 bg-navy-50 ring-2 ring-navy-200 shadow-card'
          : 'border-sand-200 bg-white hover:border-navy-200 hover:shadow-card'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center text-navy-800 font-display font-semibold text-sm flex-shrink-0">
          {booking.guestAvatar}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-navy-800 text-sm leading-tight">{booking.guestName}</div>
              <div className="text-xs text-cocoa-400 mt-0.5">{booking.guestNationality} · Added {booking.createdAt}</div>
            </div>
            <div className="flex-shrink-0">
              <span className={statusBadge(booking.status)}>{booking.status}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs font-medium text-navy-700">{booking.villa}</span>
            <span className="text-sand-400 text-xs">·</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${channelBadgeClass(booking.channel)}`}>
              {booking.channel}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-2 text-xs text-cocoa-500">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} · {booking.nights} nights</span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="font-display text-sm font-semibold text-navy-800">{formatIDR(booking.value)}</span>
            {booking.paid < booking.value && (
              <span className="text-xs text-gold-700 font-medium">
                {formatIDR(booking.paid)} paid
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Booking Detail Panel ─────────────────────────────────────────────────────

function BookingDetail({ booking }: { booking: Booking }) {
  const [notes, setNotes] = useState(booking.notes)
  const [newStatus, setNewStatus] = useState<BookingStatus>(booking.status)

  const villa = villasMaster.find(v => v.id === booking.villaId)
  const paymentPct = Math.round((booking.paid / booking.value) * 100)

  const currentStepIndex = STATUS_FLOW.indexOf(booking.status)

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-800 to-navy-700 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold-400/20 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-2xl font-bold text-gold-300">{booking.guestAvatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-semibold text-white">{booking.guestName}</h2>
            <p className="text-navy-200 text-sm mt-0.5">{booking.guestNationality}</p>
            <p className="text-navy-300 text-xs mt-1 font-mono">{booking.id}</p>
          </div>
          <span className={statusBadge(booking.status)}>{booking.status}</span>
        </div>

        {/* Dates bar */}
        <div className="mt-4 bg-white/10 rounded-xl p-3 flex items-center gap-3">
          <CalendarCheck className="w-4 h-4 text-gold-300 flex-shrink-0" />
          <div className="text-sm text-white">
            <span className="font-semibold">{formatDate(booking.checkIn)}</span>
            <span className="text-navy-300 mx-2">→</span>
            <span className="font-semibold">{formatDate(booking.checkOut)}</span>
          </div>
          <span className="ml-auto text-xs text-navy-300">{booking.nights} nights</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* 4 mini stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Calendar className="w-4 h-4" />, label: 'Nights', value: String(booking.nights), color: 'text-navy-700' },
            { icon: <Users className="w-4 h-4" />, label: 'Guests', value: String(booking.guests), color: 'text-navy-700' },
            { icon: <DollarSign className="w-4 h-4" />, label: 'Total Value', value: formatIDR(booking.value), color: 'text-navy-700' },
            { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Paid', value: formatIDR(booking.paid), color: paymentPct === 100 ? 'text-teal-600' : 'text-gold-700' },
          ].map(stat => (
            <div key={stat.label} className="bg-sand-50 rounded-xl p-3 border border-sand-200">
              <div className="flex items-center gap-1.5 text-cocoa-400 mb-1">
                {stat.icon}
                <span className="text-xs">{stat.label}</span>
              </div>
              <div className={`font-display text-base font-semibold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Payment progress */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wide">Payment Progress</span>
            <span className="text-xs font-bold text-navy-700">{paymentPct}%</span>
          </div>
          <div className="h-2 bg-sand-100 rounded-full overflow-hidden border border-sand-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-500"
              style={{ width: `${paymentPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1 text-xs text-cocoa-400">
            <span>{formatIDR(booking.paid)} paid</span>
            <span>{formatIDR(booking.value - booking.paid)} remaining</span>
          </div>
        </div>

        {/* Villa info */}
        {villa && (
          <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-cocoa-400" />
              <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wide">Villa</span>
            </div>
            <div className="font-semibold text-navy-800">{villa.name}</div>
            <div className="text-xs text-cocoa-400 mt-0.5">{villa.zone} · {villa.type}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-cocoa-500">
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3" /> Max {villa.maxGuests} guests
              </span>
              <span className="text-sand-400">·</span>
              <span>{villa.bedrooms} BR</span>
            </div>
            <div className="mt-2 text-xs text-cocoa-500">
              Supervisor: <span className="font-medium text-navy-700">{booking.supervisor}</span>
            </div>
          </div>
        )}

        {/* Channel + notes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wide">Booking Channel</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${channelBadgeClass(booking.channel)}`}>
              {booking.channel}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cocoa-400" />
              <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wide">Notes</span>
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="input-field resize-none text-xs"
              placeholder="Add notes about this booking..."
            />
          </div>
        </div>

        {/* Guest Actions */}
        <div>
          <div className="text-xs font-semibold text-cocoa-500 uppercase tracking-wide mb-2">Guest Actions</div>
          <div className="space-y-2">
            <button className="btn-gold w-full justify-center">
              <Sparkles className="w-4 h-4" />
              Generate Announcement
            </button>
            <button className="btn-secondary w-full justify-center">
              <Send className="w-4 h-4" />
              Send Check-in Details
            </button>
            <button className="btn-secondary w-full justify-center">
              <Wrench className="w-4 h-4" />
              Create Maintenance Ticket
            </button>
          </div>
        </div>

        {/* Status flow */}
        <div>
          <div className="text-xs font-semibold text-cocoa-500 uppercase tracking-wide mb-3">Booking Status Flow</div>
          <div className="flex items-center gap-0">
            {STATUS_FLOW.map((step, i) => {
              const isActive = step === booking.status
              const isPast = currentStepIndex !== -1 && i < currentStepIndex
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center flex-1 ${i > 0 ? '' : ''}`}>
                    {i > 0 && (
                      <div className={`w-full h-0.5 mb-1 rounded-full ${isPast || isActive ? 'bg-navy-600' : 'bg-sand-200'}`} />
                    )}
                    {i === 0 && <div className="w-full h-0.5 mb-1 opacity-0" />}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? 'bg-navy-800 border-navy-800'
                        : isPast
                        ? 'bg-teal-400 border-teal-400'
                        : 'bg-white border-sand-300'
                    }`}>
                      {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className={`text-center mt-1 leading-tight ${isActive ? 'text-navy-800 font-semibold' : isPast ? 'text-teal-600' : 'text-cocoa-300'}`}
                      style={{ fontSize: '9px' }}>
                      {step}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status update */}
        <div className="border-t border-sand-100 pt-4">
          <div className="text-xs font-semibold text-cocoa-500 uppercase tracking-wide mb-2">Update Status</div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as BookingStatus)}
                className="input-field appearance-none pr-8 text-sm"
              >
                {ALL_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-cocoa-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button className="btn-primary flex-shrink-0">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

const BookingManagement: FC = () => {
  const [selectedId, setSelectedId] = useState<string>(bookings[0].id)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'All'>('All')
  const [channelFilter, setChannelFilter] = useState<Channel | 'All'>('All')

  const typedBookings = bookings as Booking[]

  const filtered = useMemo(() => {
    return typedBookings.filter(b => {
      const matchSearch =
        !search ||
        b.guestName.toLowerCase().includes(search.toLowerCase()) ||
        b.villa.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'All' || b.status === statusFilter
      const matchChannel = channelFilter === 'All' || b.channel === channelFilter
      return matchSearch && matchStatus && matchChannel
    })
  }, [typedBookings, search, statusFilter, channelFilter])

  const selectedBooking = typedBookings.find(b => b.id === selectedId) ?? typedBookings[0]

  const totalValue = filtered.reduce((s, b) => s + b.value, 0)
  const confirmedValue = filtered.filter(b => b.status === 'Confirmed' || b.status === 'Checked In').reduce((s, b) => s + b.value, 0)
  const pendingValue = filtered.filter(b => b.status === 'Pending Payment' || b.status === 'Provisional').reduce((s, b) => s + b.value, 0)
  const checkedIn = filtered.filter(b => b.status === 'Checked In').length

  const statusPills: (BookingStatus | 'All')[] = ['All', 'Confirmed', 'Checked In', 'Pending Payment', 'Provisional']

  return (
    <div className="animate-fade-in flex flex-col h-full space-y-4">
      {/* Top bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-navy-800">Booking Management</h1>
            <p className="text-sm text-cocoa-400 mt-0.5">Manage reservations, track payments, and coordinate guest stays</p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 text-cocoa-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search guest or villa..."
              className="input-field pl-9"
            />
          </div>

          {/* Status pills */}
          <div className="flex items-center gap-1 bg-sand-100 rounded-xl p-1 border border-sand-200">
            {statusPills.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  statusFilter === s
                    ? 'bg-white text-navy-800 shadow-sm border border-sand-200'
                    : 'text-cocoa-500 hover:text-navy-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Channel dropdown */}
          <div className="relative">
            <Filter className="w-3.5 h-3.5 text-cocoa-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={channelFilter}
              onChange={e => setChannelFilter(e.target.value as Channel | 'All')}
              className="input-field appearance-none pl-7 pr-7 py-2 text-xs w-36"
            >
              <option value="All">All Channels</option>
              {ALL_CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-cocoa-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Count + value */}
          <div className="text-sm text-cocoa-500 ml-auto hidden lg:block">
            <span className="font-semibold text-navy-700">{filtered.length}</span> bookings ·{' '}
            <span className="font-display font-semibold text-navy-800">{formatIDR(totalValue)}</span>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: 'Total Bookings', value: String(filtered.length), icon: <Calendar className="w-4 h-4" />, accent: 'bg-navy-50 text-navy-700' },
          { label: 'Confirmed Value', value: formatIDR(confirmedValue), icon: <CheckCircle2 className="w-4 h-4" />, accent: 'bg-teal-50 text-teal-700' },
          { label: 'Pending Value', value: formatIDR(pendingValue), icon: <Clock className="w-4 h-4" />, accent: 'bg-gold-50 text-gold-700' },
          { label: 'Active Stays', value: String(checkedIn), icon: <Users className="w-4 h-4" />, accent: 'bg-terra-50 text-terra-700' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-sand-200 shadow-card p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${k.accent}`}>
              {k.icon}
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-navy-800 leading-tight">{k.value}</div>
              <div className="text-xs text-cocoa-400">{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* List + Detail grid */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* List — col 7 */}
        <div className="col-span-12 xl:col-span-7 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-10 text-center">
                <Search className="w-8 h-8 text-sand-400 mx-auto mb-3" />
                <p className="text-sm text-cocoa-500">No bookings match your filters</p>
              </div>
            ) : (
              filtered.map(b => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  selected={b.id === selectedId}
                  onClick={() => setSelectedId(b.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Detail panel — col 5, sticky */}
        <div className="col-span-12 xl:col-span-5 xl:sticky xl:top-0 xl:self-start xl:max-h-screen xl:overflow-hidden">
          <BookingDetail key={selectedBooking.id} booking={selectedBooking} />
        </div>
      </div>
    </div>
  )
}

export default BookingManagement
