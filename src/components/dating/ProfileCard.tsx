import { motion } from "framer-motion";
import { Heart, MapPin, X, Bot, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Profile {
  id: string;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  distance: number;
  interests: string[];
  occupation?: string;
  education?: string;
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  onChatWithAI?: (profile: Profile) => void;
  isTop: boolean;
  style?: React.CSSProperties;
}

const ProfileCard = ({
  profile,
  onSwipe,
  onChatWithAI,
  isTop,
  style,
}: ProfileCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showAIButton, setShowAIButton] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 100;

    if (Math.abs(info.offset.x) > swipeThreshold) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev < profile.photos.length - 1 ? prev + 1 : 0,
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev > 0 ? prev - 1 : profile.photos.length - 1,
    );
  };

  return (
    <motion.div
      className="absolute inset-4 bg-white rounded-xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing"
      style={style}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ rotate: 5, scale: 1.02 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        x: 300,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setShowAIButton(true)}
      onHoverEnd={() => setShowAIButton(false)}
    >
      {/* Photo Section */}
      <div className="relative h-2/3">
        <img
          src={profile.photos[currentPhotoIndex]}
          alt={`${profile.name} photo ${currentPhotoIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Photo Navigation */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1">
          {profile.photos.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index === currentPhotoIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* AI Learning Indicator */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-purple-500/90 text-white text-xs">
            <Bot className="h-3 w-3 mr-1" />
            AI Learning
          </Badge>
        </div>

        {/* Chat with AI Button */}
        {showAIButton && onChatWithAI && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onChatWithAI(profile);
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with AI
            </Button>
          </motion.div>
        )}

        {/* Photo Navigation Areas */}
        <button
          onClick={prevPhoto}
          className="absolute left-0 top-0 w-1/2 h-full"
          aria-label="Previous photo"
        />
        <button
          onClick={nextPhoto}
          className="absolute right-0 top-0 w-1/2 h-full"
          aria-label="Next photo"
        />

        {/* Distance */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {profile.distance} km away
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 h-1/3 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            {profile.name}, {profile.age}
          </h2>
        </div>

        {profile.occupation && (
          <p className="text-gray-600 text-sm mb-2">{profile.occupation}</p>
        )}

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{profile.bio}</p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1 mb-2">
          {profile.interests.slice(0, 4).map((interest) => (
            <Badge key={interest} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>

        {/* AI Hint */}
        <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded-lg">
          <Bot className="h-3 w-3 inline mr-1" />
          Swipe to help AI learn your preferences
        </div>
      </div>

      {/* Swipe Indicators */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
      >
        {/* Like Indicator */}
        <motion.div className="absolute top-20 right-8 text-green-500 font-bold text-4xl rotate-12 border-4 border-green-500 px-4 py-2 rounded-lg">
          LIKE
        </motion.div>

        {/* Pass Indicator */}
        <motion.div className="absolute top-20 left-8 text-red-500 font-bold text-4xl -rotate-12 border-4 border-red-500 px-4 py-2 rounded-lg">
          PASS
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
