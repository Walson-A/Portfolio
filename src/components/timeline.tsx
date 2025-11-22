"use client"

import { timelineEvents, TimelineEvent, EventType } from "@/data/timeline"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Briefcase, GraduationCap, Box, MapPin } from "lucide-react"
import Link from "next/link"

// Group events by year
const groupedEvents = timelineEvents.reduce((acc, event) => {
    if (!acc[event.year]) {
        acc[event.year] = []
    }
    acc[event.year].push(event)
    return acc
}, {} as Record<number, TimelineEvent[]>)

const years = Object.keys(groupedEvents).map(Number).sort((a, b) => a - b)

const typeConfig: Record<EventType, { color: string; icon: React.ElementType; label: string }> = {
    project: { color: "#4FD1C5", icon: Box, label: "Projet" },
    school: { color: "#F6E05E", icon: GraduationCap, label: "Scolaire" },
    work: { color: "#68D391", icon: Briefcase, label: "Pro" },
}

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    })

    return (
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {/* Central Sticky Bar Background */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-[#1F1F1F] z-20" />

            {/* Central Sticky Bar Progress (Lights up) - No Spring */}
            <motion.div
                style={{ scaleY: scrollYProgress, originY: 0 }}
                className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-[#4FD1C5] shadow-[0_0_20px_2px_#4FD1C5] z-20"
            >
                {/* Extra Glow Layer for "Flux" effect */}
                <div className="absolute inset-0 w-full h-full bg-[#4FD1C5] blur-[4px] opacity-50" />
            </motion.div>

            <div className="flex flex-col gap-32 md:gap-48 py-20 relative z-10">
                {years.map((year) => (
                    <TimelineYearGroup key={year} year={year} events={groupedEvents[year]} />
                ))}
            </div>
        </div>
    )
}

function TimelineYearGroup({ year, events }: { year: number; events: TimelineEvent[] }) {
    const ref = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const center = window.innerHeight / 2

            // Active once the top reaches the center (and stays active)
            setIsActive(rect.top <= center)
        }

        window.addEventListener("scroll", onScroll)
        onScroll() // check initial
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <div ref={ref} className="relative flex flex-col gap-32 md:gap-48">
            {/* Year Header - Block, Centered, Behind Bar */}
            <div className="flex justify-center relative z-0">
                <motion.span
                    animate={{
                        opacity: isActive ? 1 : 0.1,
                        scale: isActive ? 1 : 0.9,
                        textShadow: isActive
                            ? "0 0 30px rgba(79, 209, 197, 0.5), 0 0 60px rgba(79, 209, 197, 0.3)"
                            : "none"
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="block text-6xl md:text-8xl font-black tracking-widest text-white mix-blend-overlay md:mix-blend-normal whitespace-nowrap"
                    style={{
                        WebkitTextStroke: "1px rgba(79, 209, 197, 0.1)",
                    }}
                >
                    {year}
                </motion.span>
            </div>

            {/* Events */}
            <div className="relative z-30 flex flex-col gap-24 md:gap-32">
                {events.map((event, i) => (
                    <EventItem key={i} event={event} index={i} />
                ))}
            </div>
        </div>
    )
}

function EventItem({ event, index }: { event: TimelineEvent; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [isPast, setIsPast] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const config = typeConfig[event.type]
    const Icon = config.icon
    const isLeft = index % 2 !== 0

    useEffect(() => {
        const onScroll = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const center = window.innerHeight / 2
            setIsPast(rect.top <= center)
        }

        window.addEventListener("scroll", onScroll)
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Determine if event should be "lit" (active state)
    const isActive = isPast || isHovered

    return (
        <div
            ref={ref}
            className="relative grid grid-cols-1 md:grid-cols-2 w-full group"
        >

            {/* Center Point */}
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bottom-0 flex items-center justify-center w-4 z-10">
                {/* Optional: Small tick or nothing */}
            </div>

            {/* Content */}
            <div className={`w-full ${isLeft
                ? 'md:col-start-1 md:text-right md:pr-16'
                : 'md:col-start-2 md:text-left md:pl-16 pl-8'
                }`}>
                <motion.div
                    animate={{
                        opacity: isActive ? 1 : 0.6,
                        filter: isActive ? "grayscale(0%)" : "grayscale(30%)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className={`flex items-center gap-6 cursor-pointer ${isLeft
                        ? 'flex-row md:flex-row-reverse'
                        : 'flex-row'
                        }`}>
                        <div
                            className="p-3 rounded-xl transition-all duration-300 shrink-0"
                            style={{
                                backgroundColor: isActive ? `${config.color}15` : "rgba(255,255,255,0.03)",
                                color: isActive ? config.color : "#666",
                                boxShadow: isActive ? `0 0 20px ${config.color}20` : "none"
                            }}
                        >
                            <Icon size={28} />
                        </div>
                        <div>
                            <h4 className={`text-2xl font-bold transition-colors duration-300 ${isActive ? "text-[#E8E8E8]" : "text-gray-500"}`}>
                                {event.label}
                            </h4>
                            {event.subtitle && (
                                <p className={`text-base transition-colors duration-300 ${isActive ? "text-gray-400" : "text-gray-600"}`}>
                                    {event.subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className={`absolute top-full md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0 w-[26rem] p-0 rounded-2xl bg-[#111111]/95 backdrop-blur-xl border border-[#1F1F1F] shadow-[0_0_40px_rgba(0,0,0,0.6)] z-50 text-left overflow-hidden ${isLeft
                                    ? 'left-0 md:left-auto md:right-full md:mr-8'
                                    : 'left-0 md:left-auto md:left-full md:ml-8'
                                    }`}
                            >
                                {/* Arrow */}
                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] border-t border-[#1F1F1F] rotate-45 z-10 ${isLeft
                                    ? '-right-2 border-r'
                                    : '-left-2 border-l'
                                    }`} />

                                {/* Content Container */}
                                <div className="relative z-20">
                                    {/* Header */}
                                    <div className="p-5 border-b border-[#1F1F1F] bg-[#161616]/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <h5 className="text-lg font-bold text-white">{event.label}</h5>
                                            <span
                                                className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border font-medium"
                                                style={{
                                                    borderColor: `${config.color}30`,
                                                    color: config.color,
                                                    backgroundColor: `${config.color}10`
                                                }}
                                            >
                                                {config.label}
                                            </span>
                                        </div>

                                        {/* Location (for School/Work) */}
                                        {event.location && (
                                            <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                                <MapPin size={14} className="text-gray-500" />
                                                <span>{event.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Image Carousel (if images exist) */}
                                    {event.images && event.images.length > 0 && (
                                        <div className="relative h-40 overflow-hidden bg-black/50 border-b border-[#1F1F1F]">
                                            {/* Gradient Overlays for smooth fade */}
                                            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#111111] to-transparent z-10" />
                                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#111111] to-transparent z-10" />

                                            <motion.div
                                                className="flex h-full"
                                                animate={{ x: ["0%", "-50%"] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                    duration: 10
                                                }}
                                                style={{ width: `${event.images.length * 200}%` }}
                                            >
                                                {/* Double the images for seamless loop */}
                                                {[...event.images, ...event.images].map((src, idx) => (
                                                    <div key={idx} className="h-full w-full relative flex-shrink-0 border-r border-[#1F1F1F]/50">
                                                        <img src={src} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Body */}
                                    <div className="p-5 space-y-4">
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {event.description}
                                        </p>

                                        {/* Tags */}
                                        {event.tags && event.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {event.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Action Button (Only for projects with slug) */}
                                        {event.slug && (
                                            <Link
                                                href={`/projects/${event.slug}`}
                                                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-[#4FD1C5]/10 hover:bg-[#4FD1C5]/20 border border-[#4FD1C5]/20 hover:border-[#4FD1C5]/40 text-[#4FD1C5] text-sm font-medium transition-all group/btn"
                                            >
                                                <span>Voir le projet</span>
                                                <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}
