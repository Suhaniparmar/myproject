import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Database, Server, Lock, User, CheckCircle, XCircle } from 'lucide-react';

function DatabaseCredentials() {
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const testConnection = async () => {
    setTesting(true);
    setConnectionStatus(null);
    
    try {
      const values = getValues();
      // Simulate API call to test connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock connection test result
      const isSuccessful = Math.random() > 0.3; // 70% success rate for demo
      
      if (isSuccessful) {
        setConnectionStatus('success');
        toast.success('Database connection successful!');
      } else {
        setConnectionStatus('error');
        toast.error('Connection failed. Please check your credentials.');
      }
    } catch (error) {
      setConnectionStatus('error');
      toast.error('Connection test failed.');
    } finally {
      setTesting(false);
    }
  };

  const onSubmit = async (data) => {
    if (connectionStatus !== 'success') {
      toast.error('Please test the connection first.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to save credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store credentials in localStorage (in real app, this would be encrypted and stored securely)
      localStorage.setItem('dbCredentials', JSON.stringify(data));
      
      toast.success('Database credentials saved successfully!');
      navigate('/query-setup');
    } catch (error) {
      toast.error('Failed to save credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">DataAnalytics Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <Database className="h-12 w-12 text-blue-600 mx-auto" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Connect Your Database
            </h2>
            <p className="mt-2 text-gray-600">
              Enter your database credentials to create a secure MCP server connection.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Database Type
                </label>
                <select
                  {...register('dbType', { required: 'Database type is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Database Type</option>
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="sqlite">SQLite</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="oracle">Oracle</option>
                  <option value="sqlserver">SQL Server</option>
                </select>
                {errors.dbType && (
                  <p className="mt-1 text-sm text-red-600">{errors.dbType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host/Server
                </label>
                <div className="relative">
                  <Server className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    {...register('host', { required: 'Host is required' })}
                    type="text"
                    placeholder="localhost or IP address"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.host && (
                  <p className="mt-1 text-sm text-red-600">{errors.host.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Port
                </label>
                <input
                  {...register('port', { 
                    required: 'Port is required',
                    pattern: {
                      value: /^\d+$/,
                      message: 'Port must be a number'
                    }
                  })}
                  type="text"
                  placeholder="5432"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.port && (
                  <p className="mt-1 text-sm text-red-600">{errors.port.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Database Name
                </label>
                <div className="relative">
                  <Database className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    {...register('database', { required: 'Database name is required' })}
                    type="text"
                    placeholder="your_database"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.database && (
                  <p className="mt-1 text-sm text-red-600">{errors.database.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    {...register('username', { required: 'Username is required' })}
                    type="text"
                    placeholder="database_user"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Connection Status */}
            {connectionStatus && (
              <div className={`flex items-center p-4 rounded-md ${
                connectionStatus === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                {connectionStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 mr-2" />
                )}
                <span className="text-sm font-medium">
                  {connectionStatus === 'success' 
                    ? 'Connection successful! Database schemas will be fetched automatically.' 
                    : 'Connection failed. Please check your credentials and try again.'
                  }
                </span>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={testConnection}
                disabled={testing}
                className="flex-1 flex items-center justify-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {testing ? 'Testing...' : 'Test Connection'}
              </button>

              <button
                type="submit"
                disabled={loading || connectionStatus !== 'success'}
                className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save & Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DatabaseCredentials;