import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  Camera,
  MapPin,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhotoUpload } from "@/components/ui/photo-upload";
import AIProfileSetup from "./AIProfileSetup";

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface ProfileData {
  photos: string[];
  bio: string;
  occupation: string;
  education: string;
  location: string;
  dateOfBirth: string;
  height: string;
  interests: string[];
  lookingFor: string;
  relationshipGoals: string;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    photos: [],
    bio: "",
    occupation: "",
    education: "",
    location: "",
    dateOfBirth: "",
    height: "",
    interests: [],
    lookingFor: "",
    relationshipGoals: "",
  });

  const [showAISetup, setShowAISetup] = useState(false);

  const steps = [
    "Photos",
    "Basic Info",
    "About You",
    "Interests",
    "Preferences",
    "AI Setup",
  ];

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const popularInterests = [
    "Hiking",
    "Travel",
    "Photography",
    "Cooking",
    "Music",
    "Movies",
    "Books",
    "Fitness",
    "Art",
    "Dancing",
    "Coffee",
    "Wine",
    "Dogs",
    "Cats",
    "Gaming",
    "Yoga",
    "Running",
    "Beach",
    "Mountains",
    "Comedy",
    "Fashion",
    "Tech",
  ];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === totalSteps - 1) {
      // Save profile data before moving to AI setup
      localStorage.setItem("wingmatch_profile", JSON.stringify(profileData));
      setShowAISetup(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const updateProfile = (field: keyof ProfileData, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return profileData.photos.length >= 2;
      case 1:
        return (
          profileData.occupation &&
          profileData.location &&
          profileData.dateOfBirth
        );
      case 2:
        return profileData.bio.length >= 50;
      case 3:
        return profileData.interests.length >= 3;
      case 4:
        return profileData.lookingFor && profileData.relationshipGoals;
      default:
        return true;
    }
  };

  if (showAISetup) {
    return <AIProfileSetup onComplete={onComplete} />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                Add your best photos
              </h2>
              <p className="text-gray-600">
                Upload at least 2 photos to get started
              </p>
            </div>

            <PhotoUpload
              photos={profileData.photos}
              onChange={(photos) => updateProfile("photos", photos)}
              maxPhotos={6}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                Tell us about yourself
              </h2>
              <p className="text-gray-600">
                Basic information for your profile
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <Input
                  placeholder="e.g. Software Engineer, Teacher, Artist"
                  value={profileData.occupation}
                  onChange={(e) => updateProfile("occupation", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <Input
                  placeholder="e.g. University of California, Berkeley"
                  value={profileData.education}
                  onChange={(e) => updateProfile("education", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g. San Francisco, CA"
                    value={profileData.location}
                    onChange={(e) => updateProfile("location", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) =>
                      updateProfile("dateOfBirth", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height
                  </label>
                  <Select
                    onValueChange={(value) => updateProfile("height", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select height" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const feet = Math.floor((60 + i) / 12);
                        const inches = (60 + i) % 12;
                        return (
                          <SelectItem key={i} value={`${feet}'${inches}"`}>
                            {feet}'{inches}"
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Write your bio</h2>
              <p className="text-gray-600">
                Tell potential matches about yourself
              </p>
            </div>

            <div>
              <Textarea
                placeholder="I love exploring new places, trying different cuisines, and having meaningful conversations. Looking for someone who shares my passion for adventure and can make me laugh!"
                value={profileData.bio}
                onChange={(e) => updateProfile("bio", e.target.value)}
                className="min-h-[120px]"
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Minimum 50 characters</span>
                <span>{profileData.bio.length}/500</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">💡 Bio Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Be authentic and specific</li>
                <li>• Mention your hobbies and interests</li>
                <li>• Include what you're looking for</li>
                <li>• Keep it positive and upbeat</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">What are you into?</h2>
              <p className="text-gray-600">Select at least 3 interests</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {popularInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={
                    profileData.interests.includes(interest)
                      ? "default"
                      : "outline"
                  }
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    profileData.interests.includes(interest)
                      ? "bg-pink-500 hover:bg-pink-600"
                      : "hover:border-pink-400"
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add custom interest
              </label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your interest..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      toggleInterest(e.currentTarget.value.trim());
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      toggleInterest(input.value.trim());
                      input.value = "";
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Dating preferences</h2>
              <p className="text-gray-600">
                Help us understand what you're looking for
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you looking for?
                </label>
                <Select
                  onValueChange={(value) => updateProfile("lookingFor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select what you're looking for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="long-term">
                      Long-term relationship
                    </SelectItem>
                    <SelectItem value="something-casual">
                      Something casual
                    </SelectItem>
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                    <SelectItem value="friends">New friends</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship goals
                </label>
                <Select
                  onValueChange={(value) =>
                    updateProfile("relationshipGoals", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your relationship goals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marriage">
                      Eventually want to get married
                    </SelectItem>
                    <SelectItem value="partnership">
                      Want a life partnership
                    </SelectItem>
                    <SelectItem value="dating">
                      Want to date and see where it goes
                    </SelectItem>
                    <SelectItem value="casual">
                      Want something casual
                    </SelectItem>
                    <SelectItem value="unsure">Not sure what I want</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium text-purple-900">
                  Ready for AI Setup!
                </h3>
              </div>
              <p className="text-sm text-purple-700">
                Next, you'll chat with your AI assistant to create a
                personalized dating profile that gets smarter over time.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-lg">Complete Your Profile</CardTitle>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {steps.map((step, index) => (
              <span
                key={step}
                className={index <= currentStep ? "text-purple-600" : ""}
              >
                {step}
              </span>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  // Quick skip for demo - fill with mock data
                  const mockData: ProfileData = {
                    photos: [
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop&crop=face",
                    ],
                    bio: "Adventure seeker and coffee enthusiast. Love exploring new places and meeting interesting people!",
                    occupation: "Product Designer",
                    education: "UC Berkeley",
                    location: "San Francisco, CA",
                    dateOfBirth: "1995-06-15",
                    height: "5'10\"",
                    interests: [
                      "Hiking",
                      "Photography",
                      "Coffee",
                      "Travel",
                      "Art",
                    ],
                    lookingFor: "long-term",
                    relationshipGoals: "partnership",
                  };
                  setProfileData(mockData);
                  setShowAISetup(true);
                }}
                className="text-xs text-gray-500"
              >
                Skip Demo
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-purple-500 hover:bg-purple-600"
              >
                {currentStep === totalSteps - 1 ? "Start AI Setup" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
