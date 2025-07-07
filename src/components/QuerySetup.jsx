import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Database, Clock, Mail, Search, FileText, Calendar } from 'lucide-react';

function QuerySetup() {
  const [loading, setLoading] = useState(false);
  const [schemas, setSchemas] = useState([]);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const queryText = watch('query');

  useEffect(() => {
    // Simulate fetching database schemas
    const fetchSchemas = async () => {
      try {
        // Mock schemas data
        const mockSchemas = [
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
        ];
        
        setSchemas(mockSchemas);
        toast.success('Database schemas loaded successfully!');
      } catch (error) {
        toast.error('Failed to load database schemas.');
      }
    };

    fetchSchemas();
  }, []);

  const analyzeQuery = () => {
    if (!queryText) return;
    
    // Simple AI simulation to select relevant schemas based on query
    const queryLower = queryText.toLowerCase();
    const relevantSchemas = schemas.filter(schema => 
      queryLower.includes(schema.name) || 
      schema.columns.some(col => queryLower.includes(col))
    );
    
    setSelectedSchemas(relevantSchemas.map(s => s.name));
    
    if (relevantSchemas.length > 0) {
      toast.success(`AI selected ${relevantSchemas.length} relevant schema(s) for your query.`);
    } else {
      toast.info('No specific schemas detected. You may need to manually select relevant schemas.');
    }
  };

  const handleSchemaToggle = (schemaName) => {
    setSelectedSchemas(prev => 
      prev.includes(schemaName) 
        ? prev.filter(s => s !== schemaName)
        : [...prev, schemaName]
    );
  };

  const onSubmit = async (data) => {
    if (selectedSchemas.length === 0) {
      toast.error('Please select at least one schema for your query.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to save query setup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const querySetup = {
        ...data,
        selectedSchemas,
        createdAt: new Date().toISOString()
      };
      
      // Store query setup in localStorage
      localStorage.setItem('querySetup', JSON.stringify(querySetup));
      
      toast.success('Query setup saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save query setup. Please try again.');
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

      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <Search className="h-12 w-12 text-blue-600 mx-auto" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Setup Your Query
            </h2>
            <p className="mt-2 text-gray-600">
              Define your data query and configure automated delivery settings.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Query Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Data Query Description
              </label>
              <textarea
                {...register('query', { 
                  required: 'Query description is required',
                  minLength: {
                    value: 10,
                    message: 'Query description must be at least 10 characters'
                  }
                })}
                rows={4}
                placeholder="Describe what data you want to analyze. For example: 'Show me monthly revenue trends by product category' or 'Get weekly user engagement metrics'"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.query && (
                <p className="mt-1 text-sm text-red-600">{errors.query.message}</p>
              )}
              
              <button
                type="button"
                onClick={analyzeQuery}
                disabled={!queryText}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 disabled:opacity-50"
              >
                <Search className="h-3 w-3 mr-1" />
                Analyze Query with AI
              </button>
            </div>

            {/* Schema Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <Database className="inline h-4 w-4 mr-1" />
                Select Relevant Database Schemas
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schemas.map((schema) => (
                  <div
                    key={schema.name}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedSchemas.includes(schema.name)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleSchemaToggle(schema.name)}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedSchemas.includes(schema.name)}
                        onChange={() => handleSchemaToggle(schema.name)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900">
                        {schema.name}
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Columns: {schema.columns.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
              {selectedSchemas.length > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  Selected {selectedSchemas.length} schema(s): {selectedSchemas.join(', ')}
                </p>
              )}
            </div>

            {/* Schedule & Delivery Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Schedule Frequency
                </label>
                <select
                  {...register('frequency')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">One-time only</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Delivery Time
                </label>
                <input
                  {...register('deliveryTime')}
                  type="time"
                  defaultValue="09:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Delivery (Optional)
              </label>
              <input
                {...register('emailDelivery', {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="Enter email for automated reports (leave empty for dashboard only)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.emailDelivery && (
                <p className="mt-1 text-sm text-red-600">{errors.emailDelivery.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate('/database-credentials')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Setting up...' : 'Create Analytics Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuerySetup;