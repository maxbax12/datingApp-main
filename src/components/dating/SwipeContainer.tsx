import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, RotateCcw } from "lucide-react";
import ProfileCard, { Profile } from "./ProfileCard";
import { Button } from "@/components/ui/button";
import MatchModal from "./MatchModal";

// Mock profile data
const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 26,
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face",
    ],
    bio: "Love hiking, coffee, and good conversations. Looking for someone to explore the city with! 🌟",
    distance: 2,
    interests: ["Hiking", "Coffee", "Photography", "Travel", "Yoga"],
    occupation: "Graphic Designer",
  },
  {
    id: "2",
    name: "Sofia",
    age: 24,
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop&crop=face",
    ],
    bio: "Foodie, bookworm, and adventure seeker. Let's grab dinner and talk about our favorite books! 📚",
    distance: 5,
    interests: ["Reading", "Cooking", "Wine", "Music", "Art"],
    occupation: "Marketing Manager",
  },
  {
    id: "3",
    name: "Maya",
    age: 28,
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1464863979621-258859e62245?w=400&h=600&fit=crop&crop=face",
    ],
    bio: "Fitness enthusiast and dog lover. Always up for outdoor adventures and trying new restaurants! 🐕",
    distance: 3,
    interests: ["Fitness", "Dogs", "Running", "Restaurants", "Beach"],
    occupation: "Personal Trainer",
  },
  {
    id: "4",
    name: "Aria",
    age: 25,
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=600&fit=crop&crop=face",
    ],
    bio: "Artist and creative soul. Love painting, live music, and spontaneous road trips! 🎨",
    distance: 7,
    interests: ["Art", "Music", "Painting", "Concerts", "Travel"],
    occupation: "Art Teacher",
  },
  {
    id: "5",
    name: "Luna",
    age: 27,
    photos: [
      "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=600&fit=crop&crop=face",
    ],
    bio: "Tech professional by day, dancer by night. Love trying new cuisines and learning languages! 💃",
    distance: 4,
    interests: ["Dancing", "Technology", "Languages", "Food", "Movies"],
    occupation: "Software Engineer",
  },
];

const SwipeContainer = () => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [newMatch, setNewMatch] = useState<Profile | null>(null);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    // In this AI-powered app, swipes train the algorithm rather than create matches
    console.log(`AI Learning: Swiped ${direction} on ${currentProfile.name}`);

    // Simulate AI learning from swipe preferences
    if (direction === "right") {
      console.log("AI: Learning positive preferences from this profile");
    } else {
      console.log("AI: Learning what you don't prefer from this profile");
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setMatches([]);
  };

  // Reset to beginning when we run out of profiles
  useEffect(() => {
    if (currentIndex >= profiles.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, profiles.length]);

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Heart className="h-16 w-16 text-pink-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No more profiles nearby
          </h2>
          <p className="text-gray-500 mb-4">
            Check back later for new people to meet!
          </p>
          <Button
            onClick={handleRestart}
            className="bg-pink-500 hover:bg-pink-600"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative" style={{ bottom: "50px" }}>
      {/* Card Stack */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: "0px", top: "40px" }}
      >
        <AnimatePresence>
          {profiles
            .slice(currentIndex, currentIndex + 3)
            .map((profile, index) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSwipe={handleSwipe}
                isTop={index === 0}
                style={{
                  zIndex: 10 - index,
                  transform: `scale(${1 - index * 0.02}) translateY(${index * 4}px)`,
                }}
              />
            ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div
        className="absolute bottom-8 flex space-x-6 z-20"
        style={{ left: "60%", transform: "translateX(-50%)" }}
      >
        <Button
          onClick={() => handleSwipe("left")}
          variant="outline"
          size="lg"
          className="w-14 h-14 rounded-full bg-white border-2 border-gray-300 hover:border-red-400 hover:bg-red-50"
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>

        <Button
          onClick={() => handleSwipe("right")}
          variant="outline"
          size="lg"
          className="w-14 h-14 rounded-full bg-white border-2 border-gray-300 hover:border-green-400 hover:bg-green-50"
        >
          <Heart className="h-6 w-6 text-green-500" />
        </Button>
      </div>

      {/* Match Modal */}
      <MatchModal
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        match={newMatch}
      />
    </div>
  );
};

export default SwipeContainer;
