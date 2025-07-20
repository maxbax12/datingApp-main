import { useState } from "react";
import {
  Bell,
  Shield,
  Globe,
  Heart,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  MapPin,
  Sliders,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/dating/Navigation";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: false,
    promotion: false,
  });

  const [preferences, setPreferences] = useState({
    ageRange: [22, 35],
    maxDistance: 25,
    showOnline: true,
    showDistance: true,
  });

  const SettingCard = ({
    icon: Icon,
    title,
    description,
    action,
    badge,
  }: {
    icon: any;
    title: string;
    description?: string;
    action?: React.ReactNode;
    badge?: string;
  }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {badge && (
          <Badge variant="secondary" className="text-xs">
            {badge}
          </Badge>
        )}
        {action || <ChevronRight className="h-5 w-5 text-gray-400" />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto pb-safe-or-4">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              <SettingCard
                icon={User}
                title="Edit Profile"
                description="Photos, bio, interests"
              />
              <SettingCard
                icon={CreditCard}
                title="LoveSync Premium"
                description="Unlock exclusive features"
                badge="Upgrade"
              />
              <SettingCard
                icon={Shield}
                title="Privacy & Safety"
                description="Block contacts, report users"
              />
            </div>
          </CardContent>
        </Card>

        {/* Discovery Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Discovery Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Age Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-900">Age Range</label>
                <span className="text-sm text-gray-600">
                  {preferences.ageRange[0]} - {preferences.ageRange[1]}
                </span>
              </div>
              <Slider
                value={preferences.ageRange}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, ageRange: value }))
                }
                min={18}
                max={65}
                step={1}
                className="w-full"
              />
            </div>

            {/* Distance */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-900">
                  Maximum Distance
                </label>
                <span className="text-sm text-gray-600">
                  {preferences.maxDistance} km
                </span>
              </div>
              <Slider
                value={[preferences.maxDistance]}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, maxDistance: value[0] }))
                }
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Toggle Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Show Online Status
                  </h4>
                  <p className="text-sm text-gray-500">
                    Let others see when you're online
                  </p>
                </div>
                <Switch
                  checked={preferences.showOnline}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, showOnline: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Show Distance</h4>
                  <p className="text-sm text-gray-500">
                    Display distance from your location
                  </p>
                </div>
                <Switch
                  checked={preferences.showDistance}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      showDistance: checked,
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">New Matches</h4>
                <p className="text-sm text-gray-500">
                  Get notified of new matches
                </p>
              </div>
              <Switch
                checked={notifications.newMatches}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, newMatches: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Messages</h4>
                <p className="text-sm text-gray-500">
                  Get notified of new messages
                </p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, messages: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Likes</h4>
                <p className="text-sm text-gray-500">
                  Get notified when someone likes you
                </p>
              </div>
              <Switch
                checked={notifications.likes}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, likes: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Promotions</h4>
                <p className="text-sm text-gray-500">
                  Receive updates about new features
                </p>
              </div>
              <Switch
                checked={notifications.promotion}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, promotion: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Support</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              <SettingCard
                icon={HelpCircle}
                title="Help & Support"
                description="FAQs, contact us"
              />
              <SettingCard
                icon={Globe}
                title="Legal"
                description="Terms, privacy policy"
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Training */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Training</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
              onClick={() => {
                window.location.href = "/ai-chat";
              }}
            >
              <Brain className="h-4 w-4 mr-2" />
              Retake AI Questionnaire
            </Button>
            <p className="text-sm text-gray-600">
              Update your AI's understanding by retaking the initial
              questionnaire
            </p>
          </CardContent>
        </Card>

        {/* Demo Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Demo Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => {
                if (window.confirm("Reset to onboarding flow?")) {
                  const currentUser = JSON.parse(
                    localStorage.getItem("lovesync_user") || "{}",
                  );
                  const resetUser = {
                    ...currentUser,
                    profileCompleted: false,
                    aiSetupCompleted: false,
                  };
                  localStorage.setItem(
                    "lovesync_user",
                    JSON.stringify(resetUser),
                  );
                  window.location.reload();
                }
              }}
            >
              🔄 Reset to Onboarding
            </Button>

            <Button
              variant="outline"
              className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
              onClick={() => {
                if (window.confirm("Reset AI setup only?")) {
                  const currentUser = JSON.parse(
                    localStorage.getItem("lovesync_user") || "{}",
                  );
                  const resetUser = {
                    ...currentUser,
                    aiSetupCompleted: false,
                  };
                  localStorage.setItem(
                    "lovesync_user",
                    JSON.stringify(resetUser),
                  );
                  window.location.reload();
                }
              }}
            >
              🤖 Reset AI Setup
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
          onClick={() => {
            if (window.confirm("Are you sure you want to sign out?")) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Navigation />
    </div>
  );
};

export default Settings;
