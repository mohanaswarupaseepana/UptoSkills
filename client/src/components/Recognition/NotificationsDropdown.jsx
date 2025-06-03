import { useState } from 'react'
import { X, Heart, MessageCircle, Award, Users, CheckCircle } from 'lucide-react'
import './NotificationsDropdown.css'

const NotificationsDropdown = ({ isOpen, onClose, notificationCount, onMarkAllRead, onViewAll }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'recognition',
      icon: Award,
      title: 'New Recognition Received',
      message: 'Sarah Chen recognized you for "Outstanding Leadership"',
      time: '5 minutes ago',
      isRead: false,
      avatar: 'SC'
    },
    {
      id: 2,
      type: 'like',
      icon: Heart,
      title: 'Someone liked your recognition',
      message: 'Michael Torres liked your recognition post',
      time: '1 hour ago',
      isRead: false,
      avatar: 'MT'
    },
    {
      id: 3,
      type: 'comment',
      icon: MessageCircle,
      title: 'New comment on your post',
      message: 'Emily Johnson commented: "Well deserved!"',
      time: '2 hours ago',
      isRead: true,
      avatar: 'EJ'
    },
    {
      id: 4,
      type: 'achievement',
      icon: Award,
      title: 'Achievement Unlocked!',
      message: 'You earned the "Team Player" badge',
      time: '1 day ago',
      isRead: true,
      avatar: null
    },
    {
      id: 5,
      type: 'mention',
      icon: Users,
      title: 'You were mentioned',
      message: 'David Kim mentioned you in a recognition post',
      time: '2 days ago',
      isRead: true,
      avatar: 'DK'
    }
  ])

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id
        ? { ...notification, isRead: true }
        : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })))
    onMarkAllRead()
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (!isOpen) return null

  return (
    <div className="notifications-overlay" onClick={onClose}>
      <div className="notifications-dropdown" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="notifications-header">
          <div className="notifications-title">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount} new</span>
            )}
          </div>
          <div className="notifications-actions">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read-btn">
                <CheckCircle className="check-icon" />
                Mark all read
              </button>
            )}
            <button onClick={onClose} className="close-notifications-btn">
              <X className="close-icon" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <Award className="no-notifications-icon" />
              <p>No notifications yet</p>
              <span>You'll see recognition updates here</span>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon-container">
                  {notification.avatar ? (
                    <div className="notification-avatar">
                      {notification.avatar}
                    </div>
                  ) : (
                    <div className="notification-icon-wrapper">
                      <notification.icon className="notification-icon" />
                    </div>
                  )}
                </div>

                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                </div>

                {!notification.isRead && (
                  <div className="unread-indicator"></div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="notifications-footer">
            <button onClick={onViewAll} className="view-all-btn">
              View all notifications
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsDropdown
