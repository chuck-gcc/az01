import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  images: string[]
}

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((index + 1) % images.length)
  const prev = () => setIndex((index - 1 + images.length) % images.length)

  if (images.length === 0) return null

  return (
    <div className="relative mt-3 w-full h-48 overflow-hidden rounded-lg shadow-md border border-cyan-400/30">
      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="w-full h-full object-cover"
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
            className={`w-2 h-2 rounded-full ${
              i === index ? 'bg-cyan-400' : 'bg-cyan-900'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
