import { motion } from "motion/react";
import { Shield, Brain, BarChart3, TrendingUp, Droplets, Thermometer, Wind, Eye } from "lucide-react";
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const featureImportance = [
  { feature: "Seismic Activity", importance: 94, color: "#ff3366" },
  { feature: "Temperature Anomaly", importance: 87, color: "#ffb800" },
  { feature: "Rainfall Patterns", importance: 82, color: "#00d4ff" },
  { feature: "Wind Speed", importance: 76, color: "#4d88ff" },
  { feature: "Humidity Levels", importance: 71, color: "#00ff87" },
  { feature: "Atmospheric Pressure", importance: 68, color: "#ff9800" },
  { feature: "Historical Data", importance: 85, color: "#00d4ff" },
  { feature: "Population Density", importance: 63, color: "#9c27b0" },
];

const predictionBreakdown = [
  {
    zone: "Pacific Northwest",
    confidence: 94,
    factors: [
      { name: "Seismic", value: 92 },
      { name: "Temperature", value: 78 },
      { name: "Rainfall", value: 65 },
      { name: "Wind", value: 58 },
      { name: "Historical", value: 88 },
    ],
  },
];

const modelMetrics = [
  { metric: "Precision", score: 91.2 },
  { metric: "Recall", score: 88.7 },
  { metric: "F1-Score", score: 89.9 },
  { metric: "Accuracy", score: 87.3 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card">
        <p className="text-sm text-white font-semibold mb-1">{payload[0].payload.feature}</p>
        <p className="text-xs text-gray-400">
          Importance: <span className="text-[#00d4ff]">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ExplainabilityPage() {
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
            <Shield className="w-10 h-10 text-[#00d4ff]" />
            <div>
              <h1 className="text-gradient">Risk Confidence & Explainability</h1>
              <p className="text-gray-400 text-lg mt-2">
                Transparent AI decision-making with explainable predictions (XAI)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {modelMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              className="glass-card border-2 border-[#00d4ff]/30 glow-cyan"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-sm text-gray-400 mb-2">{metric.metric}</div>
              <div className="text-3xl font-bold text-white mb-3">{metric.score}%</div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#4d88ff]"
                  style={{ boxShadow: "0 0 8px #00d4ff" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Importance */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="mb-6">
            <h3 className="text-white mb-1 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#00d4ff]" />
              Feature Importance Analysis
            </h3>
            <p className="text-sm text-gray-400">
              Key factors influencing risk predictions ranked by ML model
            </p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#9ca3af" domain={[0, 100]} />
              <YAxis dataKey="feature" type="category" stroke="#9ca3af" width={150} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                {featureImportance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Factor Details */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff3366]/20 to-[#ff3366]/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-[#ff3366]" />
            </div>
            <h4 className="text-white mb-2">Seismic Activity</h4>
            <div className="text-2xl font-bold text-[#ff3366] mb-2">94%</div>
            <p className="text-sm text-gray-400 mb-3">
              Tectonic movements and ground vibration patterns
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="glass px-2 py-1 rounded text-gray-300">Real-time</span>
              <span className="glass px-2 py-1 rounded text-gray-300">High Priority</span>
            </div>
          </div>

          <div className="glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffb800]/20 to-[#ffb800]/10 flex items-center justify-center mb-4">
              <Thermometer className="w-6 h-6 text-[#ffb800]" />
            </div>
            <h4 className="text-white mb-2">Temperature</h4>
            <div className="text-2xl font-bold text-[#ffb800] mb-2">87%</div>
            <p className="text-sm text-gray-400 mb-3">
              Anomalous temperature variations and heat patterns
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="glass px-2 py-1 rounded text-gray-300">Hourly</span>
              <span className="glass px-2 py-1 rounded text-gray-300">Critical</span>
            </div>
          </div>

          <div className="glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00d4ff]/10 flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6 text-[#00d4ff]" />
            </div>
            <h4 className="text-white mb-2">Rainfall</h4>
            <div className="text-2xl font-bold text-[#00d4ff] mb-2">82%</div>
            <p className="text-sm text-gray-400 mb-3">
              Precipitation levels and flooding risk indicators
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="glass px-2 py-1 rounded text-gray-300">Daily</span>
              <span className="glass px-2 py-1 rounded text-gray-300">Moderate</span>
            </div>
          </div>

          <div className="glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4d88ff]/20 to-[#4d88ff]/10 flex items-center justify-center mb-4">
              <Wind className="w-6 h-6 text-[#4d88ff]" />
            </div>
            <h4 className="text-white mb-2">Wind Speed</h4>
            <div className="text-2xl font-bold text-[#4d88ff] mb-2">76%</div>
            <p className="text-sm text-gray-400 mb-3">
              Wind velocity patterns and storm formation
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="glass px-2 py-1 rounded text-gray-300">Real-time</span>
              <span className="glass px-2 py-1 rounded text-gray-300">Moderate</span>
            </div>
          </div>
        </motion.div>

        {/* Prediction Breakdown Example */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Radar Chart */}
          <div className="glass-card">
            <div className="mb-6">
              <h3 className="text-white mb-1 flex items-center gap-2">
                <Eye className="w-6 h-6 text-[#ff3366]" />
                Multi-Factor Analysis
              </h3>
              <p className="text-sm text-gray-400">
                Pacific Northwest Zone - Risk Factor Breakdown
              </p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={predictionBreakdown[0].factors}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="name" stroke="#9ca3af" />
                <PolarRadiusAxis stroke="#9ca3af" domain={[0, 100]} />
                <Radar
                  name="Factor Contribution"
                  dataKey="value"
                  stroke="#ff3366"
                  fill="#ff3366"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 glass rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Overall Confidence</div>
              <div className="text-3xl font-bold text-[#ff3366] mb-2">94%</div>
              <p className="text-xs text-gray-400">
                High confidence prediction based on multi-factor correlation
              </p>
            </div>
          </div>

          {/* Explanation Panel */}
          <div className="glass-card">
            <div className="mb-6">
              <h3 className="text-white mb-1 flex items-center gap-2">
                <Brain className="w-6 h-6 text-[#00d4ff]" />
                AI Decision Explanation
              </h3>
              <p className="text-sm text-gray-400">
                How the model arrived at this prediction
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 glass rounded-lg border-l-4 border-[#ff3366]">
                <h4 className="text-white font-semibold mb-2">Primary Factor</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="text-[#ff3366] font-semibold">Seismic activity</span> readings show{" "}
                  <span className="text-white font-semibold">3.2x</span> increase over baseline. Historical correlation with major events: <span className="text-[#ff3366] font-semibold">92%</span>
                </p>
              </div>

              <div className="p-4 glass rounded-lg border-l-4 border-[#ffb800]">
                <h4 className="text-white font-semibold mb-2">Contributing Factors</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="text-[#ffb800] font-semibold">Temperature anomalies</span> detected. Current deviation: <span className="text-white font-semibold">+4.7°C</span> from seasonal average.
                </p>
              </div>

              <div className="p-4 glass rounded-lg border-l-4 border-[#00d4ff]">
                <h4 className="text-white font-semibold mb-2">Historical Context</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Pattern matches <span className="text-[#00d4ff] font-semibold">12 historical events</span> in this zone. Average lead time: <span className="text-white font-semibold">48-72 hours</span>
                </p>
              </div>

              <div className="p-4 glass rounded-lg border-l-4 border-[#00ff87]">
                <h4 className="text-white font-semibold mb-2">Model Reasoning</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Ensemble of <span className="text-[#00ff87] font-semibold">5 ML models</span> (LSTM, Random Forest, XGBoost, Neural Network, SVM) reached consensus with <span className="text-white font-semibold">94% agreement</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transparency Statement */}
        <motion.div
          className="glass-card border-2 border-[#00d4ff]/30 glow-cyan"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-[#00d4ff] mt-1" />
            <div>
              <h4 className="text-white mb-2">Explainable AI Commitment</h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                ProneZone Predictor is built on principles of <span className="text-[#00d4ff] font-semibold">transparent AI</span> and <span className="text-[#00d4ff] font-semibold">explainable decision-making</span>. Every prediction is traceable to specific environmental factors and historical patterns. Our XAI framework ensures stakeholders understand not just what the model predicts, but why.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 glass rounded-lg">
                  <div className="text-[#00d4ff] font-semibold mb-1">Interpretable</div>
                  <div className="text-xs text-gray-400">Feature-level explanations</div>
                </div>
                <div className="p-3 glass rounded-lg">
                  <div className="text-[#00d4ff] font-semibold mb-1">Auditable</div>
                  <div className="text-xs text-gray-400">Full decision trail logging</div>
                </div>
                <div className="p-3 glass rounded-lg">
                  <div className="text-[#00d4ff] font-semibold mb-1">Trustworthy</div>
                  <div className="text-xs text-gray-400">Validated by domain experts</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
