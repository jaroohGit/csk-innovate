// API Service - CSK-INNOVATE Vue Frontend
// Handles all HTTP requests to the backend API

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3300';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('jwt_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('jwt_token', token);
    } else {
      localStorage.removeItem('jwt_token');
    }
  }

  // Get authentication token
  getToken() {
    return this.token || localStorage.getItem('jwt_token');
  }

  // Build headers with authentication
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic fetch wrapper
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      headers: this.getHeaders(options.headers)
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || error.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // ============================================================================
  // Authentication
  // ============================================================================

  async login(username, password) {
    console.log('🔐 Attempting login:', { username, apiUrl: this.baseUrl });
    
    try {
      const data = await this.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      
      console.log('✅ Login successful:', data);
      
      if (data.token) {
        this.setToken(data.token);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  logout() {
    this.setToken(null);
  }

  // ============================================================================
  // Sensor Data
  // ============================================================================

  // Get latest sensor data
  async getLatestSensorData() {
    return await this.request('/api/sensors/latest');
  }

  // Get sensor data by time range
  async getSensorDataRange(start, end, interval = '1min') {
    const params = new URLSearchParams({ start, end, interval });
    return await this.request(`/api/sensors/range?${params}`);
  }

  // Get specific sensor history
  async getSensorHistory(sensorName, hours = 24) {
    return await this.request(`/api/sensors/${sensorName}/history?hours=${hours}`);
  }

  // Get all available sensor fields
  async getSensorFields() {
    return await this.request('/api/sensors/fields');
  }

  // Get historical data by tank (AT-01, AT-02, AT-03)
  async getHistoricalData(tank, startDate, endDate, interval = 'hour') {
    const params = new URLSearchParams({ 
      start_date: startDate, 
      end_date: endDate, 
      interval 
    });
    return await this.request(`/api/historical/${tank}?${params}`);
  }

  // Get daily flow summary (optimized with MAX-MIN query)
  async getDailyFlowSummary(tank, startDate, endDate) {
    const params = new URLSearchParams({ 
      start_date: startDate, 
      end_date: endDate
    });
    return await this.request(`/api/daily-flow/${tank}?${params}`);
  }

  // ============================================================================
  // Dashboard
  // ============================================================================

  async getDashboardStats() {
    return await this.request('/api/dashboard/stats');
  }

  // ============================================================================
  // Health Check
  // ============================================================================

  async healthCheck() {
    return await this.request('/health');
  }
}

// Export singleton instance
export default new ApiService();
