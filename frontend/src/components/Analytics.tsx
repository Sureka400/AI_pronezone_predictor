import { motion } from "motion/react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, BarChart3, Activity } from "lucide-react";

const riskTrendData = [
  { month: "Jan", high: 18, moderate: 52, safe: 177 },
  { month: "Feb", high: 21, moderate: 58, safe: 168 },
  { month: "Mar", high: 19, moderate: 61, safe: 167 },
  { month: "Apr", high: 24, moderate: 65, safe: 158 },
  { month: "May", high: 26, moderate: 67, safe: 154 },
  { month: "Jun", high: 23, moderate: 68, safe: 156 },
];

const predictionAccuracyData = [
  { week: "W1", accuracy: 82 },
  { week: "W2", accuracy: 84 },
  { week: "W3", accuracy: 86 },
  { week: "W4", accuracy: 85 },
  { week: "W5", accuracy: 87 },
  { week: "W6", accuracy: 88 },
  { week: "W7", accuracy: 87 },
  { week: "W8", accuracy: 89 },
];

const zoneActivityData = [
  { zone: "Pacific NW", incidents: 12 },
  { zone: "Caribbean", incidents: 9 },
  { zone: "SE Asia", incidents: 7 },
  { zone: "Arctic", incidents: 6 },
  { zone: "Australia", incidents: 5 },
  { zone: "Africa", incidents: 3 },
];

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

export function Analytics() {
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
            <BarChart3 className="w-8 h-8 text-[#00d4ff]" />
            <h2 className="text-gradient">Predictive Analytics</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Historical trends and forecasting intelligence powered by machine
            learning
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="space-y-8">
          {/* Risk Trend Over Time */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-white mb-1">Risk Zone Distribution</h4>
                <p className="text-sm text-gray-400">
                  6-month trend analysis
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-[#00d4ff]">Time Series Forecast</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#ff3366"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#ff3366"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorModerate"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#ffb800"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#ffb800"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#00ff87"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#00ff87"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="high"
                  name="High Risk"
                  stroke="#ff3366"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHigh)"
                />
                <Area
                  type="monotone"
                  dataKey="moderate"
                  name="Moderate"
                  stroke="#ffb800"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorModerate)"
                />
                <Area
                  type="monotone"
                  dataKey="safe"
                  name="Safe"
                  stroke="#00ff87"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSafe)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prediction Accuracy */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-white mb-1">Model Accuracy</h4>
                  <p className="text-sm text-gray-400">
                    AI prediction performance
                  </p>
                </div>
                <div className="glass rounded-full px-3 py-1 text-xs text-[#00ff87] font-semibold">
                  87% AVG
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={predictionAccuracyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis domain={[75, 95]} stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy %"
                    stroke="#00d4ff"
                    strokeWidth={3}
                    dot={{
                      fill: "#00d4ff",
                      r: 4,
                      strokeWidth: 2,
                      stroke: "#0a0e1a",
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#00d4ff",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Zone Activity */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-white mb-1">High-Risk Incidents</h4>
                  <p className="text-sm text-gray-400">By geographical zone</p>
                </div>
                <Activity className="w-5 h-5 text-[#ff3366]" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={zoneActivityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="zone" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="incidents"
                    name="Incidents"
                    fill="#ff3366"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* ML Model Insights */}
          <motion.div
            className="glass-card border-2 border-[#4d88ff]/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4d88ff]/20 to-[#00d4ff]/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#4d88ff]" />
              </div>
              <div>
                <h4 className="text-white">Machine Learning Insights</h4>
                <p className="text-sm text-gray-400">
                  Pattern recognition & forecasting
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-400">
                  Historical Data Points
                </div>
                <div className="text-3xl font-bold text-white">2.4M+</div>
                <div className="text-xs text-[#00d4ff]">
                  Training dataset size
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-400">Model Iterations</div>
                <div className="text-3xl font-bold text-white">847</div>
                <div className="text-xs text-[#4d88ff]">
                  Continuous learning cycles
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-400">Response Time</div>
                <div className="text-3xl font-bold text-white">1.2s</div>
                <div className="text-xs text-[#00ff87]">
                  Average prediction speed
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4d88ff] mt-2 pulse-glow"></div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Neural network architecture employs{" "}
                  <span className="text-[#4d88ff] font-semibold">
                    LSTM layers
                  </span>{" "}
                  for time-series forecasting, combined with{" "}
                  <span className="text-[#00d4ff] font-semibold">
                    ensemble methods
                  </span>{" "}
                  to achieve 87% average prediction accuracy across all risk
                  zones. Real-time data ingestion enables adaptive learning and
                  continuous model refinement.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Risk Escalation Patterns */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white">Quick Response</h4>
                <div className="w-8 h-8 rounded-lg bg-[#00ff87]/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#00ff87]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">92%</div>
              <p className="text-sm text-gray-400">
                Alerts issued within critical time window
              </p>
              <div className="mt-4 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00ff87] to-[#00d4ff]"
                  style={{ width: "92%", boxShadow: "0 0 8px #00ff87" }}
                />
              </div>
            </div>

            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white">False Positives</h4>
                <div className="w-8 h-8 rounded-lg bg-[#ffb800]/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#ffb800]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">4.2%</div>
              <p className="text-sm text-gray-400">
                Industry-leading accuracy with minimal errors
              </p>
              <div className="mt-4 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#ffb800] to-[#ff3366]"
                  style={{ width: "4.2%", boxShadow: "0 0 8px #ffb800" }}
                />
              </div>
            </div>

            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white">Coverage</h4>
                <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-[#00d4ff]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">247</div>
              <p className="text-sm text-gray-400">
                Global zones under continuous monitoring
              </p>
              <div className="mt-4 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#4d88ff]"
                  style={{ width: "100%", boxShadow: "0 0 8px #00d4ff" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
