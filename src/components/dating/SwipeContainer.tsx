import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [showSwipeHints, setShowSwipeHints] = useState(true);

  const currentProfile = profiles[currentIndex];

  // Debug logging
  console.log("Current profile:", currentProfile);
  console.log("Current index:", currentIndex);
  console.log("Total profiles:", profiles.length);

  const handleSwipe = (direction: "left" | "right") => {
    // Hide hints after first swipe
    if (showSwipeHints) {
      setShowSwipeHints(false);
    }

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
    <div className="absolute inset-0">
      {/* Card Stack */}
      <div className="absolute inset-4 bottom-32">
        <div className="relative w-full h-full max-w-sm mx-auto">
          <AnimatePresence>
            {profiles
              .slice(currentIndex, currentIndex + 3)
              .map((profile, index) => (
                <motion.div
                  key={profile.id}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  style={{
                    zIndex: 10 - index,
                    transform: `scale(${1 - index * 0.02}) translateY(${index * 4}px)`,
                  }}
                  drag={index === 0} // Only allow dragging the top card
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={(_, info) => {
                    if (index === 0) { // Only handle swipes for the top card
                      const swipeThreshold = 100;
                      if (Math.abs(info.offset.x) > swipeThreshold) {
                        handleSwipe(info.offset.x > 0 ? "right" : "left");
                      }
                    }
                  }}
                  whileDrag={{ rotate: 5, scale: 1.02 }}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    x: 300,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                >
                  <ProfileCard
                    profile={profile}
                    onSwipe={handleSwipe}
                    isTop={index === 0}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Swipe Hints */}
      {showSwipeHints && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center"
          >
            <motion.div
              animate={{ x: [-10, 0, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-red-500 text-white p-3 rounded-full shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.div>
            <span className="text-red-600 font-semibold mt-2 text-sm">Pass</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center"
          >
            <motion.div
              animate={{ x: [10, 0, 10] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-green-500 text-white p-3 rounded-full shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.div>
            <span className="text-green-600 font-semibold mt-2 text-sm">Like</span>
          </motion.div>
          
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-600 font-medium text-sm bg-white/90 px-4 py-2 rounded-full shadow-md"
            >
              Swipe or tap buttons to start
            </motion.p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute bottom-16 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-6 z-30">
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
