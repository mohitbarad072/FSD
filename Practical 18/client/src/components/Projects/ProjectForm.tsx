import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTasks, Project } from '../../contexts/TaskContext';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ open, onClose, project }) => {
  const { createProject, updateProject } = useTasks();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    status: 'active' as Project['status'],
    startDate: new Date(),
    endDate: null as Date | null,
    hasEndDate: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        color: project.color,
        status: project.status,
        startDate: new Date(project.startDate),
        endDate: project.endDate ? new Date(project.endDate) : null,
        hasEndDate: !!project.endDate,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: '#3B82F6',
        status: 'active',
        startDate: new Date(),
        endDate: null,
        hasEndDate: false,
      });
    }
  }, [project]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        endDate: formData.hasEndDate ? formData.endDate?.toISOString() : undefined,
      };

      if (project) {
        await updateProject(project._id, projectData);
      } else {
        await createProject(projectData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const colorOptions = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316',
    '#EC4899', '#6366F1', '#14B8A6', '#F43F5E',
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {project ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                fullWidth
                label="Project Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                multiline
                rows={3}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    input={<OutlinedInput label="Status" />}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Color
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {colorOptions.map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: color,
                          borderRadius: '50%',
                          cursor: 'pointer',
                          border: formData.color === color ? '3px solid #000' : '1px solid #ccc',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                        onClick={() => handleChange('color', color)}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>

              <DateTimePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(newValue) => handleChange('startDate', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.hasEndDate}
                    onChange={(e) => handleChange('hasEndDate', e.target.checked)}
                  />
                }
                label="Set End Date"
              />

              {formData.hasEndDate && (
                <DateTimePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(newValue) => handleChange('endDate', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Saving...' : project ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectForm;
