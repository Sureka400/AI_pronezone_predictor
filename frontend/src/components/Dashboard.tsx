import { motion } from "motion/react";
import { Activity, AlertCircle, CheckCircle, TrendingUp, Zap, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface RiskCard {
  id: string;
  zone: string;
  riskLevel: "safe" | "moderate" | "high";
  confidence: number;
  forecast: string;
  indicators: string[];
}

export function Dashboard() {
  const [riskData, setRiskData] = useState<RiskCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getRiskZones().then((data) => {
      setRiskData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00d4ff] text-2xl font-bold animate-pulse">
          Loading Real-time Data...
        </div>
      </div>
    );
  }

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

  return (
    <div className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-[#00d4ff]" />
            <h2 className="text-gradient">Global Risk Dashboard</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Real-time zone-wise risk assessment powered by AI prediction models
          </p>
        </motion.div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Active Predictions</span>
              <Activity className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">247</div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-[#00ff87]" />
              <span className="text-[#00ff87]">+12% this week</span>
            </div>
          </motion.div>

          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">High-Risk Zones</span>
              <Zap className="w-5 h-5 text-[#ff3366]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">23</div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-[#ff3366]" />
              <span className="text-[#ff3366]">Requires attention</span>
            </div>
          </motion.div>

          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Avg. Confidence</span>
              <CheckCircle className="w-5 h-5 text-[#00ff87]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">87%</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Prediction accuracy</span>
            </div>
          </motion.div>
        </div>

        {/* Zone Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riskData.map((card, index) => {
            const colors = getRiskColor(card.riskLevel);
            return (
              <motion.div
                key={card.id}
                className={`glass-card border-2 ${colors.border} ${colors.glow} hover:scale-105 cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white mb-1">{card.zone}</h4>
                    <div className={`flex items-center gap-2 ${colors.text}`}>
                      {getRiskIcon(card.riskLevel)}
                      <span className="text-sm font-semibold uppercase">
                        {card.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colors.bg}`}
                  >
                    {card.confidence}%
                  </div>
                </div>

                {/* Forecast Timeline */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="text-sm text-gray-400 mb-1">
                    Forecast Window
                  </div>
                  <div className="text-white font-semibold">
                    {card.forecast}
                  </div>
                </div>

                {/* Risk Indicators */}
                <div>
                  <div className="text-sm text-gray-400 mb-2">
                    Key Indicators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.indicators.map((indicator, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs glass text-gray-300"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Prediction Confidence</span>
                    <span>{card.confidence}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${colors.bg} ${colors.glow}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.confidence}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      style={{
                        boxShadow: `0 0 10px ${
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
              </motion.div>
            );
          })}
        </div>

        {/* AI Insights Panel */}
        <motion.div
          className="glass-card mt-12 border-2 border-[#00d4ff]/30 glow-cyan"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#4d88ff]/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div>
              <h4 className="text-white">AI System Insights</h4>
              <p className="text-sm text-gray-400">
                Generated by predictive models
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 pulse-glow"></div>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-[#00d4ff] font-semibold">
                  Pacific Northwest
                </span>{" "}
                showing elevated seismic indicators. ML models predict 94%
                probability of significant activity within 48-72 hour window.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb800] mt-2 pulse-glow"></div>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-[#ffb800] font-semibold">
                  Arctic regions
                </span>{" "}
                demonstrating accelerated temperature anomalies. Time-series
                forecasting indicates moderate risk escalation trend.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff3366] mt-2 pulse-glow"></div>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-[#ff3366] font-semibold">
                  Caribbean Basin
                </span>{" "}
                tropical system formation detected. Neural network analysis
                confirms high-risk hurricane development within 24-48 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
