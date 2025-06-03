import './MonthlyStats.css'

const MonthlyStats = () => {
  const stats = [
    {
      label: 'Recognition Sent',
      value: 24,
      maxValue: 50,
      color: 'bg-blue-500',
    },
    {
      label: 'Recognition Received',
      value: 18,
      maxValue: 50,
      color: 'bg-green-500',
    },
  ]

  return (
    <div className="monthly-stats-card">
      <div className="monthly-stats-header">
        <h2 className="monthly-stats-title">Monthly Statistics</h2>
      </div>
      <div className="monthly-stats-content">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>

            {/* Progress Bar */}
            <div className="stat-progress-container">
              <div
                className={`stat-progress-bar ${stat.color === 'bg-blue-500' ? 'blue' : 'green'}`}
                style={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthlyStats
