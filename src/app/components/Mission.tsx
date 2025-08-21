'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
// 1. On importe le nouveau composant
import ImageCarouselHome from './ImageCarousel_home'

type Step = {
  title: string
  color: string
  twColor: string
  description: string[]
  images: string[]
}

const steps: Step[] = [
  {
    title: ' La machine: performante, souveraine, sécurisée.',
    color: 'cyan-400',
    twColor: 'text-cyan-400 border-cyan-400 bg-cyan-400/20',
    description: [
      "Ce n’est plus uniquement un espace de confort dont vous avez besoin.",
      "C’est un espace *créatif et scientifique*, pensé pour les *esprits ambitieux*.",
      "Hier, vous demandiez : « La literie est-elle confortable ? »",
      "Aujourd’hui, vous demandez : **« Quelle est la puissance de calcul disponible ? »**",
      "",
      "Que vous soyez *graphiste*, *designer*, *vidéaste*, *développeur IA* ou *scientifique*, vous trouverez ici les ressources pour concrétiser vos projets.",
      "",
      "Espaces conviviaux, équipements modernes, chambres cosy : **votre confort de vie alimente votre confort créatif.**"
    ],

    images: [ "/gpu.jpeg", "/PL.png", "/back.jpg", "/PL.png"],
  },
  {
    title: '02 Un Operateur machine',
    color: 'emerald-400',
    twColor: 'text-emerald-400 border-emerald-400 bg-emerald-400/20',
    description: [
      "L'operateur est un assistant technique dans l'utilisation de la machine dont il est le propriétaire",
      "Il n'est ny chef de project, n'y mathematiciens",
      "En revenche il dispose d'une grande maitrise de la machine et de son environnement favorisant une prise en main rapide par les clients et un service depannage immediat et efficasse",
      "Aujourd’hui, vous demandez : **« Quelle est la puissance de calcul disponible ? »**",
      "",
      "Que vous soyez *graphiste*, *designer*, *vidéaste*, *développeur IA* ou *scientifique*, vous trouverez ici les ressources pour concrétiser vos projets.",
      "",
      "Espaces conviviaux, équipements modernes, chambres cosy : **votre confort de vie alimente votre confort créatif.**"
    ],
    images: ["/lac.jpeg", "/cgn.jpeg", "/mont.jpeg", "/PL.png"],
  },
  {
    title: '03 Explorer l-ia local pour votre industrie',
    color: 'yellow-400',
    twColor: 'text-yellow-400 border-yellow-400 bg-yellow-400/20',
    description: [
      "Ce n’est plus uniquement un espace de confort dont vous avez besoin.",
      "C’est un espace *créatif et scientifique*, pensé pour les *esprits ambitieux*.",
      "Hier, vous demandiez : « La literie est-elle confortable ? »",
      "Aujourd’hui, vous demandez : **« Quelle est la puissance de calcul disponible ? »**",
      "",
      "Que vous soyez *graphiste*, *designer*, *vidéaste*, *développeur IA* ou *scientifique*, vous trouverez ici les ressources pour concrétiser vos projets.",
      "",
      "Espaces conviviaux, équipements modernes, chambres cosy : **votre confort de vie alimente votre confort créatif.**"
    ],
    images: [ "/back.jpg", "/PL.png", "/back.jpg", "/PL.png"],
  },
]

const circleSizes = ['w-[32rem]', 'w-96', 'w-56']

// --- TextStep a été simplifié, il n'y a plus de logique de complétion ici ---
type TextStepProps = {
  step: Step
  index: number
  setActiveStep: (i: number) => void
}

function TextStep({ step, index, setActiveStep }: TextStepProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      setActiveStep(index)
    }
  }, [isInView, setActiveStep, index])

  return (
    <motion.div
      ref={ref}
      className="min-h-[60vh] flex flex-col justify-center"
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`text-4xl text-center w-full font-bold mb-4 pt-20 text-${step.color}`}>
        <h2 className={`text-3xl font-bold uppercase tracking-wide mb-4 text-${step.color}`}>
          {step.title}
        </h2>
        <div className="space-y-4   text-gray-300 text-sm sm:text-lg leading-relaxed tracking-wide font-light font-modern">
          {step.description.map((line, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
          ))}
        </div>

      </div>
      

      
      {step.images && step.images.length > 0 && (
        <ImageCarouselHome images={step.images} />
      )}
    </motion.div>
  )
}

export default function ConcentricConcept() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="relative  pt-10 min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className=" text-center h-screen text-4xl md:text-5xl font-bold  tracking-wide">
          <ul className="space-y-8">
            <li>Pour vos clients :</li>
            <li>  Une machine puissante dedier à l'intelligence artificielle</li>
            <li>  +</li>
            <li>  Un opérateur technique d'infrastructure*</li>
            <li>  =</li>
            <li>  L'opportunité d'explorer l'IA de manière flexible et souveraine</li>
          </ul>
        </h1>
        <h1 className="text-center text-4xl md:text-5xl font-bold  tracking-wide">
          <ul className="space-y-8">
            <li>Pour vous :</li>
            <li>  - Une offre 4.0 demarque</li>
            <li>  - Un nouveau profils candidat</li>
            
          </ul>
        </h1>
          {/* TEXTE DÉFILANT (MODIFIÉ) */}
          <div className=" mt-40 w-full justify-center ">
            {steps.map((step, index) => (
              // 3. L'appel à TextStep est maintenant propre et correct
              <TextStep
                key={index}
                step={step}
                index={index}
                setActiveStep={setActiveStep}
              />
            ))}
          </div>
        </div>
      </div>
    
  )
}

// Petite fonction utilitaire pour convertir les couleurs hex de tailwind en rgb pour la transparence
// Vous pouvez ignorer ce détail, c'est juste pour que ça marche avec vos couleurs
function hexToRgb(hex: string): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
}