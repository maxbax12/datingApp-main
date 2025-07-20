// Demo data for quick testing and development

export const mockUser = {
  id: "demo_user_123",
  firstName: "Alex",
  lastName: "Johnson",
  email: "demo@lovesync.app",
  phone: "+1-555-DEMO",
  profileCompleted: true,
  aiSetupCompleted: true,
};

export const mockProfileData = {
  photos: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  ],
  bio: "Adventure seeker and coffee enthusiast. Love exploring new places, trying new cuisines, and having meaningful conversations. Always up for a hiking adventure or discovering a new café!",
  occupation: "Product Designer",
  education: "UC Berkeley",
  location: "San Francisco, CA",
  dateOfBirth: "1995-06-15",
  height: "5'10\"",
  interests: ["Hiking", "Photography", "Coffee", "Travel", "Art", "Cooking"],
  lookingFor: "long-term",
  relationshipGoals: "partnership",
};

export const mockAIAnswers = {
  "1": "Long-term relationship",
  "2": "I'm outgoing and adventurous, but also enjoy quiet moments. I love meeting new people and trying new experiences.",
  "3": "Hiking, photography, cooking, traveling, and exploring local coffee shops. I also enjoy reading and watching documentaries.",
  "4": "4",
  "5": "Something active like a hike followed by coffee and good conversation, or exploring a local farmers market together.",
  "6": "In person",
  "7": "Dishonesty, lack of ambition, and someone who doesn't respect boundaries or personal growth.",
};

export const quickSetupProfile = () => {
  localStorage.setItem("lovesync_user", JSON.stringify(mockUser));
  localStorage.setItem("lovesync_profile", JSON.stringify(mockProfileData));
  localStorage.setItem("lovesync_ai_answers", JSON.stringify(mockAIAnswers));
};

export const clearDemoData = () => {
  localStorage.removeItem("lovesync_user");
  localStorage.removeItem("lovesync_profile");
  localStorage.removeItem("lovesync_ai_answers");
};
