import { useState } from "react";
import {
  Edit3,
  Camera,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/dating/Navigation";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto pb-safe-or-4">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm("Are you sure you want to sign out?")) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="text-gray-600 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
        </Button>

        <h1 className="text-xl font-bold text-gray-900">My Profile</h1>

        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          size="sm"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          {isEditing ? "Save" : "Edit"}
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Photo Section */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {user.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden relative group"
                >
                  <img
                    src={photo}
                    alt={`Profile photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" className="w-full mt-3">
                <Camera className="h-4 w-4 mr-2" />
                Add Photos
              </Button>
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
                <AvatarImage src={user.photos[0]} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.name}, {user.age}
                </h2>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Briefcase className="h-4 w-4 mr-3 text-gray-400" />
                <span>{user.occupation}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <GraduationCap className="h-4 w-4 mr-3 text-gray-400" />
                <span>{user.education}</span>
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
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
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
                  {user.stats.likes}
                </div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">
                  {user.stats.matches}
                </div>
                <div className="text-sm text-gray-600">Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {user.stats.conversations}
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
    </div>
  );
};

export default Profile;
