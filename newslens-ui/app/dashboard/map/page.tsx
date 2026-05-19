"use client";
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { ShieldAlert, TrendingUp } from "lucide-react";

// TopoJSON for a basic world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const hotspots = [
  { name: "New York (Markets)", coordinates: [-74.006, 40.7128], type: 'market' },
  { name: "London (Economy)", coordinates: [-0.1276, 51.5074], type: 'market' },
  { name: "Tokyo (Tech)", coordinates: [139.6503, 35.6762], type: 'market' },
  { name: "Silicon Valley (AI)", coordinates: [-122.1430, 37.4419], type: 'tech' },
  { name: "Eastern Europe (Conflict)", coordinates: [31.1656, 48.3794], type: 'alert' },
];

export default function MapPage() {
  const [tooltip, setTooltip] = useState("");

  return (
    <div className="p-6 md:p-10 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">Global Interactive Map</h1>
        <p className="text-white/50">Tracking real-time geopolitical and market hotspots.</p>
      </div>
      
      <div className="flex-1 glass-card relative overflow-hidden flex items-center justify-center p-4 bg-[#0a0a0a]">
        <div className="absolute top-6 left-6 flex gap-4 z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-black/50 p-2 rounded-lg border border-white/10">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-glow"></span> Markets/Tech
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-black/50 p-2 rounded-lg border border-white/10">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-glow"></span> Conflict/Alerts
          </div>
        </div>

        {tooltip && (
          <div className="absolute top-6 right-6 z-10 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl max-w-xs">
             <h3 className="text-white font-bold mb-2">{tooltip}</h3>
             <p className="text-xs text-white/50">High activity detected in this region. Multiple news signals converging.</p>
          </div>
        )}

        <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400} className="w-full h-full opacity-80 mix-blend-screen">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  fill="#1C1C1E" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#2C2C2E", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          
          {hotspots.map(({ name, coordinates, type }) => (
            <Marker key={name} coordinates={coordinates as [number, number]} onMouseEnter={() => setTooltip(name)} onMouseLeave={() => setTooltip("")}>
              <circle r={8} fill={type === 'alert' ? "#FF453A" : "#32D74B"} className="animate-pulse" />
              <circle r={16} fill={type === 'alert' ? "rgba(255, 69, 58, 0.3)" : "rgba(50, 215, 75, 0.3)"} className="animate-ping" />
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
}
