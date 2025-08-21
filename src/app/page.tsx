// app/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import FranceMap from '@/app/components/FranceMap'
import Mission from '@/app/components/Mission'
import AnimatedSection from '@/app/components/AnimatedSection'

export default function HomePage() {
  const searchParams = useSearchParams()
  const section = searchParams.get('section') || 'map'

  return (
    <main className=" px-4 md:px-12 lg:px-24">
      <AnimatedSection keyId={section}>
        {section === 'Concept' && <Mission />}
        {section === 'Location' && <FranceMap />}
        {/* Tu peux ajouter ici d'autres sections si besoin */}
      </AnimatedSection>
    </main>
  )
}
