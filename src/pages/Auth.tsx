import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Heart, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth = ({ onAuthSuccess }: AuthProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    ageConfirmation: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);

      // Mock user data based on mode
      const mockUser = {
        id: `user_${Date.now()}`,
        firstName: mode === "signup" ? formData.firstName : "Alex",
        lastName: mode === "signup" ? formData.lastName : "Johnson",
        email: formData.email,
        phone: mode === "signup" ? formData.phone : "",
        profileCompleted: mode === "login", // Existing users skip onboarding
        aiSetupCompleted: mode === "login",
      };

      localStorage.setItem("wingmatch_user", JSON.stringify(mockUser));
      onAuthSuccess();
    }, 1000);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    // Simulate social auth - always complete profile for demo
    setTimeout(() => {
      setIsLoading(false);

      const mockUser = {
        id: `user_${provider}_${Date.now()}`,
        firstName: "Alex",
        lastName: "Johnson",
        email: `alex.johnson@${provider}.com`,
        phone: "+1-555-0123",
        profileCompleted: true, // Skip onboarding for social login demo
        aiSetupCompleted: true,
      };

      localStorage.setItem("wingmatch_user", JSON.stringify(mockUser));
      onAuthSuccess();
    }, 800);
  };

  const isFormValid = () => {
    if (mode === "login") {
      return formData.email && formData.password;
    } else {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword &&
        formData.agreeToTerms &&
        formData.agreeToPrivacy &&
        formData.ageConfirmation
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-4"
            >
              <img 
                src="/wingmatch.png" 
                alt="WingMatch" 
                className="h-20 w-auto mx-auto"
              />
            </motion.div>
            <p className="text-gray-600 text-sm">
              {mode === "login"
                ? "Welcome back to AI-powered dating"
                : "Join the future of meaningful connections"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialAuth("google")}
                variant="outline"
                className="w-full h-11"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                onClick={() => handleSocialAuth("apple")}
                variant="outline"
                className="w-full h-11"
                disabled={isLoading}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
                  <path d="M15.53 3.83c.893-1.09 1.477-2.58 1.306-4.089-1.265.056-2.847.875-3.758 1.944-.806.942-1.526 2.486-1.34 3.938 1.421.106 2.88-.717 3.792-1.793z" />
                </svg>
                Continue with Apple
              </Button>
            </div>

            <div className="relative">
              <Separator className="my-4" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                or
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="pl-10"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="age"
                        checked={formData.ageConfirmation}
                        onCheckedChange={(checked) =>
                          handleInputChange("ageConfirmation", checked)
                        }
                      />
                      <label
                        htmlFor="age"
                        className="text-sm text-gray-600 leading-5"
                      >
                        I confirm that I am 18 years or older
                      </label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreeToTerms", checked)
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-600 leading-5"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-pink-500 hover:underline">
                          Terms of Service
                        </a>
                      </label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.agreeToPrivacy}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreeToPrivacy", checked)
                        }
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-gray-600 leading-5"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-pink-500 hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </div>
                ) : mode === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-pink-500 hover:underline font-medium"
                  disabled={isLoading}
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            {mode === "login" && (
              <div className="text-center space-y-3">
                <a href="#" className="text-sm text-pink-500 hover:underline">
                  Forgot your password?
                </a>
                <div className="pt-2 space-y-2">
                  <Button
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        const mockUser = {
                          id: "demo_user_123",
                          firstName: "Demo",
                          lastName: "User",
                          email: "demo@wingmatch.app",
                          phone: "+1-555-DEMO",
                          profileCompleted: true,
                          aiSetupCompleted: true,
                        };
                        localStorage.setItem(
                          "wingmatch_user",
                          JSON.stringify(mockUser),
                        );
                        setIsLoading(false);
                        onAuthSuccess();
                      }, 500);
                    }}
                    variant="ghost"
                    className="w-full text-xs text-gray-500 hover:text-gray-700 border border-gray-200"
                    disabled={isLoading}
                  >
                    🚀 Quick Demo Login (Skip Setup)
                  </Button>
                  <Button
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        const mockUser = {
                          id: "new_user_" + Date.now(),
                          firstName: "New",
                          lastName: "User",
                          email: "newuser@wingmatch.app",
                          phone: "+1-555-NEW",
                          profileCompleted: false,
                          aiSetupCompleted: false,
                        };
                        localStorage.setItem(
                          "wingmatch_user",
                          JSON.stringify(mockUser),
                        );
                        setIsLoading(false);
                        onAuthSuccess();
                      }, 500);
                    }}
                    variant="outline"
                    className="w-full text-xs text-purple-600 border-purple-200 hover:bg-purple-50"
                    disabled={isLoading}
                  >
                    🎯 Try Full Experience (With Setup)
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
