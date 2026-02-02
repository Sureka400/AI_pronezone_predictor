import { motion } from "motion/react";
import { Clock, Play, Pause, SkipBack, SkipForward, Calendar, TrendingUp, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { api } from "../services/api";

export function HistoryPage() {
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [historicalEvents, setHistoricalEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      api.getHistoricalData(),
      api.getHistoricalEvents(),
    ]).then(([data, events]) => {
      setHistoricalData(data);
      setHistoricalEvents(events);
      setCurrentIndex(data.length - 1);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00d4ff] text-2xl font-bold animate-pulse">
          Loading Historical Data...
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < historicalData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentData = historicalData.slice(0, currentIndex + 1);
  const selectedPeriod = historicalData[currentIndex];

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
            <Clock className="w-10 h-10 text-[#00d4ff]" />
            <div>
              <h1 className="text-gradient">Historical Risk Playback</h1>
              <p className="text-gray-400 text-lg mt-2">
                Time-travel analytics and pattern evolution analysis
              </p>
            </div>
          </div>
        </motion.div>

        {/* Playback Controls */}
        <motion.div
          className="glass-card mb-12 border-2 border-[#00d4ff]/30 glow-cyan"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white mb-1 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#00d4ff]" />
                Time Period Selection
              </h3>
              <p className="text-sm text-gray-400">
                Navigate through historical risk data
              </p>
            </div>
            <div className="glass rounded-full px-4 py-2">
              <span className="text-[#00d4ff] font-semibold">
                {selectedPeriod.date}
              </span>
            </div>
          </div>

          {/* Timeline Slider */}
          <div className="mb-6">
            <input
              type="range"
              min="0"
              max={historicalData.length - 1}
              value={currentIndex}
              onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #00d4ff ${
                  (currentIndex / (historicalData.length - 1)) * 100
                }%, rgba(255,255,255,0.1) ${
                  (currentIndex / (historicalData.length - 1)) * 100
                }%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{historicalData[0].date}</span>
              <span>{historicalData[historicalData.length - 1].date}</span>
            </div>
          </div>

          {/* Playback Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentIndex(0)}
              className="glass-card p-3 hover:border-[#00d4ff]/50 transition-all"
              disabled={currentIndex === 0}
            >
              <SkipBack className="w-5 h-5 text-[#00d4ff]" />
            </button>
            <button
              onClick={handlePrevious}
              className="glass-card p-3 hover:border-[#00d4ff]/50 transition-all"
              disabled={currentIndex === 0}
            >
              <Calendar className="w-5 h-5 text-[#00d4ff]" />
            </button>
            <button
              onClick={handlePlay}
              className="glass-card p-4 hover:glow-cyan border-2 border-[#00d4ff]/50 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-[#00d4ff]" />
              ) : (
                <Play className="w-6 h-6 text-[#00d4ff]" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="glass-card p-3 hover:border-[#00d4ff]/50 transition-all"
              disabled={currentIndex === historicalData.length - 1}
            >
              <Calendar className="w-5 h-5 text-[#00d4ff]" />
            </button>
            <button
              onClick={() => setCurrentIndex(historicalData.length - 1)}
              className="glass-card p-3 hover:border-[#00d4ff]/50 transition-all"
              disabled={currentIndex === historicalData.length - 1}
            >
              <SkipForward className="w-5 h-5 text-[#00d4ff]" />
            </button>
          </div>
        </motion.div>

        {/* Current Period Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="glass-card border-2 border-[#ff3366]/30">
            <div className="text-sm text-gray-400 mb-2">Period Risk Index</div>
            <div className="text-4xl font-bold text-[#ff3366] mb-3">
              {selectedPeriod.risk}
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#ff3366]"
                initial={{ width: 0 }}
                animate={{ width: `${selectedPeriod.risk}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="glass-card border-2 border-[#ffb800]/30">
            <div className="text-sm text-gray-400 mb-2">Incidents Recorded</div>
            <div className="text-4xl font-bold text-[#ffb800] mb-3">
              {selectedPeriod.incidents}
            </div>
            <div className="text-xs text-gray-400">
              Events during this period
            </div>
          </div>

          <div className="glass-card border-2 border-[#00d4ff]/30">
            <div className="text-sm text-gray-400 mb-2">Time Period</div>
            <div className="text-4xl font-bold text-[#00d4ff] mb-3">
              {currentIndex + 1}/{historicalData.length}
            </div>
            <div className="text-xs text-gray-400">
              {selectedPeriod.date}
            </div>
          </div>
        </motion.div>

        {/* Historical Trend Chart */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#4d88ff]" />
            Risk Evolution Visualization
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={currentData}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3366" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff3366" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffb800" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ffb800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  background: "rgba(10, 14, 26, 0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="risk"
                name="Risk Index"
                stroke="#ff3366"
                strokeWidth={2}
                fill="url(#riskGradient)"
              />
              <Area
                type="monotone"
                dataKey="incidents"
                name="Incidents"
                stroke="#ffb800"
                strokeWidth={2}
                fill="url(#incidentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Historical Events Log */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00d4ff]" />
            Historical Event Validation
          </h3>
          <div className="space-y-4">
            {historicalEvents.map((event, index) => {
              const isHigh = event.riskLevel === "high";
              const borderColor = isHigh ? "border-[#ff3366]" : "border-[#ffb800]";
              const textColor = isHigh ? "text-[#ff3366]" : "text-[#ffb800]";

              return (
                <motion.div
                  key={index}
                  className={`glass-card border-l-4 ${borderColor}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-[250px]">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className={`w-4 h-4 ${textColor}`} />
                        <span className="text-sm text-gray-400">{event.date}</span>
                      </div>
                      <h4 className="text-white font-semibold mb-1">{event.event}</h4>
                      <p className="text-sm text-gray-400">{event.zone}</p>
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Prediction</div>
                        <div className={`text-sm font-semibold ${textColor}`}>
                          {event.actualVsPredicted}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Impact</div>
                        <div className="text-sm font-semibold text-white">
                          {event.impact}
                        </div>
                      </div>
                    </div>

                    <div className="glass px-3 py-1 rounded-full">
                      <span className={`text-xs font-semibold ${textColor} uppercase`}>
                        {event.riskLevel}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Model Performance Insights */}
        <motion.div
          className="glass-card mt-12 border-2 border-[#00ff87]/30 glow-safe"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <Activity className="w-6 h-6 text-[#00ff87] mt-1" />
            <div>
              <h4 className="text-white mb-2">Historical Prediction Performance</h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Analysis of past 13 months shows model accuracy of{" "}
                <span className="text-[#00ff87] font-semibold">87.3%</span> in
                predicting high-risk events. All major incidents were predicted with{" "}
                <span className="text-[#00d4ff] font-semibold">72-hour advance warning</span>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 glass rounded-lg">
                  <div className="text-[#00ff87] font-semibold mb-1">100%</div>
                  <div className="text-xs text-gray-400">Major events predicted</div>
                </div>
                <div className="p-3 glass rounded-lg">
                  <div className="text-[#00d4ff] font-semibold mb-1">4.2%</div>
                  <div className="text-xs text-gray-400">False positive rate</div>
                </div>
                <div className="p-3 glass rounded-lg">
                  <div className="text-[#ffb800] font-semibold mb-1">72hrs</div>
                  <div className="text-xs text-gray-400">Avg. warning time</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
