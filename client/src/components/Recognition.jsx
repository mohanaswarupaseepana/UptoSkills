import { useState } from 'react'
import { Plus, Bell, Award, TrendingUp, Users, Star } from 'lucide-react'
import RecognitionFeed from './Recognition/RecognitionFeed'
import TopRecipients from './Recognition/TopRecipients'
import MonthlyStats from './Recognition/MonthlyStats'
import GiveRecognitionModal from './Recognition/GiveRecognitionModal'
import UpdateRecognitionModal from './Recognition/UpdateRecognitionModal'
import NotificationsDropdown from './Recognition/NotificationsDropdown'
import NotificationsPage from './Recognition/NotificationsPage'
import RecognitionAnalytics from './Recognition/RecognitionAnalytics'
import AchievementBadges from './Recognition/AchievementBadges'

import './Recognition/MainContent.css'

const Recognition = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedRecognition, setSelectedRecognition] = useState(null)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isNotificationsPageOpen, setIsNotificationsPageOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(2)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleToggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
  }

  const handleCloseNotifications = () => {
    setIsNotificationsOpen(false)
  }

  const handleMarkAllRead = () => {
    setNotificationCount(0)
  }

  const handleViewAllNotifications = () => {
    setIsNotificationsOpen(false)
    setIsNotificationsPageOpen(true)
  }

  const handleCloseNotificationsPage = () => {
    setIsNotificationsPageOpen(false)
  }

  const handleEditRecognition = (recognition) => {
    setSelectedRecognition(recognition)
    setIsUpdateModalOpen(true)
  }

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false)
    setSelectedRecognition(null)
  }

  const handleUpdateRecognition = (updatedRecognition) => {
    // In a real app, this would update the recognition in the backend
    console.log('Recognition updated:', updatedRecognition)
    // You could also update local state here if needed
  }

  return (
    <div className="main-content">
      <div className="main-container">
        {/* Enhanced Header with Gradient Background */}
        <div className="main-header-enhanced">
          <div className="header-content">
            <div className="header-text">
              <h1 className="main-title-enhanced">
                <Award className="title-icon" />
                Recognition & Kudos
              </h1>
              <p className="main-subtitle-enhanced">Celebrate achievements and recognize your colleagues</p>
            </div>
            <div className="header-actions">
              <div className="notification-bell-enhanced" onClick={handleToggleNotifications}>
                <Bell className="notification-icon" />
                {notificationCount > 0 && (
                  <span className="notification-badge-enhanced">
                    {notificationCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="stats-cards-row">
          <div className="stat-card stat-card-blue">
            <div className="stat-icon-container">
              <Award className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">247</h3>
              <p className="stat-label">Total Recognitions</p>
            </div>
          </div>
          <div className="stat-card stat-card-green">
            <div className="stat-icon-container">
              <TrendingUp className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">+23%</h3>
              <p className="stat-label">This Month</p>
            </div>
          </div>
          <div className="stat-card stat-card-purple">
            <div className="stat-icon-container">
              <Users className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">89</h3>
              <p className="stat-label">Active Participants</p>
            </div>
          </div>
          <div className="stat-card stat-card-orange">
            <div className="stat-icon-container">
              <Star className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">4.8</h3>
              <p className="stat-label">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Enhanced Give Recognition Button */}
        <div className="give-recognition-section-enhanced">
          <button onClick={handleOpenModal} className="give-recognition-btn-enhanced">
            <Plus className="give-recognition-icon" />
            <span>Give Recognition</span>
            <div className="button-glow"></div>
          </button>
        </div>

        {/* Enhanced Main Grid Layout */}
        <div className="main-grid-enhanced">
          {/* Left Column */}
          <div className="main-left-column">
            <RecognitionFeed onEditRecognition={handleEditRecognition} />
            <RecognitionAnalytics />
          </div>

          {/* Right Column */}
          <div className="main-right-column">
            <AchievementBadges />
            <TopRecipients />
            <MonthlyStats />
          </div>
        </div>
      </div>

      {/* Give Recognition Modal */}
      <GiveRecognitionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Update Recognition Modal */}
      <UpdateRecognitionModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        recognition={selectedRecognition}
        onUpdate={handleUpdateRecognition}
      />

      {/* Notifications Dropdown */}
      <NotificationsDropdown
        isOpen={isNotificationsOpen}
        onClose={handleCloseNotifications}
        notificationCount={notificationCount}
        onMarkAllRead={handleMarkAllRead}
        onViewAll={handleViewAllNotifications}
      />

      {/* Notifications Page */}
      <NotificationsPage
        isOpen={isNotificationsPageOpen}
        onClose={handleCloseNotificationsPage}
      />
    </div>
  )
}

export default Recognition;

