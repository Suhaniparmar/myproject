# DataAnalytics Pro - Database Analytics Dashboard

A powerful React.js application that transforms your database into actionable insights with automated analytics, beautiful visualizations, and scheduled reporting.

## 🚀 Features

- **User Authentication**: Secure login/signup system
- **Database Integration**: Connect to multiple database types (PostgreSQL, MySQL, SQLite, MongoDB, Oracle, SQL Server)
- **MCP Server Creation**: Automatic MCP (Model Context Protocol) server setup for secure database connections
- **AI-Powered Query Analysis**: LLM-based schema selection and SQL generation
- **Interactive Dashboards**: Beautiful charts and KPI visualizations
- **Automated Scheduling**: Weekly/monthly/daily report generation
- **Email Delivery**: Automated report delivery to specified email addresses
- **CSV Export**: Download analytics data in CSV format
- **Real-time Updates**: Refresh data on demand

## 🛠 Technology Stack

- **Frontend**: React.js 18, React Router, Tailwind CSS
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form for form handling
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd database-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Application Workflow

### 1. **Landing Page**
- Welcome page with feature overview
- Navigation to login/signup

### 2. **Authentication**
- User registration with form validation
- Secure login system
- Protected routes for authenticated users

### 3. **Database Credentials**
- Support for multiple database types
- Connection testing functionality
- Secure credential storage
- MCP server creation

### 4. **Query Setup**
- Natural language query description
- AI-powered schema analysis and selection
- Schedule configuration (weekly/monthly/daily)
- Email delivery setup

### 5. **Analytics Dashboard**
- Interactive charts and visualizations
- Key Performance Indicators (KPIs)
- Real-time data refresh
- CSV export functionality
- Email report delivery

## 🎯 Key Components

### Authentication System
- `AuthContext`: Global authentication state management
- `Login.jsx`: User login interface
- `Signup.jsx`: User registration interface
- Protected routes for secure access

### Database Integration
- `DatabaseCredentials.jsx`: Database connection setup
- Connection testing with visual feedback
- Support for multiple database types
- Secure credential handling

### Query Management
- `QuerySetup.jsx`: Query configuration interface
- AI-powered schema selection
- Schedule and delivery settings
- Natural language query processing

### Data Visualization
- `Dashboard.jsx`: Main analytics interface
- Multiple chart types (Line, Area, Bar, Pie)
- KPI cards with key metrics
- Interactive data exploration

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
```

### API Integration
The application includes mock API services in `src/services/api.js`. Replace these with actual backend endpoints:

- **Authentication API**: User login/signup/logout
- **Database API**: Connection testing, schema fetching
- **Query API**: Query analysis, execution, scheduling
- **Analytics API**: Dashboard data, export functionality

## 📊 Mock Data

The application includes comprehensive mock data for demonstration:

- Revenue trends and growth metrics
- User engagement analytics
- Category distribution data
- Key performance indicators

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable UI components
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface

## 🔐 Security Features

- JWT token-based authentication
- Protected routes
- Secure credential storage
- Input validation and sanitization

## 📈 Charts & Visualizations

- **Area Charts**: Revenue trends over time
- **Line Charts**: User engagement metrics
- **Pie Charts**: Category distribution
- **Bar Charts**: Growth rate analysis
- **KPI Cards**: Key metric highlights

## 🚀 Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform**
   - Vercel, Netlify, AWS S3, etc.
   - Ensure environment variables are configured

3. **Backend Integration**
   - Replace mock APIs with actual backend services
   - Configure database connections
   - Set up email delivery service

## 🔄 Development Workflow

1. **Start development server**
   ```bash
   npm start
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📚 Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── DatabaseCredentials.jsx
│   ├── QuerySetup.jsx
│   └── Dashboard.jsx
├── context/            # React context providers
│   └── AuthContext.jsx
├── services/           # API service layer
│   └── api.js
├── App.jsx            # Main application component
├── index.js           # Application entry point
├── App.css            # Application styles
└── index.css          # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue on the GitHub repository.

## 🔮 Future Enhancements

- Real-time data streaming
- Advanced analytics and ML insights
- Multi-tenant support
- Custom dashboard builder
- Advanced scheduling options
- Integration with more data sources
