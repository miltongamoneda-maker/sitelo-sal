'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { GRADE_COLORS } from '@/lib/types'

const SAL02_EVOLUTION = [
  { version: 'V1.0', score: 4.602, grade: 'C', change: 'Evaluación inicial' },
  { version: 'V1.1', score: 5.667, grade: 'B', change: 'BPO/Call centers' },
  { version: 'V1.2', score: 6.595, grade: 'B', change: 'Ecosistema completo' },
  { version: 'V1.3', score: 6.943, grade: 'B', change: 'Población efectiva' },
  { version: 'V1.4', score: 7.103, grade: 'A', change: 'CA-4 + turismo' },
]

export default function EvolutionChart() {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)' }}>
      <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        SAL02 Tuscania — Evolución del Score
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        5 iteraciones de investigación: C (4.602) → A (7.103)
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={SAL02_EVOLUTION} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="version" stroke="#94a3b8" fontSize={12} />
          <YAxis domain={[3, 9]} stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
            formatter={(value: any) => [Number(value).toFixed(3), 'Score']}
            labelFormatter={(label: any) => {
              const item = SAL02_EVOLUTION.find(d => d.version === String(label))
              return item ? `${label}: ${item.change}` : String(label)
            }}
          />
          <ReferenceLine y={7.0} stroke={GRADE_COLORS['A']} strokeDasharray="5 5" label={{ value: 'A ≥ 7.0', fill: GRADE_COLORS['A'], fontSize: 11 }} />
          <ReferenceLine y={5.5} stroke={GRADE_COLORS['B']} strokeDasharray="5 5" label={{ value: 'B ≥ 5.5', fill: GRADE_COLORS['B'], fontSize: 11 }} />
          <ReferenceLine y={4.0} stroke={GRADE_COLORS['C']} strokeDasharray="5 5" label={{ value: 'C ≥ 4.0', fill: GRADE_COLORS['C'], fontSize: 11 }} />
          <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
