import { motion } from "motion/react";
import { Users, Shield, Eye, Lock, Settings, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

const permissionMatrix = [
  { feature: "Risk Dashboard", admin: true, analyst: true, viewer: true },
  { feature: "Time Forecasting", admin: true, analyst: true, viewer: true },
  { feature: "Explainability AI", admin: true, analyst: true, viewer: false },
  { feature: "Geo-Risk Map", admin: true, analyst: true, viewer: true },
  { feature: "Zone Comparison", admin: true, analyst: true, viewer: false },
  { feature: "Alert System", admin: true, analyst: true, viewer: true },
  { feature: "Historical Playback", admin: true, analyst: true, viewer: false },
  { feature: "Reports & Export", admin: true, analyst: true, viewer: false },
  { feature: "User Management", admin: true, analyst: false, viewer: false },
  { feature: "System Settings", admin: true, analyst: false, viewer: false },
];

export function AccessPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getRoles(),
      api.getActivityLog(),
    ]).then(([r, a]) => {
      setRoles(r);
      setActivityLog(a);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load access control data:", err);
      setLoading(false);
    });
  }, []);

  const getRoleIcon = (name: string) => {
    switch (name) {
      case "Administrator":
        return Shield;
      case "Analyst":
        return Eye;
      case "Viewer":
        return Users;
      default:
        return Users;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00d4ff] text-2xl font-bold animate-pulse">
          Loading Access Control Data...
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
            <Users className="w-10 h-10 text-[#00d4ff]" />
            <div>
              <h1 className="text-gradient">Role-Based Access Control</h1>
              <p className="text-gray-400 text-lg mt-2">
                Enterprise-grade security and permission management
              </p>
            </div>
          </div>
        </motion.div>

        {/* Role Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {roles.map((role, index) => {
            const Icon = getRoleIcon(role.name);
            return (
              <motion.div
                key={index}
                className="glass-card border-2"
                style={{ borderColor: `${role.color}30` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                {/* Role Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${role.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: role.color }} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{role.users}</div>
                    <div className="text-xs text-gray-400">Active Users</div>
                  </div>
                </div>

                {/* Role Info */}
                <div className="mb-6">
                  <h3 className="text-white text-xl mb-2">{role.name}</h3>
                  <span
                    className="text-xs font-semibold uppercase px-3 py-1 rounded-full"
                    style={{
                      color: role.color,
                      background: `${role.color}20`,
                    }}
                  >
                    {role.level} access
                  </span>
                </div>

                {/* Permissions */}
                <div>
                  <div className="text-sm text-gray-400 mb-3">Permissions</div>
                  <div className="space-y-2">
                    {role.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: role.color }}
                        />
                        <span>{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Permission Matrix */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#00d4ff]" />
            Feature Access Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-semibold">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 text-[#ff3366] text-sm font-semibold">
                    Administrator
                  </th>
                  <th className="text-center py-3 px-4 text-[#00d4ff] text-sm font-semibold">
                    Analyst
                  </th>
                  <th className="text-center py-3 px-4 text-[#00ff87] text-sm font-semibold">
                    Viewer
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissionMatrix.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                  >
                    <td className="py-3 px-4 text-white">{item.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {item.admin ? (
                        <CheckCircle className="w-5 h-5 text-[#ff3366] mx-auto" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.analyst ? (
                        <CheckCircle className="w-5 h-5 text-[#00d4ff] mx-auto" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.viewer ? (
                        <CheckCircle className="w-5 h-5 text-[#00ff87] mx-auto" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-600 mx-auto" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="text-white mb-6 flex items-center gap-2">
            <Eye className="w-6 h-6 text-[#4d88ff]" />
            Recent User Activity
          </h3>
          <div className="space-y-3">
            {activityLog.map((log, index) => {
              const roleColor =
                log.role === "Administrator"
                  ? "#ff3366"
                  : log.role === "Analyst"
                  ? "#00d4ff"
                  : "#00ff87";

              return (
                <motion.div
                  key={index}
                  className="glass-card flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: `${roleColor}20` }}
                    >
                      <Users className="w-5 h-5" style={{ color: roleColor }} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{log.user}</div>
                      <div className="text-sm text-gray-400">{log.action}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-xs font-semibold uppercase px-3 py-1 rounded-full mb-1"
                      style={{
                        color: roleColor,
                        background: `${roleColor}20`,
                      }}
                    >
                      {log.role}
                    </div>
                    <div className="text-xs text-gray-500">{log.time}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="glass-card border-2 border-[#00ff87]/30 glow-safe"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#00ff87] mt-1" />
              <div>
                <h4 className="text-white mb-2">Security Protocols</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00ff87] flex-shrink-0 mt-0.5" />
                    End-to-end encryption for all data transmissions
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00ff87] flex-shrink-0 mt-0.5" />
                    Multi-factor authentication for administrative access
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00ff87] flex-shrink-0 mt-0.5" />
                    Automated session timeout and activity logging
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00ff87] flex-shrink-0 mt-0.5" />
                    Role-based data segregation and access control
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card border-2 border-[#00d4ff]/30 glow-cyan"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <div className="flex items-start gap-3">
              <Settings className="w-6 h-6 text-[#00d4ff] mt-1" />
              <div>
                <h4 className="text-white mb-2">Access Management</h4>
                <div className="space-y-3">
                  <button className="w-full glass-card hover:border-[#00d4ff]/50 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-[#00d4ff]">
                    <Users className="w-4 h-4" />
                    Manage Users
                  </button>
                  <button className="w-full glass-card hover:border-[#00d4ff]/50 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-gray-300">
                    <Shield className="w-4 h-4" />
                    Configure Roles
                  </button>
                  <button className="w-full glass-card hover:border-[#00d4ff]/50 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-gray-300">
                    <Eye className="w-4 h-4" />
                    View Audit Log
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
