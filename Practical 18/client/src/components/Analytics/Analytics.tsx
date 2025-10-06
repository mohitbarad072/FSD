import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import axios from 'axios';

interface AnalyticsData {
  tasks: {
    byStatus: Array<{ _id: string; count: number }>;
    byPriority: Array<{ _id: string; count: number }>;
    recentCompletions: Array<{ _id: string; count: number }>;
  };
  projects: {
    byStatus: Array<{ _id: string; count: number }>;
  };
  time: {
    totalTime: number;
    avgTime: number;
  };
}

interface ProductivityData {
  daily: Array<{ _id: string; created: number; completed: number }>;
  weekly: Array<{ _id: string; created: number; completed: number }>;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [productivityData, setProductivityData] = useState<ProductivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [analyticsResponse, productivityResponse] = await Promise.all([
          axios.get('/analytics/dashboard'),
          axios.get(`/analytics/productivity?period=${period}`),
        ]);

        setAnalyticsData(analyticsResponse.data.analytics);
        setProductivityData(productivityResponse.data.productivity);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  const statusColors = {
    todo: '#94A3B8',
    'in-progress': '#F59E0B',
    completed: '#10B981',
  };

  const priorityColors = {
    low: '#10B981',
    medium: '#3B82F6',
    high: '#F59E0B',
    urgent: '#EF4444',
  };

  const projectStatusColors = {
    active: '#10B981',
    completed: '#3B82F6',
    'on-hold': '#F59E0B',
    cancelled: '#EF4444',
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading analytics...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Analytics</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Period</InputLabel>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            input={<OutlinedInput label="Period" />}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Task Status Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Task Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData?.tasks.byStatus || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ _id, count }) => `${_id}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analyticsData?.tasks.byStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[entry._id as keyof typeof statusColors] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Priority Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Priority Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData?.tasks.byPriority || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData?.projects.byStatus || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ _id, count }) => `${_id}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analyticsData?.projects.byStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={projectStatusColors[entry._id as keyof typeof projectStatusColors] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Time Tracking */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Time Tracking
              </Typography>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  {Math.round((analyticsData?.time.totalTime || 0) / 60)}h
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Total Time Tracked
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Avg: {Math.round((analyticsData?.time.avgTime || 0) / 60)}h per task
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Productivity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Productivity
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={productivityData?.daily || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="created"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    name="Created"
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    name="Completed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Productivity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Productivity
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={productivityData?.weekly || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="created"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Created"
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
