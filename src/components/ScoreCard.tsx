'use client'
import { StoreScore, GRADE_COLORS } from '@/lib/types'

export default function ScoreCard({ score }: { score: StoreScore }) {
  const gradeColor = GRADE_COLORS[score.grade] || '#666'
  return (
    <div className="rounded-2xl p-6 transition-all hover:scale-[1.02]"
      style={{ background: 'var(--bg-card)', border: `2px solid ${gradeColor}33` }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {score.name || score.store_id}
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {score.model_version} · {score.confidence}
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black rounded-xl px-4 py-2"
            style={{ background: gradeColor, color: '#fff' }}>
            {score.grade}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg" style={{ background: '#0f172a' }}>
          <div className="text-2xl font-bold" style={{ color: gradeColor }}>
            {Number(score.display_score).toFixed(3)}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Score Final</div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: '#0f172a' }}>
          <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {score.drs}/5
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>DRS</div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: '#0f172a' }}>
          <div className="text-2xl font-bold" style={{ color: '#27AE60' }}>
            ${(score.ebitda_estimate / 1000).toFixed(0)}K
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>EBITDA/mes</div>
        </div>
      </div>
      <div className="text-xs p-3 rounded-lg" style={{ background: '#0f172a', color: 'var(--text-secondary)' }}>
        <strong style={{ color: 'var(--text-primary)' }}>Correcciones:</strong> {score.corrections_applied}
      </div>
      <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {score.notes?.substring(0, 200)}{score.notes && score.notes.length > 200 ? '...' : ''}
      </p>
    </div>
  )
}
