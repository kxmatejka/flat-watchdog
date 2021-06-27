import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

export const Map = () => {
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
      <Marker position={[50.03753666335442, 15.768490489653516]}>
        <Popup>
          Hello!
        </Popup>
      </Marker>
    </MapContainer>
  )
}
