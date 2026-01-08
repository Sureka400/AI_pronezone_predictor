import { motion } from "motion/react";
import { Activity, AlertCircle, CheckCircle, TrendingUp, Zap, Globe, MapPin } from "lucide-react";

interface RiskCard {
  id: string;
  zone: string;
  riskLevel: "safe" | "moderate" | "high";
  confidence: number;
  forecast: string;
  indicators: string[];
  population: string;
  lastUpdate: string;
}

const riskData: RiskCard[] = [
  {
    id: "1",
    zone: "Pacific Northwest",
    riskLevel: "high",
    confidence: 94,
    forecast: "48-72 hours",
    indicators: ["Seismic Activity", "Tectonic Shifts"],
    population: "14.2M",
    lastUpdate: "2 min ago",
  },
  {
    id: "2",
    zone: "Southeast Asia Coastal",
    riskLevel: "moderate",
    confidence: 78,
    forecast: "5-7 days",
    indicators: ["Rising Sea Levels", "Storm Patterns"],
    population: "68.5M",
    lastUpdate: "5 min ago",
  },
  {
    id: "3",
    zone: "Central African Region",
    riskLevel: "safe",
    confidence: 89,
    forecast: "Stable",
    indicators: ["Normal Climate", "Low Volatility"],
    population: "22.1M",
    lastUpdate: "8 min ago",
  },
  {
    id: "4",
    zone: "Arctic Circle",
    riskLevel: "moderate",
    confidence: 82,
    forecast: "72-96 hours",
    indicators: ["Ice Melting", "Temperature Rise"],
    population: "4.3M",
    lastUpdate: "12 min ago",
  },
  {
    id: "5",
    zone: "Caribbean Basin",
    riskLevel: "high",
    confidence: 91,
    forecast: "24-48 hours",
    indicators: ["Hurricane Formation", "Wind Speed"],
    population: "43.7M",
    lastUpdate: "3 min ago",
  },
  {
    id: "6",
    zone: "Australian Outback",
    riskLevel: "moderate",
    confidence: 76,
    forecast: "3-5 days",
    indicators: ["Drought Conditions", "Heat Waves"],
    population: "2.8M",
    lastUpdate: "15 min ago",
  },
  {
    id: "7",
    zone: "Mediterranean Coast",
    riskLevel: "safe",
    confidence: 85,
    forecast: "Stable",
    indicators: ["Normal Conditions", "Low Risk"],
    population: "152.3M",
    lastUpdate: "10 min ago",
  },
  {
    id: "8",
    zone: "Central America",
    riskLevel: "moderate",
    confidence: 79,
    forecast: "4-6 days",
    indicators: ["Volcanic Activity", "Tremors"],
    population: "51.2M",
    lastUpdate: "7 min ago",
  },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case "safe":
      return {
        bg: "from-[#00ff87]/10 to-[#00ff87]/5",
        border: "border-[#00ff87]/30",
        text: "text-[#00ff87]",
        glow: "glow-safe",
      };
    case "moderate":
      return {
        bg: "from-[#ffb800]/10 to-[#ffb800]/5",
        border: "border-[#ffb800]/30",
        text: "text-[#ffb800]",
        glow: "glow-moderate",
      };
    case "high":
      return {
        bg: "from-[#ff3366]/10 to-[#ff3366]/5",
        border: "border-[#ff3366]/30",
        text: "text-[#ff3366]",
        glow: "glow-high-risk",
      };
    default:
      return {
        bg: "from-white/10 to-white/5",
        border: "border-white/30",
        text: "text-white",
        glow: "",
      };
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case "safe":
      return <CheckCircle className="w-5 h-5" />;
    case "moderate":
      return <AlertCircle className="w-5 h-5" />;
    case "high":
      return <Zap className="w-5 h-5" />;
    default:
      return <Activity className="w-5 h-5" />;
  }
};

export function DashboardPage() {
  const criticalCount = riskData.filter((z) => z.riskLevel === "high").length;
  const moderateCount = riskData.filter((z) => z.riskLevel === "moderate").length;
  const safeCount = riskData.filter((z) => z.riskLevel === "safe").length;

  return (
    <div className="relative px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-10 h-10 text-[#00d4ff]" />
            <div>
              <h1 className="text-gradient">AI Risk Prediction Dashboard</h1>
              <p className="text-gray-400 text-lg mt-2">
                Real-time zone-wise risk assessment powered by machine learning models
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Total Zones</span>
              <Globe className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">247</div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[#00d4ff]">Under monitoring</span>
            </div>
          </motion.div>

          <motion.div
            className="glass-card border-2 border-[#ff3366]/30 glow-high-risk"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">High Risk</span>
              <Zap className="w-5 h-5 text-[#ff3366]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">{criticalCount}</div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-[#ff3366]" />
              <span className="text-[#ff3366]">Immediate attention</span>
            </div>
          </motion.div>

          <motion.div
            className="glass-card border-2 border-[#ffb800]/30 glow-moderate"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Moderate Risk</span>
              <AlertCircle className="w-5 h-5 text-[#ffb800]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">{moderateCount}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#ffb800]">Monitor closely</span>
            </div>
          </motion.div>

          <motion.div
            className="glass-card border-2 border-[#00ff87]/30 glow-safe"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Safe Zones</span>
              <CheckCircle className="w-5 h-5 text-[#00ff87]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">{safeCount}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#00ff87]">Normal conditions</span>
            </div>
          </motion.div>
        </div>

        {/* Zone Risk Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#00d4ff]" />
            Zone-Wise Risk Intelligence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {riskData.map((card, index) => {
              const colors = getRiskColor(card.riskLevel);
              return (
                <motion.div
                  key={card.id}
                  className={`glass-card border-2 ${colors.border} ${colors.glow} hover:scale-105 cursor-pointer`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-white mb-2">{card.zone}</h4>
                      <div className={`flex items-center gap-2 ${colors.text}`}>
                        {getRiskIcon(card.riskLevel)}
                        <span className="text-sm font-semibold uppercase">
                          {card.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colors.bg} ${colors.text}`}
                    >
                      {card.confidence}%
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Population</span>
                      <span className="text-white font-semibold">{card.population}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Forecast</span>
                      <span className="text-white font-semibold">{card.forecast}</span>
                    </div>
                  </div>

                  {/* Indicators */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Key Indicators</div>
                    <div className="flex flex-wrap gap-2">
                      {card.indicators.map((indicator, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded text-xs glass text-gray-300"
                        >
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>AI Confidence</span>
                      <span>{card.confidence}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${colors.bg}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${card.confidence}%` }}
                        transition={{ delay: 0.7 + index * 0.05, duration: 1 }}
                        style={{
                          boxShadow: `0 0 8px ${
                            card.riskLevel === "high"
                              ? "#ff3366"
                              : card.riskLevel === "moderate"
                              ? "#ffb800"
                              : "#00ff87"
                          }`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Last Update */}
                  <div className="mt-3 text-xs text-gray-500">
                    Updated {card.lastUpdate}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* AI System Status */}
        <motion.div
          className="glass-card mt-12 border-2 border-[#00d4ff]/30 glow-cyan"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#4d88ff]/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div>
              <h4 className="text-white">AI Prediction Engine Status</h4>
              <p className="text-sm text-gray-400">Real-time model performance metrics</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">Model Accuracy</div>
              <div className="text-2xl font-bold text-white">87.3%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Predictions/Hour</div>
              <div className="text-2xl font-bold text-white">1,247</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Avg Response Time</div>
              <div className="text-2xl font-bold text-white">1.2s</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">System Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff87] pulse-glow"></div>
                <span className="text-[#00ff87] font-semibold">Operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
