import { motion } from "motion/react";
import { TrendingUp, Clock, Calendar, Activity, AlertTriangle } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";
import { api } from "../services/api";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card">
        <p className="text-sm text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white font-semibold">{entry.name}:</span>
            <span className="text-gray-300">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ForecastingPage() {
  const [forecast24h, setForecast24h] = useState([]);
  const [forecast3day, setForecast3day] = useState([]);
  const [forecast7day, setForecast7day] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getForecast24h(),
      api.getForecast3day(),
      api.getForecast7day(),
    ]).then(([d24h, d3d, d7d]) => {
      setForecast24h(d24h);
      setForecast3day(d3d);
      setForecast7day(d7d);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load forecasting data:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00d4ff] text-2xl font-bold animate-pulse">
          Loading Forecasting Data...
        </div>
      </div>
    );
  }

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
            <TrendingUp className="w-10 h-10 text-[#00d4ff]" />
            <div>
              <h1 className="text-gradient">Time-Based Risk Forecasting</h1>
              <p className="text-gray-400 text-lg mt-2">
                AI-powered temporal prediction models with confidence intervals
              </p>
            </div>
          </div>
        </motion.div>

        {/* Forecast Timeline Selector */}
        <motion.div
          className="flex gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="glass-card border-2 border-[#00d4ff]/50 glow-cyan flex items-center gap-3 cursor-pointer">
            <Clock className="w-5 h-5 text-[#00d4ff]" />
            <div>
              <div className="text-white font-semibold">24 Hours</div>
              <div className="text-xs text-gray-400">Hourly breakdown</div>
            </div>
          </div>
          <div className="glass-card flex items-center gap-3 cursor-pointer hover:border-[#00d4ff]/30">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-white font-semibold">3 Days</div>
              <div className="text-xs text-gray-400">Short-term trend</div>
            </div>
          </div>
          <div className="glass-card flex items-center gap-3 cursor-pointer hover:border-[#00d4ff]/30">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-white font-semibold">7 Days</div>
              <div className="text-xs text-gray-400">Weekly projection</div>
            </div>
          </div>
        </motion.div>

        {/* 24-Hour Forecast */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white mb-1 flex items-center gap-2">
                <Clock className="w-6 h-6 text-[#00d4ff]" />
                Next 24-Hour Risk Evolution
              </h3>
              <p className="text-sm text-gray-400">
                Real-time prediction with confidence intervals
              </p>
            </div>
            <div className="glass rounded-full px-4 py-2 text-sm">
              <span className="text-gray-400">Updated:</span>
              <span className="text-[#00d4ff] ml-2 font-semibold">2 min ago</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={forecast24h}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3366" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff3366" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="risk"
                name="Risk Level"
                stroke="#ff3366"
                strokeWidth={3}
                dot={{ fill: "#ff3366", r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="confidence"
                name="Confidence %"
                stroke="#00d4ff"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#00d4ff", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 3-Day Forecast */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="mb-6">
            <h3 className="text-white mb-1 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#ffb800]" />
              3-Day Risk Distribution Trend
            </h3>
            <p className="text-sm text-gray-400">
              Zone classification evolution over short-term period
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecast3day}>
              <defs>
                <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3366" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff3366" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffb800" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ffb800" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff87" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00ff87" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="high"
                name="High Risk"
                stackId="1"
                stroke="#ff3366"
                fill="url(#colorHigh)"
              />
              <Area
                type="monotone"
                dataKey="moderate"
                name="Moderate"
                stackId="1"
                stroke="#ffb800"
                fill="url(#colorModerate)"
              />
              <Area
                type="monotone"
                dataKey="safe"
                name="Safe"
                stackId="1"
                stroke="#00ff87"
                fill="url(#colorSafe)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 7-Day Forecast Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="mb-6">
            <h3 className="text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#4d88ff]" />
              7-Day Risk Index Projection
            </h3>
            <p className="text-sm text-gray-400">
              Weekly forecast with trend analysis
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {forecast7day.map((day, index) => {
              const isHigh = day.riskIndex >= 70;
              const isModerate = day.riskIndex >= 50 && day.riskIndex < 70;
              const borderColor = isHigh
                ? "border-[#ff3366]/50"
                : isModerate
                ? "border-[#ffb800]/50"
                : "border-[#00ff87]/50";
              const glowClass = isHigh
                ? "glow-high-risk"
                : isModerate
                ? "glow-moderate"
                : "glow-safe";
              const textColor = isHigh
                ? "text-[#ff3366]"
                : isModerate
                ? "text-[#ffb800]"
                : "text-[#00ff87]";

              return (
                <motion.div
                  key={day.day}
                  className={`glass-card border-2 ${borderColor} ${glowClass} text-center`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-sm text-gray-400 mb-2">{day.day}</div>
                  <div className={`text-3xl font-bold mb-2 ${textColor}`}>
                    {day.riskIndex}
                  </div>
                  <div className="text-xs text-gray-400 mb-3">Risk Index</div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full"
                      style={{
                        background: isHigh
                          ? "#ff3366"
                          : isModerate
                          ? "#ffb800"
                          : "#00ff87",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${day.riskIndex}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <div className={`text-xs font-semibold ${textColor} capitalize`}>
                    {day.trend}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Forecast Insights */}
        <motion.div
          className="glass-card mt-12 border-2 border-[#ff3366]/30 glow-high-risk"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-[#ff3366] mt-1" />
            <div>
              <h4 className="text-white mb-2">AI Forecast Analysis</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-start gap-2">
                  <span className="text-[#ff3366]">•</span>
                  Risk escalation expected to peak on <span className="text-white font-semibold">Friday</span> with index reaching <span className="text-[#ff3366] font-semibold">71</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#ffb800]">•</span>
                  Moderate risk zones predicted to increase by <span className="text-[#ffb800] font-semibold">19%</span> over next 3 days
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#00d4ff]">•</span>
                  Model confidence remains high at <span className="text-[#00d4ff] font-semibold">87.3%</span> across all time horizons
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
