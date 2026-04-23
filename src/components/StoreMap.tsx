'use client'
import { useEffect, useState } from 'react'
import { Store, StoreScore, GRADE_COLORS } from '@/lib/types'

interface Props {
  stores: Store[]
  scores: StoreScore[]
}

export default function StoreMap({ stores, scores }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="rounded-2xl h-[400px] flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>Cargando mapa...</div>

  const MapInner = require('./MapInner').default
  return <MapInner stores={stores} scores={scores} />
}
