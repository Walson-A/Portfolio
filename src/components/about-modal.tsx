"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Download, MapPin, GraduationCap, Calendar, Github, Linkedin, Mail, ExternalLink, Phone, Code2, Brain, Wrench } from "lucide-react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AboutModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    // CONFIGURATION
    const IS_OPEN_TO_WORK = true

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "hidden" // Prevent body scroll
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
                        className="relative w-full max-w-4xl bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 z-10"
                            aria-label="Fermer la carte à propos"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col md:grid md:grid-cols-12 min-h-[450px]">

                            {/* LEFT COLUMN: Identity & Contact (5 cols) */}
                            <div className="md:col-span-5 bg-[#111111] p-8 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
                                {/* Subtle background glow */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#4FD1C5]/5 to-transparent pointer-events-none" />

                                {/* Photo */}
                                <div className="relative mb-6">
                                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#1F1F1F] to-[#2D2D2D] border-2 border-[#4FD1C5]/20 shadow-[0_0_20px_rgba(79,209,197,0.1)] overflow-hidden relative group">
                                        <img
                                            src="/images/photo.jpg"
                                            alt="Photo de profil"
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform"
                                        />
                                    </div>
                                </div>

                                {/* Identity */}
                                <div className="text-center md:text-left mb-6">
                                    <h2 className="text-3xl font-bold text-white mb-1 leading-tight">Walson Argan RENE</h2>
                                    <p className="text-[#4FD1C5] font-medium text-base">Étudiant ingénieur informatique à l’EPITA</p>
                                </div>

                                {/* Status Badge */}
                                <div className="w-full mb-8">
                                    <div className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm transition-colors",
                                        IS_OPEN_TO_WORK
                                            ? "bg-green-500/10 border-green-500/20"
                                            : "bg-red-500/10 border-red-500/20"
                                    )}>
                                        <span className="relative flex h-3 w-3 flex-shrink-0">
                                            {IS_OPEN_TO_WORK && (
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                            )}
                                            <span className={cn(
                                                "relative inline-flex rounded-full h-3 w-3",
                                                IS_OPEN_TO_WORK ? "bg-green-500" : "bg-red-500"
                                            )}></span>
                                        </span>
                                        <span className={cn(
                                            "text-xs font-bold leading-tight uppercase tracking-wide",
                                            IS_OPEN_TO_WORK ? "text-green-500" : "text-red-500"
                                        )}>
                                            {IS_OPEN_TO_WORK
                                                ? <>Ouvert aux opportunités<br />(stage / alternance)</>
                                                : <>Fermé aux opportunités<br />(En poste)</>
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Mini */}
                                <div className="w-full space-y-4 mt-auto">
                                    <div className="flex items-center gap-3 text-sm text-gray-400 group hover:text-white transition-colors">
                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                            <Mail size={16} className="text-[#4FD1C5]" />
                                        </div>
                                        <span>walson.a.rene@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-400 group hover:text-white transition-colors">
                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                            <Phone size={16} className="text-[#4FD1C5]" />
                                        </div>
                                        <a href="tel:+33768356642" className="hover:text-[#4FD1C5] transition-colors">
                                            +33 7 68 35 66 42
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Professional Info (7 cols) */}
                            <div className="md:col-span-7 p-10 flex flex-col">

                                {/* Info Grid */}
                                <div className="space-y-8 mb-10">
                                    {/* Location */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Localisation</h3>
                                        <div className="flex items-center gap-2 text-gray-200">
                                            <MapPin size={20} className="text-[#4FD1C5]" />
                                            <span className="font-medium text-lg">Île-de-France, France</span>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Niveau d'étude</h3>
                                        <div className="flex items-center gap-2 text-gray-200">
                                            <GraduationCap size={20} className="text-[#4FD1C5]" />
                                            <span className="font-medium text-lg">EPITA — Prépa intégrée (Bac+2)</span>
                                        </div>
                                    </div>

                                    {/* Domains */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Domaines</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge icon={Code2} label="Développement logiciel" />
                                            <Badge icon={Brain} label="IA" />
                                            <Badge icon={Wrench} label="Création d'outils" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">À propos</h3>
                                    <p className="text-base text-gray-300 leading-relaxed border-l-2 border-[#4FD1C5]/30 pl-4">
                                        Je conçois des projets autour du développement logiciel, de l’IA et des outils du quotidien. J’aime transformer des idées en produits concrets, utiles et agréables à utiliser.
                                    </p>
                                </div>

                                {/* Bottom Actions */}
                                <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <a
                                            href="#" // Placeholder
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-3 bg-[#4FD1C5] hover:bg-[#3EB9AD] text-[#0D0D0D] font-extrabold text-base py-3 px-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,209,197,0.3)] hover:shadow-[0_0_30px_rgba(79,209,197,0.5)] transform hover:-translate-y-0.5"
                                        >
                                            <span>VOIR LE CV</span>
                                            <ExternalLink size={18} strokeWidth={2.5} />
                                        </a>
                                        <button
                                            className="flex items-center justify-center w-[52px] bg-[#1F1F1F] hover:bg-[#2D2D2D] text-[#4FD1C5] border border-[#4FD1C5]/20 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,209,197,0.15)]"
                                            aria-label="Télécharger le CV"
                                        >
                                            <Download size={22} />
                                        </button>
                                    </div>

                                    {/* Socials */}
                                    <div className="flex items-center justify-center gap-6">
                                        <SocialLink href="https://linkedin.com/in/walson-rené" icon={Linkedin} label="LinkedIn" />
                                        <SocialLink href="https://github.com/walson-a" icon={Github} label="GitHub" />
                                        <SocialLink href="mailto:walson.a.rene@gmail.com" icon={Mail} label="Email" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function Badge({ icon: Icon, label }: { icon: any; label: string }) {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <Icon size={14} className="text-[#4FD1C5]" />
            <span>{label}</span>
        </div>
    )
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-400 hover:text-[#4FD1C5] transition-all duration-300 hover:bg-white/5 rounded-xl hover:scale-110"
            aria-label={label}
        >
            <Icon size={24} />
        </a>
    )
}
