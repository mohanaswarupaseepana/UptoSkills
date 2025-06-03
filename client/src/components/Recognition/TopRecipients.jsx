import { useState } from 'react'
import RecipientDetailsModal from './RecipientDetailsModal'
import './TopRecipients.css'

const TopRecipients = () => {
  const topRecipients = [
    {
      rank: 1,
      name: 'Alex Morgan',
      points: 450,
      badges: 6,
      bgColor: 'bg-blue-500',
    },
    {
      rank: 2,
      name: 'James Wilson',
      points: 380,
      badges: 4,
      bgColor: 'bg-gray-500',
    },
    {
      rank: 3,
      name: 'Lisa Chen',
      points: 320,
      badges: 5,
      bgColor: 'bg-gray-400',
    },
  ]

  const [selectedRecipient, setSelectedRecipient] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRecipientClick = (recipient) => {
    setSelectedRecipient(recipient)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRecipient(null)
  }

  return (
    <div className="top-recipients-card">
      <div className="top-recipients-header">
        <h2 className="top-recipients-title">Top Recognition Recipients</h2>
      </div>
      <div className="top-recipients-content">
        {topRecipients.map((recipient) => (
          <div
            key={recipient.rank}
            className="recipient-item clickable"
            onClick={() => handleRecipientClick(recipient)}
          >
            {/* Rank */}
            <div className="recipient-rank">
              <span className="recipient-rank-number">{recipient.rank}</span>
            </div>

            {/* Avatar */}
            <div className={`recipient-avatar ${recipient.bgColor === 'bg-blue-500' ? 'blue' : recipient.bgColor === 'bg-gray-500' ? 'gray' : 'light-gray'}`}>
              <span className="recipient-avatar-text">
                {recipient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            {/* Info */}
            <div className="recipient-info">
              <h3 className="recipient-name">{recipient.name}</h3>
              <div className="recipient-stats">
                {recipient.points} points • {recipient.badges} badges
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipient Details Modal */}
      <RecipientDetailsModal
        recipient={selectedRecipient}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default TopRecipients
