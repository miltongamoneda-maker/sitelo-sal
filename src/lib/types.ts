export interface Store {
  id: string
  name: string
  lat: number
  lng: number
  address: string
  municipio: string
  departamento: string
  formato: string
  status: string
}

export interface StoreScore {
  id: number
  store_id: string
  model_version: string
  raw_score: number
  display_score: number
  grade: string
  drs: number
  ebitda_estimate: number
  corrections_applied: string
  confidence: string
  notes: string
  computed_at: string
  name?: string
}

export interface StoreRawData {
  store_id: string
  name: string
  zona: string
  dim_traffic: number
  dim_commercial: number
  dim_nse: number
  dim_tourism: number
  dim_office: number
  dim_transport: number
  dim_competition: number
  dim_residential: number
  dim_night: number
  dim_security: number
  delivery_pop_5km: number
  delivery_competitors_5km: number
  delivery_roadmarket_5km: number
  override_main_road: string
}

export const GRADE_COLORS: Record<string, string> = {
  'A+': '#1a7a3a',
  'A': '#27AE60',
  'B': '#F39C12',
  'C': '#E74C3C',
  'D': '#8E44AD',
  'F': '#2C3E50',
}

export const GRADE_SCALE = [
  { grade: 'A+', min: 8.5, label: 'Excepcional' },
  { grade: 'A', min: 7.0, label: 'Excelente' },
  { grade: 'B', min: 5.5, label: 'Buena' },
  { grade: 'C', min: 4.0, label: 'Regular' },
  { grade: 'D', min: 3.0, label: 'Débil' },
  { grade: 'F', min: 0, label: 'No viable' },
]

export const VARIABLES = [
  { key: 'Pob', weight: 0.08, label: 'Población 1km' },
  { key: 'Crec', weight: 0.05, label: 'Crecimiento' },
  { key: 'Vis', weight: 0.058, label: 'Visibilidad' },
  { key: 'TrafV', weight: 0.11, label: 'Tráfico vehicular' },
  { key: 'Comp', weight: 0.06, label: 'Competencia (↑=menos)' },
  { key: 'Noct', weight: 0.095, label: 'Actividad nocturna' },
  { key: 'CapD', weight: 0.07, label: 'Captive demand día' },
  { key: 'CapN', weight: 0.14, label: 'Captive demand noche' },
  { key: 'Tick', weight: 0.04, label: 'Ticket promedio' },
  { key: 'UbQ', weight: 0.11, label: 'Calidad ubicación' },
  { key: 'Acc', weight: 0.09, label: 'Accesibilidad' },
  { key: 'DblV', weight: 0.048, label: 'Doble vía' },
  { key: 'Tur', weight: 0.05, label: 'Turismo' },
]
