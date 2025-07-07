import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear local storage and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('dbCredentials');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (credentials) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            email: credentials.email,
            name: credentials.email.split('@')[0],
            token: 'mock-jwt-token'
          }
        });
      }, 1000);
    });
  },

  signup: async (userData) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            email: userData.email,
            name: userData.name,
            token: 'mock-jwt-token'
          }
        });
      }, 1000);
    });
  },

  logout: async () => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

// Database API
export const databaseAPI = {
  testConnection: async (credentials) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 70% success rate
        if (Math.random() > 0.3) {
          resolve({ success: true, message: 'Connection successful' });
        } else {
          reject(new Error('Connection failed'));
        }
      }, 2000);
    });
  },

  saveCredentials: async (credentials) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          mcpServerId: 'mcp-server-' + Date.now() 
        });
      }, 1000);
    });
  },

  getSchemas: async () => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          schemas: [
            {
              name: 'users',
              columns: ['id', 'name', 'email', 'created_at', 'updated_at']
            },
            {
              name: 'orders',
              columns: ['id', 'user_id', 'total', 'status', 'order_date']
            },
            {
              name: 'products',
              columns: ['id', 'name', 'price', 'category', 'stock_quantity']
            },
            {
              name: 'analytics',
              columns: ['id', 'event_name', 'user_id', 'properties', 'timestamp']
            }
          ]
        });
      }, 1000);
    });
  }
};

// Query API
export const queryAPI = {
  analyzeQuery: async (queryText) => {
    // Mock API call - replace with actual LLM endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        const queryLower = queryText.toLowerCase();
        const allSchemas = ['users', 'orders', 'products', 'analytics'];
        const relevantSchemas = allSchemas.filter(schema => 
          queryLower.includes(schema)
        );
        
        resolve({
          relevantSchemas,
          suggestedSql: `SELECT * FROM ${relevantSchemas[0] || 'users'} LIMIT 100;`,
          confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
        });
      }, 1500);
    });
  },

  saveQuerySetup: async (querySetup) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          queryId: 'query-' + Date.now()
        });
      }, 1000);
    });
  },

  executeQuery: async (queryId) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, name: 'John Doe', revenue: 1250 },
            { id: 2, name: 'Jane Smith', revenue: 890 },
            { id: 3, name: 'Bob Johnson', revenue: 1560 }
          ],
          csvUrl: '/downloads/query-results.csv'
        });
      }, 2000);
    });
  }
};

// Analytics API
export const analyticsAPI = {
  getDashboardData: async () => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          revenue: [
            { month: 'Jan', value: 45000, growth: 12 },
            { month: 'Feb', value: 52000, growth: 15.5 },
            { month: 'Mar', value: 48000, growth: -7.7 },
            { month: 'Apr', value: 61000, growth: 27.1 },
            { month: 'May', value: 55000, growth: -9.8 },
            { month: 'Jun', value: 67000, growth: 21.8 }
          ],
          userEngagement: [
            { date: '2024-01-01', activeUsers: 1200, newUsers: 150 },
            { date: '2024-01-08', activeUsers: 1350, newUsers: 180 },
            { date: '2024-01-15', activeUsers: 1280, newUsers: 120 },
            { date: '2024-01-22', activeUsers: 1420, newUsers: 200 },
            { date: '2024-01-29', activeUsers: 1380, newUsers: 170 }
          ],
          categoryDistribution: [
            { name: 'Electronics', value: 35, color: '#3B82F6' },
            { name: 'Clothing', value: 25, color: '#10B981' },
            { name: 'Books', value: 20, color: '#F59E0B' },
            { name: 'Home & Garden', value: 15, color: '#EF4444' },
            { name: 'Sports', value: 5, color: '#8B5CF6' }
          ],
          kpis: {
            totalRevenue: 328000,
            totalUsers: 8420,
            conversionRate: 3.2,
            avgOrderValue: 85.50
          }
        });
      }, 2000);
    });
  },

  exportData: async (format = 'csv') => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          downloadUrl: `/downloads/analytics-data.${format}`,
          filename: `analytics-data-${new Date().toISOString().split('T')[0]}.${format}`
        });
      }, 1000);
    });
  },

  sendEmailReport: async (emailData) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Report sent successfully'
        });
      }, 1500);
    });
  }
};

// Scheduler API
export const schedulerAPI = {
  createSchedule: async (scheduleData) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          scheduleId: 'schedule-' + Date.now(),
          nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        });
      }, 1000);
    });
  },

  getSchedules: async () => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          schedules: [
            {
              id: 'schedule-1',
              query: 'Monthly revenue analysis',
              frequency: 'monthly',
              nextRun: '2024-02-01T09:00:00Z',
              active: true
            }
          ]
        });
      }, 1000);
    });
  },

  updateSchedule: async (scheduleId, updateData) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          schedule: { id: scheduleId, ...updateData }
        });
      }, 1000);
    });
  },

  deleteSchedule: async (scheduleId) => {
    // Mock API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

export default api;