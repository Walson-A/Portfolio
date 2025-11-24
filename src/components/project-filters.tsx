"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, SortDesc, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Project } from "@/data/projects"

interface ProjectFiltersProps {
    projects: Project[]
    onFilterChange: (filtered: Project[]) => void
}

type SortOption = "date" | "name" | "featured"

export function ProjectFilters({ projects, onFilterChange }: ProjectFiltersProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [sortOption, setSortOption] = useState<SortOption>("featured")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Extract all unique tags
    const allTags = Array.from(new Set(projects.flatMap(p => p.stack))).sort()

    useEffect(() => {
        let result = [...projects]

        // 1. Filter by Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.shortDescription.toLowerCase().includes(query) ||
                p.stack.some(s => s.toLowerCase().includes(query))
            )
        }

        // 2. Filter by Tags
        if (selectedTags.length > 0) {
            result = result.filter(p =>
                selectedTags.every(tag => p.stack.includes(tag))
            )
        }

        // 3. Sort
        result.sort((a, b) => {
            switch (sortOption) {
                case "date":
                    return (b.date || "").localeCompare(a.date || "")
                case "name":
                    return a.title.localeCompare(b.title)
                case "featured":
                default:
                    // Sort by featured first, then date
                    if (a.featured === b.featured) {
                        return (b.date || "").localeCompare(a.date || "")
                    }
                    return a.featured ? -1 : 1
            }
        })

        onFilterChange(result)
    }, [searchQuery, selectedTags, sortOption, projects, onFilterChange])

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    return (
        <div className="w-full space-y-6 mb-12">
            {/* Search and Main Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#4FD1C5] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher un projet..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#4FD1C5]/50 focus:bg-[#161616] transition-all"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-4 rounded-xl border transition-all font-medium",
                            isFilterOpen || selectedTags.length > 0
                                ? "bg-[#4FD1C5]/10 border-[#4FD1C5] text-[#4FD1C5]"
                                : "bg-[#111111] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                        )}
                    >
                        <Filter size={20} />
                        <span>Filtres {selectedTags.length > 0 && `(${selectedTags.length})`}</span>
                    </button>

                    <div className="relative group">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="appearance-none bg-[#111111] border border-white/10 rounded-xl px-6 py-4 pr-12 text-gray-400 hover:text-white hover:border-white/20 focus:outline-none focus:border-[#4FD1C5]/50 transition-all cursor-pointer"
                        >
                            <option value="featured">À la une</option>
                            <option value="date">Plus récents</option>
                            <option value="name">Alphabétique</option>
                        </select>
                        <SortDesc className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                    </div>
                </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Technologies</h3>
                                {selectedTags.length > 0 && (
                                    <button
                                        onClick={() => setSelectedTags([])}
                                        className="text-xs text-[#4FD1C5] hover:underline flex items-center gap-1"
                                    >
                                        <X size={12} />
                                        Effacer tout
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-sm transition-all border",
                                            selectedTags.includes(tag)
                                                ? "bg-[#4FD1C5] border-[#4FD1C5] text-[#0D0D0D] font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                                                : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
