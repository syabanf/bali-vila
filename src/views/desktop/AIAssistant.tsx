import { type FC, useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Mic, AlertTriangle, Wrench, ArrowRight, Sparkles, Image, FileText, Droplets, Wind, Zap, Waves, Flame, Wifi } from 'lucide-react'
import { aiChatHistory } from '../../data/mockData'
import clsx from 'clsx'

interface Message {
  role: 'user' | 'ai'
  message: string
  time: string
  urgency?: string
  actions?: string[]
}

const AIAssistant: FC = () => {
  const [messages, setMessages] = useState<Message[]>(aiChatHistory as Message[])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const aiResponse: Message = {
    role: 'ai',
    message: `**Diagnosis: AC Unit Not Cooling**

**Possible Causes:**
1. Refrigerant leak or low refrigerant level
2. Dirty or clogged air filter reducing airflow
3. Faulty compressor or capacitor failure
4. Condenser coil blocked by debris or dust

**Immediate Inspection Steps:**
1. Check and clean the air filter — replace if heavily soiled
2. Inspect condenser unit outdoors for obstruction
3. Listen for unusual compressor noises (clicking/humming)
4. Check thermostat settings and remote control batteries

**Urgency Level:** 🟡 Medium — Guest comfort impact expected in < 2 hours

**Recommendation:** Contact AC specialist. If guest check-in today, prioritize with 1-hour SLA.`,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    urgency: 'medium',
    actions: ['Assign AC Technician', 'Create Ticket', 'Notify Supervisor', 'Check SOP'],
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', message: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, aiResponse])
    }, 1800)
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const urgencyColor = { low: 'text-teal-600 bg-teal-50 border-teal-200', medium: 'text-gold-700 bg-gold-50 border-gold-200', high: 'text-terra-600 bg-terra-50 border-terra-200' }

  return (
    <div className="animate-fade-in h-full">
      <div className="grid grid-cols-12 gap-4">
        {/* Chat Area */}
        <div className="col-span-12 xl:col-span-8 flex flex-col bg-white rounded-2xl border border-sand-300 shadow-card overflow-hidden" style={{ height: 'min(calc(100vh - 160px), 680px)' }}>
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-sand-100 bg-sand-50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-navy-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <div className="font-semibold text-cocoa-800 text-sm">BAV AI Maintenance Assistant</div>
              <div className="text-xs text-teal-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-slow inline-block" />
                Online · Powered by AI
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="badge-info text-xs">Maintenance Mode</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={clsx('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-navy-600" />
                  </div>
                )}
                <div className={clsx('max-w-xl', msg.role === 'user' ? 'items-end' : 'items-start', 'flex flex-col gap-2')}>
                  <div className={clsx(
                    'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-navy-800 text-white rounded-br-md'
                      : 'bg-sand-50 border border-sand-300 text-cocoa-800 rounded-bl-md'
                  )}>
                    {msg.role === 'ai' ? (
                      <div className="space-y-1.5">
                        {msg.message.split('\n').map((line, j) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <p key={j} className="font-semibold text-navy-900">{line.replace(/\*\*/g, '')}</p>
                          }
                          if (line.match(/^\d+\./)) {
                            return <p key={j} className="text-cocoa-700 pl-2">{line}</p>
                          }
                          if (line.startsWith('- ')) {
                            return <p key={j} className="text-cocoa-700 pl-2">• {line.slice(2)}</p>
                          }
                          if (line.includes('Urgency Level')) {
                            return (
                              <div key={j} className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mt-1',
                                msg.urgency ? urgencyColor[msg.urgency as keyof typeof urgencyColor] : ''
                              )}>
                                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                                {line.replace(/\*\*/g, '').replace(/Urgency Level:\s*/i, '')}
                              </div>
                            )
                          }
                          return line ? <p key={j} className="text-cocoa-700">{line}</p> : <br key={j} />
                        })}
                      </div>
                    ) : (
                      <p>{msg.message}</p>
                    )}
                  </div>

                  {msg.actions && (
                    <div className="flex flex-wrap gap-2">
                      {msg.actions.map((action) => (
                        <button key={action} className={clsx(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200',
                          action.includes('Assign') ? 'bg-navy-800 text-white border-navy-800 hover:bg-navy-700' :
                          action === 'Create Ticket' ? 'bg-terra-50 text-terra-700 border-terra-200 hover:bg-terra-100' :
                          'bg-white text-navy-700 border-sand-300 hover:border-navy-300'
                        )}>
                          {action}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-xs text-cocoa-500 px-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-navy-600" />
                </div>
                <div className="bg-sand-50 border border-sand-300 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cocoa-300 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-cocoa-300 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-cocoa-300 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input area */}
          <div className="px-5 py-4 border-t border-sand-100 bg-sand-50">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-sand-300 px-3 py-2.5 shadow-card">
              <button className="w-7 h-7 rounded-lg hover:bg-sand-100 flex items-center justify-center transition-colors">
                <Paperclip className="w-4 h-4 text-cocoa-500" />
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-sand-100 flex items-center justify-center transition-colors">
                <Image className="w-4 h-4 text-cocoa-500" />
              </button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Describe the issue, upload a photo, or type your question…"
                className="flex-1 bg-transparent text-sm text-cocoa-700 placeholder-cocoa-300 outline-none"
              />
              <button className="w-7 h-7 rounded-lg hover:bg-sand-100 flex items-center justify-center transition-colors">
                <Mic className="w-4 h-4 text-cocoa-500" />
              </button>
              <button
                onClick={handleSend}
                className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center hover:bg-navy-700 transition-colors flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <p className="text-xs text-cocoa-500 mt-2 text-center">AI suggestions are diagnostic guides. Always verify with a qualified technician for safety-critical issues.</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-4">
          {/* Quick prompts */}
          <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-5">
            <h4 className="font-display text-base font-semibold text-cocoa-800 mb-3">Quick Diagnostics</h4>
            <div className="space-y-2">
              {[
                { label: 'Low water pressure', icon: Droplets },
                { label: 'AC not cooling', icon: Wind },
                { label: 'Electrical trip', icon: Zap },
                { label: 'Pool pump noise', icon: Waves },
                { label: 'Water heater issue', icon: Flame },
                { label: 'Wifi/internet down', icon: Wifi },
              ].map((prompt) => {
                const Icon = prompt.icon
                return (
                  <button
                    key={prompt.label}
                    onClick={() => setInput(prompt.label)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-sand-50 border border-sand-300 hover:border-navy-200 hover:bg-sand-100 transition-all duration-200 text-sm text-navy-700 font-medium"
                  >
                    <Icon className="w-4 h-4 text-navy-500 flex-shrink-0" />
                    {prompt.label}
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-cocoa-500" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Recent tickets */}
          <div className="bg-white rounded-2xl border border-sand-300 shadow-card p-5">
            <h4 className="font-display text-base font-semibold text-cocoa-800 mb-3">Open Tickets</h4>
            <div className="space-y-2.5">
              {[
                { id: 'TK001', villa: 'Villa Tirta 05', issue: 'Pump pressure low', urgency: 'medium', status: 'In Progress' },
                { id: 'TK002', villa: 'Villa Sawah 03', issue: 'AC unit room 2', urgency: 'high', status: 'Pending' },
                { id: 'TK003', villa: 'Villa Puri 12', issue: 'Drain clog kitchen', urgency: 'low', status: 'Scheduled' },
              ].map((ticket) => (
                <div key={ticket.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-sand-300 bg-sand-50">
                  <div className={clsx('w-2 h-2 rounded-full flex-shrink-0',
                    ticket.urgency === 'high' ? 'bg-terra-400' : ticket.urgency === 'medium' ? 'bg-gold-400' : 'bg-teal-400'
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-cocoa-800 truncate">{ticket.issue}</div>
                    <div className="text-xs text-cocoa-500">{ticket.villa}</div>
                  </div>
                  <span className="text-xs text-cocoa-500 font-medium">{ticket.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
