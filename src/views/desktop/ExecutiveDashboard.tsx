import { type FC } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import {
  Home, Users, TrendingUp, DollarSign, Target, Package,
  Wrench, MapPin, Activity, ArrowUpRight, ChevronRight
} from 'lucide-react'
import KPICard from '../../components/KPICard'
import AlertBanner from '../../components/AlertBanner'
import { revenueData, occupancyData, staffActivity, alerts as rawAlerts } from '../../data/mockData'
import type { FC as _FC } from 'react'

type Alert = { id: string; type: 'warning' | 'critical' | 'urgent' | 'info'; title: string; body: string; time: string; villa: string }
const alerts = rawAlerts as Alert[]

const ExecutiveDashboard: FC = () => {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        <KPICard label="Total Villas" value="247" trend={8.4} icon={<Home className="w-5 h-5" />} accent="navy" />
        <KPICard label="Occupied" value="168" trend={3.2} icon={<Users className="w-5 h-5" />} accent="teal" />
        <KPICard label="Occupancy" value="68%" trend={2.1} icon={<Activity className="w-5 h-5" />} accent="teal" />
        <KPICard label="Revenue (mo)" value="IDR 2.1B" trend={12.4} icon={<DollarSign className="w-5 h-5" />} accent="gold" />
        <KPICard label="Direct Ratio" value="58%" trend={5.6} icon={<TrendingUp className="w-5 h-5" />} accent="gold" />
        <KPICard label="Saved (inv)" value="IDR 84M" trend={-2.1} icon={<Package className="w-5 h-5" />} accent="default" />
        <KPICard label="Open Issues" value="14" trend={-18} icon={<Wrench className="w-5 h-5" />} accent="terra" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Revenue Chart */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl p-4 md:p-6 border border-sand-200 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-800">Revenue Intelligence</h3>
              <p className="text-xs text-cocoa-400 mt-0.5">Direct vs OTA contribution — 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-navy-700 inline-block" />Direct</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />OTA</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOTA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E8B57" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2E8B57" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#D9E2EC" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7A8B95' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7A8B95' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #D9E2EC', fontSize: 12, boxShadow: '0 4px 24px rgba(15,76,129,0.08)' }}
                formatter={(v: number) => [`IDR ${v}M`, '']}
              />
              <Area type="monotone" dataKey="direct" stroke="#0F4C81" strokeWidth={2} fill="url(#colorDirect)" />
              <Area type="monotone" dataKey="ota" stroke="#2E8B57" strokeWidth={2} fill="url(#colorOTA)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Donut */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl p-6 border border-sand-200 shadow-card">
          <h3 className="font-display text-lg font-semibold text-navy-800 mb-1">Villa Status</h3>
          <p className="text-xs text-cocoa-400 mb-4">Current distribution</p>
          <div className="flex items-center justify-between gap-4">
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={occupancyData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {occupancyData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-navy-800 font-bold text-lg" style={{ fontSize: 20, fontWeight: 700, fill: '#0A2E4E' }}>68%</text>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {occupancyData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-cocoa-600">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="text-sm font-semibold text-navy-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Villa Growth Tracker */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-navy-900 rounded-2xl p-6 border border-navy-700 shadow-card bg-batik">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Growth Tracker</h3>
              <p className="text-xs text-navy-300 mt-0.5">Path to 400 villas</p>
            </div>
            <div className="badge-success text-teal-300 border-teal-500/30 bg-teal-500/10">On Track</div>
          </div>

          <div className="relative mb-3">
            <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-gold-400 rounded-full" style={{ width: '61.75%' }} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '61.75%' }}>
              <div className="w-4 h-4 rounded-full bg-gold-400 border-2 border-navy-900 -ml-2 shadow-gold" />
            </div>
          </div>

          <div className="flex justify-between text-xs text-navy-400 mb-5">
            {[0, 100, 200, 300, 400].map((n) => (
              <span key={n} className={n <= 247 ? 'text-gold-400 font-medium' : ''}>{n}</span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/8 rounded-xl p-3">
              <div className="font-display text-2xl font-semibold text-white">247</div>
              <div className="text-xs text-navy-300 mt-0.5">Current villas</div>
            </div>
            <div className="bg-white/8 rounded-xl p-3">
              <div className="font-display text-2xl font-semibold text-gold-300">153</div>
              <div className="text-xs text-navy-300 mt-0.5">To target</div>
            </div>
            <div className="bg-white/8 rounded-xl p-3">
              <div className="font-display text-2xl font-semibold text-teal-300">+8</div>
              <div className="text-xs text-navy-300 mt-0.5">Added this qtr</div>
            </div>
            <div className="bg-white/8 rounded-xl p-3">
              <div className="font-display text-2xl font-semibold text-white">Q3 '27</div>
              <div className="text-xs text-navy-300 mt-0.5">Est. completion</div>
            </div>
          </div>
        </div>

        {/* Ops Snapshot */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl p-6 border border-sand-200 shadow-card">
          <h3 className="font-display text-lg font-semibold text-navy-800 mb-4">Operations Snapshot</h3>
          <div className="space-y-3">
            {[
              { label: 'Ready', value: 168, color: 'bg-teal-400', pct: 68 },
              { label: 'Cleaning', value: 10, color: 'bg-gold-400', pct: 4 },
              { label: 'Maintenance', value: 15, color: 'bg-terra-400', pct: 6 },
              { label: 'Check-in Today', value: 23, color: 'bg-navy-400', pct: 9.3 },
              { label: 'Check-out Today', value: 18, color: 'bg-cocoa-300', pct: 7.3 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-cocoa-600">{row.label}</span>
                  <span className="text-sm font-semibold text-navy-800">{row.value} villas</span>
                </div>
                <div className="h-1.5 bg-sand-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Map Placeholder */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl p-6 border border-sand-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-navy-800">Team Activity Map</h3>
            <span className="badge-success">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-1.5 animate-pulse-slow" />
              Live
            </span>
          </div>
          {/* Stylized map grid */}
          <div className="relative h-44 bg-gradient-to-br from-teal-50 to-navy-50 rounded-xl border border-sand-200 overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0F2040 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            {staffActivity.map((staff, i) => (
              <div
                key={staff.id}
                className="absolute group cursor-pointer"
                style={{ left: `${15 + i * 16}%`, top: `${20 + (i % 3) * 22}%` }}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold shadow-lg
                  ${staff.status === 'active' ? 'bg-teal-400 border-white text-white' : 'bg-gold-400 border-white text-navy-900'}`}>
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {staff.name} — {staff.villa}
                </div>
                {staff.status === 'active' && (
                  <div className="absolute inset-0 rounded-full bg-teal-400/30 animate-ping" />
                )}
              </div>
            ))}
            <div className="absolute bottom-2 right-2 text-xs text-navy-600 bg-white/80 px-2 py-1 rounded-lg">Bali South Cluster</div>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-cocoa-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-400" />Active: 4</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold-400" />Break: 1</span>
            <span>Tasks done: 23/30</span>
          </div>
        </div>

        {/* Management Alerts */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl p-6 border border-sand-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-navy-800">Management Alert Center</h3>
            <button className="text-xs text-navy-600 hover:text-navy-800 flex items-center gap-1 font-medium">View all <ArrowUpRight className="w-3 h-3" /></button>
          </div>
          <AlertBanner alerts={alerts} />
        </div>

        {/* Monthly Revenue Bar */}
        <div className="col-span-12 xl:col-span-4 bg-white rounded-2xl p-6 border border-sand-200 shadow-card">
          <h3 className="font-display text-lg font-semibold text-navy-800 mb-1">Channel Split</h3>
          <p className="text-xs text-cocoa-400 mb-4">Booking source this month</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[
              { channel: 'Direct', value: 58, color: '#0F4C81' },
              { channel: 'Airbnb', value: 22, color: '#2E8B57' },
              { channel: 'Booking', value: 12, color: '#C9A84C' },
              { channel: 'Expedia', value: 5, color: '#B85234' },
              { channel: 'Other', value: 3, color: '#A0B5C4' },
            ]} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: '#7A8B95' }} axisLine={false} tickLine={false} width={55} />
              <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12, border: '1px solid #D9E2EC' }} formatter={(v) => [`${v}%`, '']} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {[
                  { channel: 'Direct', value: 58, color: '#0F4C81' },
                  { channel: 'Airbnb', value: 22, color: '#2E8B57' },
                  { channel: 'Booking', value: 12, color: '#C9A84C' },
                  { channel: 'Expedia', value: 5, color: '#B85234' },
                  { channel: 'Other', value: 3, color: '#A0B5C4' },
                ].map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost & Inventory Leakage */}
      <div className="bg-white rounded-2xl p-6 border border-sand-200 shadow-card">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-lg font-semibold text-navy-800">Cost & Inventory Leakage</h3>
            <p className="text-xs text-cocoa-400 mt-0.5">May 2026 — variance from standard stock</p>
          </div>
          <button className="btn-secondary text-xs py-1.5">Full Report <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Lost items this month', value: '23 items', color: 'text-terra-600', bg: 'bg-terra-50' },
            { label: 'Breakage incidents', value: '7 incidents', color: 'text-gold-700', bg: 'bg-gold-50' },
            { label: 'Villas with variance', value: '12 villas', color: 'text-navy-700', bg: 'bg-navy-50' },
            { label: 'Estimated loss value', value: 'IDR 4.2M', color: 'text-terra-700', bg: 'bg-terra-50' },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-4 ${item.bg}`}>
              <div className={`font-display text-2xl font-semibold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-cocoa-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {[
            { villa: 'Villa Seminyak 07', item: 'Coffee capsules', variance: '–22 units', severity: 'critical' },
            { villa: 'Villa Sawah 03', item: 'Shampoo 200ml', variance: '–14 units', severity: 'critical' },
            { villa: 'Villa Tirta 05', item: 'Bath towels', variance: '–3 pcs', severity: 'warning' },
            { villa: 'Villa Bukit 11', item: 'Wine glasses', variance: '–3 pcs (broken)', severity: 'warning' },
            { villa: 'Villa Tebing 01', item: 'Bed sheets (King)', variance: '–2 sets', severity: 'warning' },
          ].map((row) => (
            <div key={row.villa} className="flex items-center gap-3 py-2 border-b border-sand-100 last:border-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${row.severity === 'critical' ? 'bg-terra-400' : 'bg-gold-400'}`} />
              <span className="text-sm font-medium text-navy-700 w-36 flex-shrink-0">{row.villa}</span>
              <span className="text-sm text-cocoa-600 flex-1">{row.item}</span>
              <span className={`text-sm font-semibold ${row.severity === 'critical' ? 'text-terra-600' : 'text-gold-700'}`}>{row.variance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExecutiveDashboard
