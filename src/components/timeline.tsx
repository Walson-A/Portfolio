"use client"

import { timelineEvents, TimelineEvent, EventType } from "@/data/timeline"
import { projects } from "@/data/projects"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
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
    const [activeEventId, setActiveEventId] = useState<string | null>(null)



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
                    <TimelineYearGroup
                        key={year}
                        year={year}
                        events={groupedEvents[year]}
                        activeEventId={activeEventId}
                        setActiveEventId={setActiveEventId}
                    />
                ))}
            </div>
        </div>
    )
}

function TimelineYearGroup({ year, events, activeEventId, setActiveEventId }: {
    year: number;
    events: TimelineEvent[];
    activeEventId: string | null;
    setActiveEventId: (id: string | null) => void;
}) {
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
            <div className="relative flex flex-col gap-24 md:gap-32">
                {events.map((event, i) => (
                    <EventItem
                        key={i}
                        event={event}
                        index={i}
                        year={year}
                        isActiveEvent={activeEventId === `${year}-${i}`}
                        onActivate={() => setActiveEventId(`${year}-${i}`)}
                        onDeactivate={() => setActiveEventId(null)}
                    />
                ))}
            </div>
        </div>
    )
}

function TooltipPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    return createPortal(children, document.body)
}

function EventItem({ event, index, year, isActiveEvent, onActivate, onDeactivate }: {
    event: TimelineEvent;
    index: number;
    year: number;
    isActiveEvent: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [isPast, setIsPast] = useState(false)
    const config = typeConfig[event.type]
    const Icon = config.icon
    const isLeft = index % 2 !== 0
    const [rect, setRect] = useState<DOMRect | null>(null)
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

    useEffect(() => {
        if (isActiveEvent && ref.current) {
            setRect(ref.current.getBoundingClientRect())
        }
    }, [isActiveEvent])

    // Separate highlighted state (scrolled past) from active state (clicked/hovered)
    const isHighlighted = isPast || isActiveEvent

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
        onActivate()
    }

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            onDeactivate()
        }, 150) // Small delay to allow moving to tooltip
    }

    return (
        <>
            <div
                ref={ref}
                className="relative grid grid-cols-1 md:grid-cols-2 w-full group"
            >
                {/* Center Point */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bottom-0 flex items-center justify-center w-4 z-10">
                    <motion.div
                        animate={{
                            backgroundColor: isHighlighted ? '#22d3ee' : '#262626',
                            scale: isHighlighted ? 1.2 : 1,
                        }}
                        className="w-4 h-4 rounded-full border-4 border-[#0D0D0D] relative z-20"
                    />
                </div>

                {/* Content */}
                <div className={`w-full pl-12 md:pl-0 ${isLeft
                    ? 'md:col-start-1 md:text-right md:pr-16'
                    : 'md:col-start-2 md:text-left md:pl-16'
                    }`}>
                    <motion.div
                        animate={{
                            opacity: 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                        {...(typeof window !== 'undefined' && window.innerWidth >= 768 ? {
                            onMouseEnter: handleMouseEnter,
                            onMouseLeave: handleMouseLeave,
                        } : {})}
                        onClick={(e) => {
                            e.stopPropagation()
                            onActivate()
                        }}
                    >
                        <div className={`flex items-center gap-4 md:gap-6 cursor-pointer ${isLeft
                            ? 'flex-row md:flex-row-reverse'
                            : 'flex-row'
                            }`}>
                            <div
                                className="p-3 rounded-xl transition-all duration-300 shrink-0"
                                style={{
                                    backgroundColor: isHighlighted ? `${config.color}15` : "rgba(255,255,255,0.03)",
                                    color: isHighlighted ? config.color : "#666",
                                    boxShadow: isHighlighted ? `0 0 20px ${config.color}20` : "none"
                                }}
                            >
                                <Icon size={28} />
                            </div>
                            <div>
                                <h4 className={`text-2xl font-bold transition-colors duration-300 ${isHighlighted ? "text-[#E8E8E8]" : "text-gray-500"}`}>
                                    {event.label}
                                </h4>
                                {event.subtitle && (
                                    <p className={`text-base transition-colors duration-300 ${isHighlighted ? "text-gray-400" : "text-gray-600"}`}>
                                        {event.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Portal Tooltip */}
            <AnimatePresence>
                {isActiveEvent && (
                    <TooltipPortal>
                        {/* Backdrop for mobile to close on click outside */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9998] bg-black/60 md:hidden"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDeactivate()
                            }}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            {...(typeof window !== 'undefined' && window.innerWidth >= 768 ? {
                                onMouseEnter: handleMouseEnter,
                                onMouseLeave: handleMouseLeave,
                            } : {})}
                            className={`fixed z-[9999] w-[90vw] md:w-[26rem] p-0 rounded-2xl border-2 border-[#4FD1C5]/30 shadow-[0_0_50px_rgba(0,0,0,1)] text-left overflow-hidden
                                left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-auto md:left-auto
                            `}
                            style={{
                                backgroundColor: '#0D0D0D',
                                ...(typeof window !== 'undefined' && window.innerWidth >= 768 && rect ? {
                                    position: 'absolute',
                                    top: rect.top + window.scrollY + rect.height / 2 - 50, // Center vertically approx
                                    left: isLeft ? rect.left - 430 : rect.right + 20,
                                    transform: 'translateY(-50%)'
                                } : {
                                    // Mobile styles (fallback if no rect or small screen)
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                })
                            }}
                        >
                            {/* Arrow (Only visible on desktop/absolute mode) */}
                            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] border-t border-[#1F1F1F] rotate-45 z-10 ${isLeft
                                ? '-right-2 border-r'
                                : '-left-2 border-l'
                                }`} />

                            {/* Content Container */}
                            <div className="relative z-20 max-h-[80vh] overflow-y-auto md:max-h-none md:overflow-visible">
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

                                {/* Media Display (Video or Image Slideshow) */}
                                {(() => {
                                    // Find matching project by slug
                                    const matchedProject = event.slug ? projects.find(p => p.slug === event.slug) : null
                                    const hasVideo = matchedProject?.video
                                    const mediaImages = matchedProject?.images || event.images || []

                                    if (hasVideo) {
                                        // Extract YouTube ID
                                        const match = hasVideo.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*).*/)
                                        const youtubeId = match ? match[1] : null

                                        return youtubeId ? (
                                            <div className="relative h-40 overflow-hidden bg-black border-b border-[#1F1F1F]">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${youtubeId}`}
                                                    title="Project video"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    className="w-full h-full"
                                                />
                                            </div>
                                        ) : null
                                    }

                                    // Show image slideshow if no video
                                    if (mediaImages.length > 0) {
                                        return <ImageSlideshow images={mediaImages} />
                                    }

                                    return null
                                })()}

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
                    </TooltipPortal>
                )}
            </AnimatePresence>
        </>
    )
}

// Image Slideshow Component with Fade Transitions
function ImageSlideshow({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (images.length <= 1) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 2500) // Change image every 2.5 seconds

        return () => clearInterval(interval)
    }, [images.length])

    return (
        <div className="relative h-40 overflow-hidden bg-black/50 border-b border-[#1F1F1F]">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                />
            </AnimatePresence>
        </div>
    )
}
