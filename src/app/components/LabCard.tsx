
type LabCardProps = {
  title: string // Nom ou type de logement
  description: string // Description rapide
  imageUrl?: string
  location?: string // Lieu
  size?: string // Superficie (ex: "30m²")
  petsAllowed?: boolean
  price?: string // Prix (ex: "80 €/nuit")
}

export default function LabCard({
  title,
  description,
  imageUrl,
  location,
  size,
  petsAllowed,
  price,
}: LabCardProps) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-lg overflow-hidden shadow-md backdrop-blur-sm text-white">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{title}</h3>
          {price && <span className="text-sm text-white/80">{price}</span>}
        </div>

        {location && <p className="text-sm text-white/70">📍 {location}</p>}

        <p className="text-sm text-white/80">{description}</p>

        <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10 mt-2">
          {size && <span>📐 {size}</span>}
          <span>{petsAllowed ? '🐾 Animaux OK' : '🚫 Animaux non admis'}</span>
        </div>
      </div>
    </div>
  )
}
