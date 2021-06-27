import {FC} from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

interface Flat {
  externalId: string
  description: string
  url: string
  lat: number
  lng: number
  price: number
}

export const Map: FC<{flats: Flat[]}> = ({flats}) => {
  return (
    <MapContainer
      center={[50.03753666335442, 15.768490489653516]}
      zoom={14}
      scrollWheelZoom={true}
      style={{height: '100%'}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flats.map((flat) => (
        <Marker key={flat.externalId} position={[flat.lat, flat.lng]}>
          <Popup>
            <p>{flat.price}</p>
            <a href={flat.url} target='_blank' rel='noreferrer'>detail</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
