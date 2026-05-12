import { type FC, useState, useMemo } from 'react'
import {
  Home, Plus, Search, ChevronDown, Bed, Users, Maximize2,
  CalendarDays, DollarSign, BarChart2, Wrench, Camera,
  MapPin, User, ArrowRight, Edit2, BookOpen, ClipboardList, Trash2
} from 'lucide-react'
import { villasMaster } from '../../data/mockData'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import clsx from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────
type VillaStatus = 'Occupied' | 'Available' | 'Maintenance' | 'Cleaning'
type Zone = 'All' | 'Seminyak' | 'Canggu' | 'Ubud' | 'Jimbaran' | 'Bukit'

interface Villa {
  id: string
  name: string
  zone: string
  type: string
  bedrooms: number
  maxGuests: number
  ownerId: string
  ownerName: string
  status: VillaStatus
  supervisor: string
  yearBuilt: number
  monthlyRevenue: number
  occupancyRate: number
  maintenanceScore: number
  lastInspection: string
  nextAvailable: string
  amenities: string[]
  address: string
  size: number
  photos: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const zoneColors: Record<string, { bg: string; text: string; icon: string }> = {
  Seminyak: { bg: 'bg-teal-100', text: 'text-teal-700', icon: 'bg-teal-400' },
  Canggu:   { bg: 'bg-navy-100', text: 'text-navy-700', icon: 'bg-navy-400' },
  Ubud:     { bg: 'bg-gold-100', text: 'text-gold-700', icon: 'bg-gold-400' },
  Jimbaran: { bg: 'bg-terra-100', text: 'text-terra-700', icon: 'bg-terra-400' },
  Bukit:    { bg: 'bg-cocoa-50', text: 'text-cocoa-600', icon: 'bg-cocoa-400' },
}

const statusBadge: Record<VillaStatus, string> = {
  Occupied:    'badge-success',
  Available:   'badge-warning',
  Maintenance: 'badge-danger',
  Cleaning:    'badge-info',
}

const statusDot: Record<VillaStatus, string> = {
  Occupied:    'bg-teal-400',
  Available:   'bg-gold-400',
  Maintenance: 'bg-terra-400',
  Cleaning:    'bg-navy-400',
}

const kpiAccent = {
  gold:  { bg: 'bg-gold-50',  border: 'border-gold-200',  label: 'text-gold-700',  value: 'text-gold-800'  },
  teal:  { bg: 'bg-teal-50',  border: 'border-teal-200',  label: 'text-teal-700',  value: 'text-teal-800'  },
  navy:  { bg: 'bg-navy-50',  border: 'border-navy-200',  label: 'text-navy-700',  value: 'text-cocoa-800'  },
  plain: { bg: 'bg-sand-50',  border: 'border-sand-300',  label: 'text-cocoa-500', value: 'text-cocoa-800'  },
}

const ZONES: Zone[] = ['All', 'Seminyak', 'Canggu', 'Ubud', 'Jimbaran', 'Bukit']
const STATUSES: (VillaStatus | 'All')[] = ['All', 'Occupied', 'Available', 'Maintenance', 'Cleaning']

const AMENITY_OPTIONS = [
  'Pool', 'AC', 'WiFi', 'Kitchen', 'Garden',
  'BBQ', 'Gym', 'Spa', 'Ocean View', 'Jacuzzi',
]

// ─── Sub-components ───────────────────────────────────────────────────────────
interface KPIBlockProps {
  label: string
  value: string
  sub?: string
  accent: keyof typeof kpiAccent
  icon: React.ReactNode
}

const KPIBlock: FC<KPIBlockProps> = ({ label, value, sub, accent, icon }) => {
  const c = kpiAccent[accent]
  return (
    <div className={clsx('rounded-2xl p-4 border flex gap-3 items-start', c.bg, c.border)}>
      <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', c.bg, 'border', c.border)}>
        <span className={c.label}>{icon}</span>
      </div>
      <div className="min-w-0">
        <div className={clsx('font-display text-2xl font-semibold leading-none', c.value)}>{value}</div>
        {sub && <div className="text-xs text-cocoa-500 mt-0.5">{sub}</div>}
        <div className={clsx('text-xs font-medium mt-1', c.label)}>{label}</div>
      </div>
    </div>
  )
}

// ─── Villa Form ───────────────────────────────────────────────────────────────
interface VillaFormProps {
  form: Partial<Villa>
  setForm: React.Dispatch<React.SetStateAction<Partial<Villa>>>
}

const VillaForm: FC<VillaFormProps> = ({ form, setForm }) => {
  const amenities = (form.amenities as string[]) || []

  const toggleAmenity = (item: string) => {
    setForm((prev) => {
      const current = (prev.amenities as string[]) || []
      return {
        ...prev,
        amenities: current.includes(item)
          ? current.filter((a) => a !== item)
          : [...current, item],
      }
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {/* Villa Name */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">
            Villa Name <span className="text-terra-500">*</span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Villa Serenity"
            value={form.name || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        {/* Zone */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Zone</label>
          <select
            className="input-field"
            value={form.zone || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, zone: e.target.value }))}
          >
            <option value="">Select zone…</option>
            {(['Seminyak', 'Canggu', 'Ubud', 'Jimbaran', 'Bukit'] as const).map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Type</label>
          <input
            type="text"
            className="input-field"
            placeholder="Pool Villa, Heritage Villa…"
            value={form.type || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Bedrooms</label>
          <input
            type="number"
            className="input-field"
            min={1}
            value={form.bedrooms ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, bedrooms: Number(e.target.value) }))}
          />
        </div>

        {/* Max Guests */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Max Guests</label>
          <input
            type="number"
            className="input-field"
            min={1}
            value={form.maxGuests ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, maxGuests: Number(e.target.value) }))}
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Size m²</label>
          <input
            type="number"
            className="input-field"
            min={0}
            value={form.size ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, size: Number(e.target.value) }))}
          />
        </div>

        {/* Year Built */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Year Built</label>
          <input
            type="number"
            className="input-field"
            value={form.yearBuilt ?? new Date().getFullYear()}
            onChange={(e) => setForm((prev) => ({ ...prev, yearBuilt: Number(e.target.value) }))}
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Owner Name</label>
          <input
            type="text"
            className="input-field"
            value={form.ownerName || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, ownerName: e.target.value }))}
          />
        </div>

        {/* Supervisor */}
        <div>
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Supervisor</label>
          <input
            type="text"
            className="input-field"
            value={form.supervisor || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, supervisor: e.target.value }))}
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Address</label>
          <input
            type="text"
            className="input-field"
            value={form.address || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-xs font-medium text-cocoa-600 mb-2">Amenities</label>
        <div className="grid grid-cols-3 gap-2">
          {AMENITY_OPTIONS.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 p-2 rounded-xl border border-sand-300 bg-sand-50 cursor-pointer hover:bg-sand-100 transition-colors text-xs text-cocoa-700 font-medium select-none"
            >
              <input
                type="checkbox"
                className="rounded border-sand-300 text-navy-700 focus:ring-navy-500"
                checked={amenities.includes(item)}
                onChange={() => toggleAmenity(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const VillaMaster: FC = () => {
  const [villas, setVillas] = useState<Villa[]>(villasMaster as Villa[])
  const [selectedVilla, setSelectedVilla] = useState<Villa>(villasMaster[0] as Villa)
  const [search, setSearch] = useState('')
  const [activeZone, setActiveZone] = useState<Zone>('All')
  const [statusFilter, setStatusFilter] = useState<VillaStatus | 'All'>('All')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Villa>>({})

  const filtered = useMemo(() => {
    return villas.filter((v) => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.ownerName.toLowerCase().includes(search.toLowerCase())
      const matchZone = activeZone === 'All' || v.zone === activeZone
      const matchStatus = statusFilter === 'All' || v.status === statusFilter
      return matchSearch && matchZone && matchStatus
    })
  }, [villas, search, activeZone, statusFilter])

  const zoneColor = zoneColors[selectedVilla.zone] || zoneColors['Seminyak']

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!form.name?.trim()) return
    const newVilla: Villa = {
      id: `VL${Date.now().toString().slice(-4)}`,
      name: form.name.trim(),
      zone: form.zone || 'Seminyak',
      type: form.type || '',
      bedrooms: form.bedrooms ?? 1,
      maxGuests: form.maxGuests ?? 2,
      size: form.size ?? 0,
      yearBuilt: form.yearBuilt ?? new Date().getFullYear(),
      ownerName: form.ownerName || '',
      ownerId: '',
      supervisor: form.supervisor || '',
      address: form.address || '',
      amenities: (form.amenities as string[]) || [],
      status: 'Available',
      monthlyRevenue: 0,
      occupancyRate: 0,
      maintenanceScore: 100,
      photos: 0,
      lastInspection: '—',
      nextAvailable: 'Now',
    }
    setVillas((prev) => [newVilla, ...prev])
    setSelectedVilla(newVilla)
    setAddOpen(false)
    setForm({})
  }

  const handleEdit = () => {
    setVillas((prev) =>
      prev.map((v) =>
        v.id === selectedVilla.id
          ? {
              ...v,
              name: form.name ?? v.name,
              zone: form.zone ?? v.zone,
              type: form.type ?? v.type,
              bedrooms: form.bedrooms ?? v.bedrooms,
              maxGuests: form.maxGuests ?? v.maxGuests,
              size: form.size ?? v.size,
              yearBuilt: form.yearBuilt ?? v.yearBuilt,
              ownerName: form.ownerName ?? v.ownerName,
              supervisor: form.supervisor ?? v.supervisor,
              address: form.address ?? v.address,
              amenities: (form.amenities as string[]) ?? v.amenities,
            }
          : v
      )
    )
    setSelectedVilla((prev) => ({
      ...prev,
      name: form.name ?? prev.name,
      zone: form.zone ?? prev.zone,
      type: form.type ?? prev.type,
      bedrooms: form.bedrooms ?? prev.bedrooms,
      maxGuests: form.maxGuests ?? prev.maxGuests,
      size: form.size ?? prev.size,
      yearBuilt: form.yearBuilt ?? prev.yearBuilt,
      ownerName: form.ownerName ?? prev.ownerName,
      supervisor: form.supervisor ?? prev.supervisor,
      address: form.address ?? prev.address,
      amenities: (form.amenities as string[]) ?? prev.amenities,
    }))
    setEditOpen(false)
    setForm({})
  }

  const handleArchive = () => {
    const remaining = villas.filter((v) => v.id !== deleteId)
    setVillas(remaining)
    if (remaining.length > 0) {
      setSelectedVilla(remaining[0])
    }
    setDeleteId(null)
  }

  return (
    <div className="animate-fade-in h-full">
      <div className="grid grid-cols-12 gap-4 h-full">

        {/* ── Left Panel: Villa List ─────────────────────────────────────── */}
        <div className="col-span-12 xl:col-span-5 bg-white rounded-2xl border border-sand-300 shadow-card flex flex-col overflow-hidden">

          {/* Search + Add */}
          <div className="p-4 border-b border-sand-100 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoa-300" />
                <input
                  type="text"
                  placeholder="Search villas or owners…"
                  className="input-field pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="btn-primary whitespace-nowrap"
                onClick={() => { setForm({ yearBuilt: new Date().getFullYear(), amenities: [] }); setAddOpen(true) }}
              >
                <Plus className="w-4 h-4" />
                Add Villa
              </button>
            </div>

            {/* Zone filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {ZONES.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setActiveZone(zone)}
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                    activeZone === zone
                      ? 'bg-navy-800 text-white shadow-sm'
                      : 'bg-sand-100 text-cocoa-600 hover:bg-sand-200'
                  )}
                >
                  {zone}
                </button>
              ))}

              {/* Status dropdown */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowStatusDropdown((p) => !p)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sand-100 text-cocoa-600 hover:bg-sand-200 transition-all duration-200"
                >
                  {statusFilter === 'All' ? 'All Status' : statusFilter}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white border border-sand-300 rounded-xl shadow-card-hover z-20 overflow-hidden min-w-[130px]">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setStatusFilter(s); setShowStatusDropdown(false) }}
                        className={clsx(
                          'w-full text-left px-4 py-2 text-xs hover:bg-sand-50 transition-colors',
                          statusFilter === s ? 'text-cocoa-800 font-semibold bg-navy-50' : 'text-cocoa-600'
                        )}
                      >
                        {s === 'All' ? 'All Status' : s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-cocoa-500">{filtered.length} villa{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Villa list */}
          <div className="overflow-y-auto flex-1 divide-y divide-sand-100">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-cocoa-500">No villas match your filters.</div>
            ) : (
              filtered.map((villa) => {
                const zc = zoneColors[villa.zone] || zoneColors['Seminyak']
                const isSelected = selectedVilla.id === villa.id
                return (
                  <button
                    key={villa.id}
                    onClick={() => setSelectedVilla(villa)}
                    className={clsx(
                      'w-full p-4 text-left hover:bg-sand-50 transition-all duration-200',
                      isSelected && 'bg-navy-50 border-l-2 border-navy-700 ring-1 ring-inset ring-navy-100'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Zone icon */}
                      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', zc.icon)}>
                        <Home className="w-5 h-5 text-white" />
                      </div>

                      {/* Middle info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-cocoa-800 truncate">{villa.name}</span>
                          <span className={clsx('inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-sand-100 text-cocoa-600')}>
                            {villa.bedrooms} BR
                          </span>
                        </div>
                        <div className="text-xs text-cocoa-500 truncate">
                          {villa.zone} · {villa.type}
                        </div>
                      </div>

                      {/* Right: status + revenue */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className={statusBadge[villa.status]}>
                          <span className={clsx('w-1.5 h-1.5 rounded-full mr-1', statusDot[villa.status])} />
                          {villa.status}
                        </span>
                        <span className="font-display text-sm font-semibold text-cocoa-800">
                          ${villa.monthlyRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* ── Right Panel: Villa Detail ──────────────────────────────────── */}
        <div className="col-span-12 xl:col-span-7 bg-white rounded-2xl border border-sand-300 shadow-card flex flex-col overflow-hidden">

          {/* Dark navy header */}
          <div className="bg-navy-900 px-6 py-5 bg-batik flex-shrink-0">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-navy-300">{selectedVilla.zone}</span>
                  <span className="text-navy-500">·</span>
                  <span className="text-xs text-navy-300">{selectedVilla.type}</span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-white">{selectedVilla.name}</h2>
              </div>
              <span className={clsx(statusBadge[selectedVilla.status], 'flex-shrink-0')}>
                <span className={clsx('w-1.5 h-1.5 rounded-full mr-1', statusDot[selectedVilla.status])} />
                {selectedVilla.status}
              </span>
            </div>

            {/* 4 metric chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Bed className="w-3.5 h-3.5" />, label: `${selectedVilla.bedrooms} Bedrooms` },
                { icon: <Users className="w-3.5 h-3.5" />, label: `${selectedVilla.maxGuests} Max Guests` },
                { icon: <Maximize2 className="w-3.5 h-3.5" />, label: `${selectedVilla.size} m²` },
                { icon: <CalendarDays className="w-3.5 h-3.5" />, label: `Built ${selectedVilla.yearBuilt}` },
              ].map((chip) => (
                <div key={chip.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-navy-100">
                  {chip.icon}
                  {chip.label}
                </div>
              ))}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 space-y-5">

            {/* 4 KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPIBlock
                label="Monthly Revenue"
                value={`$${(selectedVilla.monthlyRevenue / 1000).toFixed(1)}K`}
                sub="USD"
                accent="gold"
                icon={<DollarSign className="w-4 h-4" />}
              />
              <KPIBlock
                label="Occupancy Rate"
                value={`${selectedVilla.occupancyRate}%`}
                sub="This month"
                accent="teal"
                icon={<BarChart2 className="w-4 h-4" />}
              />
              <KPIBlock
                label="Maintenance Score"
                value={`${selectedVilla.maintenanceScore}`}
                sub="/ 100"
                accent="navy"
                icon={<Wrench className="w-4 h-4" />}
              />
              <KPIBlock
                label="Photos"
                value={`${selectedVilla.photos}`}
                sub="Gallery images"
                accent="plain"
                icon={<Camera className="w-4 h-4" />}
              />
            </div>

            {/* Owner info card */}
            <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-4 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-cocoa-500 mb-0.5">Villa Owner</div>
                    <div className="text-sm font-semibold text-cocoa-800">{selectedVilla.ownerName}</div>
                    <div className="text-xs text-cocoa-500">Owner ID: {selectedVilla.ownerId}</div>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-xs font-medium text-navy-700 hover:text-navy-900 transition-colors">
                  View Owner Profile <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Two-col info grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Address */}
              <div className="bg-sand-50 rounded-2xl border border-sand-300 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-cocoa-500" />
                  <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wider">Address</span>
                </div>
                <p className="text-sm text-cocoa-800">{selectedVilla.address}</p>
              </div>

              {/* Supervisor */}
              <div className="bg-sand-50 rounded-2xl border border-sand-300 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-cocoa-500" />
                  <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wider">Supervisor</span>
                </div>
                <p className="text-sm font-medium text-cocoa-800">{selectedVilla.supervisor}</p>
              </div>

              {/* Last Inspection */}
              <div className="bg-sand-50 rounded-2xl border border-sand-300 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="w-4 h-4 text-cocoa-500" />
                  <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wider">Last Inspection</span>
                </div>
                <p className="text-sm font-medium text-cocoa-800">{selectedVilla.lastInspection}</p>
              </div>

              {/* Next Available */}
              <div className="bg-sand-50 rounded-2xl border border-sand-300 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="w-4 h-4 text-cocoa-500" />
                  <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wider">Next Available</span>
                </div>
                <p className="text-sm font-medium text-cocoa-800">{selectedVilla.nextAvailable}</p>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2 bg-sand-50 rounded-2xl border border-sand-300 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-cocoa-500 uppercase tracking-wider">Amenities</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedVilla.amenities.map((amenity) => (
                    <span key={amenity} className="badge-info text-xs">{amenity}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <button
                onClick={() => { setForm({ ...selectedVilla }); setEditOpen(true) }}
                className="btn-secondary"
              >
                <Edit2 className="w-4 h-4" />
                Edit Villa
              </button>
              <button className="btn-primary">
                <BookOpen className="w-4 h-4" />
                View Bookings
              </button>
              <button className="btn-gold">
                <Wrench className="w-4 h-4" />
                Maintenance Tickets
              </button>
              <button
                onClick={() => setDeleteId(selectedVilla.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-terra-200 bg-terra-50 text-terra-600 text-xs font-medium hover:bg-terra-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Archive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add Villa Modal ──────────────────────────────────────────────── */}
      <Modal
        open={addOpen}
        onClose={() => { setAddOpen(false); setForm({}) }}
        title="Add New Villa"
        size="lg"
        footer={
          <>
            <button onClick={() => { setAddOpen(false); setForm({}) }} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleAdd} className="btn-primary">
              Add Villa
            </button>
          </>
        }
      >
        <VillaForm form={form} setForm={setForm} />
      </Modal>

      {/* ── Edit Villa Modal ─────────────────────────────────────────────── */}
      <Modal
        open={editOpen}
        onClose={() => { setEditOpen(false); setForm({}) }}
        title="Edit Villa"
        size="lg"
        footer={
          <>
            <button onClick={() => { setEditOpen(false); setForm({}) }} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleEdit} className="btn-primary">
              Save Changes
            </button>
          </>
        }
      >
        <VillaForm form={form} setForm={setForm} />
      </Modal>

      {/* ── Archive Confirm Dialog ───────────────────────────────────────── */}
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleArchive}
        title="Archive Villa"
        message={`Archive ${villas.find((v) => v.id === deleteId)?.name ?? 'this villa'}? It will be removed from active portfolio.`}
        confirmLabel="Archive"
        variant="danger"
      />
    </div>
  )
}

export default VillaMaster
