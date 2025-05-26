import React from "react";
import SearchFilterBar from "./components/SearchFilterBar";
import ProfileCard from "./components/ProfileCard";

export default function Profiles() {
  return (
    <div className="p-4 space-y-6">
      <SearchFilterBar />

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <ProfileCard
  name="John Doe"
  role="UI/UX Designer"
  image="https://randomuser.me/api/portraits/men/75.jpg"
  skills={["Figma", "Canva", "Photoshop"]}
  description="Creative designer with 3 years of experience in user-centric design and branding."
  socials={{
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }}
/>
      <ProfileCard
  name="John Doe"
  role="UI/UX Designer"
  image="https://randomuser.me/api/portraits/men/75.jpg"
  status="On Leave"
  skills={["Figma", "Canva", "Photoshop"]}
  description="Creative designer with 3 years of experience in user-centric design and branding."
  socials={{
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    
  }}
/>
<ProfileCard
  name="John Doe"
  role="UI/UX Designer"
  image="https://randomuser.me/api/portraits/men/75.jpg"
  skills={["Figma", "Canva", "Photoshop"]}
  description="Creative designer with 3 years of experience in user-centric design and branding."
  socials={{
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
    
  }}
/>
<ProfileCard
  name="John Doe"
  role="UI/UX Designer"
  image="https://randomuser.me/api/portraits/men/75.jpg"
  status="Resigned"
  skills={["Figma", "Canva", "Photoshop"]
}
  description="Creative designer with 3 years of experience in user-centric design and branding."
  socials={{
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }}
/>


      </div>
    </div>
  );
}
