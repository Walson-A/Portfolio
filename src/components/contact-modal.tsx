"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Phone, MapPin, Send, Linkedin, Github, Loader2, ChevronRight, ChevronLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "hidden"
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    // Close on click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            setErrorMessage(null)
            const formData = {
                name: (document.getElementById('name') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
                subject: (document.getElementById('subject') as HTMLInputElement).value,
                message: (document.getElementById('message') as HTMLTextAreaElement).value,
                _honeypot: (document.getElementById('_honeypot') as HTMLInputElement).value,
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message')
            }

            setIsSent(true)
            setTimeout(() => {
                setIsSent(false)
                onClose()
            }, 3000)
        } catch (error: any) {
            console.error('Error sending message:', error)
            setErrorMessage(error.message || "Une erreur est survenue lors de l'envoi du message.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                        onClick={handleBackdropClick}
                        aria-hidden="true"
                    />

                    {/* Modal Card */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-4xl bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 z-10"
                            aria-label="Fermer la fenêtre de contact"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative flex flex-col h-full">
                            {/* Scrollable Content Container */}
                            <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-12 min-h-[500px] h-full no-scrollbar">

                                {/* LEFT COLUMN: Contact Info (5 cols) */}
                                <div className="min-w-full snap-center md:min-w-0 md:col-span-5 bg-[#111111] p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
                                    {/* Subtle background glow */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#4FD1C5]/5 to-transparent pointer-events-none" />

                                    <div className="relative z-10">
                                        <h2 className="text-2xl font-bold text-white mb-2">Discutons ensemble</h2>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                            À la recherche d&apos;un stagiaire / alternant ou simplement curieux de mon profil ? Je serais ravi d&apos;échanger avec vous.
                                        </p>

                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4 group">
                                                <div className="p-3 rounded-xl bg-white/5 text-[#4FD1C5] group-hover:bg-[#4FD1C5]/10 transition-colors">
                                                    <Mail size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-300">Email</h3>
                                                    <a href="mailto:walson.a.rene@gmail.com" className="text-sm text-gray-500 hover:text-[#4FD1C5] transition-colors">
                                                        walson.a.rene@gmail.com
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 group">
                                                <div className="p-3 rounded-xl bg-white/5 text-[#4FD1C5] group-hover:bg-[#4FD1C5]/10 transition-colors">
                                                    <Phone size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-300">Téléphone</h3>
                                                    <a href="tel:+33768356642" className="text-sm text-gray-500 hover:text-[#4FD1C5] transition-colors">
                                                        +33 7 68 35 66 42
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 group">
                                                <div className="p-3 rounded-xl bg-white/5 text-[#4FD1C5] group-hover:bg-[#4FD1C5]/10 transition-colors">
                                                    <MapPin size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-300">Localisation</h3>
                                                    <span className="text-sm text-gray-500">Île-de-France, France</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-8">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Réseaux sociaux</h3>
                                        <div className="flex gap-3">
                                            <SocialLink href="https://linkedin.com/in/walson-rené" icon={Linkedin} label="LinkedIn" />
                                            <SocialLink href="https://github.com/walson-a" icon={Github} label="GitHub" />
                                        </div>
                                    </div>

                                    {/* Swipe Hint Arrow (Mobile Only) */}
                                    <div className="md:hidden absolute right-4 top-[60%] -translate-y-1/2 z-20 animate-pulse text-white/20 pointer-events-none">
                                        <ChevronRight size={32} />
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Form (7 cols) */}
                                <div className="min-w-full snap-center md:min-w-0 md:col-span-7 p-8 md:p-10 bg-[#0D0D0D] relative">

                                    {/* Swipe Hint Arrow Left (Mobile Only) */}
                                    <div className="md:hidden absolute left-4 top-[60%] -translate-y-1/2 z-20 animate-pulse text-white/20 pointer-events-none">
                                        <ChevronLeft size={32} />
                                    </div>
                                    {isSent ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                                <Send size={32} className="text-green-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                                            <p className="text-gray-400">Je vous répondrai dans les plus brefs délais.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2 flex flex-col">
                                                    <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nom</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        required
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4FD1C5]/50 focus:bg-white/10 transition-all"
                                                        placeholder="Votre nom"
                                                    />
                                                </div>
                                                <div className="space-y-2 flex flex-col">
                                                    <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        required
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4FD1C5]/50 focus:bg-white/10 transition-all"
                                                        placeholder="example@mail.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 flex flex-col">
                                                <label htmlFor="subject" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sujet</label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4FD1C5]/50 focus:bg-white/10 transition-all"
                                                    placeholder="Le sujet de votre message"
                                                />
                                            </div>

                                            <div className="space-y-2 flex-1 flex flex-col">
                                                <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                                                <textarea
                                                    id="message"
                                                    required
                                                    className="w-full flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4FD1C5]/50 focus:bg-white/10 transition-all resize-none min-h-[150px]"
                                                    placeholder="Votre message..."
                                                />
                                            </div>

                                            {/* Honeypot field - Bot protection */}
                                            <input
                                                type="text"
                                                id="_honeypot"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                className="absolute opacity-0 pointer-events-none -z-50 h-0 w-0"
                                            />

                                            {errorMessage && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-xs font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                                                >
                                                    {errorMessage}
                                                </motion.p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-[#4FD1C5] hover:bg-[#3EB9AD] disabled:bg-[#4FD1C5]/50 disabled:cursor-not-allowed text-[#0D0D0D] font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,209,197,0.2)] hover:shadow-[0_0_30px_rgba(79,209,197,0.4)] flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 size={20} className="animate-spin" />
                                                        <span>Envoi en cours...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Envoyer le message</span>
                                                        <Send size={20} strokeWidth={2.5} />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Scroll Indicators */}
                            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none z-20">
                                <div className="w-2 h-2 rounded-full bg-[#4FD1C5] opacity-80" />
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-400 hover:text-[#4FD1C5] transition-all duration-300 hover:bg-white/5 rounded-xl hover:scale-110 border border-white/5 hover:border-[#4FD1C5]/20"
            aria-label={label}
        >
            <Icon size={20} />
        </a>
    )
}
