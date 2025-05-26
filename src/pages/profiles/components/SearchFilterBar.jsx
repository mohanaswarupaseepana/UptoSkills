import React, { useState } from "react";
import {
  Building,
  MapPin,
  Settings,
  BadgeCheck,
  Search,
  ChevronDown,
} from "lucide-react";

export default function SearchFilterBar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const departments = ["Engineering", "HR", "Marketing"];
  const locations = ["Delhi", "Mumbai", "Remote"];
  const skills = ["React", "Node.js", "Python"];
  const statuses = ["Active", "On Leave", "Resigned"];

  const handleHover = (type) => setOpenDropdown(type);
  const handleLeave = () => setOpenDropdown(null);

  const Dropdown = ({ items }) => (
    <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow z-50 w-32">
      {items.map((item) => (
        <div
          key={item}
          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition"
          onClick={() => {
            setOpenDropdown(null);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:shadow-sm",
    green: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:shadow-sm",
    yellow:
      "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 hover:shadow-sm",
    purple:
      "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:shadow-sm",
  };

  const buttons = [
    {
      id: "department",
      label: "Department",
      icon: <Building className="w-4 h-4 text-blue-500" />,
      items: departments,
      color: "blue",
    },
    {
      id: "location",
      label: "Location",
      icon: <MapPin className="w-4 h-4 text-green-500" />,
      items: locations,
      color: "green",
    },
    {
      id: "skills",
      label: "Skills",
      icon: <Settings className="w-4 h-4 text-yellow-600" />,
      items: skills,
      color: "yellow",
    },
    {
      id: "status",
      label: "Status",
      icon: <BadgeCheck className="w-4 h-4 text-purple-600" />,
      items: statuses,
      color: "purple",
    },
  ];

  return (
    <div className="bg-white p-4 w-full">
      <div className="flex flex-wrap gap-4 items-center justify-start relative">

        {/* Search input */}
        <div className="flex items-center gap-2 flex-grow max-w-[750px] bg-gray-50 border border-gray-200 rounded-md px-3 py-2 transition hover:bg-gray-100 focus-within:bg-white focus-within:border-blue-400 focus-within:shadow-md">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search Employees..."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
        </div>

        {buttons.map(({ id, label, icon, items, color }) => (
          <div
            key={id}
            className="relative"
            onMouseEnter={() => handleHover(id)}
            onMouseLeave={handleLeave}
          >
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-md whitespace-nowrap transition ${colorClasses[color]}`}
            >
              {icon}
              {label}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {openDropdown === id && <Dropdown items={items} />}
          </div>
        ))}
      </div>
    </div>
  );
}
