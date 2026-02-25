import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Bot, User, ExternalLink, Mic, MicOff } from 'lucide-react'
import { getChatResponse, suggestedPrompts } from '../utils/chatEngine'
import './Chat.css'

function TypingIndicator() {
    return (
        <div className="chat-bubble bot-bubble typing-bubble">
            <span /><span /><span />
        </div>
    )
}

function BotMessage({ msg }) {
    if (msg.response.type === 'general') {
        return (
            <div className="chat-bubble bot-bubble">
                <div
                    className="msg-text"
                    dangerouslySetInnerHTML={{ __html: msg.response.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br/>') }}
                />
            </div>
        )
    }

    const { intro, tools, tip } = msg.response
    return (
        <div className="chat-bubble bot-bubble structured">
            <p className="msg-intro" dangerouslySetInnerHTML={{ __html: intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            <div className="msg-tools">
                {tools.map(tool => tool && (
                    <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="msg-tool-chip"
                    >
                        <span className="chip-emoji">{tool.emoji}</span>
                        <div>
                            <div className="chip-name">{tool.name}</div>
                            <div className="chip-cat">{tool.category} · {tool.pricing}</div>
                        </div>
                        <ExternalLink size={12} className="chip-ext" />
                    </a>
                ))}
            </div>
            {tip && (
                <p className="msg-tip" dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
            )}
        </div>
    )
}

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            id: 0,
            role: 'bot',
            response: {
                type: 'general',
                text: "Hey! I'm your **X-Mentor AI** guide 👋\n\nI categorize and guide your decision-making across the AI tool landscape.\n\nAsk me anything like:\n- *\"Best AI tools for coding\"*\n- *\"Free design tools for students\"*\n- *\"ChatGPT vs Claude vs Gemini\"*",
                tools: [],
            },
        },
    ])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const bottomRef = useRef(null)
    const recognitionRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, typing])

    // Initialize Web Speech API
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = false
            recognitionRef.current.interimResults = true
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = ''
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript
                }
                setInput(currentTranscript)
            }

            recognitionRef.current.onend = () => {
                setIsListening(false)
            }

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error)
                setIsListening(false)
            }
        }
    }, [])

    const toggleListening = useCallback(() => {
        if (!recognitionRef.current) {
            alert('Your browser does not support speech recognition. Try Google Chrome.')
            return
        }

        if (isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        } else {
            setInput('')
            recognitionRef.current.start()
            setIsListening(true)
        }
    }, [isListening])


    function sendMessage(text) {
        const msg = text.trim()
        if (!msg) return

        const userMsg = { id: Date.now(), role: 'user', text: msg }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setTyping(true)

        setTimeout(() => {
            const response = getChatResponse(msg)
            setTyping(false)
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', response }])
        }, 900 + Math.random() * 400)
    }

    function handleKey(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage(input)
        }
    }

    return (
        <main className="chat-page">
            <div className="chat-layout">
                {/* Sidebar */}
                <aside className="chat-sidebar">
                    <div className="sidebar-header">
                        <Bot size={18} />
                        X-Mentor Chatbot
                    </div>
                    <p className="sidebar-caption">
                        Not just recommendations — <em>structured guidance</em> for smarter AI tool decisions.
                    </p>
                    <div className="sidebar-section">
                        <div className="sidebar-label">Try asking</div>
                        <div className="suggested-prompts">
                            {suggestedPrompts.map(prompt => (
                                <button
                                    key={prompt}
                                    className="suggested-prompt"
                                    onClick={() => sendMessage(prompt)}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="sidebar-note">
                        <span>💡</span>
                        Intelligent responses powered by structured logic — scalable to LLM integration.
                    </div>
                </aside>

                {/* Chat window */}
                <div className="chat-window">
                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-row ${msg.role === 'user' ? 'user-row' : 'bot-row'}`}>
                                <div className={`chat-avatar ${msg.role === 'user' ? 'user-avatar' : 'bot-avatar'}`}>
                                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                {msg.role === 'user' ? (
                                    <div className="chat-bubble user-bubble">{msg.text}</div>
                                ) : (
                                    <BotMessage msg={msg} />
                                )}
                            </div>
                        ))}
                        {typing && (
                            <div className="chat-row bot-row">
                                <div className="chat-avatar bot-avatar"><Bot size={14} /></div>
                                <TypingIndicator />
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="chat-input-bar">
                        <button
                            className={`chat-mic-btn ${isListening ? 'listening' : ''}`}
                            onClick={toggleListening}
                            title="Voice Input"
                        >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </button>
                        <input
                            id="chat-input"
                            type="text"
                            className="chat-input"
                            placeholder={isListening ? "Listening..." : "Ask about AI tools, categories, or comparisons..."}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                        />
                        <button
                            id="chat-send"
                            className="chat-send-btn btn-primary"
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || typing}
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
