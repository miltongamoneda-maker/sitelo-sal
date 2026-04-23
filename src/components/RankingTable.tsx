'use client'
import { StoreScore, GRADE_COLORS } from '@/lib/types'

export default function RankingTable({ scores }: { scores: StoreScore[] }) {
  const sorted = [...scores].sort((a, b) => Number(b.display_score) - Number(a.display_score))
  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)' }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Ranking de Tiendas</h3>
      <div className="space-y-3">
        {sorted.map((s, i) => (
          <div key={s.store_id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#0f172a' }}>
            <div className="text-2xl font-black w-8" style={{ color: 'var(--text-secondary)' }}>#{i+1}</div>
            <div className="flex-1">
              <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{s.name || s.store_id}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.model_version} · Confianza: {s.confidence}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold" style={{ color: GRADE_COLORS[s.grade] }}>
                {Number(s.display_score).toFixed(3)}
              </div>
            </div>
            <div className="text-xl font-black px-3 py-1 rounded-lg" style={{ background: GRADE_COLORS[s.grade], color: '#fff' }}>
              {s.grade}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
