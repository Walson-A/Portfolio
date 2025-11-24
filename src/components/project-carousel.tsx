"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProjectCarouselProps {
    images: string[]
    video?: string
}

export function ProjectCarousel({ images, video }: ProjectCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    // Combine video and images
    const slides = video ? [video, ...images] : images
    const isVideo = (slide: string) => slide === video

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on("select", onSelect)
    }, [emblaApi, setScrollSnaps, onSelect])

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <div className="relative group">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, index) => {
                        const isVideoSlide = isVideo(slide)

                        // Extract YouTube ID if it's a video slide
                        let youtubeId = null
                        if (isVideoSlide && slide) {
                            const match = slide.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*).*/)
                            if (match) youtubeId = match[1]
                        }

                        return (
                            <div className="flex-[0_0_100%] min-w-0 relative aspect-video" key={index}>
                                {isVideoSlide && youtubeId ? (
                                    <div className="w-full h-full bg-black">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={slide}
                                            alt={`Slide ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#4FD1C5] hover:text-black hover:scale-110"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#4FD1C5] hover:text-black hover:scale-110"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            index === selectedIndex
                                ? "w-8 bg-[#4FD1C5]"
                                : "bg-gray-600 hover:bg-gray-400"
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
