import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Newspaper, User, Award, Users, BarChart2, Calendar, Film, Trophy, Star, BookOpen,} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const iconClass = "w-5 h-5 mr-2 flex-shrink-0";
  const links = [
    { name: "News Feed", path: "/News Feed", icon: <Newspaper className={iconClass} /> },
    { name: "Profiles", path: "/profiles", icon: <User className={iconClass} /> },
    { name: "Recognition", path: "/Recognition", icon: <Award className={iconClass} /> },
    { name: "Groups", path: "/Groups", icon: <Users className={iconClass} /> },
    { name: "Polls", path: "/Polls", icon: <BarChart2 className={iconClass} /> },
    { name: "Event", path: "/Event", icon: <Calendar className={iconClass} /> },
    { name: "Media", path: "/Media", icon: <Film className={iconClass} /> },
    { name: "Leaderboard", path: "/Leaderboard", icon: <Trophy className={iconClass} /> },
    { name: "Spotlight", path: "/Spotlight", icon: <Star className={iconClass} /> },
    { name: "HR Blog", path: "/HR Blog", icon: <BookOpen className={iconClass} /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
        <h1 className="text-xl font-bold m-5 text-gray-700">HR Social Hub</h1>
        <button onClick={toggleSidebar}>
          <Menu size={28} />
        </button>
      </div>

      <aside
        className={`
          fixed md:relative top-0 left-0
          h-screen md:h-auto
          bg-white p-2 border-r-2 border-gray-300
          z-50 transition-transform duration-300
          w-[70%] sm:w-[50%] md:w-[20%]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block
        `}
      >
        <h2 className="text-xl font-bold text-center my-2 text-gray-700 ">HR Social Hub</h2>
        <nav className="flex flex-col space-y-2 text-md">
          {links.map((link) => (
            <React.Fragment key={link.path}>
              {link.name === "Leaderboard" && <div className="pt-5" />}
              <button
                onClick={() => {
                  navigate(link.path);
                  setIsOpen(false);
                }}
                className={`text-left md:m-0 px-3 py-2 lg:ml-2 xl:mr-8 lg:mt-4  rounded-md font-medium transition-colors duration-150 flex items-center ${
                  location.pathname === link.path
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                {link.name}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
