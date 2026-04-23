'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Store, StoreScore } from '@/lib/types'
import ScoreCard from '@/components/ScoreCard'
import EvolutionChart from '@/components/EvolutionChart'
import RankingTable from '@/components/RankingTable'
import dynamic from 'next/dynamic'

const StoreMap = dynamic(() => import('@/components/StoreMap'), { ssr: false })

export default function Home() {
  const [stores, setStores] = useState<Store[]>([])
  const [scores, setScores] = useState<StoreScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [storesRes, scoresRes] = await Promise.all([
        supabase.from('stores').select('*'),
        supabase.from('store_scores').select('*, stores(name)'),
      ])
      if (storesRes.data) setStores(storesRes.data)
      if (scoresRes.data) {
        const mapped = scoresRes.data.map((s: any) => ({
          ...s,
          name: s.stores?.name || s.store_id,
        }))
        setScores(mapped)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black mb-2" style={{ color: 'var(--accent)' }}>SITELO SAL</div>
          <p style={{ color: 'var(--text-secondary)' }}>Cargando datos...</p>
        </div>
      </div>
    )
  }

  const sorted = [...scores].sort((a, b) => Number(b.display_score) - Number(a.display_score))

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl font-black" style={{ color: 'var(--accent)' }}>SITELO</div>
          <div className="text-3xl font-light" style={{ color: 'var(--text-primary)' }}>SAL</div>
          <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#27AE6633', color: '#27AE60' }}>
            V1.4
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Sistema de scoring AMPM El Salvador · {stores.length} tiendas evaluadas · Modelo V1-SAL
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Mapa de Red</h2>
        <StoreMap stores={stores} scores={scores} />
        <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
          Círculos = radio de delivery 5km · Color = grado de la tienda
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Scores por Tienda</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sorted.map(s => <ScoreCard key={s.store_id} score={s} />)}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RankingTable scores={scores} />
        <EvolutionChart />
      </section>

      <footer className="text-center py-6" style={{ color: 'var(--text-secondary)' }}>
        <p className="text-sm">Sitelo SAL · AMPM Centroamérica · Datos en Supabase · Actualizado abril 2026</p>
      </footer>
    </main>
  )
}
