'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Minimize2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const demoMessages: Message[] = [
  {
    id: '1',
    text: 'Сайн байна уу! KMO Education Center-тэй холбогдохыг хүсвэл бидэнтэй чатаар холбогдоорой.',
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000),
  },
]

const botResponses = [
  'Баярлалаа! Танай асуултанд хариулахдаа баяртай байна. Нэмэлт мэдээлэл хэрэгтэй юу?',
  'Манай сургалтын талаар дэлгэрэнгүй мэдээлэл авахыг хүсвэл манай вэбсайтаас үзэх эсвэл утас: 7735-5005 дугаараар холбогдоно уу.',
  'Солонгост суралцах, элсэлт, материал бүрдүүлэлт зэрэг асуудлаар зөвлөгөө авахыг хүсвэл манай оффис рүү ирж уулзаарай.',
  'Манай сургалтын талаар дэлгэрэнгүй мэдээллийг манай вэбсайтаас үзэх эсвэл бидэнтэй шууд холбогдоорой.',
]

export function MessengerChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(demoMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [messages, isOpen, isMinimized])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('mn-MN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            setIsMinimized(false)
          }}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0084ff] to-[#0066cc] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_40px_rgba(0,132,255,0.4)] focus:outline-none focus:ring-4 focus:ring-[#0084ff]/50 focus:ring-offset-2 animate-in fade-in zoom-in duration-300"
          aria-label="Чат нээх"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in zoom-in',
            isMinimized
              ? 'h-16 w-80'
              : 'h-[500px] w-80 sm:h-[600px] sm:w-96'
          )}
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#0084ff] to-[#0066cc] px-5 py-4 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30">
                <MessageCircle className="h-6 w-6" />
                <span className="absolute bottom-0 right-0 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
                </span>
              </div>
              <div>
                <div className="font-semibold text-base">KMO Education Center</div>
                <div className="flex items-center gap-1.5 text-xs opacity-95">
                  <Circle className="h-2 w-2 fill-current" />
                  <span>Онлайн</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-lg p-2 transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
                aria-label={isMinimized ? 'Дэлгэх' : 'Багасгах'}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
                aria-label="Хаах"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex animate-in fade-in slide-in-from-bottom-2 duration-300',
                        message.sender === 'user' ? 'justify-end' : 'justify-start',
                        index === messages.length - 1 && 'delay-100'
                      )}
                    >
                      <div
                        className={cn(
                          'group max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm transition-all hover:shadow-md',
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-[#0084ff] to-[#0066cc] text-white rounded-br-md'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                        )}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {message.text}
                        </p>
                        <p
                          className={cn(
                            'mt-1.5 text-xs',
                            message.sender === 'user'
                              ? 'text-white/80'
                              : 'text-gray-500'
                          )}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                      <div className="rounded-2xl rounded-bl-md bg-white border border-gray-100 px-4 py-3 shadow-sm">
                        <div className="flex gap-1.5 items-center">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Зурвас илгээх..."
                    className="flex-1 border-gray-200 focus:border-[#0084ff] focus:ring-[#0084ff]/20"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-br from-[#0084ff] to-[#0066cc] hover:from-[#0066cc] hover:to-[#0052a3] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
