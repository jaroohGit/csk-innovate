# Vue Frontend Integration Guide

## Installation

Install required dependencies:

```bash
cd ~/CSK-INNOVATE-vue
npm install socket.io-client@^4.6.1
```

## Environment Configuration

Create or update `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

## Usage Examples

### 1. Using API Service Directly

```vue
<script setup>
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'

const sensorData = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await apiService.getLatestSensorData()
    sensorData.value = data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <p>pH: {{ sensorData.ph_sensor_01 }}</p>
    <p>Temperature: {{ sensorData.temp_01 }}</p>
  </div>
</template>
```

### 2. Using Composables for Real-time Data

```vue
<script setup>
import { useSensorData } from '@/composables/useSensorData'

const { sensorData, loading, error, startRealtime, stopRealtime, isRealtime } = useSensorData()

// Start real-time streaming
const toggleRealtime = () => {
  if (isRealtime.value) {
    stopRealtime()
  } else {
    startRealtime()
  }
}
</script>

<template>
  <div>
    <button @click="toggleRealtime">
      {{ isRealtime ? 'Stop' : 'Start' }} Real-time
    </button>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <p>pH: {{ sensorData?.ph_sensor_01 }}</p>
      <p>Temp: {{ sensorData?.temp_01 }}°C</p>
      <p>Flow: {{ sensorData?.flow_meter_no1_realtime }} L/min</p>
      <span v-if="isRealtime" class="live-indicator">🔴 LIVE</span>
    </div>
  </div>
</template>
```

### 3. Using Sensor History

```vue
<script setup>
import { useSensorHistory } from '@/composables/useSensorData'

const { historyData, loading, fetchHistory } = useSensorHistory('ph_sensor_01', 24)
</script>

<template>
  <div>
    <h3>pH History (24 hours)</h3>
    <div v-if="loading">Loading history...</div>
    <div v-else>
      <div v-for="(item, index) in historyData" :key="index">
        {{ new Date(item.time).toLocaleString() }}: {{ item.ph_sensor_01 }}
      </div>
    </div>
  </div>
</template>
```

### 4. Login Component Update

Update your login component to use the new API:

```vue
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const username = ref('admin')
const password = ref('admin123')
const error = ref(null)
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = null
    
    await store.dispatch('authfack/login', {
      username: username.value,
      password: password.value
    })
    
  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
```

## API Endpoints Available

- `POST /api/auth/login` - Login with username/password
- `GET /api/sensors/latest` - Get latest sensor data
- `GET /api/sensors/range?start=...&end=...&interval=1min` - Get time range data
- `GET /api/sensors/:sensor/history?hours=24` - Get sensor history
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/sensors/fields` - Get all sensor field names

## Real-time WebSocket Events

Connect to Socket.IO server and listen for events:

```javascript
import socketService from '@/services/socket'

// Connect
socketService.connect()

// Subscribe to sensor data
socketService.onSensorData((data) => {
  console.log('New sensor data:', data)
})

// Disconnect when done
socketService.disconnect()
```

## Authentication

The API service automatically handles JWT tokens:

- Tokens are stored in localStorage
- Automatically included in Authorization header
- Cleared on logout

## Default Credentials

- Username: `admin`
- Password: `admin123`

OR

- Username: `operator`
- Password: `operator123`

## Troubleshooting

### CORS Errors

Make sure the API service is running and has the correct CORS configuration in `docker-compose.yml`:

```yaml
CORS_ORIGIN=http://localhost:8082,https://www.CSK-INNOVATEbiogas.com
```

### WebSocket Connection Fails

1. Check API service is running: `docker-compose logs api-service`
2. Verify VITE_API_URL in `.env` is correct
3. Check browser console for connection errors

### No Real-time Data

1. Verify MQTT ingest service is running: `docker-compose logs mqtt-ingest`
2. Check Redis is running: `docker-compose ps redis`
3. Verify IoT device is sending data: `docker-compose logs emqx`

## Complete Example Component

