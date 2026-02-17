const API_BASE_URL = 'http://127.0.0.1:8001/api/v1';

export const api = {
  getRiskZones: async () => {
    const response = await fetch(`${API_BASE_URL}/risk-zones`);
    return response.json();
  },
  getForecast24h: async () => {
    const response = await fetch(`${API_BASE_URL}/forecast/24h`);
    return response.json();
  },
  getForecast3day: async () => {
    const response = await fetch(`${API_BASE_URL}/forecast/3day`);
    return response.json();
  },
  getForecast7day: async () => {
    const response = await fetch(`${API_BASE_URL}/forecast/7day`);
    return response.json();
  },
  getHistoricalData: async () => {
    const response = await fetch(`${API_BASE_URL}/history/data`);
    return response.json();
  },
  getHistoricalEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/history/events`);
    return response.json();
  },
  getRiskTrend: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/risk-trend`);
    return response.json();
  },
  getPredictionAccuracy: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/accuracy`);
    return response.json();
  },
  getZoneActivity: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/zone-activity`);
    return response.json();
  },
  getSystemStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/status`);
    return response.json();
  },
  getFeatureImportance: async () => {
    const response = await fetch(`${API_BASE_URL}/explain/feature-importance`);
    return response.json();
  },
  getPredictionBreakdown: async () => {
    const response = await fetch(`${API_BASE_URL}/explain/prediction-breakdown`);
    return response.json();
  },
  getModelMetrics: async () => {
    const response = await fetch(`${API_BASE_URL}/explain/model-metrics`);
    return response.json();
  },
  getReports: async () => {
    const response = await fetch(`${API_BASE_URL}/reports`);
    return response.json();
  },
  getInsights: async () => {
    const response = await fetch(`${API_BASE_URL}/reports/insights`);
    return response.json();
  },
  getRoles: async () => {
    const response = await fetch(`${API_BASE_URL}/access/roles`);
    return response.json();
  },
  getActivityLog: async () => {
    const response = await fetch(`${API_BASE_URL}/access/activity-log`);
    return response.json();
  },
  getZoneComparison: async () => {
    const response = await fetch(`${API_BASE_URL}/comparison/zones`);
    return response.json();
  },
  getComparisonTrend: async () => {
    const response = await fetch(`${API_BASE_URL}/comparison/trend`);
    return response.json();
  },
};
