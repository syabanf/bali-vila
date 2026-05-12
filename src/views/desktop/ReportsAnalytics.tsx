import { useState, useMemo } from 'react'
import {
  revenueByVilla, occupancyTrend, maintenanceCostData,
  channelPerformance, staffPerformance, revenueData, villasMaster,
} from '../../data/mockData'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, LineChart, Line, ReferenceLine, Cell,
} from 'recharts'
import {
  Download, Table2, TrendingUp, TrendingDown, Minus,
  DollarSign, BarChart2, Wrench, Users, ChevronUp, ChevronDown,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'revenue' | 'occupancy' | 'maintenance' | 'staff'
type Period = 'this-month' | 'last-3m' | 'ytd'
type SortDir = 'asc' | 'desc'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n >= 1000 ? `IDR ${(n / 1000).toFixed(0)}K` : `IDR ${n}`

const fmtM = (n: number) => `IDR ${n.toFixed(1)}M`

function SortIcon({ field, active, dir }: { field: string; active: string; dir: SortDir }) {
  if (active !== field) return <ChevronUp className="w-3 h-3 text-sand-500 opacity-40" />
  return dir === 'asc'
    ? <ChevronUp className="w-3 h-3 text-navy-600" />
    : <ChevronDown className="w-3 h-3 text-navy-600" />
}

// ─── Revenue Tab ─────────────────────────────────────────────────────────────

type VillaRow = typeof revenueByVilla[number]
type VillaSortField = keyof VillaRow

function RevenueTab() {
  const [sortField, setSortField] = useState<VillaSortField>('revenue')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sorted = useMemo(() => {
    return [...revenueByVilla].sort((a, b) => {
      const av = a[sortField] as number
      const bv = b[sortField] as number
      return sortDir === 'desc' ? bv - av : av - bv
    })
  }, [sortField, sortDir])

  function handleSort(field: VillaSortField) {
    if (field === sortField) setSortDir(d => (d === 'desc' ? 'asc' : 'desc'))
    else { setSortField(field); setSortDir('desc') }
  }

  const totalRevenue = revenueByVilla.reduce((s, v) => s + v.revenue, 0)
  const totalDirect = revenueByVilla.reduce((s, v) => s + v.direct, 0)
  const totalOta = revenueByVilla.reduce((s, v) => s + v.ota, 0)
  const avgAdr = Math.round(revenueByVilla.reduce((s, v) => s + v.adr, 0) / revenueByVilla.length)
  const maxRevenue = Math.max(...revenueByVilla.map(v => v.revenue))

  const kpis = [
    { label: 'Total Revenue', value: 'IDR 221.2M', sub: 'May 2026', icon: <DollarSign className="w-4 h-4" />, accent: 'bg-navy-50 text-navy-700' },
    { label: 'Direct Revenue', value: `${Math.round((totalDirect / totalRevenue) * 100)}%`, sub: `IDR ${(totalDirect / 1000).toFixed(0)}K`, icon: <TrendingUp className="w-4 h-4" />, accent: 'bg-teal-50 text-teal-700' },
    { label: 'OTA Revenue', value: `${Math.round((totalOta / totalRevenue) * 100)}%`, sub: `IDR ${(totalOta / 1000).toFixed(0)}K`, icon: <BarChart2 className="w-4 h-4" />, accent: 'bg-gold-50 text-gold-700' },
    { label: 'Avg Daily Rate', value: `IDR ${(avgAdr / 1000).toFixed(1)}K`, sub: 'across all villas', icon: <DollarSign className="w-4 h-4" />, accent: 'bg-terra-50 text-terra-700' },
  ]

  const thCls = (f: VillaSortField) =>
    `table-header cursor-pointer select-none hover:text-navy-700 transition-colors ${sortField === f ? 'text-navy-700' : ''}`

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl border border-sand-300 shadow-card p-5 flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${k.accent}`}>
              {k.icon}
            </div>
            <div>
              <div className="font-display text-2xl font-semibold text-cocoa-800 leading-tight">{k.value}</div>
              <div className="text-xs text-cocoa-500 mt-0.5">{k.label}</div>
              <div className="text-xs text-cocoa-300">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Area Chart */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-lg font-semibold text-cocoa-800">Revenue by Source</h3>
            <p className="text-xs text-cocoa-500 mt-0.5">Direct vs OTA — 12 months</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-cocoa-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />Direct</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gold-400 inline-block" />OTA</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gradDirect" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E8B57" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2E8B57" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradOta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9E2EC" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #D9E2EC', fontSize: 12, boxShadow: '0 4px 24px rgba(15,76,129,0.08)' }}
              formatter={(v: number) => [`IDR ${v}M`, '']}
            />
            <Area type="monotone" dataKey="direct" name="Direct" stroke="#2E8B57" strokeWidth={2} fill="url(#gradDirect)" />
            <Area type="monotone" dataKey="ota" name="OTA" stroke="#C9A84C" strokeWidth={2} fill="url(#gradOta)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Villa Table */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-cocoa-800">Revenue by Villa</h3>
          <span className="text-xs text-cocoa-500">{revenueByVilla.length} villas · click column to sort</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-sand-50">
                <th className="table-header text-left">Villa</th>
                {(['revenue', 'nights', 'adr'] as VillaSortField[]).map(f => (
                  <th key={f} className={`${thCls(f)} text-right`} onClick={() => handleSort(f)}>
                    <span className="flex items-center justify-end gap-1">
                      {f === 'revenue' ? 'Revenue (IDR)' : f === 'nights' ? 'Nights Sold' : 'ADR'}
                      <SortIcon field={f} active={sortField} dir={sortDir} />
                    </span>
                  </th>
                ))}
                <th className="table-header text-right">Direct %</th>
                <th className="table-header text-right">OTA %</th>
                <th className="table-header">Revenue Share</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => {
                const directPct = Math.round((row.direct / row.revenue) * 100)
                const otaPct = 100 - directPct
                const sharePct = (row.revenue / maxRevenue) * 100
                return (
                  <tr key={row.villa} className={`hover:bg-sand-50 transition-colors ${i === 0 ? 'font-semibold' : ''}`}>
                    <td className="table-cell">
                      <span className={`text-cocoa-800 ${i === 0 ? 'font-bold' : ''}`}>{row.villa}</span>
                    </td>
                    <td className="table-cell text-right font-display text-navy-700">
                      IDR {(row.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="table-cell text-right text-cocoa-600">{row.nights}</td>
                    <td className="table-cell text-right text-cocoa-600">{fmt(row.adr)}</td>
                    <td className="table-cell text-right">
                      <span className="text-teal-600 font-medium">{directPct}%</span>
                    </td>
                    <td className="table-cell text-right">
                      <span className="text-gold-700 font-medium">{otaPct}%</span>
                    </td>
                    <td className="table-cell w-40">
                      <div className="h-1.5 bg-sand-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-300 transition-all"
                          style={{ width: `${sharePct}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Occupancy Tab ────────────────────────────────────────────────────────────

function OccupancyTab() {
  const rates = villasMaster.map(v => v.occupancyRate)
  const currentOcc = 68
  const peakMonth = 'Dec 82%'
  const lowMonth = 'Oct 62%'
  const ytdAvg = Math.round(rates.reduce((s, r) => s + r, 0) / rates.length)

  const kpis = [
    { label: 'Current Occupancy', value: `${currentOcc}%`, sub: 'May 2026', accent: 'bg-navy-50 text-navy-700' },
    { label: 'Peak Month', value: peakMonth, sub: 'Dec 2025', accent: 'bg-teal-50 text-teal-700' },
    { label: 'Low Month', value: lowMonth, sub: 'Oct 2025', accent: 'bg-gold-50 text-gold-700' },
    { label: 'YTD Average', value: `${ytdAvg}%`, sub: 'Jan–May 2026', accent: 'bg-terra-50 text-terra-700' },
  ]

  const villaBars = [...villasMaster]
    .sort((a, b) => b.occupancyRate - a.occupancyRate)
    .map(v => ({
      name: v.name.replace('Villa ', ''),
      rate: v.occupancyRate,
      fill: v.occupancyRate >= 70 ? '#2E8B57' : v.occupancyRate >= 50 ? '#C9A84C' : '#B85234',
    }))

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-sand-300 shadow-card p-5">
            <div className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-2 ${k.accent}`}>{k.label}</div>
            <div className="font-display text-3xl font-semibold text-cocoa-800">{k.value}</div>
            <div className="text-xs text-cocoa-500 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-lg font-semibold text-cocoa-800">Occupancy Trend</h3>
            <p className="text-xs text-cocoa-500 mt-0.5">Rate vs target — 8 months</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-cocoa-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-navy-700 inline-block" />Actual</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-gold-400 inline-block border-dashed border" />Target</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={occupancyTrend} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9E2EC" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} domain={[50, 90]} tickFormatter={v => `${v}%`} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #D9E2EC', fontSize: 12, boxShadow: '0 4px 24px rgba(15,76,129,0.08)' }}
              formatter={(v: number) => [`${v}%`, '']}
            />
            <ReferenceLine y={70} stroke="#D9E2EC" strokeDasharray="4 4" label={{ value: '70% threshold', position: 'insideTopRight', fontSize: 10, fill: '#52616B' }} />
            <Line type="monotone" dataKey="rate" name="Actual" stroke="#0A2E4E" strokeWidth={2.5} dot={{ fill: '#0A2E4E', r: 4 }} />
            <Line type="monotone" dataKey="target" name="Target" stroke="#C9A84C" strokeWidth={2} strokeDasharray="5 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Per-villa bar chart */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-semibold text-cocoa-800">Occupancy by Villa</h3>
          <div className="flex items-center gap-3 text-xs text-cocoa-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />≥70%</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold-400 inline-block" />50–69%</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-terra-400 inline-block" />&lt;50%</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={villaBars} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9E2EC" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} width={80} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #D9E2EC', fontSize: 12 }}
              formatter={(v: number) => [`${v}%`, 'Occupancy']}
            />
            <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
              {villaBars.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─── Maintenance Tab ──────────────────────────────────────────────────────────

const MAINT_COLORS: Record<string, string> = {
  plumbing: '#0A2E4E',
  electrical: '#2E8B57',
  ac: '#C9A84C',
  pool: '#B85234',
  carpentry: '#7AB5DC',
  other: '#C0CFDB',
}

const MAINT_LABELS: Record<string, string> = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  ac: 'Air Cond.',
  pool: 'Pool',
  carpentry: 'Carpentry',
  other: 'Other',
}

function MaintenanceTab() {
  const categories = Object.keys(MAINT_COLORS) as (keyof typeof MAINT_COLORS)[]

  const totals = categories.reduce((acc, cat) => {
    acc[cat] = maintenanceCostData.reduce((s, m) => s + (m[cat as keyof typeof m] as number), 0)
    return acc
  }, {} as Record<string, number>)

  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0)
  const mostCommon = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0]

  const kpis = [
    { label: 'Total Spend', value: 'IDR 124M', sub: 'Jan–May 2026', accent: 'bg-navy-50 text-navy-700' },
    { label: 'Open Tickets', value: '8', sub: 'as of today', accent: 'bg-terra-50 text-terra-700' },
    { label: 'Avg Resolution', value: '2.4h', sub: 'across all categories', accent: 'bg-teal-50 text-teal-700' },
    { label: 'Top Category', value: MAINT_LABELS[mostCommon], sub: `IDR ${(totals[mostCommon] / 1000).toFixed(0)}K total`, accent: 'bg-gold-50 text-gold-700' },
  ]

  const tableRows = categories.map(cat => {
    const total = totals[cat]
    const prev = maintenanceCostData[maintenanceCostData.length - 2][cat as keyof typeof maintenanceCostData[0]] as number
    const curr = maintenanceCostData[maintenanceCostData.length - 1][cat as keyof typeof maintenanceCostData[0]] as number
    const trend = curr > prev ? 'up' : curr < prev ? 'down' : 'flat'
    return { cat, total, pct: Math.round((total / grandTotal) * 100), trend }
  }).sort((a, b) => b.total - a.total)

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-sand-300 shadow-card p-5">
            <div className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-2 ${k.accent}`}>{k.label}</div>
            <div className="font-display text-3xl font-semibold text-cocoa-800">{k.value}</div>
            <div className="text-xs text-cocoa-500 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Stacked bar chart */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-lg font-semibold text-cocoa-800">Cost by Month & Category</h3>
            <p className="text-xs text-cocoa-500 mt-0.5">Stacked by maintenance type</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-cocoa-500">
            {categories.map(cat => (
              <span key={cat} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: MAINT_COLORS[cat] }} />
                {MAINT_LABELS[cat]}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={maintenanceCostData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9E2EC" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #D9E2EC', fontSize: 12, boxShadow: '0 4px 24px rgba(15,76,129,0.08)' }}
              formatter={(v: number, name: string) => [`IDR ${v.toLocaleString()}`, MAINT_LABELS[name] ?? name]}
            />
            {categories.map(cat => (
              <Bar key={cat} dataKey={cat} stackId="a" fill={MAINT_COLORS[cat]} radius={cat === 'other' ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown table */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-100">
          <h3 className="font-display text-lg font-semibold text-cocoa-800">Cost Breakdown by Category</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-sand-50">
              <th className="table-header text-left">Category</th>
              <th className="table-header text-right">Total Spend</th>
              <th className="table-header text-right">Share</th>
              <th className="table-header text-center">vs Prior Month</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map(row => (
              <tr key={row.cat} className="hover:bg-sand-50 transition-colors">
                <td className="table-cell">
                  <span className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: MAINT_COLORS[row.cat] }} />
                    <span className="text-cocoa-800 font-medium">{MAINT_LABELS[row.cat]}</span>
                  </span>
                </td>
                <td className="table-cell text-right font-display text-navy-700">
                  IDR {(row.total / 1000).toFixed(0)}K
                </td>
                <td className="table-cell text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 h-1.5 bg-sand-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${row.pct}%`, backgroundColor: MAINT_COLORS[row.cat] }} />
                    </div>
                    <span className="text-cocoa-600 w-8 text-right">{row.pct}%</span>
                  </div>
                </td>
                <td className="table-cell text-center">
                  {row.trend === 'up' ? (
                    <span className="inline-flex items-center gap-1 text-terra-600 text-xs font-medium">
                      <TrendingUp className="w-3.5 h-3.5" /> Higher
                    </span>
                  ) : row.trend === 'down' ? (
                    <span className="inline-flex items-center gap-1 text-teal-600 text-xs font-medium">
                      <TrendingDown className="w-3.5 h-3.5" /> Lower
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-cocoa-500 text-xs">
                      <Minus className="w-3.5 h-3.5" /> Flat
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Staff & Channel Tab ──────────────────────────────────────────────────────

type StaffSortField = 'taskScore' | 'attendanceScore' | 'guestScore' | 'avgResolution'

function StaffChannelTab() {
  const [staffSort, setStaffSort] = useState<StaffSortField>('guestScore')
  const [staffDir, setStaffDir] = useState<SortDir>('desc')

  function handleStaffSort(f: StaffSortField) {
    if (f === staffSort) setStaffDir(d => (d === 'desc' ? 'asc' : 'desc'))
    else { setStaffSort(f); setStaffDir('desc') }
  }

  const sortedStaff = useMemo(() => {
    return [...staffPerformance].sort((a, b) => {
      const av = staffSort === 'avgResolution'
        ? parseFloat(a.avgResolution) || 999
        : a[staffSort]
      const bv = staffSort === 'avgResolution'
        ? parseFloat(b.avgResolution) || 999
        : b[staffSort]
      return staffDir === 'desc' ? bv - av : av - bv
    })
  }, [staffSort, staffDir])

  function scoreBadge(score: number) {
    if (score >= 95) return 'badge-success'
    if (score >= 88) return 'badge-info'
    return 'badge-warning'
  }

  const channelChartData = channelPerformance.map(c => ({
    name: c.channel,
    Bookings: c.bookings,
    Revenue: Math.round(c.revenue / 1000),
  }))

  const thCls = (f: StaffSortField) =>
    `table-header cursor-pointer select-none hover:text-navy-700 transition-colors ${staffSort === f ? 'text-navy-700' : ''}`

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-12 gap-5">
        {/* Staff Table */}
        <div className="col-span-12 xl:col-span-6 bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-cocoa-800">Staff Performance</h3>
              <p className="text-xs text-cocoa-500 mt-0.5">Click column header to sort</p>
            </div>
            <Users className="w-4 h-4 text-cocoa-300" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sand-50">
                  <th className="table-header text-left">Name / Role</th>
                  <th className={`${thCls('taskScore')} text-right`} onClick={() => handleStaffSort('taskScore')}>
                    <span className="flex items-center justify-end gap-1">Tasks <SortIcon field="taskScore" active={staffSort} dir={staffDir} /></span>
                  </th>
                  <th className={`${thCls('attendanceScore')} text-right`} onClick={() => handleStaffSort('attendanceScore')}>
                    <span className="flex items-center justify-end gap-1">Attend. <SortIcon field="attendanceScore" active={staffSort} dir={staffDir} /></span>
                  </th>
                  <th className={`${thCls('guestScore')} text-right`} onClick={() => handleStaffSort('guestScore')}>
                    <span className="flex items-center justify-end gap-1">Score <SortIcon field="guestScore" active={staffSort} dir={staffDir} /></span>
                  </th>
                  <th className={`${thCls('avgResolution')} text-right`} onClick={() => handleStaffSort('avgResolution')}>
                    <span className="flex items-center justify-end gap-1">Avg Res. <SortIcon field="avgResolution" active={staffSort} dir={staffDir} /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedStaff.map(s => (
                  <tr key={s.name} className="hover:bg-sand-50 transition-colors">
                    <td className="table-cell">
                      <div className="font-medium text-cocoa-800">{s.name}</div>
                      <div className="text-xs text-cocoa-500">{s.role}</div>
                    </td>
                    <td className="table-cell text-right text-cocoa-600">{s.taskScore}%</td>
                    <td className="table-cell text-right text-cocoa-600">{s.attendanceScore}%</td>
                    <td className="table-cell text-right">
                      <span className={scoreBadge(s.guestScore)}>{s.guestScore}</span>
                    </td>
                    <td className="table-cell text-right text-cocoa-600 font-mono text-xs">{s.avgResolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="col-span-12 xl:col-span-6 space-y-4">
          {/* Bar chart */}
          <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-cocoa-800">Channel Performance</h3>
              <div className="flex items-center gap-3 text-xs text-cocoa-500">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-navy-700 inline-block" />Bookings</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold-400 inline-block" />Revenue (K)</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={channelChartData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D9E2EC" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#52616B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #D9E2EC', fontSize: 12, boxShadow: '0 4px 24px rgba(15,76,129,0.08)' }}
                />
                <Bar dataKey="Bookings" fill="#0F4C81" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Revenue" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Channel table */}
          <div className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-sand-50">
                  <th className="table-header text-left">Channel</th>
                  <th className="table-header text-right">Conv.</th>
                  <th className="table-header text-right">Avg Value</th>
                  <th className="table-header text-right">Avg Stay</th>
                </tr>
              </thead>
              <tbody>
                {channelPerformance.map(c => (
                  <tr key={c.channel} className="hover:bg-sand-50 transition-colors">
                    <td className="table-cell font-medium text-cocoa-800">{c.channel}</td>
                    <td className="table-cell text-right">
                      <span className={c.convRate >= 40 ? 'text-teal-600 font-semibold' : c.convRate >= 25 ? 'text-cocoa-600' : 'text-terra-600'}>
                        {c.convRate}%
                      </span>
                    </td>
                    <td className="table-cell text-right font-display text-navy-700">
                      IDR {(c.avgValue / 1000).toFixed(1)}K
                    </td>
                    <td className="table-cell text-right text-cocoa-600">{c.avgStay} nts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

const ReportsAnalytics: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('revenue')
  const [activePeriod, setActivePeriod] = useState<Period>('this-month')

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'revenue', label: 'Revenue', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'occupancy', label: 'Occupancy', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Maintenance', icon: <Wrench className="w-4 h-4" /> },
    { id: 'staff', label: 'Staff & Channel', icon: <Users className="w-4 h-4" /> },
  ]

  const periods: { id: Period; label: string }[] = [
    { id: 'this-month', label: 'This Month' },
    { id: 'last-3m', label: 'Last 3M' },
    { id: 'ytd', label: 'YTD' },
  ]

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-cocoa-800">Reports & Analytics</h1>
          <p className="text-sm text-cocoa-500 mt-0.5">Performance insights across revenue, occupancy, operations and team</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="btn-gold">
            <Table2 className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      </div>

      {/* Tab bar + period selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-sand-100 rounded-xl p-1 border border-sand-300">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === t.id
                  ? 'bg-white text-cocoa-800 shadow-sm border border-sand-300'
                  : 'text-cocoa-500 hover:text-navy-700'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-1 bg-sand-100 rounded-xl p-1 border border-sand-300">
          {periods.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePeriod(p.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activePeriod === p.id
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'text-cocoa-500 hover:text-navy-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'revenue' && <RevenueTab />}
      {activeTab === 'occupancy' && <OccupancyTab />}
      {activeTab === 'maintenance' && <MaintenanceTab />}
      {activeTab === 'staff' && <StaffChannelTab />}
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
import type { FC } from 'react'

export default ReportsAnalytics
