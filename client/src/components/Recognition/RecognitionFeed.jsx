import { useState, useEffect, useRef } from 'react'
import { Heart, MessageCircle, ArrowRight, Send, Upload, Filter, Calendar, Users, Award, Edit3, MoreHorizontal } from 'lucide-react'
import './RecognitionFeed.css'

const RecognitionFeed = ({ onEditRecognition }) => {
  // Current user context (in a real app, this would come from auth context)
  const currentUser = 'Sarah Chen'
  const dropdownRef = useRef(null)
  const [allRecognitions] = useState([
    {
      id: 1,
      from: 'Sarah Chen',
      to: 'Michael Torres',
      fromAvatar: 'SC',
      toAvatar: 'MT',
      message: 'Outstanding work on the Q4 project presentation. Your attention to detail and clear communication made a huge impact.',
      timestamp: '2 hours ago',
      timeCategory: 'today',
      category: 'leadership',
      department: 'Engineering',
      likes: 12,
      comments: ['Great job Michael!', 'Well deserved recognition!'],
      isLiked: false,
      attachments: [],
    },
    {
      id: 2,
      from: 'David Kim',
      to: 'Emily Johnson',
      fromAvatar: 'DK',
      toAvatar: 'EJ',
      message: 'Thank you for stepping up to help the new team members get onboarded. Your leadership really shows!',
      timestamp: '3 hours ago',
      timeCategory: 'today',
      category: 'teamwork',
      department: 'HR',
      likes: 8,
      comments: ['Amazing leadership Emily!'],
      isLiked: true,
      attachments: [],
    },
    {
      id: 3,
      from: 'Lisa Wang',
      to: 'Alex Morgan',
      fromAvatar: 'LW',
      toAvatar: 'AM',
      message: 'Incredible innovation on the customer portal redesign. Your creative solutions saved us weeks of development time!',
      timestamp: '1 day ago',
      timeCategory: 'week',
      category: 'innovation',
      department: 'Design',
      likes: 15,
      comments: ['So creative!', 'Well deserved!'],
      isLiked: false,
      attachments: [],
    },
    {
      id: 4,
      from: 'James Wilson',
      to: 'Sarah Chen',
      fromAvatar: 'JW',
      toAvatar: 'SC',
      message: 'Outstanding customer service during the product launch. Your dedication to helping customers was exceptional.',
      timestamp: '2 days ago',
      timeCategory: 'week',
      category: 'customer-focus',
      department: 'Support',
      likes: 10,
      comments: ['Customer champion!'],
      isLiked: true,
      attachments: [],
    },
    {
      id: 5,
      from: 'Emily Johnson',
      to: 'David Kim',
      fromAvatar: 'EJ',
      toAvatar: 'DK',
      message: 'Going above and beyond on the quarterly report. Your analysis provided valuable insights for the entire team.',
      timestamp: '1 week ago',
      timeCategory: 'month',
      category: 'above-beyond',
      department: 'Analytics',
      likes: 7,
      comments: ['Great insights!'],
      isLiked: false,
      attachments: [],
    },
    {
      id: 6,
      from: 'Michael Torres',
      to: 'Lisa Wang',
      fromAvatar: 'MT',
      toAvatar: 'LW',
      message: 'Excellent teamwork during the system migration. Your coordination kept everything running smoothly.',
      timestamp: '2 weeks ago',
      timeCategory: 'month',
      category: 'teamwork',
      department: 'Operations',
      likes: 13,
      comments: ['Smooth migration!', 'Great coordination!'],
      isLiked: true,
      attachments: [],
    }
  ])

  const [recognitions, setRecognitions] = useState(allRecognitions)

  const [showComments, setShowComments] = useState({})
  const [newComment, setNewComment] = useState({})
  const [commentAttachments, setCommentAttachments] = useState({})
  const [showDropdown, setShowDropdown] = useState({})
  const [filters, setFilters] = useState({
    timeFilter: 'all',
    categoryFilter: 'all',
    departmentFilter: 'all'
  })
  const [showFilters, setShowFilters] = useState(false)

  const filterOptions = {
    time: [
      { value: 'all', label: 'All Time' },
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' }
    ],
    category: [
      { value: 'all', label: 'All Categories' },
      { value: 'leadership', label: 'Leadership' },
      { value: 'teamwork', label: 'Teamwork' },
      { value: 'innovation', label: 'Innovation' },
      { value: 'customer-focus', label: 'Customer Focus' },
      { value: 'above-beyond', label: 'Above & Beyond' }
    ],
    department: [
      { value: 'all', label: 'All Departments' },
      { value: 'Engineering', label: 'Engineering' },
      { value: 'Design', label: 'Design' },
      { value: 'HR', label: 'HR' },
      { value: 'Support', label: 'Support' },
      { value: 'Analytics', label: 'Analytics' },
      { value: 'Operations', label: 'Operations' }
    ]
  }

  // Apply filters to recognitions
  const filteredRecognitions = allRecognitions.filter(recognition => {
    const timeMatch = filters.timeFilter === 'all' || recognition.timeCategory === filters.timeFilter
    const categoryMatch = filters.categoryFilter === 'all' || recognition.category === filters.categoryFilter
    const departmentMatch = filters.departmentFilter === 'all' || recognition.department === filters.departmentFilter

    return timeMatch && categoryMatch && departmentMatch
  })

  // Update recognitions when filters change
  useState(() => {
    setRecognitions(filteredRecognitions)
  }, [filters])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
    setRecognitions(allRecognitions.filter(recognition => {
      const newFilters = { ...filters, [filterType]: value }
      const timeMatch = newFilters.timeFilter === 'all' || recognition.timeCategory === newFilters.timeFilter
      const categoryMatch = newFilters.categoryFilter === 'all' || recognition.category === newFilters.categoryFilter
      const departmentMatch = newFilters.departmentFilter === 'all' || recognition.department === newFilters.departmentFilter

      return timeMatch && categoryMatch && departmentMatch
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      timeFilter: 'all',
      categoryFilter: 'all',
      departmentFilter: 'all'
    })
    setRecognitions(allRecognitions)
  }

  const activeFiltersCount = Object.values(filters).filter(value => value !== 'all').length

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLike = (id) => {
    setRecognitions(prev => prev.map(recognition =>
      recognition.id === id
        ? {
            ...recognition,
            isLiked: !recognition.isLiked,
            likes: recognition.isLiked ? recognition.likes - 1 : recognition.likes + 1
          }
        : recognition
    ))
  }

  const handleAddComment = (id) => {
    const comment = newComment[id]?.trim()
    const attachments = commentAttachments[id] || []

    if (!comment && attachments.length === 0) return

    const commentData = {
      text: comment || '',
      attachments: attachments,
      author: 'John Doe',
      timestamp: 'Just now'
    }

    setRecognitions(prev => prev.map(recognition =>
      recognition.id === id
        ? {
            ...recognition,
            comments: [...recognition.comments, commentData]
          }
        : recognition
    ))

    setNewComment(prev => ({ ...prev, [id]: '' }))
    setCommentAttachments(prev => ({ ...prev, [id]: [] }))
  }

  const toggleComments = (id) => {
    setShowComments(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleDropdown = (id) => {
    setShowDropdown(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleEditRecognition = (recognition) => {
    if (onEditRecognition) {
      onEditRecognition(recognition)
    }
    setShowDropdown({}) // Close all dropdowns
  }

  const handleFileUpload = (id, event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    const filePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            url: e.target.result
          })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(filePromises).then(fileData => {
      setCommentAttachments(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), ...fileData]
      }))
    })
  }

  const removeAttachment = (recognitionId, attachmentId) => {
    setCommentAttachments(prev => ({
      ...prev,
      [recognitionId]: prev[recognitionId]?.filter(att => att.id !== attachmentId) || []
    }))
  }

  return (
    <div className="recognition-feed-card">
      <div className="recognition-feed-header">
        <div className="header-left">
          <h2 className="recognition-feed-title">Recent Recognition</h2>
          <span className="recognition-count">({recognitions.length} posts)</span>
        </div>
        <div className="header-actions">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle-btn ${activeFiltersCount > 0 ? 'active' : ''}`}
          >
            <Filter className="filter-icon" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="filter-count">{activeFiltersCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">
                <Calendar className="filter-label-icon" />
                Time Period
              </label>
              <select
                value={filters.timeFilter}
                onChange={(e) => handleFilterChange('timeFilter', e.target.value)}
                className="filter-select"
              >
                {filterOptions.time.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <Award className="filter-label-icon" />
                Category
              </label>
              <select
                value={filters.categoryFilter}
                onChange={(e) => handleFilterChange('categoryFilter', e.target.value)}
                className="filter-select"
              >
                {filterOptions.category.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <Users className="filter-label-icon" />
                Department
              </label>
              <select
                value={filters.departmentFilter}
                onChange={(e) => handleFilterChange('departmentFilter', e.target.value)}
                className="filter-select"
              >
                {filterOptions.department.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {activeFiltersCount > 0 && (
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear All
              </button>
            )}
          </div>
        </div>
      )}
      <div className="recognition-feed-content">
        {recognitions.map((recognition) => (
          <div key={recognition.id} className="recognition-item">
            {/* Header with avatars and names */}
            <div className="recognition-header">
              <div className="recognition-header-left">
                <div className="recognition-avatar">
                  <span className="recognition-avatar-text">{recognition.fromAvatar}</span>
                </div>
                <span className="recognition-from">{recognition.from}</span>
                {recognition.from === currentUser && <span className="own-recognition-badge">Your Post</span>}
                <ArrowRight className="recognition-arrow" />
                <span className="recognition-to">{recognition.to}</span>
                <span className="recognition-timestamp">{recognition.timestamp}</span>
              </div>

              {/* Edit dropdown for user's own recognitions */}
              {recognition.from === currentUser && (
                <div className="recognition-header-right">
                  <div className="recognition-dropdown" ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(recognition.id)}
                      className="recognition-dropdown-trigger"
                      title="Edit Recognition"
                    >
                      <MoreHorizontal className="dropdown-icon" />
                    </button>

                    {showDropdown[recognition.id] && (
                      <div className="recognition-dropdown-menu">
                        <button
                          onClick={() => handleEditRecognition(recognition)}
                          className="recognition-dropdown-item"
                        >
                          <Edit3 className="dropdown-item-icon" />
                          Edit Recognition
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Message */}
            <p className="recognition-message">{recognition.message}</p>

            {/* Attachments */}
            {recognition.attachments && recognition.attachments.length > 0 && (
              <div className="recognition-attachments">
                {recognition.attachments.map((attachment, index) => (
                  <div key={index} className="attachment-preview">
                    {attachment.type?.startsWith('image/') ? (
                      <img src={attachment.url} alt={attachment.name} className="attachment-image" />
                    ) : (
                      <div className="attachment-file">
                        <Upload className="attachment-file-icon" />
                        <span className="attachment-file-name">{attachment.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="recognition-actions">
              <button
                className={`recognition-action like-action ${recognition.isLiked ? 'liked' : ''}`}
                onClick={() => handleLike(recognition.id)}
              >
                <Heart className={`recognition-action-icon ${recognition.isLiked ? 'filled' : ''}`} />
                <span>{recognition.likes}</span>
              </button>
              <button
                className="recognition-action comment-action"
                onClick={() => toggleComments(recognition.id)}
              >
                <MessageCircle className="recognition-action-icon" />
                <span>{recognition.comments.length} Comment{recognition.comments.length !== 1 ? 's' : ''}</span>
              </button>
            </div>

            {/* Comments Section */}
            {showComments[recognition.id] && (
              <div className="comments-section">
                {recognition.comments.length > 0 && (
                  <div className="comments-list">
                    {recognition.comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <div className="comment-avatar">
                          <span>JD</span>
                        </div>
                        <div className="comment-content">
                          <span className="comment-author">
                            {typeof comment === 'string' ? 'John Doe' : comment.author}
                          </span>
                          {typeof comment === 'string' ? (
                            <span className="comment-text">{comment}</span>
                          ) : (
                            <>
                              {comment.text && <span className="comment-text">{comment.text}</span>}
                              {comment.attachments && comment.attachments.length > 0 && (
                                <div className="comment-attachments">
                                  {comment.attachments.map((attachment) => (
                                    <div key={attachment.id} className="comment-attachment-display">
                                      {attachment.type.startsWith('image/') ? (
                                        <img
                                          src={attachment.url}
                                          alt={attachment.name}
                                          className="comment-attachment-display-image"
                                        />
                                      ) : (
                                        <div className="comment-attachment-display-file">
                                          <Upload className="comment-attachment-display-icon" />
                                          <span>{attachment.name}</span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Attachments Preview */}
                {commentAttachments[recognition.id] && commentAttachments[recognition.id].length > 0 && (
                  <div className="comment-attachments-preview">
                    {commentAttachments[recognition.id].map((attachment) => (
                      <div key={attachment.id} className="comment-attachment-item">
                        {attachment.type.startsWith('image/') ? (
                          <img src={attachment.url} alt={attachment.name} className="comment-attachment-image" />
                        ) : (
                          <div className="comment-attachment-file">
                            <Upload className="comment-attachment-icon" />
                            <span className="comment-attachment-name">{attachment.name}</span>
                          </div>
                        )}
                        <button
                          onClick={() => removeAttachment(recognition.id, attachment.id)}
                          className="remove-attachment-btn"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="add-comment">
                  <div className="comment-input-container">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment[recognition.id] || ''}
                      onChange={(e) => setNewComment(prev => ({ ...prev, [recognition.id]: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(recognition.id)}
                      className="comment-input"
                    />
                    <div className="comment-actions">
                      <label className="upload-btn">
                        <Upload className="upload-icon" />
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx,.txt"
                          onChange={(e) => handleFileUpload(recognition.id, e)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <button
                        onClick={() => handleAddComment(recognition.id)}
                        className="comment-send-btn"
                        disabled={!newComment[recognition.id]?.trim() && !commentAttachments[recognition.id]?.length}
                      >
                        <Send className="send-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecognitionFeed
