// Socket.IO Service - Real-time data streaming
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:3300';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.listeners = new Map();
  }

  // Connect to Socket.IO server
  connect() {
    if (this.socket && this.connected) {
      console.log('Socket already connected');
      return this.socket;
    }

    console.log('Connecting to Socket.IO server:', SOCKET_URL);

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket.IO connected:', this.socket.id);
      this.connected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('🔌 Socket.IO disconnected:', reason);
      this.connected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error.message);
    });

    return this.socket;
  }

  // Disconnect from Socket.IO server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      this.listeners.clear();
      console.log('Socket.IO disconnected');
    }
  }

  // Subscribe to sensor data updates
  onSensorData(callback) {
    if (!this.socket) {
      this.connect();
    }

    const listener = (data) => {
      callback(data);
    };

    this.socket.on('sensor-data', listener);
    this.listeners.set('sensor-data', listener);

    console.log('📡 Subscribed to sensor-data events');
  }

  // Unsubscribe from sensor data updates
  offSensorData() {
    if (this.socket && this.listeners.has('sensor-data')) {
      const listener = this.listeners.get('sensor-data');
      this.socket.off('sensor-data', listener);
      this.listeners.delete('sensor-data');
      console.log('Unsubscribed from sensor-data events');
    }
  }

  // Check if connected
  isConnected() {
    return this.connected;
  }

  // Get socket instance (for advanced usage)
  getSocket() {
    return this.socket;
  }
}

// Export singleton instance
export default new SocketService();
