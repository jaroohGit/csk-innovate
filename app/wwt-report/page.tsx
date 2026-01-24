'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface RealtimeData {
  time: string;
  ph: number;
  temperature: number;
  flow_rate: number;
  instant_power_kw: number;
}

interface Summary24h {
  total_readings: number;
  avg_ph_24h: number;
  avg_temp_24h: number;
  avg_flow_24h: number;
  total_energy_24h_kwh: number;
  min_ph_24h: number;
  max_ph_24h: number;
}

interface DailyEnergyData {
  date: string;
  total_flow_m3: number;
  energy_kwh: number;
  readings_count: number;
  avg_flow_rate: number;
}

interface HourlyData {
  hour: string;
  avg_ph: number;
  avg_temp: number;
  avg_flow: number;
  energy_kwh: number;
  sample_count: number;
}

export default function WWTReportPage() {
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [summary24h, setSummary24h] = useState<Summary24h | null>(null);
  const [dailyEnergy, setDailyEnergy] = useState<DailyEnergyData[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch summary data
        const summaryRes = await fetch('http://localhost:3010/api/wwt/summary');
        if (!summaryRes.ok) throw new Error('Failed to fetch summary');
        const summaryData = await summaryRes.json();
        setRealtimeData(summaryData.realtime);
        setSummary24h(summaryData.summary_24h);

        // Fetch daily energy data
        const energyRes = await fetch('http://localhost:3010/api/wwt/energy/daily?days=7');
        if (!energyRes.ok) throw new Error('Failed to fetch energy data');
        const energyData = await energyRes.json();
        setDailyEnergy(energyData);

        // Fetch hourly data
        const hourlyRes = await fetch('http://localhost:3010/api/wwt/hourly?hours=24');
        if (!hourlyRes.ok) throw new Error('Failed to fetch hourly data');
        const hourlyData = await hourlyRes.json();
        setHourlyData(hourlyData);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching WWT data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading WWT Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-gray-600 mt-4">
            Make sure the API server is running on port 3010 and the database is connected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">WWT-01 Report Dashboard</h1>
          <p className="text-blue-100 mt-2">Wastewater Treatment Monitoring System</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Real-time Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">pH Level</p>
                <p className="text-3xl font-bold text-blue-600">
                  {realtimeData?.ph ? Number(realtimeData.ph).toFixed(2) : 'N/A'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {realtimeData?.time && format(new Date(realtimeData.time), 'HH:mm:ss')}
                </p>
              </div>
              <div className="text-4xl">💧</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Temperature</p>
                <p className="text-3xl font-bold text-orange-600">
                  {realtimeData?.temperature ? Number(realtimeData.temperature).toFixed(1) : 'N/A'}°C
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {realtimeData?.time && format(new Date(realtimeData.time), 'HH:mm:ss')}
                </p>
              </div>
              <div className="text-4xl">🌡️</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Flow Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {realtimeData?.flow_rate ? Number(realtimeData.flow_rate).toFixed(1) : 'N/A'}
                </p>
                <p className="text-xs text-gray-400 mt-1">L/min</p>
              </div>
              <div className="text-4xl">🌊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Power</p>
                <p className="text-3xl font-bold text-purple-600">
                  {realtimeData?.instant_power_kw ? Number(realtimeData.instant_power_kw).toFixed(3) : 'N/A'}
                </p>
                <p className="text-xs text-gray-400 mt-1">kW</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </div>

        {/* 24-Hour Summary */}
        {summary24h && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">24-Hour Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Total Energy</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {summary24h.total_energy_24h_kwh ? Number(summary24h.total_energy_24h_kwh).toFixed(2) : '0.00'} kWh
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg pH</p>
                <p className="text-2xl font-bold text-blue-600">
                  {summary24h.avg_ph_24h ? Number(summary24h.avg_ph_24h).toFixed(2) : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg Temperature</p>
                <p className="text-2xl font-bold text-orange-600">
                  {summary24h.avg_temp_24h ? Number(summary24h.avg_temp_24h).toFixed(1) : 'N/A'}°C
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg Flow</p>
                <p className="text-2xl font-bold text-green-600">
                  {summary24h.avg_flow_24h ? Number(summary24h.avg_flow_24h).toFixed(1) : 'N/A'} L/min
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Daily Energy Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Energy Consumption (Last 7 Days)</h2>
          {dailyEnergy.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyEnergy.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                />
                <YAxis label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                  formatter={(value) => [`${Number(value).toFixed(2)} kWh`, 'Energy']}
                />
                <Legend />
                <Bar dataKey="energy_kwh" fill="#f59e0b" name="Energy (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No energy data available
            </div>
          )}
        </div>

        {/* Hourly Trends */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hourly Trends (Last 24 Hours)</h2>
          {hourlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hour" 
                  tickFormatter={(hour) => format(new Date(hour), 'HH:mm')}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  labelFormatter={(hour) => format(new Date(hour), 'MMM dd, HH:mm')}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="avg_ph" 
                  stroke="#3b82f6" 
                  name="pH" 
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="avg_temp" 
                  stroke="#f97316" 
                  name="Temperature (°C)" 
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="avg_flow" 
                  stroke="#10b981" 
                  name="Flow Rate (L/min)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No hourly data available
            </div>
          )}
        </div>

        {/* Energy per Hour Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hourly Energy Consumption</h2>
          {hourlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hour" 
                  tickFormatter={(hour) => format(new Date(hour), 'HH:mm')}
                />
                <YAxis label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  labelFormatter={(hour) => format(new Date(hour), 'MMM dd, HH:mm')}
                  formatter={(value) => [`${Number(value).toFixed(2)} kWh`, 'Energy']}
                />
                <Legend />
                <Bar dataKey="energy_kwh" fill="#8b5cf6" name="Energy (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No energy data available
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
