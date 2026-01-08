import { motion } from "motion/react";
import { FileText, Download, Calendar, TrendingUp, FileBarChart, FileSpreadsheet, Eye } from "lucide-react";

const reports = [
  {
    title: "Monthly Risk Assessment Report",
    date: "January 2026",
    type: "Executive Summary",
    pages: 24,
    size: "3.2 MB",
    status: "Ready",
    highlights: ["23 high-risk zones identified", "87.3% prediction accuracy", "12% increase in moderate zones"],
  },
  {
    title: "Zone-Wise Prediction Analytics",
    date: "December 2025",
    type: "Technical Analysis",
    pages: 45,
    size: "5.8 MB",
    status: "Ready",
    highlights: ["Detailed zone breakdowns", "ML model performance metrics", "Feature importance analysis"],
  },
  {
    title: "Q4 2025 Risk Trends",
    date: "Q4 2025",
    type: "Quarterly Report",
    pages: 38,
    size: "4.5 MB",
    status: "Ready",
    highlights: ["Quarterly risk escalation patterns", "Seasonal trend analysis", "Forecasting accuracy"],
  },
  {
    title: "Historical Event Validation",
    date: "2025 Annual",
    type: "Validation Report",
    pages: 52,
    size: "6.1 MB",
    status: "Ready",
    highlights: ["Event prediction accuracy", "False positive analysis", "Model refinement insights"],
  },
];

const insights = [
  {
    title: "Seismic Activity Surge",
    zone: "Pacific Northwest",
    severity: "high",
    insight: "Detected 3.2x increase in seismic readings over baseline. Historical correlation suggests major event probability within 72 hours.",
    confidence: 94,
  },
  {
    title: "Temperature Anomalies",
    zone: "Arctic Circle",
    severity: "moderate",
    insight: "Average temperature deviation of +4.7°C from seasonal norms. Ice melting acceleration detected.",
    confidence: 82,
  },
  {
    title: "Hurricane Formation",
    zone: "Caribbean Basin",
    severity: "high",
    insight: "Category 3-4 hurricane development confirmed. Wind speeds reaching critical thresholds.",
    confidence: 91,
  },
  {
    title: "Monsoon Pattern Shift",
    zone: "Southeast Asia",
    severity: "moderate",
    insight: "Unusual monsoon behavior observed. Moderate flooding risk elevated in coastal regions.",
    confidence: 78,
  },
];

export function ReportsPage() {
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
            <FileText className="w-10 h-10 text-[#00d4ff]" />
            <div>
              <h1 className="text-gradient">Reports & Insights</h1>
              <p className="text-gray-400 text-lg mt-2">
                Downloadable analytics and AI-generated intelligence summaries
              </p>
            </div>
          </div>
        </motion.div>

        {/* Report Categories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="glass-card border-2 border-[#00d4ff]/50 glow-cyan cursor-pointer">
            <FileText className="w-8 h-8 text-[#00d4ff] mb-3" />
            <h4 className="text-white mb-1">Executive</h4>
            <p className="text-xs text-gray-400">High-level summaries</p>
          </div>
          <div className="glass-card cursor-pointer hover:border-[#00d4ff]/30">
            <FileBarChart className="w-8 h-8 text-gray-400 mb-3" />
            <h4 className="text-white mb-1">Technical</h4>
            <p className="text-xs text-gray-400">Detailed analytics</p>
          </div>
          <div className="glass-card cursor-pointer hover:border-[#00d4ff]/30">
            <Calendar className="w-8 h-8 text-gray-400 mb-3" />
            <h4 className="text-white mb-1">Periodic</h4>
            <p className="text-xs text-gray-400">Weekly/Monthly</p>
          </div>
          <div className="glass-card cursor-pointer hover:border-[#00d4ff]/30">
            <FileSpreadsheet className="w-8 h-8 text-gray-400 mb-3" />
            <h4 className="text-white mb-1">Data Export</h4>
            <p className="text-xs text-gray-400">Raw data files</p>
          </div>
        </motion.div>

        {/* Available Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#4d88ff]" />
            Available Reports
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {reports.map((report, index) => (
              <motion.div
                key={index}
                className="glass-card border-2 border-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:glow-cyan transition-all cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-white mb-2">{report.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </span>
                      <span className="glass px-2 py-1 rounded text-xs">
                        {report.type}
                      </span>
                    </div>
                  </div>
                  <div className="glass px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-[#00ff87]">
                      {report.status}
                    </span>
                  </div>
                </div>

                {/* Report Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Pages</div>
                    <div className="text-white font-semibold">{report.pages}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">File Size</div>
                    <div className="text-white font-semibold">{report.size}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-2">Key Highlights</div>
                  <div className="space-y-1">
                    {report.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-[#00d4ff]">•</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 glass-card hover:border-[#00d4ff]/50 py-2 flex items-center justify-center gap-2 text-sm font-semibold text-[#00d4ff]">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI-Generated Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#ff3366]" />
            AI-Generated Critical Insights
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {insights.map((insight, index) => {
              const isHigh = insight.severity === "high";
              const borderColor = isHigh ? "border-[#ff3366]" : "border-[#ffb800]";
              const textColor = isHigh ? "text-[#ff3366]" : "text-[#ffb800]";
              const bgGradient = isHigh
                ? "from-[#ff3366]/10 to-[#ff3366]/5"
                : "from-[#ffb800]/10 to-[#ffb800]/5";

              return (
                <motion.div
                  key={index}
                  className={`glass-card border-l-4 ${borderColor}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <FileText className={`w-6 h-6 ${textColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-semibold mb-1">
                            {insight.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">Zone:</span>
                            <span className="text-white">{insight.zone}</span>
                            <span
                              className={`glass px-2 py-0.5 rounded text-xs font-semibold uppercase ${textColor}`}
                            >
                              {insight.severity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${textColor}`}>
                            {insight.confidence}%
                          </div>
                          <div className="text-xs text-gray-400">Confidence</div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-3">
                        {insight.insight}
                      </p>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full`}
                          style={{
                            background: isHigh ? "#ff3366" : "#ffb800",
                            boxShadow: `0 0 8px ${isHigh ? "#ff3366" : "#ffb800"}`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.confidence}%` }}
                          transition={{ delay: 0.9 + index * 0.1, duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Custom Report Generator */}
        <motion.div
          className="glass-card mt-12 border-2 border-[#00d4ff]/30 glow-cyan"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white mb-2 flex items-center gap-2">
                <FileBarChart className="w-6 h-6 text-[#00d4ff]" />
                Custom Report Generator
              </h4>
              <p className="text-sm text-gray-400">
                Create tailored reports based on specific zones, time periods, and metrics
              </p>
            </div>
            <button className="glass-card hover:glow-cyan px-6 py-3 text-[#00d4ff] font-semibold flex items-center gap-2 group">
              <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Generate Report
            </button>
          </div>
        </motion.div>

        {/* Export Options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="glass-card text-center cursor-pointer hover:border-[#00d4ff]/30 transition-all">
            <FileText className="w-8 h-8 text-[#00d4ff] mx-auto mb-3" />
            <h4 className="text-white mb-1">PDF Export</h4>
            <p className="text-xs text-gray-400">Professional reports</p>
          </div>
          <div className="glass-card text-center cursor-pointer hover:border-[#00d4ff]/30 transition-all">
            <FileSpreadsheet className="w-8 h-8 text-[#00ff87] mx-auto mb-3" />
            <h4 className="text-white mb-1">CSV Export</h4>
            <p className="text-xs text-gray-400">Raw data analysis</p>
          </div>
          <div className="glass-card text-center cursor-pointer hover:border-[#00d4ff]/30 transition-all">
            <FileBarChart className="w-8 h-8 text-[#ffb800] mx-auto mb-3" />
            <h4 className="text-white mb-1">Excel Export</h4>
            <p className="text-xs text-gray-400">Detailed spreadsheets</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
