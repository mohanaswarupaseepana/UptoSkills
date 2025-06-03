import { useState } from 'react'
import { X, Heart, MessageCircle, Award, Users, CheckCircle, Filter, Search, ArrowLeft } from 'lucide-react'
import './NotificationsPage.css'

const NotificationsPage = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'recognition',
      icon: Award,
      title: 'New Recognition Received',
      message: 'Sarah Chen recognized you for "Outstanding Leadership" in the Q4 project. Your guidance helped the team exceed expectations.',
      time: '5 minutes ago',
      date: '2024-01-15',
      isRead: false,
      avatar: 'SC',
      category: 'Recognition'
    },
    {
      id: 2,
      type: 'like',
      icon: Heart,
      title: 'Someone liked your recognition',
      message: 'Michael Torres and 3 others liked your recognition post about team collaboration.',
      time: '1 hour ago',
      date: '2024-01-15',
      isRead: false,
      avatar: 'MT',
      category: 'Engagement'
    },
    {
      id: 3,
      type: 'comment',
      icon: MessageCircle,
      title: 'New comment on your post',
      message: 'Emily Johnson commented: "Well deserved! Your leadership during the project was exceptional."',
      time: '2 hours ago',
      date: '2024-01-15',
      isRead: true,
      avatar: 'EJ',
      category: 'Engagement'
    },
    {
      id: 4,
      type: 'achievement',
      icon: Award,
      title: 'Achievement Unlocked!',
      message: 'You earned the "Team Player" badge for your exceptional collaboration and support to colleagues.',
      time: '1 day ago',
      date: '2024-01-14',
      isRead: true,
      avatar: null,
      category: 'Achievement'
    },
    {
      id: 5,
      type: 'mention',
      icon: Users,
      title: 'You were mentioned',
      message: 'David Kim mentioned you in a recognition post: "Thanks to Alex for the amazing support on the customer portal project."',
      time: '2 days ago',
      date: '2024-01-13',
      isRead: true,
      avatar: 'DK',
      category: 'Mention'
    },
    {
      id: 6,
      type: 'recognition',
      icon: Award,
      title: 'Recognition from Manager',
      message: 'Lisa Wang (Manager) recognized you for "Innovation Excellence" for your creative solution to the data processing challenge.',
      time: '3 days ago',
      date: '2024-01-12',
      isRead: true,
      avatar: 'LW',
      category: 'Recognition'
    },
    {
      id: 7,
      type: 'like',
      icon: Heart,
      title: 'Multiple likes received',
      message: 'Your recent achievement post received 15 likes from colleagues across different departments.',
      time: '4 days ago',
      date: '2024-01-11',
      isRead: true,
      avatar: null,
      category: 'Engagement'
    },
    {
      id: 8,
      type: 'achievement',
      icon: Award,
      title: 'Monthly Achievement',
      message: 'You earned the "Customer Champion" badge for consistently delivering excellent customer service this month.',
      time: '1 week ago',
      date: '2024-01-08',
      isRead: true,
      avatar: null,
      category: 'Achievement'
    }
  ])

  const filterOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'recognition', label: 'Recognition' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'mention', label: 'Mentions' }
  ]

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.isRead) ||
                         (filter === 'recognition' && notification.category === 'Recognition') ||
                         (filter === 'engagement' && notification.category === 'Engagement') ||
                         (filter === 'achievement' && notification.category === 'Achievement') ||
                         (filter === 'mention' && notification.category === 'Mention')
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id 
        ? { ...notification, isRead: true }
        : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (!isOpen) return null

  return (
    <div className="notifications-page-overlay">
      <div className="notifications-page-container">
        {/* Header */}
        <div className="notifications-page-header">
          <div className="header-left">
            <button onClick={onClose} className="back-button">
              <ArrowLeft className="back-icon" />
            </button>
            <div className="header-title">
              <h1>All Notifications</h1>
              <p>{filteredNotifications.length} notifications</p>
            </div>
          </div>
          <div className="header-actions">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read-button">
                <CheckCircle className="check-icon" />
                Mark all as read ({unreadCount})
              </button>
            )}
            <button onClick={onClose} className="close-page-button">
              <X className="close-icon" />
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="notifications-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <Filter className="filter-icon" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-page-content">
          {filteredNotifications.length === 0 ? (
            <div className="no-notifications-found">
              <Award className="no-notifications-icon" />
              <h3>No notifications found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="notifications-page-list">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-page-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-page-icon-container">
                    {notification.avatar ? (
                      <div className="notification-page-avatar">
                        {notification.avatar}
                      </div>
                    ) : (
                      <div className="notification-page-icon-wrapper">
                        <notification.icon className="notification-page-icon" />
                      </div>
                    )}
                  </div>
                  
                  <div className="notification-page-content-area">
                    <div className="notification-page-header-area">
                      <h3 className="notification-page-title">{notification.title}</h3>
                      <div className="notification-page-meta">
                        <span className="notification-page-category">{notification.category}</span>
                        <span className="notification-page-time">{notification.time}</span>
                      </div>
                    </div>
                    <p className="notification-page-message">{notification.message}</p>
                  </div>
                  
                  {!notification.isRead && (
                    <div className="notification-page-unread-indicator"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
