import { type FC } from 'react'
import { AlertTriangle, AlertCircle, Info, XCircle, X } from 'lucide-react'
import clsx from 'clsx'

interface Alert {
  id: string
  type: 'warning' | 'critical' | 'urgent' | 'info'
  title: string
  body: string
  time: string
  villa: string
}

interface AlertBannerProps {
  alerts: Alert[]
  compact?: boolean
}

const typeConfig = {
  critical: { icon: XCircle, bg: 'bg-terra-50 border-terra-200', icon_color: 'text-terra-500', title_color: 'text-terra-800', dot: 'bg-terra-400' },
  urgent:   { icon: AlertCircle, bg: 'bg-gold-50 border-gold-200', icon_color: 'text-gold-600', title_color: 'text-gold-800', dot: 'bg-gold-400' },
  warning:  { icon: AlertTriangle, bg: 'bg-gold-50 border-gold-200', icon_color: 'text-gold-600', title_color: 'text-gold-800', dot: 'bg-gold-400' },
  info:     { icon: Info, bg: 'bg-navy-50 border-navy-200', icon_color: 'text-navy-500', title_color: 'text-navy-800', dot: 'bg-navy-400' },
}

const AlertBanner: FC<AlertBannerProps> = ({ alerts, compact = false }) => {
  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const cfg = typeConfig[alert.type]
        const Icon = cfg.icon
        return (
          <div
            key={alert.id}
            className={clsx('flex items-start gap-3 rounded-xl border px-4 py-3', cfg.bg)}
          >
            <div className="mt-0.5 flex-shrink-0">
              <Icon className={clsx('w-4 h-4', cfg.icon_color)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={clsx('text-sm font-semibold', cfg.title_color)}>{alert.title}</span>
                {alert.villa !== '—' && (
                  <span className="text-xs bg-white/70 px-2 py-0.5 rounded-full text-cocoa-500 border border-cocoa-100">
                    {alert.villa}
                  </span>
                )}
              </div>
              {!compact && <p className="text-xs text-cocoa-600 mt-0.5">{alert.body}</p>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-cocoa-400">{alert.time}</span>
              <button className="w-5 h-5 rounded-full hover:bg-black/10 flex items-center justify-center transition-colors">
                <X className="w-3 h-3 text-cocoa-400" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AlertBanner
