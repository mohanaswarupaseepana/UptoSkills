import React, { useState, useEffect, useRef } from "react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sample employee data for search
  const employees = [
    {
      id: 1,
      name: "John Doe",
      role: "Administrator",
      department: "IT",
      email: "john.doe@company.com",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "HR Manager",
      department: "Human Resources",
      email: "sarah.wilson@company.com",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Developer",
      department: "Engineering",
      email: "michael.chen@company.com",
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "Designer",
      department: "Design",
      email: "emma.davis@company.com",
    },
    {
      id: 5,
      name: "Alice Cooper",
      role: "Project Manager",
      department: "Operations",
      email: "alice.cooper@company.com",
    },
    {
      id: 6,
      name: "David Kim",
      role: "Analyst",
      department: "Finance",
      email: "david.kim@company.com",
    },
  ];

  // User profile data
  const userProfile = {
    name: "John Doe",
    role: "Administrator",
    department: "IT Department",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2022",
    employeeId: "EMP001",
    manager: "Sarah Wilson",
    location: "New York Office",
  };

  // Handle search functionality
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredEmployees([]);
      setShowSearchResults(false);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(value.toLowerCase()) ||
          employee.role.toLowerCase().includes(value.toLowerCase()) ||
          employee.department.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmployees(filtered);
      setShowSearchResults(true);
    }
  };

  // Handle notification click
  const handleNotificationClick = () => {
    setNotifications(0);
    // Add notification logic here
  };

  // Handle user profile click
  const handleUserProfileClick = () => {
    setShowUserDialog(true);
  };

  // Close dialog
  const closeDialog = () => {
    setShowUserDialog(false);
  };
  const userActivities = [
    { label: "Posts this week", value: "12" },
    { label: "Messages sent", value: "45" },
    { label: "Engagement rate", value: "78%" },
  ];

  const employeeStats = [
    { label: "Active employees", value: "92%" },
    { label: "Team performance", value: "85%" },
    { label: "Project completion", value: "73%" },
  ];

  const forYouItems = [
    {
      name: "Sarah Wilson",
      action: "Just completed the quarterly review...",
      time: "2 hours ago",
      avatar: "SW",
    },
    {
      name: "Michael Chen",
      action: "New project kickoff meeting...",
      time: "3 hours ago",
      avatar: "MC",
    },
    {
      name: "Emma Davis",
      action: "Team building event next week...",
      time: "5 hours ago",
      avatar: "ED",
    },
  ];

  const recentActivities = [
    {
      user: "Alice Cooper",
      action: "posted a new update",
      time: "2 hours ago",
      avatar: "AC",
    },
    {
      user: "David Kim",
      action: "sent a message",
      time: "3 hours ago",
      avatar: "DK",
    },
    {
      user: "Sarah Wilson",
      action: "completed a task",
      time: "5 hours ago",
      avatar: "SW",
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 bg-white text-sm"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSearchTerm(employee.name);
                        setShowSearchResults(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {employee.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {employee.role} • {employee.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500 text-sm">
                    No employees found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {notifications}
              </div>
            )}
          </div>
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors"
            onClick={handleUserProfileClick}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
              JD
            </div>
            <span className="font-medium text-gray-900">John Doe</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* User Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              User Activities
            </h3>
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            {userActivities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{activity.label}</span>
                <span className="font-bold text-lg text-gray-900">
                  {activity.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Employee Statistics
            </h3>
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            {employeeStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{stat.label}</span>
                <span className="font-bold text-lg text-green-600">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* For You */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">For You</h3>
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            {forYouItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs">
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {item.action}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-gray-600">{activity.action}</span>
                </p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
              <div className="flex space-x-2">
                <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile Dialog */}
      {showUserDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Overlay with 60% opacity */}
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={closeDialog}
          ></div>

          {/* Dialog Content */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                User Profile
              </h3>
              <button
                onClick={closeDialog}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Dialog Body */}
            <div className="p-6">
              {/* User Avatar and Basic Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {userProfile.name}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {userProfile.role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {userProfile.department}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{userProfile.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{userProfile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Join Date
                    </p>
                    <p className="text-sm text-gray-600">
                      {userProfile.joinDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Employee ID
                    </p>
                    <p className="text-sm text-gray-600">
                      {userProfile.employeeId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manager</p>
                    <p className="text-sm text-gray-600">
                      {userProfile.manager}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Location
                    </p>
                    <p className="text-sm text-gray-600">
                      {userProfile.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeDialog}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
