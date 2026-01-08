import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Bell,
  Clock,
  MapPin,
  X,
  Info,
  TrendingUp,
} from "lucide-react";

interface Alert {
  id: string;
  zone: string;
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  confidence: number;
}

const mockAlerts: Alert[] = [
  {
    id: "a1",
    zone: "Pacific Northwest",
    severity: "critical",
    message:
      "Seismic activity detected. Earthquake probability 94% within 48-72 hours.",
    timestamp: "2 min ago",
    confidence: 94,
  },
  {
    id: "a2",
    zone: "Caribbean Basin",
    severity: "critical",
    message:
      "Hurricane formation confirmed. Category 3-4 expected within 24-48 hours.",
    timestamp: "5 min ago",
    confidence: 91,
  },
  {
    id: "a3",
    zone: "Arctic Circle",
    severity: "warning",
    message:
      "Temperature anomaly detected. Ice melting accelerating beyond forecast.",
    timestamp: "18 min ago",
    confidence: 82,
  },
  {
    id: "a4",
    zone: "Australian Outback",
    severity: "warning",
    message:
      "Extreme drought conditions. Wildfire risk elevated in next 72-96 hours.",
    timestamp: "32 min ago",
    confidence: 76,
  },
  {
    id: "a5",
    zone: "Southeast Asia Coastal",
    severity: "info",
    message:
      "Monsoon pattern shift observed. Moderate flooding risk in 5-7 days.",
    timestamp: "1 hour ago",
    confidence: 78,
  },
];

const getSeverityStyle = (severity: string) => {
  switch (severity) {
    case "critical":
      return {
        bg: "from-[#ff3366]/20 to-[#ff3366]/5",
        border: "border-[#ff3366]/50",
        text: "text-[#ff3366]",
        icon: AlertTriangle,
        glow: "glow-high-risk",
      };
    case "warning":
      return {
        bg: "from-[#ffb800]/20 to-[#ffb800]/5",
        border: "border-[#ffb800]/50",
        text: "text-[#ffb800]",
        icon: Bell,
        glow: "glow-moderate",
      };
    case "info":
      return {
        bg: "from-[#00d4ff]/20 to-[#00d4ff]/5",
        border: "border-[#00d4ff]/50",
        text: "text-[#00d4ff]",
        icon: Info,
        glow: "glow-cyan",
      };
    default:
      return {
        bg: "from-white/20 to-white/5",
        border: "border-white/50",
        text: "text-white",
        icon: Bell,
        glow: "",
      };
  }
};

export function AlertSystem() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilter === "all") return true;
    return alert.severity === activeFilter;
  });

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const criticalCount = alerts.filter((a) => a.severity === "critical").length;
  const warningCount = alerts.filter((a) => a.severity === "warning").length;

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
            <Bell className="w-8 h-8 text-[#ff3366]" />
            <h2 className="text-gradient-risk">Alert Center</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Real-time notifications for emerging threats and risk escalation
          </p>
        </motion.div>

        {/* Alert Statistics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card border-2 border-[#ff3366]/30 glow-high-risk">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Critical Alerts</span>
              <AlertTriangle className="w-5 h-5 text-[#ff3366]" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {criticalCount}
            </div>
            <div className="text-xs text-[#ff3366] font-semibold uppercase pulse-glow">
              Immediate Action Required
            </div>
          </div>

          <div className="glass-card border-2 border-[#ffb800]/30 glow-moderate">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Warnings</span>
              <Bell className="w-5 h-5 text-[#ffb800]" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {warningCount}
            </div>
            <div className="text-xs text-[#ffb800]">Monitoring Required</div>
          </div>

          <div className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Avg Response</span>
              <Clock className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">1.8m</div>
            <div className="text-xs text-[#00d4ff]">Alert to Action Time</div>
          </div>

          <div className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Total Today</span>
              <TrendingUp className="w-5 h-5 text-[#00ff87]" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {alerts.length}
            </div>
            <div className="text-xs text-gray-400">Active Notifications</div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setActiveFilter("all")}
            className={`glass-card px-6 py-3 text-sm font-semibold transition-all ${
              activeFilter === "all"
                ? "border-2 border-[#00d4ff]/50 glow-cyan text-[#00d4ff]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setActiveFilter("critical")}
            className={`glass-card px-6 py-3 text-sm font-semibold transition-all ${
              activeFilter === "critical"
                ? "border-2 border-[#ff3366]/50 glow-high-risk text-[#ff3366]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Critical ({criticalCount})
          </button>
          <button
            onClick={() => setActiveFilter("warning")}
            className={`glass-card px-6 py-3 text-sm font-semibold transition-all ${
              activeFilter === "warning"
                ? "border-2 border-[#ffb800]/50 glow-moderate text-[#ffb800]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Warning ({warningCount})
          </button>
          <button
            onClick={() => setActiveFilter("info")}
            className={`glass-card px-6 py-3 text-sm font-semibold transition-all ${
              activeFilter === "info"
                ? "border-2 border-[#00d4ff]/50 glow-cyan text-[#00d4ff]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Info
          </button>
        </motion.div>

        {/* Alert List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredAlerts.map((alert, index) => {
              const style = getSeverityStyle(alert.severity);
              const IconComponent = style.icon;

              return (
                <motion.div
                  key={alert.id}
                  className={`glass-card border-2 ${style.border} ${style.glow} relative overflow-hidden`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  layout
                >
                  {/* Severity Indicator Bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{
                      background: `linear-gradient(to bottom, ${
                        alert.severity === "critical"
                          ? "#ff3366"
                          : alert.severity === "warning"
                          ? "#ffb800"
                          : "#00d4ff"
                      }, transparent)`,
                    }}
                  />

                  <div className="flex items-start gap-4 pl-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className={`w-6 h-6 ${style.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-white font-semibold">
                            {alert.zone}
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${style.text} bg-gradient-to-r ${style.bg}`}
                          >
                            {alert.severity}
                          </span>
                        </div>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {alert.message}
                      </p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>Zone: {alert.zone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Confidence:</span>
                          <span className={`font-semibold ${style.text}`}>
                            {alert.confidence}%
                          </span>
                        </div>
                      </div>

                      {/* Confidence Bar */}
                      <div className="mt-3 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${alert.confidence}%` }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 0.8 }}
                          style={{
                            background: `linear-gradient(to right, ${
                              alert.severity === "critical"
                                ? "#ff3366"
                                : alert.severity === "warning"
                                ? "#ffb800"
                                : "#00d4ff"
                            }, ${
                              alert.severity === "critical"
                                ? "#ff1744"
                                : alert.severity === "warning"
                                ? "#ff9800"
                                : "#4d88ff"
                            })`,
                            boxShadow: `0 0 8px ${
                              alert.severity === "critical"
                                ? "#ff3366"
                                : alert.severity === "warning"
                                ? "#ffb800"
                                : "#00d4ff"
                            }`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredAlerts.length === 0 && (
            <motion.div
              className="glass-card text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400">
                No {activeFilter !== "all" && activeFilter} alerts at this time
              </p>
            </motion.div>
          )}
        </div>

        {/* Action Panel */}
        <motion.div
          className="glass-card mt-12 border-2 border-[#00d4ff]/30 glow-cyan"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white mb-2">Alert Notification Settings</h4>
              <p className="text-sm text-gray-400">
                Configure your alert preferences and notification channels
              </p>
            </div>
            <button className="glass-card hover:glow-cyan px-6 py-3 text-[#00d4ff] font-semibold flex items-center gap-2 group">
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Configure Alerts
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
