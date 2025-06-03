import { useState } from 'react'
import './EmojiPicker.css'

const EmojiPicker = ({ onEmojiSelect, onClose }) => {
  const emojis = [
    '👏', '🎉', '🌟', '💪', '🚀', '🔥', '💯', '✨',
    '👍', '❤️', '🙌', '💡', '🏆', '🎯', '⭐', '🎊',
    '😊', '😍', '🤩', '🥳', '👌', '💖', '🌈', '🎈'
  ]

  const gifs = [
    { id: 1, url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', title: 'Celebration' },
    { id: 2, url: 'https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif', title: 'Applause' },
    { id: 3, url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', title: 'High Five' },
    { id: 4, url: 'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif', title: 'Thumbs Up' },
  ]

  const [activeTab, setActiveTab] = useState('emojis')

  return (
    <div className="emoji-picker-overlay" onClick={onClose}>
      <div className="emoji-picker-container" onClick={(e) => e.stopPropagation()}>
        <div className="emoji-picker-header">
          <div className="emoji-picker-tabs">
            <button 
              className={`tab ${activeTab === 'emojis' ? 'active' : ''}`}
              onClick={() => setActiveTab('emojis')}
            >
              😊 Emojis
            </button>
            <button 
              className={`tab ${activeTab === 'gifs' ? 'active' : ''}`}
              onClick={() => setActiveTab('gifs')}
            >
              🎬 GIFs
            </button>
          </div>
          <button onClick={onClose} className="close-picker">×</button>
        </div>
        
        <div className="emoji-picker-content">
          {activeTab === 'emojis' ? (
            <div className="emoji-grid">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="emoji-item"
                  onClick={() => {
                    onEmojiSelect(emoji)
                    onClose()
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            <div className="gif-grid">
              {gifs.map((gif) => (
                <div
                  key={gif.id}
                  className="gif-item"
                  onClick={() => {
                    onEmojiSelect(`![${gif.title}](${gif.url})`)
                    onClose()
                  }}
                >
                  <img src={gif.url} alt={gif.title} />
                  <span className="gif-title">{gif.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmojiPicker
