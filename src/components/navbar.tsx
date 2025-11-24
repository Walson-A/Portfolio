"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Home, Waypoints, LayoutGrid, User, Mail } from "lucide-react"
import { AboutModal } from "@/components/about-modal"
import { ContactModal } from "@/components/contact-modal"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
    { name: "Accueil", href: "#home", icon: Home, alwaysVisible: true },
    { name: "Parcours", href: "#timeline", icon: Waypoints, alwaysVisible: false },
    { name: "Projets", href: "#projects", icon: LayoutGrid, alwaysVisible: false },
    { name: "À propos", href: "#about-popup", icon: User, isAction: true, alwaysVisible: true },
    { name: "Contact", href: "#contact-popup", icon: Mail, isAction: true, alwaysVisible: true },
]

export function Navbar() {
    const [activeSection, setActiveSection] = useState("#home")
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isAboutOpen, setIsAboutOpen] = useState(false)
    const [isContactOpen, setIsContactOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const isHome = pathname === "/"

    useEffect(() => {
        if (!isHome) {
            setActiveSection("")
            return
        }

        const handleScroll = () => {
            const sections = navItems.map(item => {
                if (item.isAction) return null
                return document.querySelector(item.href)
            })

            // Trigger point: 40% down the viewport
            const scrollPosition = window.scrollY + window.innerHeight * 0.4

            for (const section of sections) {
                if (section instanceof HTMLElement) {
                    const top = section.offsetTop
                    const height = section.offsetHeight

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        const id = `#${section.id}`
                        setActiveSection(id)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isHome])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
        e.preventDefault()

        if (item.href === "#about-popup") {
            setIsAboutOpen(true)
            return
        }

        if (item.href === "#contact-popup") {
            setIsContactOpen(true)
            return
        }

        if (item.name === "Accueil" && !isHome) {
            router.push("/")
            return
        }

        if (item.isAction) {
            return
        }

        const element = document.querySelector(item.href)
        if (element) {
            const offset = 120 // Increased offset for larger navbar
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    // Filter items based on current page
    const visibleItems = navItems.filter(item => isHome || item.alwaysVisible)

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-4 md:top-8 left-0 right-0 z-50 flex justify-center px-2 md:px-4 pointer-events-none"
            >
                <div className="pointer-events-auto bg-[#0D0D0D]/50 backdrop-blur-2xl border border-[#4FD1C5]/20 rounded-full px-2 py-2 md:px-3 md:py-3 shadow-[0_0_30px_rgba(79,209,197,0.15)] flex items-center gap-1 md:gap-2">
                    {visibleItems.map((item, index) => {
                        // Priority: Contact Modal > About Modal > Scroll Section
                        let isActive = activeSection === item.href

                        if (isContactOpen) {
                            isActive = item.name === "Contact"
                        } else if (isAboutOpen) {
                            isActive = item.name === "À propos"
                        } else if (!isHome) {
                            isActive = false
                        }

                        const isHovered = hoveredIndex === index
                        const isExpanded = isActive || isHovered
                        const Icon = item.icon

                        return (
                            <div key={item.name} className="flex items-center">
                                {/* Separator before "À propos" if needed, check index relative to filtered list */}
                                {item.name === "À propos" && index > 0 && (
                                    <div className="w-[1px] h-8 bg-white/10 mx-2" />
                                )}

                                <a
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={cn(
                                        "relative flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-3 rounded-full transition-colors duration-300",
                                        isActive ? "text-[#0D0D0D]" : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-[#4FD1C5] rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    <div className="relative z-10 flex items-center justify-center">
                                        <Icon size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />
                                    </div>

                                    <motion.span
                                        initial={false}
                                        animate={{
                                            width: isExpanded ? "auto" : 0,
                                            opacity: isExpanded ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative z-10 overflow-hidden whitespace-nowrap text-sm md:text-base font-bold hidden md:block"
                                    >
                                        {item.name}
                                    </motion.span>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </motion.nav>

            <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    )
}
