// components/AnimatedSection.tsx

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  keyId: string
}

export default function AnimatedSection({ children, keyId }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
