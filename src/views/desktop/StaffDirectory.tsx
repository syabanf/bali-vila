import { type FC, useState } from 'react'
import {
  Search, UserPlus, Mail, Phone, Copy, Star, Calendar,
  CheckCircle, Clock, Home, Activity, ChevronRight, UserMinus,
} from 'lucide-react'
import { staffDirectory } from '../../data/mockData'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import clsx from 'clsx'

type StaffMember = typeof staffDirectory[number]

const departments = ['All', 'Operations', 'Maintenance', 'Housekeeping', 'Sales']

const statusConfig = {
  active: { label: 'Active', dot: 'bg-teal-400', pill: 'bg-teal-50 text-teal-700 border-teal-200' },
  break:  { label: 'On Break', dot: 'bg-gold-400', pill: 'bg-gold-50 text-gold-700 border-gold-200' },
  leave:  { label: 'On Leave', dot: 'bg-terra-400', pill: 'bg-terra-50 text-terra-700 border-terra-200' },
}

const scoreColor = (v: number) =>
  v >= 90 ? 'text-teal-700 bg-teal-50 border-teal-200'
  : v >= 70 ? 'text-gold-700 bg-gold-50 border-gold-200'
  : 'text-terra-700 bg-terra-50 border-terra-200'

const barFill = (v: number) =>
  v >= 90 ? 'bg-teal-400' : v >= 70 ? 'bg-gold-400' : 'bg-terra-400'

const recentActivity = [
  { icon: CheckCircle, text: 'Completed villa inspection', time: '2h ago', color: 'text-teal-500' },
  { icon: Activity,   text: 'Submitted MEP checklist',    time: '5h ago', color: 'text-navy-400' },
  { icon: Star,       text: 'Received 5-star guest review', time: '1d ago', color: 'text-gold-500' },
]

// ─── Detail Panel ─────────────────────────────────────────────────────────────
const StaffDetail: FC<{
  staff: StaffMember
  onEdit: () => void
  onDeactivate: () => void
}> = ({ staff, onEdit, onDeactivate }) => {
  const sc = statusConfig[staff.status as keyof typeof statusConfig]

  const kpis = [
    { label: 'Task Completion', value: `${staff.taskCompletion}%`, sub: 'of assigned tasks' },
    { label: 'Attendance',      value: `${staff.attendance}%`,    sub: 'this month' },
    { label: 'Performance',     value: `${staff.performanceScore}`, sub: 'score /100' },
    { label: 'Since',           value: staff.joinDate.split(' ')[1], sub: `Joined ${staff.joinDate}` },
  ]

  const metrics = [
    { label: 'Task Completion', value: staff.taskCompletion },
    { label: 'Attendance',      value: staff.attendance },
    { label: 'Performance',     value: staff.performanceScore },
  ]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
  }

  return (
    <div className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-navy-900 px-6 py-6 bg-batik">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-100/20 to-teal-100/20 border border-white/10 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-2xl font-semibold text-white">{staff.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl font-semibold text-white leading-tight">{staff.name}</h2>
            <p className="text-sm text-navy-300 mt-0.5">{staff.role} &middot; {staff.department}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={clsx('inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border', sc.pill)}>
                <span className={clsx('w-1.5 h-1.5 rounded-full', sc.dot)} />
                {sc.label}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-navy-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />{staff.shift}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-2">
          {kpis.map((k) => (
            <div key={k.label} className="bg-sand-50 rounded-xl p-3 border border-sand-300 text-center">
              <div className="font-display text-xl font-semibold text-cocoa-800">{k.value}</div>
              <div className="text-xs text-cocoa-500 mt-0.5 leading-tight">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-2">Contact</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-sm text-cocoa-800">
              <Mail className="w-3.5 h-3.5 text-cocoa-500" />
              <span className="text-xs">{staff.email}</span>
              <button onClick={() => handleCopy(staff.email)} className="text-cocoa-500 hover:text-navy-600 transition-colors">
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-sand-50 border border-sand-300 rounded-xl px-3 py-2">
              <Phone className="w-3.5 h-3.5 text-cocoa-500" />
              <span className="text-xs text-cocoa-800">{staff.phone}</span>
              <button onClick={() => handleCopy(staff.phone)} className="text-cocoa-500 hover:text-navy-600 transition-colors">
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-2">Certifications</h4>
          <div className="flex flex-wrap gap-1.5">
            {staff.certifications.map((cert) => (
              <span key={cert} className="badge-success text-xs">{cert}</span>
            ))}
          </div>
        </div>

        {/* Performance Bars */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-3">Performance Breakdown</h4>
          <div className="space-y-3">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-cocoa-600">{m.label}</span>
                  <span className={clsx('text-xs font-semibold px-1.5 py-0.5 rounded-md border', scoreColor(m.value))}>
                    {m.value}%
                  </span>
                </div>
                <div className="h-2 bg-sand-200 rounded-full overflow-hidden">
                  <div
                    className={clsx('h-full rounded-full transition-all duration-500', barFill(m.value))}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Villa */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-2">Assigned Villa</h4>
          <div className="flex items-center gap-3 bg-sand-50 border border-sand-300 rounded-xl p-3">
            <div className="w-9 h-9 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0">
              <Home className="w-4 h-4 text-navy-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-cocoa-800">{staff.villa}</div>
              <div className="text-xs text-cocoa-500 mt-0.5">Primary assignment</div>
            </div>
            <span className="badge-success text-xs">Active</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-500 mb-2">Recent Activity</h4>
          <div className="space-y-2">
            {recentActivity.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-sand-50 border border-sand-100">
                  <Icon className={clsx('w-4 h-4 flex-shrink-0', item.color)} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-cocoa-800">{item.text}</div>
                  </div>
                  <span className="text-xs text-cocoa-500 flex-shrink-0">{item.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button onClick={onEdit} className="btn-secondary flex-1 justify-center text-xs py-2.5">Edit Profile</button>
          <button className="btn-primary flex-1 justify-center text-xs py-2.5">
            <Home className="w-3.5 h-3.5" />Assign Villa
          </button>
          <button className="btn-gold flex-1 justify-center text-xs py-2.5">
            <Calendar className="w-3.5 h-3.5" />View Schedule
          </button>
          <button
            onClick={onDeactivate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-terra-200 bg-terra-50 text-terra-600 text-xs font-medium hover:bg-terra-100"
          >
            <UserMinus className="w-3.5 h-3.5" /> Deactivate
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Staff Card ───────────────────────────────────────────────────────────────
const StaffCard: FC<{ staff: StaffMember; selected: boolean; onClick: () => void }> = ({ staff, selected, onClick }) => {
  const sc = statusConfig[staff.status as keyof typeof statusConfig]
  const score = staff.performanceScore

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full text-left bg-white rounded-2xl border p-4 shadow-card hover:shadow-card-hover transition-all duration-200',
        selected ? 'border-navy-300 ring-2 ring-navy-200' : 'border-sand-300',
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy-100 to-teal-100 flex items-center justify-center flex-shrink-0">
          <span className="font-display text-base font-semibold text-navy-700">{staff.avatar}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-cocoa-800 truncate">{staff.name}</span>
            <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', sc.dot)} />
          </div>
          <div className="text-xs text-cocoa-500 truncate mt-0.5">{staff.role}</div>
          <div className="text-xs text-cocoa-500 truncate mt-0.5">{staff.villa}</div>
        </div>

        {/* Performance circle */}
        <div className={clsx(
          'w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0',
          score >= 90 ? 'border-teal-300 bg-teal-50' : score >= 70 ? 'border-gold-300 bg-gold-50' : 'border-terra-300 bg-terra-50',
        )}>
          <span className={clsx(
            'font-display text-xs font-bold',
            score >= 90 ? 'text-teal-700' : score >= 70 ? 'text-gold-700' : 'text-terra-700',
          )}>{score}</span>
        </div>

        <ChevronRight className="w-4 h-4 text-cocoa-300 flex-shrink-0" />
      </div>
    </button>
  )
}

// ─── Staff Form ───────────────────────────────────────────────────────────────
const StaffForm: FC<{
  form: Partial<StaffMember>
  onChange: (patch: Partial<StaffMember>) => void
}> = ({ form, onChange }) => {
  const f = (field: keyof StaffMember) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => onChange({ [field]: e.target.value } as Partial<StaffMember>)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Full Name *</label>
          <input type="text" className="input-field" value={form.name ?? ''} onChange={f('name')} placeholder="Full name" />
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Role</label>
          <select className="input-field" value={form.role ?? ''} onChange={f('role')}>
            <option value="">Select role…</option>
            {['Supervisor', 'Housekeeper', 'MEP Technician', 'Pool Technician', 'Sales Executive', 'Sales Manager', 'Driver'].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Department</label>
          <select className="input-field" value={form.department ?? ''} onChange={f('department')}>
            <option value="">Select department…</option>
            {['Operations', 'Maintenance', 'Housekeeping', 'Sales'].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Assigned Villa</label>
          <input type="text" className="input-field" value={form.villa ?? ''} onChange={f('villa')} placeholder="Villa Tirta 05" />
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Shift</label>
          <select className="input-field" value={form.shift ?? ''} onChange={f('shift')}>
            <option value="">Select shift…</option>
            {['Morning', 'Afternoon', 'All Day', 'Office Hours'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Phone</label>
          <input type="tel" className="input-field" value={form.phone ?? ''} onChange={f('phone')} placeholder="+62 812-000-0000" />
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Email</label>
          <input type="email" className="input-field" value={form.email ?? ''} onChange={f('email')} placeholder="name@bav.co.id" />
        </div>
        <div>
          <label className="text-xs font-medium text-cocoa-600 mb-1 block">Join Date</label>
          <input type="date" className="input-field" value={form.joinDate ?? ''} onChange={f('joinDate')} />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-cocoa-600 mb-1 block">Certifications</label>
        <input
          type="text"
          className="input-field w-full"
          value={
            typeof form.certifications === 'string'
              ? form.certifications
              : (form.certifications ?? []).join(', ')
          }
          onChange={(e) => onChange({ certifications: e.target.value as unknown as string[] })}
          placeholder="First Aid, Supervisor L2"
        />
      </div>
    </div>
  )
}

// ─── Main View ────────────────────────────────────────────────────────────────
const StaffDirectory: FC = () => {
  const [staff, setStaff] = useState(staffDirectory as StaffMember[])
  const [selectedStaff, setSelectedStaff] = useState<StaffMember>(staffDirectory[0] as StaffMember)
  const [department, setDepartment] = useState('All')
  const [search, setSearch] = useState('')

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deactivateId, setDeactivateId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<StaffMember>>({})

  const filtered = staff.filter((s) => {
    const matchDept = department === 'All' || s.department === department
    const matchSearch =
      search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
    return matchDept && matchSearch
  })

  const openAdd = () => {
    setForm({})
    setAddOpen(true)
  }

  const openEdit = () => {
    setForm({
      ...selectedStaff,
      certifications: selectedStaff.certifications.join(', ') as unknown as string[],
    })
    setEditOpen(true)
  }

  const handleAdd = () => {
    if (!form.name) return
    const rawCerts = typeof form.certifications === 'string'
      ? (form.certifications as unknown as string)
      : (form.certifications ?? []).join(', ')
    const newMember: StaffMember = {
      id: `SF${Date.now().toString().slice(-3)}`,
      name: form.name ?? '',
      role: form.role ?? '',
      department: form.department ?? '',
      villa: form.villa ?? '',
      status: 'active',
      phone: form.phone ?? '',
      email: form.email ?? '',
      joinDate: form.joinDate ?? '',
      shift: form.shift ?? '',
      taskCompletion: 0,
      attendance: 100,
      performanceScore: 0,
      avatar: (form.name ?? '')
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      certifications: rawCerts
        ? rawCerts.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
    }
    setStaff((prev) => [newMember, ...prev])
    setSelectedStaff(newMember)
    setAddOpen(false)
  }

  const handleEdit = () => {
    const rawCerts = typeof form.certifications === 'string'
      ? (form.certifications as unknown as string)
      : (form.certifications ?? []).join(', ')
    setStaff((prev) =>
      prev.map((s) =>
        s.id === selectedStaff.id
          ? {
              ...s,
              ...form,
              certifications: rawCerts
                ? rawCerts.split(',').map((c: string) => c.trim()).filter(Boolean)
                : s.certifications,
            }
          : s,
      ),
    )
    setSelectedStaff((prev) => ({
      ...prev,
      ...form,
      certifications: rawCerts
        ? rawCerts.split(',').map((c: string) => c.trim()).filter(Boolean)
        : prev.certifications,
    }))
    setEditOpen(false)
  }

  const handleDeactivate = () => {
    const remaining = staff.filter((s) => s.id !== deactivateId)
    setStaff(remaining)
    setSelectedStaff(remaining[0])
    setDeactivateId(null)
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="grid grid-cols-12 gap-4">
        {/* Left — Staff List */}
        <div className="col-span-12 xl:col-span-4 space-y-3">
          {/* Search + Add */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-500" />
              <input
                type="text"
                placeholder="Search staff…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-9 py-2 text-sm"
              />
            </div>
            <button onClick={openAdd} className="btn-primary py-2 px-3 whitespace-nowrap">
              <UserPlus className="w-4 h-4" />
              Add Staff
            </button>
          </div>

          {/* Department Filters */}
          <div className="flex flex-wrap gap-1.5">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDepartment(d)}
                className={clsx(
                  'text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200',
                  department === d
                    ? 'bg-navy-800 text-white border-navy-800'
                    : 'bg-white text-cocoa-600 border-sand-300 hover:border-navy-300',
                )}
              >{d}</button>
            ))}
          </div>

          {/* Staff Count */}
          <p className="text-xs text-cocoa-500 font-medium px-0.5">
            {filtered.length} staff member{filtered.length !== 1 ? 's' : ''}
            {department !== 'All' ? ` in ${department}` : ''}
          </p>

          {/* Staff Cards */}
          <div className="space-y-2">
            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-sand-300 p-8 text-center">
                <p className="text-sm text-cocoa-500">No staff found</p>
              </div>
            )}
            {filtered.map((s) => (
              <StaffCard
                key={s.id}
                staff={s}
                selected={selectedStaff.id === s.id}
                onClick={() => setSelectedStaff(s)}
              />
            ))}
          </div>
        </div>

        {/* Right — Detail Panel */}
        <div className="col-span-12 xl:col-span-8 sticky top-20">
          <StaffDetail
            staff={selectedStaff}
            onEdit={openEdit}
            onDeactivate={() => setDeactivateId(selectedStaff.id)}
          />
        </div>
      </div>

      {/* Add Staff Modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Staff Member"
        size="lg"
        footer={
          <>
            <button onClick={() => setAddOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleAdd} className="btn-primary">Add Staff Member</button>
          </>
        }
      >
        <StaffForm form={form} onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))} />
      </Modal>

      {/* Edit Staff Modal */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Staff Member"
        size="lg"
        footer={
          <>
            <button onClick={() => setEditOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleEdit} className="btn-primary">Save Changes</button>
          </>
        }
      >
        <StaffForm form={form} onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))} />
      </Modal>

      {/* Deactivate Confirm */}
      <ConfirmDialog
        open={deactivateId !== null}
        onClose={() => setDeactivateId(null)}
        onConfirm={handleDeactivate}
        title="Deactivate Staff Member"
        message={`${staff.find((s) => s.id === deactivateId)?.name ?? 'This staff member'} will be marked inactive.`}
        confirmLabel="Deactivate"
        variant="danger"
      />
    </div>
  )
}

export default StaffDirectory
