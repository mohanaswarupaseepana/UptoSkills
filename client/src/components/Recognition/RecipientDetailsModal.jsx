import { X, Award, Trophy, Users, Calendar, TrendingUp, Star } from 'lucide-react'
import './RecipientDetailsModal.css'

const RecipientDetailsModal = ({ recipient, isOpen, onClose }) => {
  if (!isOpen || !recipient) return null

  const recentRecognitions = [
    {
      id: 1,
      from: 'Sarah Chen',
      category: 'Leadership',
      message: 'Outstanding leadership during the Q4 project. Your guidance helped the team exceed expectations.',
      date: '2 days ago',
      likes: 15
    },
    {
      id: 2,
      from: 'Michael Torres',
      category: 'Teamwork',
      message: 'Always willing to help teammates and share knowledge. A true team player!',
      date: '1 week ago',
      likes: 12
    },
    {
      id: 3,
      from: 'Emily Johnson',
      category: 'Innovation',
      message: 'Brilliant solution to the customer portal issue. Your creativity saved us weeks of work.',
      date: '2 weeks ago',
      likes: 18
    }
  ]

  const achievements = [
    { icon: Trophy, name: 'Top Performer', description: 'Highest recognition score this quarter' },
    { icon: Users, name: 'Team Player', description: 'Most collaborative team member' },
    { icon: Star, name: 'Customer Champion', description: 'Outstanding customer service' },
    { icon: Award, name: 'Innovation Leader', description: 'Most creative solutions' }
  ]

  const monthlyStats = [
    { month: 'Jan', recognitions: 8 },
    { month: 'Feb', recognitions: 12 },
    { month: 'Mar', recognitions: 15 },
    { month: 'Apr', recognitions: 18 },
    { month: 'May', recognitions: 22 },
    { month: 'Jun', recognitions: 25 }
  ]

  return (
    <div className="recipient-modal-overlay" onClick={onClose}>
      <div className="recipient-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="recipient-modal-header">
          <div className="recipient-modal-profile">
            <div className={`recipient-modal-avatar ${recipient.bgColor === 'bg-blue-500' ? 'blue' : recipient.bgColor === 'bg-gray-500' ? 'gray' : 'light-gray'}`}>
              <span className="recipient-modal-avatar-text">
                {recipient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="recipient-modal-info">
              <h2 className="recipient-modal-name">{recipient.name}</h2>
              <p className="recipient-modal-title">Senior Software Engineer</p>
              <p className="recipient-modal-department">Engineering Team</p>
            </div>
          </div>
          <button onClick={onClose} className="recipient-modal-close">
            <X className="close-icon" />
          </button>
        </div>

        {/* Stats Overview */}
        <div className="recipient-modal-stats">
          <div className="stat-item">
            <div className="stat-number">{recipient.points}</div>
            <div className="stat-label">Total Points</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{recipient.badges}</div>
            <div className="stat-label">Badges Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">#{recipient.rank}</div>
            <div className="stat-label">Current Rank</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">25</div>
            <div className="stat-label">This Month</div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="recipient-modal-content">
          {/* Achievements */}
          <div className="modal-section">
            <h3 className="section-title">
              <Trophy className="section-icon" />
              Achievements
            </h3>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <achievement.icon className="achievement-card-icon" />
                  <div className="achievement-card-info">
                    <h4 className="achievement-card-name">{achievement.name}</h4>
                    <p className="achievement-card-desc">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Recognitions */}
          <div className="modal-section">
            <h3 className="section-title">
              <Award className="section-icon" />
              Recent Recognitions
            </h3>
            <div className="recognitions-list">
              {recentRecognitions.map((recognition) => (
                <div key={recognition.id} className="recognition-card">
                  <div className="recognition-header">
                    <div className="recognition-from">
                      <div className="recognition-avatar">
                        {recognition.from.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="recognition-meta">
                        <span className="recognition-author">{recognition.from}</span>
                        <span className="recognition-category">{recognition.category}</span>
                      </div>
                    </div>
                    <span className="recognition-date">{recognition.date}</span>
                  </div>
                  <p className="recognition-message">{recognition.message}</p>
                  <div className="recognition-footer">
                    <span className="recognition-likes">❤️ {recognition.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Trend */}
          <div className="modal-section">
            <h3 className="section-title">
              <TrendingUp className="section-icon" />
              Recognition Trend
            </h3>
            <div className="trend-chart">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="trend-bar">
                  <div 
                    className="trend-bar-fill" 
                    style={{ height: `${(stat.recognitions / 25) * 100}%` }}
                  ></div>
                  <span className="trend-month">{stat.month}</span>
                  <span className="trend-value">{stat.recognitions}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipientDetailsModal
