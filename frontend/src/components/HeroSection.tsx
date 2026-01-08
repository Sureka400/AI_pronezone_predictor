import { motion } from "motion/react";
import { Brain, Shield, TrendingUp, AlertTriangle } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)",
            top: "10%",
            left: "10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 51, 102, 0.12) 0%, transparent 70%)",
            bottom: "15%",
            right: "15%",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Main Hero Content */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Subtitle Badge */}
          <motion.div
            className="inline-flex items-center gap-2 glass rounded-full px-6 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00d4ff] pulse-glow"></div>
            <span className="text-sm tracking-wider text-[#00d4ff]">
              NEXT-GENERATION AI RISK INTELLIGENCE
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="mb-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-gradient">ProneZone</span>
            <br />
            <span className="text-white">Predictor</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            AI-Driven Risk Prediction & Early Warning Intelligence.
            <br />
            Forecasting environmental and climatic disaster-prone zones with
            unprecedented accuracy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button className="glass-card hover:glow-cyan px-8 py-4 text-[#00d4ff] font-semibold flex items-center gap-2 group">
              <Brain className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore Dashboard
            </button>
            <button className="glass-card px-8 py-4 text-gray-200 font-semibold hover:text-white">
              View Analytics
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <motion.div
            className="glass-card floating"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#4d88ff]/20 flex items-center justify-center mb-4 glow-cyan">
              <Brain className="w-6 h-6 text-[#00d4ff]" />
            </div>
            <h4 className="mb-2">AI Prediction</h4>
            <p className="text-sm text-gray-400">
              Machine learning models analyze patterns to forecast risk zones
            </p>
          </motion.div>

          <motion.div
            className="glass-card floating"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff87]/20 to-[#00d4ff]/20 flex items-center justify-center mb-4 glow-safe">
              <Shield className="w-6 h-6 text-[#00ff87]" />
            </div>
            <h4 className="mb-2">Early Warning</h4>
            <p className="text-sm text-gray-400">
              Real-time alerts for emerging threats and risk escalation
            </p>
          </motion.div>

          <motion.div
            className="glass-card floating"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ animationDelay: "1s" }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4d88ff]/20 to-[#00d4ff]/20 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-[#4d88ff]" />
            </div>
            <h4 className="mb-2">Trend Analysis</h4>
            <p className="text-sm text-gray-400">
              Historical data patterns reveal zone-wise risk evolution
            </p>
          </motion.div>

          <motion.div
            className="glass-card floating"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{ animationDelay: "1.5s" }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffb800]/20 to-[#ff3366]/20 flex items-center justify-center mb-4 glow-moderate">
              <AlertTriangle className="w-6 h-6 text-[#ffb800]" />
            </div>
            <h4 className="mb-2">Zone Monitoring</h4>
            <p className="text-sm text-gray-400">
              Continuous surveillance of vulnerable environmental regions
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
