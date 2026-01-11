"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Loader2, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export function AtlasChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Bonjour ! Je suis AtlasBot, le guide de ce portfolio. Je peux vous parler du parcours de Walson, de ses projets ou de ses disponibilités. Que souhaitez-vous savoir ?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [isOpen])

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputValue.trim() || isTyping) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue.trim(),
            timestamp: new Date()
        }

        // Capture current messages + new user message for API call
        const currentMessages = [...messages, userMessage]

        // 1. Update UI immediately with user message
        setMessages(currentMessages)
        setInputValue("")

        // 2. Wait 1s before showing typing indicator and making API call
        setTimeout(async () => {
            setIsTyping(true)

            try {
                const response = await fetch('/api/atlas-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: currentMessages }) // Use captured array
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.content || `API Error: ${response.status}`);
                }

                const data = await response.json();

                if (!data || !data.content) {
                    throw new Error('Invalid response from API');
                }

                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: data.content,
                    timestamp: new Date()
                }

                setMessages(prev => [...prev, assistantMessage])
            } catch (error: unknown) {
                console.error("Error sending message:", error)

                let errorMessageText = "Désolé, j'ai rencontré une erreur de connexion. Veuillez réessayer.";

                const err = error as { message?: string };

                // If it's a known error from the server (like 429), the error object or response might carry detail
                if (err.message && err.message.includes("429")) {
                    errorMessageText = "Vous envoyez des messages trop rapidement. Pausez une petite minute !";
                }

                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: errorMessageText,
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, errorMessage])
            } finally {

                setIsTyping(false)
            }
        }, 1000)
    }

    return (
        <>
            {/* Premium Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-[60]"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-[#4FD1C5] rounded-full blur-xl opacity-40 animate-pulse" />

                        <motion.button
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(true)}
                            className="relative group"
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4FD1C5] via-[#3CBFAF] to-[#4FD1C5] p-[2px]">
                                <div className="h-full w-full rounded-full bg-[#0D0D0D]" />
                            </div>

                            {/* Button content */}
                            <div className="relative flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-br from-[#4FD1C5] to-[#3CBFAF] shadow-[0_0_30px_rgba(79,209,197,0.3)] group-hover:shadow-[0_0_40px_rgba(79,209,197,0.5)] transition-all duration-300">
                                <div className="relative">
                                    <Sparkles size={24} className="text-[#0D0D0D]" strokeWidth={2.5} />
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-1"
                                    >
                                        <Zap size={12} className="text-white/80 absolute -top-1 -right-1" />
                                    </motion.div>
                                </div>
                                <span className="font-bold text-[#0D0D0D] text-sm tracking-wide">AtlasBot</span>
                            </div>

                            {/* Pulse indicator */}
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-lg"></span>
                            </span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-[60] w-[90vw] md:w-[420px] h-[650px] max-h-[85vh] flex flex-col"
                    >
                        {/* Outer glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1C5]/20 to-transparent rounded-3xl blur-2xl" />

                        {/* Main container */}
                        <div className="relative flex flex-col h-full bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                            {/* Premium Header */}
                            <div className="relative p-5 border-b border-white/5 overflow-hidden">
                                {/* Animated gradient background */}
                                <motion.div
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#4FD1C5]/5 via-[#4FD1C5]/10 to-[#4FD1C5]/5 bg-[length:200%_100%]"
                                />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Premium avatar */}
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1C5] to-[#3CBFAF] rounded-xl blur-md opacity-50" />
                                            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-[#4FD1C5]/20 to-[#3CBFAF]/20 border border-[#4FD1C5]/30 backdrop-blur-sm">
                                                <Sparkles size={20} className="text-[#4FD1C5]" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-white text-lg tracking-tight">AtlasBot</h3>
                                                <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-gradient-to-r from-[#4FD1C5] to-[#3CBFAF] text-[#0D0D0D] shadow-lg">BETA</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <div className="relative flex items-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                    <span className="absolute w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                                                </div>
                                                <p className="text-xs text-gray-400 font-medium">En ligne</p>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Messages Area with custom scrollbar */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-[#4FD1C5]/20 scrollbar-track-transparent hover:scrollbar-thumb-[#4FD1C5]/40">
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={cn(
                                            "flex gap-3 max-w-[85%]",
                                            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                        )}
                                    >
                                        {/* Avatar */}
                                        <div className={cn(
                                            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border backdrop-blur-sm",
                                            msg.role === "assistant"
                                                ? "bg-gradient-to-br from-[#4FD1C5]/10 to-[#3CBFAF]/10 border-[#4FD1C5]/20 text-[#4FD1C5] shadow-[0_0_15px_rgba(79,209,197,0.1)]"
                                                : "bg-white/5 border-white/10 text-white"
                                        )}>
                                            {msg.role === "assistant" ? <Bot size={16} strokeWidth={2.5} /> : <User size={16} strokeWidth={2.5} />}
                                        </div>

                                        {/* Message bubble */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className={cn(
                                                "p-4 rounded-2xl text-sm leading-relaxed backdrop-blur-sm",
                                                msg.role === "assistant"
                                                    ? "bg-gradient-to-br from-[#111111]/90 to-[#161616]/90 border border-white/5 text-gray-200 rounded-tl-sm shadow-lg"
                                                    : "bg-gradient-to-br from-[#4FD1C5] to-[#3CBFAF] text-[#0D0D0D] font-medium rounded-tr-sm shadow-[0_4px_20px_rgba(79,209,197,0.3)]"
                                            )}
                                        >
                                            {msg.role === "assistant" ? (
                                                <ReactMarkdown
                                                    components={{
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        strong: ({ node, ...props }) => <span className="font-bold text-[#4FD1C5]" {...props} />,
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        a: ({ node, ...props }) => <a className="text-[#4FD1C5] underline hover:text-white" target="_blank" rel="noopener noreferrer" {...props} />,
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 mt-2" {...props} />,
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 mt-2" {...props} />,
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        li: ({ node, ...props }) => <li className="marker:text-[#4FD1C5]" {...props} />,
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            ) : (
                                                msg.content
                                            )}
                                        </motion.div>
                                    </motion.div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-3 max-w-[85%]"
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4FD1C5]/10 to-[#3CBFAF]/10 border border-[#4FD1C5]/20 text-[#4FD1C5] flex items-center justify-center shrink-0 backdrop-blur-sm">
                                            <Bot size={16} strokeWidth={2.5} />
                                        </div>
                                        <div className="bg-gradient-to-br from-[#111111]/90 to-[#161616]/90 border border-white/5 px-5 py-4 rounded-2xl rounded-tl-sm flex gap-1.5">
                                            <motion.span
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                className="w-2 h-2 bg-[#4FD1C5] rounded-full"
                                            />
                                            <motion.span
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                className="w-2 h-2 bg-[#4FD1C5] rounded-full"
                                            />
                                            <motion.span
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                className="w-2 h-2 bg-[#4FD1C5] rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Premium Input Area */}
                            <div className="p-5 bg-[#0D0D0D]/50 backdrop-blur-xl border-t border-white/5">
                                <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
                                    <div className="relative flex-1">
                                        {/* Input glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#4FD1C5]/0 via-[#4FD1C5]/5 to-[#4FD1C5]/0 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />

                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Posez une question..."
                                            disabled={isTyping}
                                            className="relative w-full bg-[#111111]/80 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#4FD1C5]/50 focus:bg-[#111111] focus:shadow-[0_0_20px_rgba(79,209,197,0.1)] transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={!inputValue.trim() || isTyping}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1C5] to-[#3CBFAF] rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                                        <div className={cn(
                                            "relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4FD1C5] to-[#3CBFAF] shadow-lg transition-all duration-300",
                                            !inputValue.trim() || isTyping ? "opacity-50 cursor-not-allowed" : "group-hover:shadow-[0_0_25px_rgba(79,209,197,0.4)]"
                                        )}>
                                            {isTyping ? (
                                                <Loader2 size={20} className="text-[#0D0D0D] animate-spin" strokeWidth={2.5} />
                                            ) : (
                                                <Send size={20} className="text-[#0D0D0D]" strokeWidth={2.5} />
                                            )}
                                        </div>
                                    </motion.button>
                                </form>

                                <p className="text-[10px] text-center text-gray-600 mt-3 font-medium">
                                    AtlasBot peut faire des erreurs.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
