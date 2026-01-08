import { Brain, Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-6 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff]/30 to-[#4d88ff]/30 flex items-center justify-center glow-cyan">
                <Brain className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <div className="text-xl font-bold text-gradient">
                ProneZone Predictor
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Next-generation AI-powered risk intelligence platform delivering
              real-time predictions and early warning systems for environmental
              and climatic disaster-prone zones.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:glow-cyan transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:glow-cyan transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:glow-cyan transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:glow-cyan transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  Risk Analytics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  Alert System
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  Research Papers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2026 ProneZone Predictor. Powered by AI & Machine Learning.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#00d4ff] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors">
              Data Security
            </a>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-8 glass rounded-lg px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff87] pulse-glow"></div>
            <span className="text-sm text-gray-300">
              All Systems Operational
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Last updated: 2 minutes ago
          </div>
        </div>
      </div>
    </footer>
  );
}
