'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix Leaflet icon issue
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapInnerProps {
  location: { lat: number; lng: number } | null;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const MapInner: React.FC<MapInnerProps> = ({ location }) => {
  if (!location) return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
      Acquiring location...
    </div>
  );

  const position: [number, number] = [location.lat, location.lng];

  return (
    <MapContainer 
      center={position} 
      zoom={15} 
      scrollWheelZoom={false} 
      style={{ height: '100%', width: '100%', borderRadius: '1.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={position} />
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapInner;
