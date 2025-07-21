import { useState, useEffect } from "react";
import {
  Edit3,
  Camera,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhotoUpload } from "@/components/ui/photo-upload";
import Navigation from "@/components/dating/Navigation";
import PageHeader from "@/components/dating/PageHeader";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user: authUser, updateUser } = useAuth();
  const [userProfile, setUserProfile] = useState({
    name: "Alex",
    age: 25,
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
    ],
    bio: "Adventure seeker, coffee enthusiast, and dog lover. Always up for trying new restaurants and exploring hidden gems in the city!",
    location: "San Francisco, CA",
    occupation: "Product Designer",
    education: "UC Berkeley",
    interests: ["Hiking", "Photography", "Coffee", "Travel", "Dogs", "Cooking"],
    stats: {
      likes: 1247,
      matches: 89,
      conversations: 34,
    },
  });

  // Load profile data from localStorage or auth context
  useEffect(() => {
    const savedProfile = localStorage.getItem("wingmatch_profile");
    console.log("Loading saved profile:", savedProfile);
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      console.log("Parsed profile data:", profileData);
      
      // Calculate age from dateOfBirth if available
      const calculateAge = (dateOfBirth: string) => {
        if (!dateOfBirth) return 25;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      setUserProfile(prev => ({
        ...prev,
        name: authUser?.firstName || prev.name,
        age: profileData.dateOfBirth ? calculateAge(profileData.dateOfBirth) : prev.age,
        photos: profileData.photos?.length > 0 ? profileData.photos : prev.photos,
        bio: profileData.bio || prev.bio,
        occupation: profileData.occupation || prev.occupation,
        education: profileData.education || prev.education,
        location: profileData.location || prev.location,
        interests: profileData.interests?.length > 0 ? profileData.interests : prev.interests,
      }));
    } else if (authUser) {
      setUserProfile(prev => ({
        ...prev,
        name: authUser.firstName,
      }));
    }
  }, [authUser]);

  const saveProfile = () => {
    // Save the profile in both formats for compatibility
    const profileForStorage = {
      photos: userProfile.photos,
      bio: userProfile.bio,
      occupation: userProfile.occupation,
      education: userProfile.education,
      location: userProfile.location,
      interests: userProfile.interests,
      // Keep the original onboarding format structure
      dateOfBirth: "", // Could be calculated back from age if needed
      height: "",
      lookingFor: "",
      relationshipGoals: "",
    };
    
    localStorage.setItem("wingmatch_profile", JSON.stringify(profileForStorage));
    console.log("Saved profile:", profileForStorage);
    setIsEditing(false);
  };

  const updateProfile = (field: string, value: any) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ResponsiveContainer className="bg-gray-50 pb-safe-or-4">
      {/* Header */}
      <PageHeader 
        title="My Profile"
        rightElement={
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            size="sm"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "Save" : "Edit"}
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Photo Section */}
        <Card>
          <CardContent className="p-4">
            {isEditing ? (
              <PhotoUpload
                photos={userProfile.photos}
                onChange={(photos) => updateProfile("photos", photos)}
                maxPhotos={6}
              />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {userProfile.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden relative group"
                  >
                    <img
                      src={photo}
                      alt={`Profile photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userProfile.photos[0]} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {userProfile.name}, {userProfile.age}
                </h2>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {userProfile.location}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Briefcase className="h-4 w-4 mr-3 text-gray-400" />
                <span>{userProfile.occupation}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <GraduationCap className="h-4 w-4 mr-3 text-gray-400" />
                <span>{userProfile.education}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-pink-500">
                  {userProfile.stats.likes}
                </div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">
                  {userProfile.stats.matches}
                </div>
                <div className="text-sm text-gray-600">Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {userProfile.stats.conversations}
                </div>
                <div className="text-sm text-gray-600">Chats</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-pink-500 hover:bg-pink-600">
            <Heart className="h-4 w-4 mr-2" />
            Boost My Profile
          </Button>
          <Button variant="outline" className="w-full">
            Share Profile
          </Button>
        </div>
      </div>

      <Navigation />
    </ResponsiveContainer>
  );
};

export default Profile;
