"use client"

import { motion } from "framer-motion"

const technologies = [
    "Python", "C", "C#", "Unity", "React", "Next.js", "TypeScript", "Git",
]

export function TechMarquee() {
    return (
        <div className="w-full py-10 overflow-hidden bg-[#0D0D0D] border-y border-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D] z-10 pointer-events-none" />

            <div className="flex w-full">
                <motion.div
                    className="flex whitespace-nowrap will-change-transform"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {/* Double the list for seamless loop */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-16 mx-8">
                            {technologies.map((tech) => (
                                <span
                                    key={`${tech}-${i}`}
                                    className="text-2xl font-bold text-gray-700 uppercase tracking-widest hover:text-[#4FD1C5] transition-colors cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
