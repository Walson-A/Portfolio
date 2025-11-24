"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Download } from "lucide-react"
import { useEffect, useState } from "react"

interface CVViewerModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CVViewerModal({ isOpen, onClose }: CVViewerModalProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const cvPath = "/CV Walson Argan RENE.pdf"
    const cvFilename = "CV Walson Argan RENE.pdf"

    // Add parameters to hide PDF viewer controls
    const pdfUrl = `${cvPath}#toolbar=0&navpanes=0&scrollbar=0`

    // Reset loading state when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true)
            setHasError(false)
        }
    }, [isOpen])

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

    // Download handler with proper filename
    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = cvPath
        link.download = cvFilename
        link.setAttribute("download", cvFilename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Backdrop click handler
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={handleBackdropClick}
                        aria-hidden="true"
                    />

                    {/* Modal Card - A4 ratio optimized for desktop */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cv-viewer-title"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-[90vw] md:max-w-[850px] bg-[#0D0D0D] border-2 border-[#4FD1C5]/30 rounded-2xl shadow-[0_0_60px_rgba(79,209,197,0.3)] overflow-hidden flex flex-col"
                        style={{
                            maxHeight: '95vh',
                        }}
                    >
                        {/* Header */}
                        <div className="relative flex items-center justify-between px-6 py-4 border-b border-[#4FD1C5]/20 bg-gradient-to-b from-[#1F1F1F]/50 to-transparent backdrop-blur-sm">
                            <h2 id="cv-viewer-title" className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-1 h-6 bg-[#4FD1C5] rounded-full" />
                                Curriculum Vitae
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="group flex items-center gap-2 bg-gradient-to-r from-[#4FD1C5] to-[#3EB9AD] hover:from-[#3EB9AD] hover:to-[#2D9A8E] text-[#0D0D0D] font-bold px-4 md:px-5 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,209,197,0.4)] hover:shadow-[0_0_30px_rgba(79,209,197,0.6)] hover:scale-105"
                                    aria-label="Télécharger le CV"
                                >
                                    <Download size={18} className="group-hover:animate-bounce" />
                                    <span className="hidden sm:inline font-extrabold">Télécharger</span>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2.5 text-gray-400 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 hover:rotate-90"
                                    aria-label="Fermer le visualiseur de CV"
                                >
                                    <X size={22} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer Container - Optimized height for A4 */}
                        <div className="relative flex-1 bg-[#111111] overflow-hidden" style={{ minHeight: '500px' }}>
                            {/* Loading State */}
                            {isLoading && !hasError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0D0D0D] to-[#1F1F1F] z-10">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-[#4FD1C5]/20 rounded-full" />
                                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#4FD1C5] rounded-full animate-spin" />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">Chargement du CV...</p>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {hasError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0D0D0D] to-[#1F1F1F]">
                                    <div className="flex flex-col items-center gap-6 max-w-md text-center px-6">
                                        <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center backdrop-blur-sm">
                                            <X size={40} className="text-red-500" strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-300 text-lg font-semibold">
                                                Impossible de charger le PDF
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Votre navigateur ne prend peut-être pas en charge l'affichage de PDF.
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center gap-3 bg-gradient-to-r from-[#4FD1C5] to-[#3EB9AD] hover:from-[#3EB9AD] hover:to-[#2D9A8E] text-[#0D0D0D] font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,209,197,0.4)] hover:shadow-[0_0_30px_rgba(79,209,197,0.6)]"
                                        >
                                            <Download size={20} />
                                            <span>Télécharger le PDF</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* PDF Embed */}
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full"
                                style={{
                                    minHeight: '70vh',
                                    border: 'none'
                                }}
                                title="CV Walson Argan RENE"
                                onLoad={() => setIsLoading(false)}
                                onError={() => {
                                    setIsLoading(false)
                                    setHasError(true)
                                }}
                            />
                        </div>

                        {/* Mobile hint */}
                        <div className="md:hidden px-4 py-3 border-t border-[#4FD1C5]/20 bg-gradient-to-t from-[#1F1F1F]/50 to-transparent">
                            <p className="text-center text-xs text-gray-500">
                                💡 Pour une meilleure expérience, téléchargez le PDF
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

