import { motion } from "motion/react";
import { GitCompare, TrendingUp, AlertCircle, MapPin, Activity } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export function ComparisonPage() {
  const [zoneComparison, setZoneComparison] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getZoneComparison(),
      api.getComparisonTrend(),
    ]).then(([zones, trend]) => {
      setZoneComparison(zones);
      setTrendData(trend);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load comparison data:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00d4ff] text-2xl font-bold animate-pulse">
          Loading Comparison Data...
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
  switch (level) {
    case "high":
      return {
        color: "#ff3366",
        bg: "from-[#ff3366]/20 to-[#ff3366]/5",
        border: "border-[#ff3366]/50",
        glow: "glow-high-risk",
      };
    case "moderate":
      return {
        color: "#ffb800",
        bg: "from-[#ffb800]/20 to-[#ffb800]/5",
        border: "border-[#ffb800]/50",
        glow: "glow-moderate",
      };
    default:
      return {
        color: "#00ff87",
        bg: "from-[#00ff87]/20 to-[#00ff87]/5",
        border: "border-[#00ff87]/50",
        glow: "glow-safe",
      };
  }
};

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
            <GitCompare className="w-10 h-10 text-[#00d4ff]" />
            <div>
              <h1 className="text-gradient">Zone Comparison Interface</h1>
              <p className="text-gray-400 text-lg mt-2">
                Multi-zone risk analysis and comparative intelligence
              </p>
            </div>
          </div>
        </motion.div>

        {/* Zone Selection */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-white mb-4">Selected Zones for Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zoneComparison.map((zone, index) => {
              const colors = getRiskColor(zone.riskLevel);
              return (
                <div
                  key={index}
                  className={`glass-card border-2 ${colors.border} ${colors.glow}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <MapPin className="w-5 h-5" style={{ color: colors.color }} />
                    <span
                      className="text-xs font-semibold uppercase px-2 py-1 rounded"
                      style={{ color: colors.color, background: colors.bg }}
                    >
                      {zone.riskLevel}
                    </span>
                  </div>
                  <h4 className="text-white mb-1">{zone.zone}</h4>
                  <div className="text-xs text-gray-400">
                    Risk Index: <span className="text-white font-semibold">{zone.riskIndex}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {zoneComparison.map((zone, index) => {
            const colors = getRiskColor(zone.riskLevel);
            return (
              <motion.div
                key={index}
                className={`glass-card border-2 ${colors.border}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                {/* Zone Header */}
                <div className="mb-6">
                  <h3 className="text-white mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5" style={{ color: colors.color }} />
                    {zone.zone}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold uppercase px-3 py-1 rounded-full"
                      style={{
                        color: colors.color,
                        background: colors.bg,
                      }}
                    >
                      {zone.riskLevel} Risk
                    </span>
                    <span className="text-xs text-gray-400">
                      Confidence: <span className="text-white font-semibold">{zone.confidence}%</span>
                    </span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Population</span>
                    <span className="text-white font-semibold">{zone.population}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Risk Index</span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: colors.color }}
                    >
                      {zone.riskIndex}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">6-Week Trend</span>
                    <span
                      className="font-semibold flex items-center gap-1"
                      style={{ color: colors.color }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      {zone.trend}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Escalation Speed</span>
                    <span
                      className="font-semibold"
                      style={{ color: colors.color }}
                    >
                      {zone.escalationSpeed}
                    </span>
                  </div>
                </div>

                {/* Risk Index Bar */}
                <div className="mb-6">
                  <div className="text-xs text-gray-400 mb-2">Risk Level</div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: colors.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.riskIndex}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>

                {/* Factor Breakdown */}
                <div>
                  <div className="text-sm text-gray-400 mb-3">Risk Factors</div>
                  <div className="space-y-2">
                    {zone.factors.slice(0, 3).map((factor, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{factor.metric}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full"
                              style={{
                                width: `${factor.value}%`,
                                backgroundColor: colors.color,
                              }}
                            />
                          </div>
                          <span className="text-white font-semibold w-8 text-right">
                            {factor.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Radar Comparison */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00d4ff]" />
            Multi-Factor Comparative Analysis
          </h3>
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis
                dataKey="metric"
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af" }}
              />
              <PolarRadiusAxis stroke="#9ca3af" domain={[0, 100]} />
              <Radar
                name="Pacific Northwest"
                dataKey="value"
                data={zoneComparison[0].factors}
                stroke="#ff3366"
                fill="#ff3366"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Caribbean Basin"
                dataKey="value"
                data={zoneComparison[1].factors}
                stroke="#ffb800"
                fill="#ffb800"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Arctic Circle"
                dataKey="value"
                data={zoneComparison[2].factors}
                stroke="#00d4ff"
                fill="#00d4ff"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Trend Comparison */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#4d88ff]" />
            6-Week Risk Escalation Comparison
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[40, 90]} />
              <Tooltip
                contentStyle={{
                  background: "rgba(10, 14, 26, 0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="pnw"
                name="Pacific Northwest"
                stroke="#ff3366"
                strokeWidth={3}
                dot={{ fill: "#ff3366", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="caribbean"
                name="Caribbean Basin"
                stroke="#ffb800"
                strokeWidth={3}
                dot={{ fill: "#ffb800", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="arctic"
                name="Arctic Circle"
                stroke="#00d4ff"
                strokeWidth={3}
                dot={{ fill: "#00d4ff", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Priority Ranking */}
        <motion.div
          className="glass-card border-2 border-[#ff3366]/30 glow-high-risk"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#ff3366] mt-1" />
            <div className="flex-1">
              <h4 className="text-white mb-3">Priority Zone Ranking</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 glass rounded-lg border-l-4 border-[#ff3366]">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-[#ff3366]">1</div>
                    <div>
                      <div className="text-white font-semibold">Caribbean Basin</div>
                      <div className="text-xs text-gray-400">Critical escalation speed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#ff3366] font-bold">82</div>
                    <div className="text-xs text-gray-400">Risk Index</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 glass rounded-lg border-l-4 border-[#ff3366]">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-[#ff3366]">2</div>
                    <div>
                      <div className="text-white font-semibold">Pacific Northwest</div>
                      <div className="text-xs text-gray-400">High seismic activity</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#ff3366] font-bold">85</div>
                    <div className="text-xs text-gray-400">Risk Index</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 glass rounded-lg border-l-4 border-[#ffb800]">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-[#ffb800]">3</div>
                    <div>
                      <div className="text-white font-semibold">Arctic Circle</div>
                      <div className="text-xs text-gray-400">Temperature anomaly</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#ffb800] font-bold">62</div>
                    <div className="text-xs text-gray-400">Risk Index</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
