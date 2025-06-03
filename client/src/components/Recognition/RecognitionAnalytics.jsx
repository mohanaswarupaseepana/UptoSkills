import { useState } from 'react'
import { BarChart3, TrendingUp, Calendar, Filter, Users, Award, Target, Zap } from 'lucide-react'
import './RecognitionAnalytics.css'

const RecognitionAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredBar, setHoveredBar] = useState(null)
  const [animateChart, setAnimateChart] = useState(false)

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'teamwork', label: 'Teamwork' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'customer-focus', label: 'Customer Focus' }
  ]

  const getChartData = () => {
    const baseData = {
      week: [
        { day: 'Mon', recognitions: 12, color: '#3b82f6' },
        { day: 'Tue', recognitions: 19, color: '#10b981' },
        { day: 'Wed', recognitions: 15, color: '#8b5cf6' },
        { day: 'Thu', recognitions: 22, color: '#f59e0b' },
        { day: 'Fri', recognitions: 28, color: '#ef4444' },
        { day: 'Sat', recognitions: 8, color: '#06b6d4' },
        { day: 'Sun', recognitions: 5, color: '#84cc16' }
      ],
      month: [
        { day: 'Week 1', recognitions: 85, color: '#3b82f6' },
        { day: 'Week 2', recognitions: 92, color: '#10b981' },
        { day: 'Week 3', recognitions: 78, color: '#8b5cf6' },
        { day: 'Week 4', recognitions: 105, color: '#f59e0b' }
      ],
      quarter: [
        { day: 'Jan', recognitions: 320, color: '#3b82f6' },
        { day: 'Feb', recognitions: 285, color: '#10b981' },
        { day: 'Mar', recognitions: 395, color: '#8b5cf6' }
      ],
      year: [
        { day: 'Q1', recognitions: 1200, color: '#3b82f6' },
        { day: 'Q2', recognitions: 1450, color: '#10b981' },
        { day: 'Q3', recognitions: 1380, color: '#8b5cf6' },
        { day: 'Q4', recognitions: 1620, color: '#f59e0b' }
      ]
    }
    return baseData[selectedPeriod] || baseData.month
  }

  const chartData = getChartData()

  const maxRecognitions = Math.max(...chartData.map(d => d.recognitions))

  const categoryBreakdown = [
    { category: 'Teamwork', count: 45, percentage: 35, color: '#3b82f6' },
    { category: 'Innovation', count: 32, percentage: 25, color: '#10b981' },
    { category: 'Leadership', count: 28, percentage: 22, color: '#8b5cf6' },
    { category: 'Customer Focus', count: 23, percentage: 18, color: '#f59e0b' }
  ]

  const trendingMetrics = [
    { 
      label: 'Recognition Rate', 
      value: '+15%', 
      trend: 'up', 
      icon: TrendingUp,
      color: '#10b981'
    },
    { 
      label: 'Participation', 
      value: '+8%', 
      trend: 'up', 
      icon: Users,
      color: '#3b82f6'
    },
    { 
      label: 'Avg Response Time', 
      value: '-12%', 
      trend: 'down', 
      icon: Zap,
      color: '#8b5cf6'
    },
    { 
      label: 'Goal Achievement', 
      value: '94%', 
      trend: 'up', 
      icon: Target,
      color: '#f59e0b'
    }
  ]

  return (
    <div className="recognition-analytics-card">
      <div className="analytics-header">
        <div className="header-left">
          <h2 className="analytics-title">
            <BarChart3 className="analytics-title-icon" />
            Recognition Analytics
          </h2>
        </div>
        <div className="header-filters">
          <select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value)
              setAnimateChart(true)
              setTimeout(() => setAnimateChart(false), 500)
            }}
            className="filter-select"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setAnimateChart(true)
              setTimeout(() => setAnimateChart(false), 500)
            }}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="analytics-content">
        {/* Trending Metrics */}
        <div className="trending-metrics">
          {trendingMetrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <div className="metric-icon-container" style={{ backgroundColor: metric.color }}>
                <metric.icon className="metric-icon" />
              </div>
              <div className="metric-content">
                <span className="metric-value" style={{ color: metric.color }}>
                  {metric.value}
                </span>
                <span className="metric-label">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <h3 className="chart-title">Daily Recognition Trends</h3>
          <div className="chart-container">
            <div className="chart-bars">
              {chartData.map((data, index) => (
                <div
                  key={index}
                  className="chart-bar-container"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div
                    className={`chart-bar ${animateChart ? 'animate' : ''} ${hoveredBar === index ? 'hovered' : ''}`}
                    style={{
                      height: `${(data.recognitions / maxRecognitions) * 100}%`,
                      backgroundColor: data.color,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className={`bar-tooltip ${hoveredBar === index ? 'visible' : ''}`}>
                      <strong>{data.recognitions}</strong> recognitions
                      <br />
                      <small>{data.day}</small>
                    </div>
                  </div>
                  <span className="chart-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="category-breakdown">
          <h3 className="breakdown-title">Recognition by Category</h3>
          <div className="breakdown-list">
            {categoryBreakdown.map((item, index) => (
              <div key={index} className="breakdown-item">
                <div className="breakdown-info">
                  <span className="breakdown-category">{item.category}</span>
                  <span className="breakdown-count">{item.count}</span>
                </div>
                <div className="breakdown-bar-container">
                  <div 
                    className="breakdown-bar"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
                <span className="breakdown-percentage">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecognitionAnalytics
