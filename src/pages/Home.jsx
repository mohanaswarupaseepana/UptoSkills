import React from 'react';
import { Link } from 'react-router-dom';

// Import icons from react-icons
import {
  FaNewspaper,
  FaUserFriends,
  FaAward,
  FaUsers,
  FaPoll,
  FaCalendarAlt,
  FaPhotoVideo,
  FaTrophy,
  FaSearch,
  FaBlog
} from 'react-icons/fa';

const Home = function () {
  const menuItems = [
    { name: 'Newsfeed', icon: <FaNewspaper /> },
    { name: 'Profiles', icon: <FaUserFriends /> },
    { name: 'Recognition', icon: <FaAward /> },
    { name: 'Groups', icon: <FaUsers /> },
    { name: 'Polls', icon: <FaPoll /> },
    { name: 'Event', icon: <FaCalendarAlt /> },
    { name: 'Media', icon: <FaPhotoVideo /> },
    { name: 'Leaderboard', icon: <FaTrophy /> },
    { name: 'Spotlight', icon: <FaSearch /> },
    { name: 'HR Blog', icon: <FaBlog /> }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav style={{
        width: '250px',
        backgroundColor: 'white',
        borderRight: '3px solid #dcdcdc', // bold separator
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{
          marginBottom: '30px',
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>
          HR Social Hub
        </h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {menuItems.map(({ name, icon }) => (
            <li key={name} style={{ marginBottom: '12px' }}>
              {name === 'Profiles' ? (
                <Link
                  to="/profiles"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#e0f7ff', // light blue background
                    padding: '10px 15px',
                    borderRadius: '8px',
                    color: '#2c3e50',
                    textDecoration: 'none',
                    fontWeight: '500',
                    boxShadow: '0 0 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {icon} {name}
                </Link>
              ) : (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    color: '#7f8c8d',
                    cursor: 'default'
                  }}
                >
                  {icon} {name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Home Page</h1>
        <p>Welcome to the home page!</p>
      </main>
    </div>
  );
}

export default Home;
