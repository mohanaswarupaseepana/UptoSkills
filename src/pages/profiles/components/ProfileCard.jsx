export default function ProfileCard({
  name,
  role,
  image,
  skills,
  description,
  socials,
  status = "Active",
}) {
  const statusColor = {
    "Active": "bg-green-500",
    "On Leave": "bg-yellow-400",
    "Resigned": "bg-red-500",
  }[status] || "bg-gray-300";

  return (
    <div
      className="relative bg-white rounded-2xl mt-6 shadow p-6 flex flex-col items-center text-left max-w-md border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className={`
          absolute top-3 right-3 w-4 h-4 rounded-full ${statusColor}
          transition-transform duration-300
          hover:scale-125 hover:shadow-lg
          cursor-pointer
        `}
        title={status}
      ></div>

      <div className="flex items-center w-full mb-4">
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 w-full">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 mb-4 w-full px-2">{description}</p>

      <div className="flex space-x-4 w-full px-2">
        {socials.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              alt="LinkedIn"
              className="w-5 h-5"
            />
          </a>
        )}
        {socials.twitter && (
          <a
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
              alt="Twitter"
              className="w-5 h-5"
            />
          </a>
        )}
      </div>
    </div>
  );
}
