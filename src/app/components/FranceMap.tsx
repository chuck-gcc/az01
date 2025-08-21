'use client'

import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import FilterDropdown from './FilterDropdown'
import CityDetailsContainer from './CityDetailsContainer'

// Types
type Materiel = {
  connexion?: string
  ecran?: string
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
  labs?: Lab[]
  id: number
  imageUrls?: string[]
}

export default function FranceMap() {
  const ref = useRef<SVGSVGElement>(null)
  const [villes, setVilles] = useState<City[]>([])
  const [filters, setFilters] = useState({ country: '', status: '' })
  const [selectedCities, setSelectedCities] = useState<City[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchMessage, setSearchMessage] = useState('')

  const handleFilterChange = (newFilters: { country: string; status: string }) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const width = 720
  const height = 720

  useEffect(() => {
    fetch('/annonces.json')
      .then(res => res.json())
      .then(data => {
        const grouped: Record<string, City> = {}

        data.annonces.forEach((annonce: any) => {
          const key = annonce.ville

          if (!grouped[key]) {
            grouped[key] = {
              nom: key,
              coords: annonce.coords,
              actif: annonce.actif === false ? false : true,
              id: annonce.id,
              labs: []
            }
          }

          grouped[key].labs!.push({
            title: annonce.title,
            description: annonce.description,
            imageUrls: annonce.imageUrls,
            location: annonce.location,
            size: annonce.size,
            petsAllowed: annonce.petsAllowed,
            price: annonce.price,
            id: annonce.id,
            materiel: annonce.materiel
          })
        })

        setVilles(Object.values(grouped))
      })
  }, [])

  useEffect(() => {
    const trimmed = searchTerm.trim()

    if (trimmed.length === 0) {
      setSearchMessage('')
      setSelectedCities([])
      return
    }

    if (trimmed.length < 2) {
      setSearchMessage('')
      return
    }

    const ville = villes.find(v =>
      v.nom.toLowerCase().startsWith(trimmed.toLowerCase())
    )

    if (ville && ville.actif == true) {
      if (!selectedCities.find(c => c.nom === ville.nom)) {
        setSelectedCities(prev => [...prev, ville])
      }
      setSearchMessage('')
    } else {
      setSearchMessage('Aucun résultat trouvé.')
    }
  }, [searchTerm, villes])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCities([]),
        setSearchTerm('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const svgElement = ref.current
    if (!svgElement) return

    const svg = d3.select(svgElement)
    svg.selectAll('*').remove()

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('fill', 'transparent')

    const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [width, height]]) // Limite le pan à la zone visible
    .on('zoom', (event) => {
      svg.selectAll('g').attr('transform', event.transform)
    })

    svg.call(zoom)

    const projection = d3.geoConicConformal()
      .center([2.5, 46.5])
      .scale(2600)
      .translate([width / 2, height / 2])

    const defs = svg.append('defs')
    const glow = defs.append('filter').attr('id', 'glow')
    glow.append('feGaussianBlur').attr('stdDeviation', 3).attr('result', 'coloredBlur')
    const feMerge = glow.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    d3.json(filters.country === 'suisse' ? '/suisse.geojson' : '/france.geojson').then((data: any) => {
      const path = d3.geoPath().projection(projection)
      const features = data.features

      svg.append('g')
        .selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', path as any)
        .attr('fill', 'none')
        .attr('stroke', '#00ffff')
        .attr('stroke-width', 0.8)
        .attr('opacity', 0.3)

      const filteredCities = villes.filter(v => {
        if (filters.status === '') return true
        return filters.status === 'Actif' ? v.actif : !v.actif
      })

      const lineGroup = svg.append('g').attr('class', 'lines')
      updateLines(lineGroup, filteredCities, projection)

      const villeGroup = svg.append('g').attr('class', 'villes')
      updateCities(villeGroup, filteredCities, projection)
    })
  }, [filters, villes])

  const updateLines = (
    group: d3.Selection<SVGGElement, unknown, null, undefined>,
    villes: City[],
    projection: d3.GeoProjection
  ) => {
    group.selectAll('line').remove()
    for (let i = 0; i < villes.length; i++) {
      for (let j = i + 1; j < villes.length; j++) {
        const a = projection(villes[i].coords)
        const b = projection(villes[j].coords)
        if (a && b) {
          group.append('line')
            .attr('x1', a[0])
            .attr('y1', a[1])
            .attr('x2', b[0])
            .attr('y2', b[1])
            .attr('stroke', '#00ffff')
            .attr('stroke-width', 1.5)
            .attr('opacity', 0.2)
        }
      }
    }
  }

  const updateCities = (
    group: d3.Selection<SVGGElement, unknown, null, undefined>,
    villes: City[],
    projection: d3.GeoProjection
  ) => {
    group.selectAll('*').remove()
    villes.forEach((ville) => {
      const projected = projection(ville.coords)
      if (!projected) return
      const [x, y] = projected

      group.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 10)
        .attr('fill', ville.actif ? '#00ffcc' : '#ff0055')
        .attr('opacity', 0.8)
        .attr('filter', 'url(#glow)')
        .attr('stroke', 'transparent')
        .attr('stroke-width', 1)
        .style('cursor', 'pointer')
        .style('pointer-events', ville.actif ? 'auto' : 'none')
        .on('mouseover', function () {
          d3.select(this).attr('r', 12).attr('stroke', '#00ffff').attr('stroke-width', 2)
        })
        .on('mouseout', function () {
          d3.select(this).attr('r', 10).attr('stroke', 'transparent')
        })
        .on('click', () => {
          const isAlreadySelected = selectedCities.some(c => c.id == ville.id)
          if (!isAlreadySelected) {
            setSelectedCities(prev => [...prev, ville])
          }
        })
    })
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950 text-white font-mono">

      <div className="absolute top-5 left-5 z-50 flex flex-col gap-2">
        <input
          type="text"
          placeholder="trouver un operateur"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md bg-zinc-900 border border-cyan-400 text-cyan-300 placeholder:text-cyan-500 shadow-[0_0_10px_#00ffff44] focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {searchMessage && (
          <div className="text-sm text-white bg-rose-600 px-3 py-1 rounded shadow shadow-red-500/40">
            {searchMessage}
          </div>
        )}
      </div>

      <svg
        ref={ref}
        className="absolute transition-all duration-700 ease-in-out"
        style={{
          width: selectedCities.length > 0 ? '50%' : '100%',
          height: '100vh',
          left: '0%'
        }}
      />

      {selectedCities.length > 0 && (
        <CityDetailsContainer cities={selectedCities} onClose={() => setSelectedCities([])} />
      )}
    </div>
  )
}
