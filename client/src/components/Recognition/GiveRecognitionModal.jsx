import { useState } from 'react'
import { X, Search, Users, Award, Lightbulb, Crown, Heart, Star, ThumbsUp, Zap } from 'lucide-react'
import './GiveRecognitionModal.css'

const GiveRecognitionModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    recipient: null,
    category: '',
    message: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const colleagues = [
    { id: 1, name: 'Sarah Chen', department: 'Engineering', avatar: 'SC', role: 'Senior Developer' },
    { id: 2, name: 'Michael Torres', department: 'Design', avatar: 'MT', role: 'UI/UX Designer' },
    { id: 3, name: 'Emily Johnson', department: 'Marketing', avatar: 'EJ', role: 'Marketing Manager' },
    { id: 4, name: 'David Kim', department: 'Sales', avatar: 'DK', role: 'Sales Representative' },
    { id: 5, name: 'Lisa Wang', department: 'HR', avatar: 'LW', role: 'HR Specialist' },
    { id: 6, name: 'Alex Morgan', department: 'Engineering', avatar: 'AM', role: 'DevOps Engineer' },
    { id: 7, name: 'James Wilson', department: 'Operations', avatar: 'JW', role: 'Operations Manager' },
  ]

  const categories = [
    {
      value: 'teamwork',
      label: 'Teamwork',
      icon: Users,
      description: 'Great collaboration and team spirit',
      color: '#3b82f6'
    },
    {
      value: 'excellence',
      label: 'Excellence',
      icon: Award,
      description: 'Outstanding work quality and results',
      color: '#f59e0b'
    },
    {
      value: 'innovation',
      label: 'Innovation',
      icon: Lightbulb,
      description: 'Creative thinking and new ideas',
      color: '#8b5cf6'
    },
    {
      value: 'leadership',
      label: 'Leadership',
      icon: Crown,
      description: 'Inspiring and guiding others',
      color: '#ef4444'
    },
    {
      value: 'dedication',
      label: 'Dedication',
      icon: Star,
      description: 'Going above and beyond',
      color: '#10b981'
    },
    {
      value: 'support',
      label: 'Support',
      icon: ThumbsUp,
      description: 'Helping others succeed',
      color: '#06b6d4'
    }
  ]

  const filteredColleagues = colleagues.filter(colleague =>
    colleague.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    colleague.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    colleague.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRecipientSelect = (colleague) => {
    setFormData(prev => ({ ...prev, recipient: colleague }))
    setCurrentStep(2)
  }

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category: category.value }))
    setCurrentStep(3)
  }

  const handleSubmit = () => {
    if (!formData.recipient || !formData.category || !formData.message.trim()) {
      alert('Please complete all steps')
      return
    }

    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        // Reset form
        setFormData({
          recipient: null,
          category: '',
          message: ''
        })
        setCurrentStep(1)
        setSearchTerm('')
      }, 2000)
    }, 500)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    onClose()
    setCurrentStep(1)
    setFormData({
      recipient: null,
      category: '',
      message: ''
    })
    setSearchTerm('')
  }

  if (!isOpen) return null

  const selectedCategory = categories.find(cat => cat.value === formData.category)

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <h3>Recognition Sent!</h3>
            <p>You just made {formData.recipient?.name}'s day brighter!</p>
          </div>
        ) : (
          <>
            {/* Header with Steps */}
            <div className="modal-header">
              <div className="header-content">
                <h2>Give Recognition</h2>
                <div className="step-indicator">
                  <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                  <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                  <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                </div>
              </div>
              <button onClick={handleClose} className="close-button">
                <X className="close-icon" />
              </button>
            </div>

            <div className="modal-form">
              {/* Step 1: Choose Recipient */}
              {currentStep === 1 && (
                <div className="step-content">
                  <div className="step-header">
                    <h3>👤 Who deserves recognition?</h3>
                    <p>Search and select a colleague to recognize</p>
                  </div>

                  <div className="search-container">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search by name, department, or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  <div className="recipients-grid">
                    {filteredColleagues.map(colleague => (
                      <div
                        key={colleague.id}
                        onClick={() => handleRecipientSelect(colleague)}
                        className="recipient-card"
                      >
                        <div className="recipient-avatar">
                          {colleague.avatar}
                        </div>
                        <div className="recipient-info">
                          <h4 className="recipient-name">{colleague.name}</h4>
                          <p className="recipient-role">{colleague.role}</p>
                          <span className="recipient-department">{colleague.department}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Choose Category */}
              {currentStep === 2 && (
                <div className="step-content">
                  <div className="step-header">
                    <h3>🏆 What are you recognizing?</h3>
                    <p>Choose the category that best describes their achievement</p>
                  </div>

                  {formData.recipient && (
                    <div className="selected-recipient-display">
                      <div className="recipient-avatar">
                        {formData.recipient.avatar}
                      </div>
                      <div>
                        <h4>{formData.recipient.name}</h4>
                        <p>{formData.recipient.role}</p>
                      </div>
                    </div>
                  )}

                  <div className="categories-grid">
                    {categories.map(category => (
                      <div
                        key={category.value}
                        onClick={() => handleCategorySelect(category)}
                        className="category-card"
                        style={{ '--category-color': category.color }}
                      >
                        <div className="category-icon-container">
                          <category.icon className="category-icon" />
                        </div>
                        <h4 className="category-title">{category.label}</h4>
                        <p className="category-description">{category.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="step-actions">
                    <button onClick={handleBack} className="back-button">
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Write Message */}
              {currentStep === 3 && (
                <div className="step-content">
                  <div className="step-header">
                    <h3>💬 Write your message</h3>
                    <p>Share why you're recognizing {formData.recipient?.name}</p>
                  </div>

                  <div className="recognition-summary">
                    <div className="summary-item">
                      <span className="summary-label">Recognizing:</span>
                      <div className="summary-recipient">
                        <div className="recipient-avatar small">
                          {formData.recipient?.avatar}
                        </div>
                        <span>{formData.recipient?.name}</span>
                      </div>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">For:</span>
                      <div className="summary-category">
                        {selectedCategory && (
                          <>
                            <selectedCategory.icon className="category-icon small" />
                            <span>{selectedCategory.label}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="message-container">
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={`Tell ${formData.recipient?.name} what they did that impressed you...`}
                      className="message-textarea"
                      rows={6}
                    />
                    <div className="message-counter">
                      {formData.message.length}/500
                    </div>
                  </div>

                  <div className="step-actions">
                    <button onClick={handleBack} className="back-button">
                      ← Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="submit-button"
                      disabled={!formData.message.trim()}
                    >
                      Send Recognition 🎉
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GiveRecognitionModal
