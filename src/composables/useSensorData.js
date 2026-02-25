// Composable for real-time sensor data
import { ref, onMounted, onUnmounted } from 'vue';
import socketService from '@/services/socket';
import apiService from '@/services/api';

export function useSensorData() {
  const sensorData = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const isRealtime = ref(false);

  // Fetch latest sensor data from API
  const fetchLatest = async () => {
    try {
      loading.value = true;
      error.value = null;
      
      // Check if user is logged in
      const token = apiService.getToken();
      if (!token) {
        error.value = 'Please login first';
        loading.value = false;
        return;
      }
      
      const data = await apiService.getLatestSensorData();
      sensorData.value = data;
      console.log('📊 Fetched latest sensor data:', data);
    } catch (err) {
      error.value = err.message || 'Failed to fetch sensor data';
      console.error('❌ Failed to fetch sensor data:', err);
    } finally {
      loading.value = false;
    }
  };

  // Start real-time updates
  const startRealtime = () => {
    if (isRealtime.value) {
      console.log('⚠️ Real-time already started');
      return;
    }

    try {
      console.log('🔄 Starting real-time connection...');
      socketService.connect();
      socketService.onSensorData((data) => {
        console.log('📡 Received real-time sensor data:', data);
        sensorData.value = data;
        loading.value = false;
        error.value = null;
      });
      isRealtime.value = true;
      console.log('✅ Real-time sensor data streaming started');
    } catch (err) {
      console.error('❌ Failed to start real-time streaming:', err);
      error.value = 'Failed to connect to real-time server';
    }
  };

  // Stop real-time updates
  const stopRealtime = () => {
    if (!isRealtime.value) return;

    try {
      socketService.offSensorData();
      socketService.disconnect();
      isRealtime.value = false;
      console.log('⏸️ Real-time sensor data streaming stopped');
    } catch (err) {
      console.error('❌ Failed to stop real-time streaming:', err);
    }
  };

  // Lifecycle hooks
  onMounted(() => {
    // Try to fetch latest data on mount
    fetchLatest();
  });

  onUnmounted(() => {
    stopRealtime();
  });

  return {
    sensorData,
    loading,
    error,
    isRealtime,
    fetchLatest,
    startRealtime,
    stopRealtime
  };
}

// Composable for sensor history
export function useSensorHistory(sensorName, hours = 24) {
  const historyData = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchHistory = async () => {
    try {
      loading.value = true;
      error.value = null;
      const result = await apiService.getSensorHistory(sensorName, hours);
      historyData.value = result.data;
    } catch (err) {
      error.value = err.message;
      console.error('Failed to fetch sensor history:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchHistory();
  });

  return {
    historyData,
    loading,
    error,
    fetchHistory
  };
}

// Composable for time range data
export function useSensorRange(startTime, endTime, interval = '1min') {
  const rangeData = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchRange = async () => {
    try {
      loading.value = true;
      error.value = null;
      const result = await apiService.getSensorDataRange(
        startTime.value || startTime,
        endTime.value || endTime,
        interval
      );
      rangeData.value = result.data;
    } catch (err) {
      error.value = err.message;
      console.error('Failed to fetch sensor range data:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchRange();
  });

  return {
    rangeData,
    loading,
    error,
    fetchRange
  };
}

// Composable for dashboard stats
export function useDashboardStats() {
  const stats = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchStats = async () => {
    try {
      loading.value = true;
      error.value = null;
      stats.value = await apiService.getDashboardStats();
    } catch (err) {
      error.value = err.message;
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchStats();
  });

  return {
    stats,
    loading,
    error,
    fetchStats
  };
}
