import { type FC, type ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import clsx from 'clsx'

interface KPICardProps {
  label: string
  value: string
  trend?: number
  trendLabel?: string
  icon?: ReactNode
  accent?: 'gold' | 'teal' | 'terra' | 'navy' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

const accentMap = {
  gold: 'bg-gold-50 border-gold-200',
  teal: 'bg-teal-50 border-teal-200',
  terra: 'bg-terra-50 border-terra-200',
  navy: 'bg-navy-50 border-navy-200',
  default: 'bg-white border-sand-200',
}

const iconBgMap = {
  gold: 'bg-gold-100 text-gold-600',
  teal: 'bg-teal-100 text-teal-600',
  terra: 'bg-terra-100 text-terra-600',
  navy: 'bg-navy-100 text-navy-600',
  default: 'bg-sand-100 text-cocoa-500',
}

const KPICard: FC<KPICardProps> = ({
  label, value, trend, trendLabel, icon, accent = 'default', size = 'md'
}) => {
  const isPositive = trend !== undefined && trend > 0
  const isNegative = trend !== undefined && trend < 0

  return (
    <div className={clsx(
      'rounded-2xl border shadow-card hover:shadow-card-hover transition-all duration-300',
      'p-3 md:p-4 xl:p-5',
      accentMap[accent],
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-cocoa-400 mb-1.5 leading-tight">{label}</p>
          <p className="font-display font-semibold text-navy-800 leading-tight text-xl md:text-2xl xl:text-2xl 2xl:text-3xl break-words">
            {value}
          </p>
          {trend !== undefined && (
            <div className={clsx(
              'flex items-center gap-1 mt-1.5 text-xs font-medium flex-wrap',
              isPositive ? 'text-teal-600' : isNegative ? 'text-terra-600' : 'text-cocoa-400',
            )}>
              {isPositive ? <TrendingUp className="w-3 h-3 flex-shrink-0" /> : isNegative ? <TrendingDown className="w-3 h-3 flex-shrink-0" /> : <Minus className="w-3 h-3 flex-shrink-0" />}
              <span>{isPositive ? '+' : ''}{trend}%{trendLabel ? ` ${trendLabel}` : ''}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={clsx('w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center flex-shrink-0', iconBgMap[accent])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default KPICard
