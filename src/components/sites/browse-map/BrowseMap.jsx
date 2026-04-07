import React from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Marker Component
const createCustomIcon = (count, flagType) => {
  return L.divIcon({
    className: "group",
    html: `
      <div class="flex flex-col items-center">
        <div class="bg-white px-4 py-3 rounded-xl shadow-2xl border border-gray-100 flex items-center gap-2 mb-3 relative transform hover:scale-110 transition-transform duration-300">
            <div class="w-6 h-4 rounded overflow-hidden flex flex-col scale-90">
                <div class="${flagType === 'sg' ? 'bg-red-500' : 'bg-blue-900'} w-full h-[6px]"></div>
                <div class="bg-white w-full h-[4px]"></div>
                <div class="bg-blue-800 w-full h-[6px]"></div>
            </div>
            <span class="text-sm font-bold text-[#171717] font-primary flex items-baseline gap-1 whitespace-nowrap">
                ${count} <span class="font-medium text-gray-400">Placements</span>
            </span>
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
        </div>
        <div class="w-4 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.6)] animate-pulse"></div>
      </div>
    `,
    iconSize: [160, 60],
    iconAnchor: [80, 70],
  });
};

const markers = [
  { id: 1, position: [40, 15], count: 85, flag: 'sg' },
  { id: 2, position: [15, 15], count: 85, flag: 'us' },
  { id: 3, position: [35, -70], count: 42, flag: 'us' },
  { id: 4, position: [50, 10], count: 12, flag: 'sg' },
];

const BrowseMap = () => {
  return (
    <div className="w-full h-full relative group ">
      <MapContainer
        center={[20, 0]}
        zoom={3}
        className="w-full h-full z-0"
        zoomControl={false}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          // Alternative "dots" style map provider or custom styling if needed
        />
        
        {/* Sub-grid/Grid Lines via custom layer or simple overlay if needed */}
        
        {markers.map((m) => (
          <Marker 
            key={m.id} 
            position={m.position} 
            icon={createCustomIcon(m.count, m.flag)} 
          />
        ))}

        <ZoomControl position="topleft" />
      </MapContainer>

      {/* Custom UI Overlays on Map */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] border-2 border-Primary/10 z-10">
          <div className="w-full h-full grid grid-cols-4 grid-rows-4">
              {[...Array(16)].map((_, i) => (
                  <div key={i} className="border border-Primary/20 border-dashed" />
              ))}
          </div>
      </div>
    </div>
  );
};

export default BrowseMap;