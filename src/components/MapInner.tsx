'use client'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { Store, StoreScore, GRADE_COLORS } from '@/lib/types'

function createIcon(grade: string) {
  const color = GRADE_COLORS[grade] || '#666'
  return L.divIcon({
    className: '',
    html: `<div style="background:${color};color:#fff;font-weight:900;font-size:14px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4)">${grade}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

export default function MapInner({ stores, scores }: { stores: Store[], scores: StoreScore[] }) {
  const scoreMap = Object.fromEntries(scores.map(s => [s.store_id, s]))
  const center: [number, number] = [13.69, -89.24]

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #334155' }}>
      <MapContainer center={center} zoom={11} style={{ height: 400, width: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap & CartoDB'
        />
        {stores.map(store => {
          const sc = scoreMap[store.id]
          if (!sc || !store.lat || !store.lng) return null
          return (
            <div key={store.id}>
              <Circle center={[store.lat, store.lng]} radius={5000} pathOptions={{ color: GRADE_COLORS[sc.grade] || '#666', fillOpacity: 0.08, weight: 1 }} />
              <Marker position={[store.lat, store.lng]} icon={createIcon(sc.grade)}>
                <Popup>
                  <div style={{ color: '#000', minWidth: 180 }}>
                    <strong>{store.name}</strong><br/>
                    Score: {Number(sc.display_score).toFixed(3)} · Grado {sc.grade}<br/>
                    DRS: {sc.drs}/5 · EBITDA: ${(sc.ebitda_estimate/1000).toFixed(0)}K/mes<br/>
                    <small>{store.municipio}, {store.departamento}</small>
                  </div>
                </Popup>
              </Marker>
            </div>
          )
        })}
      </MapContainer>
    </div>
  )
}
