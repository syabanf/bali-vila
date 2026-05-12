import { type FC, useState, useMemo } from 'react'
import {
  Plus, Search, Home, DollarSign, FileText, Edit2,
  Send, Download, Eye, EyeOff, Mail, Phone, Building2,
  CalendarDays, Globe, StickyNote, ChevronRight, Trash2
} from 'lucide-react'
import { owners as ownersData, ownerStatements, villasMaster } from '../../data/mockData'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import clsx from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Owner {
  id: string
  name: string
  nationality: string
  email: string
  phone: string
  villas: string[]
  totalVillas: number
  totalRevenue: number
  status: string
  joinDate: string
  contractType: string
  bankName: string
  accountNo: string
  notes: string
  avatar: string
}

interface OwnerStatement {
  id: string
  owner: string
  villa: string
  period: string
  totalIncome: number
  directIncome: number
  otaIncome: number
  maintenance: number
  purchasing: number
  netPayable: number
  status: string
  managementFee: number
}

interface VillaMaster {
  id: string
  name: string
  zone: string
  status: string
  monthlyRevenue: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const nationalityFlag: Record<string, string> = {
  Indonesian:         '🇮🇩',
  'Indonesian (PT)':  '🇮🇩',
  British:            '🇬🇧',
  Australian:         '🇦🇺',
  Italian:            '🇮🇹',
  Chinese:            '🇨🇳',
  French:             '🇫🇷',
  Japanese:           '🇯🇵',
}

const statementStatusBadge: Record<string, string> = {
  'Ready':           'badge-success',
  'Pending Review':  'badge-warning',
  'Sent':            'badge-info',
}

const villaStatusBadge: Record<string, string> = {
  Occupied:    'badge-success',
  Available:   'badge-warning',
  Maintenance: 'badge-danger',
  Cleaning:    'badge-info',
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0][0]?.toUpperCase() ?? ''
  return ((words[0][0] ?? '') + (words[words.length - 1][0] ?? '')).toUpperCase()
}

function formatIDR(amount: number): string {
  if (amount >= 1_000_000) return `IDR ${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `IDR ${(amount / 1_000).toFixed(0)}K`
  return `IDR ${amount.toLocaleString()}`
}

function currentMonthYear(): string {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// ─── Owner Form ───────────────────────────────────────────────────────────────
interface OwnerFormProps {
  form: Partial<Owner>
  setForm: React.Dispatch<React.SetStateAction<Partial<Owner>>>
}

const OwnerForm: FC<OwnerFormProps> = ({ form, setForm }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">
          Full Name <span className="text-terra-500">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Budi Santoso"
          value={form.name || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
      </div>

      {/* Nationality */}
      <div>
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Nationality</label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Indonesian"
          value={form.nationality || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, nationality: e.target.value }))}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Email</label>
        <input
          type="email"
          className="input-field"
          placeholder="owner@example.com"
          value={form.email || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Phone</label>
        <input
          type="tel"
          className="input-field"
          placeholder="+62 812 3456 7890"
          value={form.phone || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      {/* Contract Type */}
      <div>
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Contract Type</label>
        <select
          className="input-field"
          value={form.contractType || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, contractType: e.target.value }))}
        >
          <option value="">Select contract…</option>
          <option value="Full Management">Full Management</option>
          <option value="Revenue Share 80/20">Revenue Share 80/20</option>
          <option value="Revenue Share 75/25">Revenue Share 75/25</option>
        </select>
      </div>

      {/* Bank Name */}
      <div>
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Bank Name</label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. BCA"
          value={form.bankName || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, bankName: e.target.value }))}
        />
      </div>

      {/* Account Number */}
      <div className="col-span-2 md:col-span-1">
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Account Number</label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. 1234567890"
          value={form.accountNo || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, accountNo: e.target.value }))}
        />
      </div>

      {/* Notes */}
      <div className="col-span-2">
        <label className="block text-xs font-medium text-cocoa-600 mb-1.5">Notes</label>
        <textarea
          className="input-field resize-none"
          rows={3}
          placeholder="Additional notes about the owner…"
          value={form.notes || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
        />
      </div>
    </div>
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const OwnerRegistry: FC = () => {
  const [ownerList, setOwnerList] = useState<Owner[]>(ownersData as Owner[])
  const [selectedOwner, setSelectedOwner] = useState<Owner>(ownersData[0] as Owner)
  const [search, setSearch] = useState('')
  const [showAccountNo, setShowAccountNo] = useState(false)

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Owner>>({})

  const filteredOwners = useMemo(() => {
    const q = search.toLowerCase()
    return ownerList.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.nationality.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
    )
  }, [ownerList, search])

  // Villas owned by selected owner
  const ownedVillas = useMemo(() => {
    return (villasMaster as VillaMaster[]).filter((v) =>
      selectedOwner.villas.includes(v.id)
    )
  }, [selectedOwner])

  // Statements for this owner (match by villa name or show first 3)
  const ownerVillaNames = ownedVillas.map((v) => v.name)
  const relevantStatements = useMemo(() => {
    const matched = (ownerStatements as OwnerStatement[]).filter((s) =>
      ownerVillaNames.includes(s.villa)
    )
    return matched.length > 0
      ? matched.slice(0, 3)
      : (ownerStatements as OwnerStatement[]).slice(0, 3)
  }, [ownerVillaNames])

  const flag = nationalityFlag[selectedOwner.nationality] ?? '🌐'

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!form.name?.trim()) return
    const newOwner: Owner = {
      id: `OW${Date.now().toString().slice(-4)}`,
      name: form.name.trim(),
      nationality: form.nationality || '',
      email: form.email || '',
      phone: form.phone || '',
      contractType: form.contractType || '',
      bankName: form.bankName || '',
      accountNo: form.accountNo || '',
      notes: form.notes || '',
      avatar: getInitials(form.name.trim()),
      status: 'Active',
      totalVillas: 0,
      totalRevenue: 0,
      joinDate: currentMonthYear(),
      villas: [],
    }
    setOwnerList((prev) => [newOwner, ...prev])
    setSelectedOwner(newOwner)
    setAddOpen(false)
    setForm({})
  }

  const handleEdit = () => {
    const updated: Owner = {
      ...selectedOwner,
      name: form.name ?? selectedOwner.name,
      nationality: form.nationality ?? selectedOwner.nationality,
      email: form.email ?? selectedOwner.email,
      phone: form.phone ?? selectedOwner.phone,
      contractType: form.contractType ?? selectedOwner.contractType,
      bankName: form.bankName ?? selectedOwner.bankName,
      accountNo: form.accountNo ?? selectedOwner.accountNo,
      notes: form.notes ?? selectedOwner.notes,
    }
    setOwnerList((prev) =>
      prev.map((o) => (o.id === selectedOwner.id ? updated : o))
    )
    setSelectedOwner(updated)
    setEditOpen(false)
    setForm({})
  }

  const handleRemove = () => {
    const remaining = ownerList.filter((o) => o.id !== deleteId)
    setOwnerList(remaining)
    if (remaining.length > 0) {
      setSelectedOwner(remaining[0])
    }
    setDeleteId(null)
  }

  return (
    <div className="animate-fade-in h-full">
      <div className="grid grid-cols-12 gap-4 h-full">

        {/* ── Left Panel: Owner List ─────────────────────────────────────── */}
        <div className="col-span-12 xl:col-span-4 bg-white rounded-2xl border border-sand-200 shadow-card flex flex-col overflow-hidden">

          {/* Search + Add */}
          <div className="p-4 border-b border-sand-100 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoa-300" />
                <input
                  type="text"
                  placeholder="Search owners…"
                  className="input-field pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="btn-primary whitespace-nowrap"
                onClick={() => { setForm({}); setAddOpen(true) }}
              >
                <Plus className="w-4 h-4" />
                Add Owner
              </button>
            </div>
            <p className="text-xs text-cocoa-400">
              {filteredOwners.length} owner{filteredOwners.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Owner list */}
          <div className="overflow-y-auto flex-1 divide-y divide-sand-100">
            {filteredOwners.length === 0 ? (
              <div className="p-8 text-center text-sm text-cocoa-400">No owners found.</div>
            ) : (
              filteredOwners.map((owner) => {
                const isSelected = selectedOwner.id === owner.id
                return (
                  <button
                    key={owner.id}
                    onClick={() => { setSelectedOwner(owner); setShowAccountNo(false) }}
                    className={clsx(
                      'w-full p-4 text-left hover:bg-sand-50 transition-all duration-200',
                      isSelected && 'bg-navy-50 border-l-2 border-navy-700 ring-1 ring-inset ring-navy-100'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-navy-700 to-navy-900 text-white text-sm font-semibold">
                        {owner.avatar}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-navy-800 truncate">{owner.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-cocoa-400">
                          <span>{nationalityFlag[owner.nationality] ?? '🌐'}</span>
                          <span className="truncate">{owner.contractType}</span>
                        </div>
                      </div>

                      {/* Right: villas + revenue */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className="badge-info">{owner.totalVillas} villa{owner.totalVillas !== 1 ? 's' : ''}</span>
                        <span className="font-display text-sm font-semibold text-navy-800">
                          {formatIDR(owner.totalRevenue)}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* ── Right Panel: Owner Detail ──────────────────────────────────── */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl border border-sand-200 shadow-card flex flex-col overflow-hidden">

          {/* Dark header */}
          <div className="bg-navy-900 px-6 py-5 bg-batik flex-shrink-0">
            <div className="flex items-start gap-4">
              {/* Large avatar */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 text-lg font-bold shadow-gold">
                {selectedOwner.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-white">
                      {selectedOwner.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-navy-300">
                        {flag} {selectedOwner.nationality}
                      </span>
                      <span className="text-navy-500">·</span>
                      <span className="flex items-center gap-1 text-xs text-navy-300">
                        <CalendarDays className="w-3.5 h-3.5" />
                        Joined {selectedOwner.joinDate}
                      </span>
                    </div>
                  </div>
                  <span className="badge-success flex-shrink-0 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-1" />
                    {selectedOwner.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 space-y-5">

            {/* 3 KPI cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gold-50 border border-gold-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-gold-700" />
                  <span className="text-xs font-medium text-gold-700">Total Revenue</span>
                </div>
                <div className="font-display text-2xl font-semibold text-gold-800">
                  {formatIDR(selectedOwner.totalRevenue)}
                </div>
                <div className="text-xs text-cocoa-400 mt-0.5">Monthly gross</div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-teal-700" />
                  <span className="text-xs font-medium text-teal-700">Total Villas</span>
                </div>
                <div className="font-display text-2xl font-semibold text-teal-800">
                  {selectedOwner.totalVillas}
                </div>
                <div className="text-xs text-cocoa-400 mt-0.5">Under management</div>
              </div>

              <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-navy-700" />
                  <span className="text-xs font-medium text-navy-700">Contract</span>
                </div>
                <div className="text-sm font-semibold text-navy-800 leading-snug">
                  {selectedOwner.contractType}
                </div>
                <div className="text-xs text-cocoa-400 mt-0.5">Agreement type</div>
              </div>
            </div>

            {/* Contact info row */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-4">
              <h4 className="font-display text-sm font-semibold text-navy-800 mb-3">Contact &amp; Banking</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Email */}
                <div className="flex items-start gap-3 p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <Mail className="w-4 h-4 text-cocoa-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-cocoa-400 mb-0.5">Email</div>
                    <div className="text-xs font-medium text-navy-800 break-all">{selectedOwner.email}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <Phone className="w-4 h-4 text-cocoa-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-cocoa-400 mb-0.5">Phone</div>
                    <div className="text-xs font-medium text-navy-800">{selectedOwner.phone}</div>
                  </div>
                </div>

                {/* Bank */}
                <div className="flex items-start gap-3 p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <Building2 className="w-4 h-4 text-cocoa-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-cocoa-400 mb-0.5">{selectedOwner.bankName}</div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-navy-800">
                        {showAccountNo ? selectedOwner.accountNo : selectedOwner.accountNo.replace(/\*/g, '•')}
                      </span>
                      <button
                        onClick={() => setShowAccountNo((p) => !p)}
                        className="text-cocoa-400 hover:text-navy-700 transition-colors"
                        aria-label="Toggle account number visibility"
                      >
                        {showAccountNo ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Villa portfolio */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-semibold text-navy-800">Villa Portfolio</h4>
                <span className="text-xs text-cocoa-400">{ownedVillas.length} property{ownedVillas.length !== 1 ? 'ies' : 'y'}</span>
              </div>

              {ownedVillas.length === 0 ? (
                <p className="text-sm text-cocoa-400 text-center py-4">No villas linked to this owner.</p>
              ) : (
                <div className="space-y-2">
                  {ownedVillas.map((villa) => (
                    <div
                      key={villa.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-sand-50 border border-sand-200 hover:shadow-card-hover transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                        <Home className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-navy-800">{villa.name}</div>
                        <div className="flex items-center gap-1.5 text-xs text-cocoa-400">
                          <Globe className="w-3 h-3" />
                          {villa.zone}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={villaStatusBadge[villa.status] ?? 'badge-info'}>
                          {villa.status}
                        </span>
                        <span className="font-display text-sm font-semibold text-navy-800">
                          ${villa.monthlyRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Statement history */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-semibold text-navy-800">Statement History</h4>
                <button className="flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-800 transition-colors">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {relevantStatements.map((stmt) => {
                  const badgeClass = statementStatusBadge[stmt.status] ?? 'badge-info'
                  return (
                    <div
                      key={stmt.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-sand-50 border border-sand-200 hover:shadow-card-hover transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-navy-800">{stmt.villa}</div>
                        <div className="text-xs text-cocoa-400">{stmt.period}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={badgeClass}>{stmt.status}</span>
                        <span className="font-display text-sm font-semibold text-teal-700">
                          IDR {stmt.netPayable.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Notes card */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-cocoa-400" />
                  <h4 className="font-display text-sm font-semibold text-navy-800">Notes</h4>
                </div>
                <button className="text-cocoa-400 hover:text-navy-700 transition-colors" aria-label="Edit notes">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm text-cocoa-600 leading-relaxed">{selectedOwner.notes}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <button className="btn-primary">
                <Send className="w-4 h-4" />
                Send Statement
              </button>
              <button
                onClick={() => { setForm({ ...selectedOwner }); setEditOpen(true) }}
                className="btn-secondary"
              >
                <Edit2 className="w-4 h-4" />
                Edit Owner
              </button>
              <button className="btn-gold">
                <Download className="w-4 h-4" />
                Export History
              </button>
              <button
                onClick={() => setDeleteId(selectedOwner.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-terra-200 bg-terra-50 text-terra-600 text-xs font-medium hover:bg-terra-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Owner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add Owner Modal ──────────────────────────────────────────────── */}
      <Modal
        open={addOpen}
        onClose={() => { setAddOpen(false); setForm({}) }}
        title="Add New Owner"
        size="lg"
        footer={
          <>
            <button onClick={() => { setAddOpen(false); setForm({}) }} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleAdd} className="btn-primary">
              Add Owner
            </button>
          </>
        }
      >
        <OwnerForm form={form} setForm={setForm} />
      </Modal>

      {/* ── Edit Owner Modal ─────────────────────────────────────────────── */}
      <Modal
        open={editOpen}
        onClose={() => { setEditOpen(false); setForm({}) }}
        title="Edit Owner"
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
        <OwnerForm form={form} setForm={setForm} />
      </Modal>

      {/* ── Remove Owner Confirm Dialog ──────────────────────────────────── */}
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleRemove}
        title="Remove Owner"
        message={`Remove ${ownerList.find((o) => o.id === deleteId)?.name ?? 'this owner'} from the registry? This action cannot be undone.`}
        confirmLabel="Remove Owner"
        variant="danger"
      />
    </div>
  )
}

export default OwnerRegistry
