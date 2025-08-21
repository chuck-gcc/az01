'use client'

import { useEffect, useState } from 'react'

type MaterielType = {
  name: string
  connexion?: string
  ecran?: string
  gpu?: string
  gpu_memory?: string
  cpu?: string
  ram?: string
  bureau?: string
  extras?: string[]
}

export default function MaterielCard() {
  const [materiels, setMateriels] = useState<MaterielType[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    fetch('/material.json')
      .then(res => res.json())
      .then(data => setMateriels(data))
  }, [])

  const current = materiels[index]

  if (materiels.length === 0) return <p className="text-gray-400">Chargement...</p>

  return (
    <div className="bg-zinc-800 border border-cyan-400/20 p-4 rounded-lg text-sm text-gray-200 space-y-2 w-full h-full">
      <p className="font-semibold text-cyan-300 uppercase tracking-wide mb-2">
        {current.name}
      </p>
      {current.connexion && <p><strong>Connexion :</strong> {current.connexion}</p>}
      {current.ecran && <p><strong>Écran :</strong> {current.ecran}</p>}
      {current.gpu && <p><strong>GPU :</strong> {current.gpu}</p>}
      {current.gpu_memory && <p><strong>GPU Memory :</strong> {current.gpu_memory}</p>}
      {current.cpu && <p><strong>CPU :</strong> {current.cpu}</p>}
      {current.ram && <p><strong>RAM :</strong> {current.ram}</p>}
      {current.bureau && <p><strong>Bureau :</strong> {current.bureau}</p>}
      {current.extras && current.extras.length > 0 && (
        <p><strong>Extras :</strong> {current.extras.join(', ')}</p>
      )}

      {/* Boutons de navigation */}
      <div className="flex gap-2 mt-4 justify-center">
        {materiels.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`px-3 py-1 rounded-full border text-xs ${
              i === index
                ? 'bg-cyan-500 text-black font-bold'
                : 'bg-zinc-700 text-gray-400 border-cyan-500'
            }`}
          >
            Config {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
