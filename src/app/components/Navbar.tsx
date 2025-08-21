'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleClick = (section: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('section', section)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    setOpen(false)
  }

  return (
    <header className="fixed top-0 h-20 left-0 w-full backdrop-blur-sm bg-black/30 z-50 border-b border-white/10">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 text-white">
        <div className="text-4xl font-bold"> AZ01 <span className="text-sky-400 text-xl	 ">  IA placement</span></div>
        <nav className="hidden md:flex gap-6 ">
          <button onClick={() => handleClick('Concept')}>Concept</button>
          <button onClick={() => handleClick('Location')}>Operateurs</button>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="md:hidden bg-black/80 text-white px-6 py-4 space-y-4">
          <button onClick={() => handleClick('Concept')}> Concept </button>
          <button onClick={() => handleClick('Location')}>Rejoindre une pleiade</button>
          <button onClick={() => handleClick('map')}>Lancer une pleiade</button>
        </div>
      )}
    </header>
  )
}
