
import { useState } from 'react'

const countries = ['France', 'Allemagne', 'Italie', 'Espagne']
const statuses = ['Actif', 'En construction', 'Inactif']

type Props = {
  onFilterChange: (filters: { country: string; status: string }) => void
}

export default function  FilterDropdown({ onFilterChange }: Props) {
  return (
    <div className=" top-[80px] left-4 z-10 flex gap-4 bg-black/40 p-2 rounded">
      <select
        className="text-white bg-black/60 border border-white/20 px-3 py-1 rounded text-sm"
        onChange={(e) => onFilterChange({ country: e.target.value, status: '' })}
      >
        <option value="">🌍 Pays</option>
        <option value="France">France</option>
        <option value="Suisse">Suisse</option>
        <option value="Belgique">Belgique</option>
        <option value="Canada">Canada</option>
      </select>
    </div>
  )
}
