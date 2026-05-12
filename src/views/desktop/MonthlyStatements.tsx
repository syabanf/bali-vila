import { type FC, useState } from 'react'
import { FileText, Download, CheckCircle, Clock, Send, Eye, TrendingUp, DollarSign } from 'lucide-react'
import { ownerStatements } from '../../data/mockData'
import clsx from 'clsx'

const statusConfig = {
  'Ready': { badge: 'badge-success', icon: CheckCircle },
  'Pending Review': { badge: 'badge-warning', icon: Clock },
  'Sent': { badge: 'badge-info', icon: Send },
}

const MonthlyStatements: FC = () => {
  const [activeStatement, setActiveStatement] = useState(ownerStatements[0])

  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="kpi-card">
          <div className="font-display text-3xl font-semibold text-cocoa-800">247</div>
          <div className="text-xs text-cocoa-500 mt-1">Statements to generate</div>
        </div>
        <div className="kpi-card">
          <div className="font-display text-3xl font-semibold text-teal-600">189</div>
          <div className="text-xs text-cocoa-500 mt-1">Ready to send</div>
        </div>
        <div className="kpi-card">
          <div className="font-display text-3xl font-semibold text-gold-700">42</div>
          <div className="text-xs text-cocoa-500 mt-1">Pending review</div>
        </div>
        <div className="kpi-card">
          <div className="font-display text-3xl font-semibold text-cocoa-800">IDR 4.8B</div>
          <div className="text-xs text-cocoa-500 mt-1">Total net payable this month</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Statement List */}
        <div className="col-span-12 md:col-span-4 xl:col-span-4 bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
          <div className="p-4 border-b border-sand-100 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-cocoa-800">Owner Statements</h3>
            <span className="text-xs text-cocoa-500">April 2026</span>
          </div>
          <div className="divide-y divide-sand-100">
            {ownerStatements.map((stmt) => {
              const cfg = statusConfig[stmt.status as keyof typeof statusConfig]
              return (
                <button
                  key={stmt.id}
                  onClick={() => setActiveStatement(stmt)}
                  className={clsx(
                    'w-full p-4 text-left hover:bg-sand-50 transition-colors',
                    activeStatement.id === stmt.id && 'bg-navy-50 border-l-2 border-navy-600'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-cocoa-800">{stmt.villa}</span>
                    <span className={cfg.badge}>{stmt.status}</span>
                  </div>
                  <div className="text-xs text-cocoa-500 mb-1">{stmt.owner}</div>
                  <div className="text-sm font-bold text-teal-700">
                    IDR {stmt.netPayable.toLocaleString()}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Statement Detail — PDF Preview style */}
        <div className="col-span-12 md:col-span-8 xl:col-span-8">
          <div className="bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden">
            {/* Header */}
            <div className="bg-navy-900 px-8 py-6 bg-batik">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-400/20 border border-gold-400/30 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-semibold text-white">BAV OS</div>
                      <div className="text-xs text-navy-300">Owner Monthly Statement</div>
                    </div>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">{activeStatement.villa}</h2>
                  <p className="text-sm text-navy-300 mt-0.5">{activeStatement.owner}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-navy-400 mb-1">Statement Period</div>
                  <div className="font-display text-lg font-semibold text-white">{activeStatement.period}</div>
                  <div className="text-xs text-navy-300 mt-1">Ref: {activeStatement.id}</div>
                </div>
              </div>
            </div>

            {/* Income breakdown */}
            <div className="p-8">
              <h4 className="font-display text-base font-semibold text-cocoa-800 mb-4">Income Summary</h4>
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Direct Booking Income', value: activeStatement.directIncome, type: 'income' },
                  { label: 'OTA Income', value: activeStatement.otaIncome, type: 'income' },
                  { label: 'Total Gross Income', value: activeStatement.totalIncome, type: 'total' },
                ].map((row) => (
                  <div key={row.label} className={clsx(
                    'flex items-center justify-between py-3',
                    row.type === 'total' ? 'border-t-2 border-sand-300 font-semibold' : 'border-b border-sand-100'
                  )}>
                    <span className={clsx('text-sm', row.type === 'total' ? 'text-cocoa-800 font-semibold' : 'text-cocoa-600')}>{row.label}</span>
                    <span className={clsx('text-sm font-semibold', row.type === 'total' ? 'text-cocoa-800 text-base' : 'text-teal-700')}>
                      IDR {row.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <h4 className="font-display text-base font-semibold text-cocoa-800 mb-4">Deductions</h4>
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Management Fee (10%)', value: -activeStatement.managementFee },
                  { label: 'Maintenance Charge', value: -activeStatement.maintenance },
                  { label: 'Purchasing Charge', value: -activeStatement.purchasing },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-b border-sand-100">
                    <span className="text-sm text-cocoa-600">{row.label}</span>
                    <span className="text-sm font-semibold text-terra-600">
                      −IDR {Math.abs(row.value).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Net payable highlight */}
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">Net Payable to Owner</div>
                  <div className="font-display text-3xl font-semibold text-teal-800">
                    IDR {activeStatement.netPayable.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-sm py-2"><Eye className="w-4 h-4" /> Preview PDF</button>
                  <button className="btn-gold text-sm py-2"><Download className="w-4 h-4" /> Export PDF</button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button className="btn-primary flex-1 justify-center">Approve & Send to Owner</button>
                <button className="btn-secondary px-4">Request Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyStatements
