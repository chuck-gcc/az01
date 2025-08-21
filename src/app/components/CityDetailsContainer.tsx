
import React from 'react'
import ImageCarousel from './ImageCarousel'
import MaterielCard from './MaterielCard'


import {
  HomeIcon,
  MapPinIcon,
  RulerIcon,
  DogIcon,
  EuroIcon,
  ImageIcon
} from 'lucide-react'

type Materiel = {
  connexion?: string
  ecran?: string
  gpu?: string
  gpu_memory?: string
  cpu?: string
  ram?: string
  bureau?: string
  extras?: string[]
}

type Lab = {
  title: string
  description: string
  imageUrls?: string[]
  location?: string
  size?: string
  petsAllowed?: boolean
  price?: string
  id: number
  materiel?: Materiel
}

type City = {
  nom: string
  coords: [number, number]
  actif: true | false
  id: number
  labs?: Lab[]
  imageUrls?: string[]
}

type Props = {
  cities: City[]
  onClose: () => void
}

export default function CityDetailsContainer({ cities, onClose }: Props) {
  return (
    <div className="fixed right-0 h-full w-full top-[80px] md:w-1/2 bg-zinc-950 text-white z-40 shadow-2xl backdrop-blur-md overflow-y-auto transition-all duration-500 border-l border-cyan-500/20">
      <div className="flex justify-between items-center p-4 border-b border-cyan-500/30">
        <h2 className="text-lg font-bold tracking-widest  text-cyan-400">
          Opérateur
        </h2>
        <button
          onClick={onClose}
          className="text-cyan-400 hover:text-red-500 text-xl transition"
        >
          ✕
        </button>
      </div>

      <div className="p-4 pb-20 grid grid-cols-1 gap-6">
        {cities.flatMap(city =>
          city.labs?.map((lab, index) => (
            <div
              key={`city-${city.id}-lab-${lab.id}-${index}`}
              className="bg-zinc-900 border border-cyan-500/20 text-white p-5 rounded-xl shadow-[0_0_10px_#00ffff44] flex flex-col gap-4 transition hover:shadow-[0_0_20px_#00ffffaa]"
            >
              {/* Titre & Ville */}
              <div className="flex items-center justify-between border-b border-cyan-400/20 pb-2">
                <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-300 tracking-wide uppercase">
                  <HomeIcon className="w-5 h-5 text-cyan-400" />
                  {lab.title}
                </h3>
                <span className="text-sm text-gray-400">{city.nom}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed">{lab.description}</p>

              {/* Infos pratiques */}
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-lime-400" />
                  {lab.location}
                </div>
                <div className="flex items-center gap-2">
                  <RulerIcon className="w-4 h-4 text-yellow-400" />
                  {lab.size}
                </div>
                <div className="flex items-center gap-2">
                  <EuroIcon className="w-4 h-4 text-rose-500" />
                  {lab.price}
                </div>
                <div className="flex items-center gap-2">
                  <DogIcon className="w-4 h-4 text-purple-400" />
                  Animaux : <span>{lab.petsAllowed ? 'Oui' : 'Non'}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-3">
                {/* Matériel disponible */}

                <div className="w-full md:w-1/2">
                  <MaterielCard />
                </div>
                {/* Image */}
                <div className="w-full md:w-1/2">
                  {lab.imageUrls && lab.imageUrls.length > 0 ? (
                    <ImageCarousel images={lab.imageUrls} />
                  ) : (
                    <div className="flex items-center justify-center bg-zinc-700 border border-cyan-300 rounded-lg h-32 text-gray-500">
                      <ImageIcon className="w-6 h-6" />
                      <span className="ml-2">Pas d’image</span>
                    </div>
                  )}
                </div>
              </div>


              {/* Bouton Voir les disponibilités */}
              <button
                className="self-start px-4 py-2 mt-3 text-sm font-mono tracking-wider uppercase text-cyan-400 border border-cyan-500 bg-black hover:bg-cyan-900 hover:text-white rounded-sm shadow-[0_0_5px_#00ffff,0_0_15px_#00ffff_inset] transition-all duration-300"
                onClick={() => alert(`Voir les disponibilités de : ${lab.title}`)}
              >
                Demander les disponibilités
              </button>

             
            </div>
          )) ?? []
        )}
      </div>
    </div>
  )
}
