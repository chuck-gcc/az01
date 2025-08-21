import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  images: string[]
  interval?: number // durée entre les slides, par défaut 5000ms
}

export default function ImageCarouselHome({ images, interval = 5000 }: Props) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % images.length)
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  // Défilement automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer) // Nettoyage
  }, [images.length, interval])

  if (images.length === 0) return null

  return (
    <div className="relative mt-3 w-full h-48 overflow-hidden rounded-s-md shadow-md border border-cyan-400/30">
      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Boutons navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 px-3 py-2 bg-zinc-950/60 hover:bg-cyan-600/30 border-r border-cyan-400 text-cyan-300 hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 px-3 py-2 bg-zinc-950/60 hover:bg-cyan-600/30 border-l border-cyan-400 text-cyan-300 hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicateurs de position */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? 'bg-cyan-400 scale-125' : 'bg-cyan-900'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
