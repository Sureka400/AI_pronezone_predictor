import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Info, AlertTriangle, TrendingUp } from "lucide-react";

interface MapZone {
  id: string;
  name: string;
  position: { x: number; y: number };
  riskLevel: "safe" | "moderate" | "high";
  confidence: number;
  details: string;
}

const mapZones: MapZone[] = [
  {
    id: "z1",
    name: "Pacific Northwest",
    position: { x: 15, y: 25 },
    riskLevel: "high",
    confidence: 94,
    details: "Seismic activity detected",
  },
  {
    id: "z2",
    name: "Caribbean Basin",
    position: { x: 28, y: 45 },
    riskLevel: "high",
    confidence: 91,
    details: "Hurricane formation probable",
  },
  {
    id: "z3",
    name: "Central Europe",
    position: { x: 52, y: 28 },
    riskLevel: "safe",
    confidence: 88,
    details: "Stable conditions",
  },
  {
    id: "z4",
    name: "Southeast Asia",
    position: { x: 75, y: 50 },
    riskLevel: "moderate",
    confidence: 78,
    details: "Coastal flooding risk",
  },
  {
    id: "z5",
    name: "Arctic Circle",
    position: { x: 50, y: 12 },
    riskLevel: "moderate",
    confidence: 82,
    details: "Temperature anomalies",
  },
  {
    id: "z6",
    name: "Australian Coast",
    position: { x: 82, y: 72 },
    riskLevel: "moderate",
    confidence: 76,
    details: "Drought conditions",
  },
  {
    id: "z7",
    name: "South America",
    position: { x: 30, y: 68 },
    riskLevel: "safe",
    confidence: 85,
    details: "Low risk levels",
  },
  {
    id: "z8",
    name: "North Africa",
    position: { x: 50, y: 45 },
    riskLevel: "safe",
    confidence: 89,
    details: "Normal climate patterns",
  },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case "safe":
      return "#00ff87";
    case "moderate":
      return "#ffb800";
    case "high":
      return "#ff3366";
    default:
      return "#ffffff";
  }
};

export function RiskMap() {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<MapZone | null>(null);

  return (
    <div className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-[#00d4ff]" />
            <h2 className="text-gradient">Interactive Risk Map</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Global zone visualization with real-time risk intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Visualization */}
          <motion.div
            className="lg:col-span-2 glass-card relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ minHeight: "500px" }}
          >
            {/* Map Background Grid */}
            <div className="absolute inset-0">
              {/* Grid Lines */}
              <svg
                className="w-full h-full opacity-20"
                style={{ position: "absolute" }}
              >
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(0, 212, 255, 0.2)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* World Map Outline (Abstract) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg
                  viewBox="0 0 800 400"
                  className="w-full h-full"
                  style={{ filter: "blur(1px)" }}
                >
                  {/* Simplified continents */}
                  <path
                    d="M 100 150 Q 150 120, 200 140 L 250 130 Q 280 140, 300 160 L 320 180 Q 310 200, 280 210 L 240 220 Q 200 210, 180 190 L 150 180 Q 110 170, 100 150 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(0, 212, 255, 0.3)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 350 100 Q 400 90, 450 110 L 500 120 Q 530 140, 540 170 L 550 200 Q 540 220, 510 230 L 470 240 Q 430 230, 410 210 L 380 190 Q 350 170, 350 140 L 350 100 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(0, 212, 255, 0.3)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 150 250 Q 200 240, 250 260 L 280 280 Q 270 310, 240 320 L 200 330 Q 170 320, 150 300 L 140 270 Q 140 260, 150 250 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(0, 212, 255, 0.3)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 600 250 Q 650 240, 700 260 L 720 290 Q 710 320, 680 330 L 640 335 Q 610 325, 600 300 L 595 270 Q 595 260, 600 250 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(0, 212, 255, 0.3)"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Animated Risk Zones */}
              {mapZones.map((zone) => (
                <motion.div
                  key={zone.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${zone.position.x}%`,
                    top: `${zone.position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onHoverStart={() => setHoveredZone(zone.id)}
                  onHoverEnd={() => setHoveredZone(null)}
                  onClick={() => setSelectedZone(zone)}
                  whileHover={{ scale: 1.2 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {/* Pulsing Circle */}
                  <motion.div
                    className="relative w-8 h-8 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Outer Glow */}
                    <div
                      className="absolute w-12 h-12 rounded-full opacity-40"
                      style={{
                        background: `radial-gradient(circle, ${getRiskColor(
                          zone.riskLevel
                        )}, transparent)`,
                      }}
                    />
                    {/* Inner Pin */}
                    <div
                      className="w-4 h-4 rounded-full border-2 z-10"
                      style={{
                        backgroundColor: getRiskColor(zone.riskLevel),
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        boxShadow: `0 0 12px ${getRiskColor(zone.riskLevel)}`,
                      }}
                    />
                  </motion.div>

                  {/* Hover Tooltip */}
                  {hoveredZone === zone.id && (
                    <motion.div
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 glass px-3 py-2 rounded-lg whitespace-nowrap z-20 pointer-events-none"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-xs font-semibold text-white mb-1">
                        {zone.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: getRiskColor(zone.riskLevel) }}
                      >
                        {zone.riskLevel.toUpperCase()} - {zone.confidence}%
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-6 right-6 glass rounded-xl p-4 z-20">
              <div className="text-xs font-semibold text-gray-400 mb-3">
                RISK LEVELS
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00ff87] glow-safe"></div>
                  <span className="text-xs text-gray-300">Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ffb800] glow-moderate"></div>
                  <span className="text-xs text-gray-300">Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff3366] glow-high-risk"></div>
                  <span className="text-xs text-gray-300">High Risk</span>
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-6 left-6 flex items-center gap-2 glass rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] pulse-glow"></div>
              <span className="text-xs text-[#00d4ff] font-semibold">
                LIVE MONITORING
              </span>
            </div>
          </motion.div>

          {/* Zone Details Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {selectedZone ? (
              <div className="glass-card">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${getRiskColor(
                        selectedZone.riskLevel
                      )}20`,
                    }}
                  >
                    <MapPin
                      className="w-5 h-5"
                      style={{ color: getRiskColor(selectedZone.riskLevel) }}
                    />
                  </div>
                  <div>
                    <h4 className="text-white">{selectedZone.name}</h4>
                    <p className="text-xs text-gray-400">Zone Details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Risk Level
                    </div>
                    <div
                      className="text-lg font-semibold uppercase"
                      style={{ color: getRiskColor(selectedZone.riskLevel) }}
                    >
                      {selectedZone.riskLevel}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Prediction Confidence
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedZone.confidence}%
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${selectedZone.confidence}%`,
                          backgroundColor: getRiskColor(
                            selectedZone.riskLevel
                          ),
                          boxShadow: `0 0 8px ${getRiskColor(
                            selectedZone.riskLevel
                          )}`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">Analysis</div>
                    <p className="text-sm text-gray-300">
                      {selectedZone.details}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card flex flex-col items-center justify-center py-12 text-center">
                <Info className="w-12 h-12 text-[#00d4ff] mb-4 opacity-50" />
                <p className="text-gray-400 text-sm">
                  Click on a zone marker to view detailed risk analysis
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="glass-card">
              <h4 className="text-white mb-4">Global Statistics</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Zones</span>
                  <span className="text-white font-semibold">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">High Risk</span>
                  <span className="text-[#ff3366] font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Moderate</span>
                  <span className="text-[#ffb800] font-semibold">68</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Safe</span>
                  <span className="text-[#00ff87] font-semibold">156</span>
                </div>
              </div>
            </div>

            {/* Alert Notice */}
            <div className="glass-card border-2 border-[#ff3366]/30 glow-high-risk">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#ff3366] mt-0.5" />
                <div>
                  <h4 className="text-white mb-1">Active Alert</h4>
                  <p className="text-sm text-gray-300">
                    2 high-risk zones require immediate attention
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
