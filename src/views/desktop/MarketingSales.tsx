import { type FC, useState } from 'react'
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { Plus, Filter, TrendingUp, Users, DollarSign, Target, ArrowUpRight } from 'lucide-react'
import { leads, campaignData } from '../../data/mockData'
import clsx from 'clsx'

const stageOrder = ['New Lead', 'Contacted', 'Warm', 'Hot', 'Proposal Sent', 'Booking Confirmed', 'Lost']

const stageMeta: Record<string, { color: string; bg: string; border: string }> = {
  'New Lead':          { color: 'text-cocoa-600',  bg: 'bg-sand-50',   border: 'border-sand-300' },
  'Contacted':         { color: 'text-navy-600',   bg: 'bg-navy-50',   border: 'border-navy-200' },
  'Warm':              { color: 'text-gold-700',   bg: 'bg-gold-50',   border: 'border-gold-200' },
  'Hot':               { color: 'text-terra-600',  bg: 'bg-terra-50',  border: 'border-terra-200' },
  'Proposal Sent':     { color: 'text-teal-700',   bg: 'bg-teal-50',   border: 'border-teal-200' },
  'Booking Confirmed': { color: 'text-teal-700',   bg: 'bg-teal-100',  border: 'border-teal-300' },
  'Lost':              { color: 'text-cocoa-500',  bg: 'bg-sand-100',  border: 'border-sand-300' },
}

const sourceColors: Record<string, string> = {
  Instagram: '#B85234', WhatsApp: '#2E8B57', Website: '#0A2E4E',
  OTA: '#C9A84C', Referral: '#3AA566',
}

const funnelData = [
  { name: 'Leads', value: 528, fill: '#0A2E4E' },
  { name: 'Contacted', value: 312, fill: '#0F4C81' },
  { name: 'Qualified', value: 186, fill: '#2E8B57' },
  { name: 'Proposal', value: 94, fill: '#C9A84C' },
  { name: 'Booked', value: 48, fill: '#1F6B43' },
]

const MarketingSales: FC = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null)

  const filteredLeads = activeStage ? leads.filter(l => l.stage === activeStage) : leads

  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="kpi-card">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-navy-500" />
            <span className="badge-success text-xs">+14%</span>
          </div>
          <div className="font-display text-3xl font-semibold text-cocoa-800">528</div>
          <div className="text-xs text-cocoa-500 mt-1">Total leads this month</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-teal-500" />
            <span className="badge-success text-xs">9.1%</span>
          </div>
          <div className="font-display text-3xl font-semibold text-cocoa-800">48</div>
          <div className="text-xs text-cocoa-500 mt-1">Bookings confirmed</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-gold-500" />
            <span className="badge-warning text-xs">IDR avg</span>
          </div>
          <div className="font-display text-3xl font-semibold text-cocoa-800">18.6K</div>
          <div className="text-xs text-cocoa-500 mt-1">Cost per booking (IDR k)</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-terra-400" />
            <span className="badge-info text-xs">—</span>
          </div>
          <div className="font-display text-3xl font-semibold text-cocoa-800">IDR 4.2K</div>
          <div className="text-xs text-cocoa-500 mt-1">Average cost per lead</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Kanban Pipeline */}
        <div className="col-span-12 xl:col-span-9">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-semibold text-cocoa-800">Sales Pipeline</h3>
            <div className="flex items-center gap-2">
              <button className="btn-secondary text-xs py-1.5 px-3"><Filter className="w-3.5 h-3.5" /> Filter</button>
              <button className="btn-primary text-xs py-1.5 px-3"><Plus className="w-3.5 h-3.5" /> Add Lead</button>
            </div>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max">
              {stageOrder.map((stage) => {
                const meta = stageMeta[stage]
                const stageLeads = leads.filter(l => l.stage === stage)
                const total = stageLeads.reduce((s, l) => s + l.value, 0)
                return (
                  <div key={stage} className="w-56 flex-shrink-0">
                    <div className={`flex items-center justify-between mb-2 px-3 py-2 rounded-xl border ${meta.bg} ${meta.border}`}>
                      <span className={`text-xs font-semibold ${meta.color}`}>{stage}</span>
                      <span className="text-xs bg-white/80 px-1.5 py-0.5 rounded-full text-cocoa-600 font-medium border border-sand-300">
                        {stageLeads.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {stageLeads.map((lead) => (
                        <div key={lead.id} className="bg-white rounded-xl p-3 border border-sand-300 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center text-xs font-semibold text-navy-700 flex-shrink-0">
                              {lead.avatar}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-cocoa-800 truncate">{lead.name}</div>
                              <div className="text-xs text-cocoa-500 truncate">{lead.villa}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-cocoa-800">IDR {(lead.value / 1000).toFixed(0)}K</span>
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-16 bg-sand-200 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-400 rounded-full" style={{ width: `${lead.probability}%` }} />
                              </div>
                              <span className="text-xs text-teal-600 font-medium">{lead.probability}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${sourceColors[lead.source]}18`, color: sourceColors[lead.source] }}>
                              {lead.source}
                            </span>
                            <span className="text-xs text-cocoa-500">{lead.lastContact}</span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-sand-100">
                            <span className="text-xs text-teal-600 font-medium">→ {lead.nextAction}</span>
                          </div>
                        </div>
                      ))}
                      {stageLeads.length === 0 && (
                        <div className="h-16 rounded-xl border-2 border-dashed border-sand-300 flex items-center justify-center">
                          <span className="text-xs text-cocoa-300">No leads</span>
                        </div>
                      )}
                    </div>
                    {stageLeads.length > 0 && (
                      <div className="mt-2 text-xs text-center text-cocoa-500">
                        IDR {(total / 1000).toFixed(0)}K pipeline
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="col-span-12 xl:col-span-3 space-y-4">
          {/* Funnel */}
          <div className="bg-white rounded-2xl p-5 border border-sand-300 shadow-card">
            <h4 className="font-display text-base font-semibold text-cocoa-800 mb-3">Conversion Funnel</h4>
            <ResponsiveContainer width="100%" height={180}>
              <FunnelChart>
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="right" fill="#52616B" stroke="none" dataKey="name" style={{ fontSize: 11 }} />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign Performance */}
          <div className="bg-white rounded-2xl p-5 border border-sand-300 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-base font-semibold text-cocoa-800">Campaign ROI</h4>
              <button className="text-xs text-navy-600 hover:text-cocoa-800 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /></button>
            </div>
            <div className="space-y-2.5">
              {campaignData.map((c) => (
                <div key={c.channel} className="flex items-center gap-3">
                  <div className="w-16 text-xs text-cocoa-600 flex-shrink-0">{c.channel}</div>
                  <div className="flex-1 h-1.5 bg-sand-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-navy-600" style={{ width: `${(c.bookings / 90) * 100}%` }} />
                  </div>
                  <div className="text-xs font-semibold text-cocoa-800 w-8 text-right">{c.bookings}</div>
                  <div className="text-xs text-cocoa-500 w-16 text-right">
                    {c.cpl === 0 ? 'Free' : `IDR ${c.cpl}K`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketingSales
