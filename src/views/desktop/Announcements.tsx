import { type FC, useState } from 'react'
import { Sparkles, Copy, Share2, MessageCircle, Globe, ChevronRight } from 'lucide-react'

const Announcements: FC = () => {
  const [form, setForm] = useState({
    guestName: 'Sophia Laurent',
    villa: 'Villa Tirta 05',
    checkIn: '2026-05-14',
    checkOut: '2026-05-18',
    guests: '2',
    supervisor: 'Made Suarjana',
    housekeeping: 'Putu Artawan & Team',
    notes: 'Early check-in requested (12:00). Celebrate wedding anniversary. Champagne setup needed.',
  })
  const [generated, setGenerated] = useState(true)
  const [activeTab, setActiveTab] = useState('whatsapp')

  const waMessage = `🏡 *RESERVATION ANNOUNCEMENT*
*BAV OS — Villa Operations Alert*
─────────────────────────
📍 *Villa:* ${form.villa}
👤 *Guest:* ${form.guestName}
📅 *Check-in:* ${form.checkIn} at ${form.guests === '2' ? '14:00' : '15:00'} *(Early: 12:00 requested)*
📅 *Check-out:* ${form.checkOut}
👥 *Guests:* ${form.guests} adults

*Team Assignment:*
🔍 Supervisor: ${form.supervisor}
🧹 Housekeeping: ${form.housekeeping}

*Special Notes:*
${form.notes}

✅ Please confirm receipt.
─────────────────────────
_Sent via BAV OS Announcement Center_`

  const guestNote = `Dear ${form.guestName.split(' ')[0]},

We are delighted to welcome you to ${form.villa}. Your villa has been lovingly prepared and our team is ready to ensure every moment of your stay is exceptional.

*Check-in:* ${form.checkIn}, from 12:00
*Check-out:* ${form.checkOut}, by 11:00

Should you need anything before or during your stay, please do not hesitate to reach out. We look forward to hosting you.

Warm regards,
Bali Asia Villa — Guest Relations`

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-12 gap-4">
        {/* Input Form */}
        <div className="col-span-12 xl:col-span-5 bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
          <div className="p-5 border-b border-sand-100">
            <h3 className="font-display text-lg font-semibold text-navy-800">Reservation Details</h3>
            <p className="text-xs text-cocoa-400 mt-0.5">Fill in to generate announcements</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">Guest Name</label>
                <input className="input-field" value={form.guestName} onChange={e => setForm({...form, guestName: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">Villa</label>
                <select className="input-field" value={form.villa} onChange={e => setForm({...form, villa: e.target.value})}>
                  <option>Villa Tirta 05</option>
                  <option>Villa Puri 12</option>
                  <option>Villa Sawah 03</option>
                  <option>Villa Lumbung 08</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">Check-in</label>
                <input type="date" className="input-field" value={form.checkIn} onChange={e => setForm({...form, checkIn: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">Check-out</label>
                <input type="date" className="input-field" value={form.checkOut} onChange={e => setForm({...form, checkOut: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">No. of Guests</label>
                <input type="number" min="1" className="input-field" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">Supervisor</label>
                <select className="input-field" value={form.supervisor} onChange={e => setForm({...form, supervisor: e.target.value})}>
                  <option>Made Suarjana</option>
                  <option>Putu Artawan</option>
                  <option>Ketut Riana</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">Housekeeping Team</label>
              <input className="input-field" value={form.housekeeping} onChange={e => setForm({...form, housekeeping: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cocoa-500 mb-1.5">Special Notes</label>
              <textarea className="input-field resize-none" rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
            </div>
            <button onClick={() => setGenerated(true)} className="btn-gold w-full justify-center">
              <Sparkles className="w-4 h-4" />
              Generate Announcements
            </button>
          </div>
        </div>

        {/* AI Output */}
        <div className="col-span-12 xl:col-span-7 space-y-4">
          {/* Tab selector */}
          <div className="flex items-center gap-2 bg-white rounded-xl border border-sand-200 p-1 shadow-card">
            {[
              { id: 'whatsapp', label: 'WhatsApp (Internal)', icon: MessageCircle },
              { id: 'guest', label: 'Guest Note', icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium flex-1 justify-center transition-all duration-200 ${
                    activeTab === tab.id ? 'bg-navy-800 text-white shadow-sm' : 'text-cocoa-600 hover:bg-sand-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {generated && (
            <div className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden animate-slide-up">
              <div className="flex items-center justify-between px-5 py-3 border-b border-sand-100 bg-sand-50">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-400/20 border border-teal-400/30 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-teal-600" />
                  </div>
                  <span className="text-xs font-semibold text-teal-700">AI Generated</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-xs py-1.5 px-3"><Copy className="w-3 h-3" /> Copy</button>
                  <button className="btn-primary text-xs py-1.5 px-3"><Share2 className="w-3 h-3" /> Send</button>
                </div>
              </div>

              <div className="p-5">
                {activeTab === 'whatsapp' ? (
                  <div className="bg-[#E9EFD4] rounded-2xl p-4 font-mono text-sm text-gray-800 leading-relaxed whitespace-pre-wrap shadow-inner">
                    {waMessage}
                  </div>
                ) : (
                  <div className="bg-sand-50 rounded-2xl p-6 border border-sand-200">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-sand-200">
                      <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-navy-700">BAV</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-800">Bali Asia Villa</div>
                        <div className="text-xs text-cocoa-400">Guest Relations Team</div>
                      </div>
                    </div>
                    <p className="text-sm text-cocoa-700 leading-relaxed whitespace-pre-wrap">{guestNote}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action chips */}
          {generated && (
            <div className="flex flex-wrap gap-2 animate-slide-up">
              {['Create Internal Task', 'Add to Calendar', 'Assign Housekeeping', 'Print Checklist'].map((action) => (
                <button key={action} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-sand-200 text-xs font-medium text-navy-700 hover:border-navy-300 hover:bg-sand-50 transition-all duration-200 shadow-card">
                  {action}
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Announcements
