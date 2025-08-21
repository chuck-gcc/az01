
import { useState } from 'react'

type Filters = {
  country: string
  status: string
}

export default function MapFilters({
  onChange,
}: {
  onChange: (filters: Filters) => void
}) {
  const [filters, setFilters] = useState<Filters>({
    country: '',
    status: '',
  })

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onChange(newFilters)
  }

  return (
    <div className="absolute top-[80px] left-4 z-10 flex gap-4 bg-black/40 p-2 rounded">
      <select
        className="text-white bg-black/60 border border-white/20 px-3 py-1 rounded text-sm"
        value={filters.country}
        onChange={(e) => handleFilterChange('country', e.target.value)}
      >
        <option value="">🌍 Tous les pays</option>
        <option value="France">France</option>
        <option value="Allemagne">Allemagne</option>
      </select>

      <select
        className="text-white bg-black/60 border border-white/20 px-3 py-1 rounded text-sm"
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
      >
        <option value="">🔧 Tous les statuts</option>
        <option value="Actif">Actif</option>
        <option value="En construction">En construction</option>
      </select>
    </div>
  )
}
