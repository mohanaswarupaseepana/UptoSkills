import { useState, useEffect } from 'react'
import { X, Users, Award, Lightbulb, Crown, Heart, Star, ThumbsUp } from 'lucide-react'
import './GiveRecognitionModal.css'

const UpdateRecognitionModal = ({ isOpen, onClose, recognition, onUpdate }) => {
  const [formData, setFormData] = useState({
    category: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

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

  // Initialize form data when recognition changes
  useEffect(() => {
    if (recognition) {
      setFormData({
        category: recognition.category || '',
        message: recognition.message || ''
      })
    }
  }, [recognition])

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category: category.value }))
  }

  const handleSubmit = () => {
    if (!formData.category || !formData.message.trim()) {
      alert('Please complete all fields')
      return
    }

    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true)
      if (onUpdate) {
        onUpdate({
          ...recognition,
          category: formData.category,
          message: formData.message
        })
      }
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 2000)
    }, 500)
  }

  const handleClose = () => {
    onClose()
    setFormData({
      category: '',
      message: ''
    })
  }

  if (!isOpen || !recognition) return null

  const selectedCategory = categories.find(cat => cat.value === formData.category)

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Recognition Updated!</h3>
            <p>Your recognition for {recognition.to} has been updated successfully.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="modal-header">
              <div className="header-content">
                <h2>Update Recognition</h2>
              </div>
              <button onClick={handleClose} className="close-button">
                <X className="close-icon" />
              </button>
            </div>

            <div className="modal-form">
              <div className="step-content">
                {/* Recognition Info */}
                <div className="recognition-summary">
                  <div className="summary-item">
                    <span className="summary-label">Recognizing:</span>
                    <div className="summary-recipient">
                      <div className="recipient-avatar small">
                        {recognition.toAvatar}
                      </div>
                      <span>{recognition.to}</span>
                    </div>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="step-header">
                  <h3>🏆 Update Category</h3>
                  <p>Choose the category that best describes their achievement</p>
                </div>
                
                <div className="categories-grid">
                  {categories.map(category => (
                    <div
                      key={category.value}
                      onClick={() => handleCategorySelect(category)}
                      className={`category-card ${formData.category === category.value ? 'selected' : ''}`}
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

                {/* Message Update */}
                <div className="step-header" style={{ marginTop: '32px' }}>
                  <h3>💬 Update Message</h3>
                  <p>Edit your message of appreciation</p>
                </div>
                
                <div className="message-container">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={`Tell ${recognition.to} what they did that impressed you...`}
                    className="message-textarea"
                    rows={6}
                  />
                  <div className="message-counter">
                    {formData.message.length}/500
                  </div>
                </div>
                
                {/* Actions */}
                <div className="step-actions">
                  <button onClick={handleClose} className="back-button">
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className="submit-button"
                    disabled={!formData.message.trim() || !formData.category}
                  >
                    Update Recognition ✨
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UpdateRecognitionModal
