import { type FC, type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import clsx from 'clsx'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  footer?: ReactNode
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const Modal: FC<ModalProps> = ({ open, onClose, title, subtitle, size = 'md', children, footer }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className={clsx(
        'relative w-full bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up',
        sizeMap[size],
      )}>
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-sand-100 flex-shrink-0">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-800">{title}</h2>
            {subtitle && <p className="text-xs text-cocoa-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-sand-100 hover:bg-sand-200 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
          >
            <X className="w-4 h-4 text-cocoa-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-sand-100 flex items-center justify-end gap-3 flex-shrink-0 bg-sand-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
