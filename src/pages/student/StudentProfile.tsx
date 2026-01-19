
import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import ProfileHeader from '@/components/student/profile/ProfileHeader';
import ProfileTabs from '@/components/student/profile/ProfileTabs';

const StudentProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in a real app, this would come from your API/auth provider
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    bio: 'Frontend developer passionate about React and modern web technologies. Currently learning advanced JavaScript concepts and UI/UX design principles.',
    location: 'San Francisco, CA',
    interests: ['Web Development', 'UX Design', 'JavaScript', 'React'],
    website: 'https://alexjohnson.dev',
    social: {
      facebook: 'alexjohnson',
      twitter: 'alexj_dev',
      linkedin: 'alexjohnson',
      github: 'alexj-dev',
      instagram: 'alex.codes'
    },
    skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'UI Design'],
    education: 'B.S. Computer Science, Stanford University',
    timezone: 'Pacific Time (PT)'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties like social.twitter
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as Record<string, unknown>,
          [child]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, you would make an API call to update the profile
    alert('Profile saved successfully!');
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        <ProfileHeader 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          onSaveProfile={handleSaveProfile} 
        />

        <ProfileTabs 
          userData={userData} 
          isEditing={isEditing} 
          handleInputChange={handleInputChange} 
          handleSaveProfile={handleSaveProfile}
          setIsEditing={setIsEditing}
        />
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;
