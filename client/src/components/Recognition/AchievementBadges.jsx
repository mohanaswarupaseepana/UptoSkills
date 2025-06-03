import { useState } from 'react'
import { Award, Star, Crown, Zap, Heart, Users, Target, Trophy, Lock, ChevronRight } from 'lucide-react'
import './AchievementBadges.css'

const AchievementBadges = () => {
  const [selectedCategory, setSelectedCategory] = useState('earned')
  const [showAllBadges, setShowAllBadges] = useState(false)

  // Debug log to ensure component is rendering
  console.log('AchievementBadges component is rendering')

  const categories = [
    { value: 'earned', label: 'Earned', count: 12 },
    { value: 'progress', label: 'In Progress', count: 5 },
    { value: 'locked', label: 'Locked', count: 8 }
  ]

  const earnedBadges = [
    {
      id: 1,
      name: 'Team Player',
      description: 'Received 10 teamwork recognitions',
      icon: Users,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      earnedDate: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Innovation Star',
      description: 'Recognized for 5 innovative solutions',
      icon: Star,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      earnedDate: '2024-01-20',
      rarity: 'rare'
    },
    {
      id: 3,
      name: 'Leadership Crown',
      description: 'Demonstrated exceptional leadership',
      icon: Crown,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      earnedDate: '2024-02-01',
      rarity: 'epic'
    },
    {
      id: 4,
      name: 'Customer Champion',
      description: 'Outstanding customer service',
      icon: Heart,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      earnedDate: '2024-02-10',
      rarity: 'rare'
    }
  ]

  const progressBadges = [
    {
      id: 5,
      name: 'Mentor Master',
      description: 'Help 20 colleagues (15/20)',
      icon: Users,
      color: '#10b981',
      progress: 75,
      target: 20,
      current: 15
    },
    {
      id: 6,
      name: 'Speed Demon',
      description: 'Complete 50 tasks quickly (32/50)',
      icon: Zap,
      color: '#06b6d4',
      progress: 64,
      target: 50,
      current: 32
    }
  ]

  const lockedBadges = [
    {
      id: 7,
      name: 'Hall of Fame',
      description: 'Reach 1000 recognition points',
      icon: Trophy,
      requirement: '1000 points needed'
    },
    {
      id: 8,
      name: 'Perfect Month',
      description: 'Receive recognition every day for a month',
      icon: Target,
      requirement: 'Monthly streak required'
    }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#6b7280'
      case 'rare': return '#3b82f6'
      case 'epic': return '#8b5cf6'
      case 'legendary': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const renderEarnedBadges = () => (
    <div className="badges-grid">
      {earnedBadges.map(badge => (
        <div key={badge.id} className="badge-card earned">
          <div className="badge-icon-container" style={{ background: badge.gradient }}>
            <badge.icon className="badge-icon" />
            <div className="badge-glow"></div>
          </div>
          <div className="badge-content">
            <h3 className="badge-name">{badge.name}</h3>
            <p className="badge-description">{badge.description}</p>
            <div className="badge-meta">
              <span 
                className="badge-rarity" 
                style={{ color: getRarityColor(badge.rarity) }}
              >
                {badge.rarity.toUpperCase()}
              </span>
              <span className="badge-date">Earned {formatDate(badge.earnedDate)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderProgressBadges = () => (
    <div className="badges-grid">
      {progressBadges.map(badge => (
        <div key={badge.id} className="badge-card progress">
          <div className="badge-icon-container progress-icon" style={{ backgroundColor: badge.color }}>
            <badge.icon className="badge-icon" />
          </div>
          <div className="badge-content">
            <h3 className="badge-name">{badge.name}</h3>
            <p className="badge-description">{badge.description}</p>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${badge.progress}%`,
                    backgroundColor: badge.color
                  }}
                ></div>
              </div>
              <span className="progress-text">{badge.current}/{badge.target}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderLockedBadges = () => (
    <div className="badges-grid">
      {lockedBadges.map(badge => (
        <div key={badge.id} className="badge-card locked">
          <div className="badge-icon-container locked-icon">
            <Lock className="lock-icon" />
            <badge.icon className="badge-icon locked" />
          </div>
          <div className="badge-content">
            <h3 className="badge-name locked">{badge.name}</h3>
            <p className="badge-description locked">{badge.description}</p>
            <div className="badge-requirement">
              <span className="requirement-text">{badge.requirement}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className="achievement-badges-card">
        <div className="badges-header">
          <h2 className="badges-title">
            <Award className="badges-title-icon" />
            Achievement Badges - TEST RENDER
          </h2>
          <button
            className="view-all-btn"
            onClick={() => setShowAllBadges(true)}
          >
            View All
            <ChevronRight className="view-all-icon" />
          </button>
        </div>

        <div className="badges-tabs">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`tab-button ${selectedCategory === category.value ? 'active' : ''}`}
            >
              {category.label}
              <span className="tab-count">{category.count}</span>
            </button>
          ))}
        </div>

        <div className="badges-content">
          {selectedCategory === 'earned' && renderEarnedBadges()}
          {selectedCategory === 'progress' && renderProgressBadges()}
          {selectedCategory === 'locked' && renderLockedBadges()}
        </div>
      </div>

      {/* View All Badges Modal */}
      {showAllBadges && (
        <div className="badges-modal-overlay" onClick={() => setShowAllBadges(false)}>
          <div className="badges-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="badges-modal-header">
              <h2>🏆 All Achievement Badges</h2>
              <button
                className="badges-modal-close"
                onClick={() => setShowAllBadges(false)}
              >
                ×
              </button>
            </div>
            <div className="badges-modal-content">
              <div className="badges-modal-section">
                <h3>🌟 Earned Badges ({earnedBadges.length})</h3>
                <div className="badges-grid-modal">
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="badge-card-modal earned">
                      <div className="badge-icon-container-modal" style={{ background: badge.gradient }}>
                        <badge.icon className="badge-icon-modal" />
                      </div>
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="badges-modal-section">
                <h3>⚡ In Progress ({progressBadges.length})</h3>
                <div className="badges-grid-modal">
                  {progressBadges.map(badge => (
                    <div key={badge.id} className="badge-card-modal progress">
                      <div className="badge-icon-container-modal" style={{ backgroundColor: badge.color }}>
                        <badge.icon className="badge-icon-modal" />
                      </div>
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                      <div className="progress-bar-modal">
                        <div
                          className="progress-fill-modal"
                          style={{ width: `${badge.progress}%`, backgroundColor: badge.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="badges-modal-section">
                <h3>🔒 Locked Badges ({lockedBadges.length})</h3>
                <div className="badges-grid-modal">
                  {lockedBadges.map(badge => (
                    <div key={badge.id} className="badge-card-modal locked">
                      <div className="badge-icon-container-modal locked">
                        <Lock className="lock-icon-modal" />
                        <badge.icon className="badge-icon-modal locked" />
                      </div>
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                      <span className="requirement-modal">{badge.requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AchievementBadges
