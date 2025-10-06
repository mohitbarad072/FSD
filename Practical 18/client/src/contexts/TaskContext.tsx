import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  project?: {
    _id: string;
    name: string;
    color: string;
  };
  tags: string[];
  estimatedTime: number;
  actualTime: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  color: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  startDate: string;
  endDate?: string;
  progress: number;
  stats: {
    totalTasks: number;
    completedTasks: number;
    progress: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string;
    project: string;
    priority: string;
    search: string;
  };
}

interface TaskContextType extends TaskState {
  fetchTasks: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<void>;
  updateTask: (id: string, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createProject: (projectData: Partial<Project>) => Promise<void>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TaskState['filters']>) => void;
  clearError: () => void;
}

type TaskAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TaskState['filters']> };

const initialState: TaskState = {
  tasks: [],
  projects: [],
  loading: false,
  error: null,
  filters: {
    status: '',
    project: '',
    priority: '',
    search: '',
  },
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
      };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload, loading: false };
    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    default:
      return state;
  }
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { status, project, priority, search } = state.filters;
      const params = new URLSearchParams();
      
      if (status) params.append('status', status);
      if (project) params.append('project', project);
      if (priority) params.append('priority', priority);
      if (search) params.append('search', search);

      const response = await axios.get(`/tasks?${params.toString()}`);
      dispatch({ type: 'SET_TASKS', payload: response.data.tasks });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to fetch tasks' });
    }
  };

  const fetchProjects = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.get('/projects');
      dispatch({ type: 'SET_PROJECTS', payload: response.data.projects });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to fetch projects' });
    }
  };

  const createTask = async (taskData: Partial<Task>) => {
    try {
      const response = await axios.post('/tasks', taskData);
      dispatch({ type: 'ADD_TASK', payload: response.data.task });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to create task' });
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const response = await axios.put(`/tasks/${id}`, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: response.data.task });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to update task' });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/tasks/${id}`);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to delete task' });
    }
  };

  const createProject = async (projectData: Partial<Project>) => {
    try {
      const response = await axios.post('/projects', projectData);
      dispatch({ type: 'ADD_PROJECT', payload: response.data.project });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to create project' });
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const response = await axios.put(`/projects/${id}`, projectData);
      dispatch({ type: 'UPDATE_PROJECT', payload: response.data.project });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to update project' });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`/projects/${id}`);
      dispatch({ type: 'DELETE_PROJECT', payload: id });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to delete project' });
    }
  };

  const setFilters = (filters: Partial<TaskState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Fetch data when filters change
  useEffect(() => {
    fetchTasks();
  }, [state.filters]);

  const value: TaskContextType = {
    ...state,
    fetchTasks,
    fetchProjects,
    createTask,
    updateTask,
    deleteTask,
    createProject,
    updateProject,
    deleteProject,
    setFilters,
    clearError,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
