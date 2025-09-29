"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Type Definition for Float Data ---
interface FloatData {
    id: string;
    lat: number;
    lon: number;
    temp: number;
    salinity: number;
}

// Fix for default Leaflet icon issue with React
const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface LeafletMapProps {
    floats: FloatData[];
    onFloatClick: (float: FloatData) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ floats, onFloatClick }) => {
    return (
        <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={4} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {floats.map(float => (
                <Marker 
                    key={float.id} 
                    position={[float.lat, float.lon]}
                    icon={defaultIcon}
                >
                    <Popup>
                        <div>
                            <h4 className="font-bold">Float {float.id}</h4>
                            <p>Temp: {float.temp}°C</p>
                            <p>Salinity: {float.salinity} PSU</p>
                            <button 
                                onClick={() => onFloatClick(float)} 
                                className="mt-2 text-blue-600 hover:underline"
                            >
                                View Details
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LeafletMap;
