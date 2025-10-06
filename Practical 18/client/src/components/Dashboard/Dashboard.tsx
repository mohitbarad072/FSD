import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Fab,
} from '@mui/material';
import {
  Assignment as TaskIcon,
  CheckCircle as CompletedIcon,
  Schedule as PendingIcon,
  TrendingUp as TrendingIcon,
  Add as AddIcon,
  Folder as ProjectIcon,
} from '@mui/icons-material';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  byStatus: Array<{ _id: string; count: number }>;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tasks, projects, fetchTasks, fetchProjects } = useTasks();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await Promise.all([fetchTasks(), fetchProjects()]);
        
        // Fetch task statistics
        const response = await axios.get('/tasks/stats');
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [fetchTasks, fetchProjects]);

  const recentTasks = tasks.slice(0, 5);
  const activeProjects = projects.filter(project => project.status === 'active').slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'todo': return 'default';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your tasks and projects today.
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TaskIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Tasks</Typography>
                </Box>
                <Typography variant="h3" color="primary">
                  {stats?.totalTasks || 0}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CompletedIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6">Completed</Typography>
                </Box>
                <Typography variant="h3" color="success.main">
                  {stats?.completedTasks || 0}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingIcon color="info" sx={{ mr: 1 }} />
                  <Typography variant="h6">Completion Rate</Typography>
                </Box>
                <Typography variant="h3" color="info.main">
                  {stats?.completionRate || 0}%
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ProjectIcon color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Active Projects</Typography>
                </Box>
                <Typography variant="h3" color="secondary.main">
                  {activeProjects.length}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Tasks
                </Typography>
                <List>
                  {recentTasks.length > 0 ? (
                    recentTasks.map((task) => (
                      <ListItem key={task._id} divider>
                        <ListItemIcon>
                          <PendingIcon color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.title}
                          secondary={
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip
                                label={task.status}
                                size="small"
                                color={getStatusColor(task.status) as any}
                              />
                              <Chip
                                label={task.priority}
                                size="small"
                                color={getPriorityColor(task.priority) as any}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No tasks yet. Create your first task!" />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Active Projects */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Projects
                </Typography>
                <List>
                  {activeProjects.length > 0 ? (
                    activeProjects.map((project) => (
                      <ListItem key={project._id} divider>
                        <ListItemIcon>
                          <ProjectIcon sx={{ color: project.color }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={project.name}
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={project.stats.progress}
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {project.stats.completedTasks} of {project.stats.totalTasks} tasks completed
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No active projects. Create your first project!" />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Dashboard;
