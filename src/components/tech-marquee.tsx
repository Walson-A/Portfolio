"use client"

import { motion } from "framer-motion"

const technologies = [
    "Python", "C", "C#", "Unity", "React", "Next.js", "TypeScript", "Git",
]

export function TechMarquee() {
    return (
        <div className="w-full py-10 overflow-hidden bg-[#0D0D0D] border-y border-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D] z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30
                }}
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-16 mx-8">
                        {technologies.map((tech) => (
                            <span
                                key={tech}
                                className="text-2xl font-bold text-gray-600 uppercase tracking-widest hover:text-[#4FD1C5] transition-colors cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
