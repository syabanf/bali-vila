import { type FC } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import Modal from './Modal'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  variant?: 'danger' | 'warning'
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open, onClose, onConfirm, title, message,
  confirmLabel = 'Delete', variant = 'danger',
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            onClick={() => { onConfirm(); onClose() }}
            className={variant === 'danger'
              ? 'flex items-center gap-2 px-4 py-2 rounded-xl bg-terra-500 text-white text-sm font-medium hover:bg-terra-600 transition-colors'
              : 'flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 text-navy-900 text-sm font-medium hover:bg-gold-400 transition-colors'
            }
          >
            {variant === 'danger' && <Trash2 className="w-3.5 h-3.5" />}
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${variant === 'danger' ? 'bg-terra-50' : 'bg-gold-50'}`}>
          <AlertTriangle className={`w-5 h-5 ${variant === 'danger' ? 'text-terra-500' : 'text-gold-500'}`} />
        </div>
        <p className="text-sm text-cocoa-700 leading-relaxed pt-1.5">{message}</p>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
