'use client'

import { MouseEvent } from 'react'

const sections = [
  { id: 'manifest', label: 'Mannifest' },
  { id: 'pourquoi', label: 'Pourquoi une Pléiade' },
  { id: 'rejoindre', label: 'Rejoindre l’orbite' },
  { id: 'culture', label: 'Une culture' },
  { id: 'mesure', label: 'la mesure de l\'impact' },
]

export default function SidebarMenu() {
  const handleClick = (e: MouseEvent, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-24 left-4 z-20 flex flex-col space-y-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={(e) => handleClick(e, section.id)}
          className="text-center text-white hover:text-sky-400 text-sm transition-colors"
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}
