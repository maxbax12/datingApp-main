import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "./ProfileCard";
import { useNavigate } from "react-router-dom";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Profile | null;
}

const MatchModal = ({ isOpen, onClose, match }: MatchModalProps) => {
  const navigate = useNavigate();

  if (!match) return null;

  const handleSendMessage = () => {
    onClose();
    navigate("/matches");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-pink-500 to-purple-600 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/20"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: -50,
                  rotate: Math.random() * 360 + 360,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Heart className="h-6 w-6" />
              </motion.div>
            ))}
          </div>

          {/* Modal Content */}
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Match Announcement */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
            </motion.div>

            <motion.h1
              className="text-2xl font-bold text-gray-900 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              It's a Match!
            </motion.h1>

            <motion.p
              className="text-gray-600 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              You and {match.name} liked each other
            </motion.p>

            {/* Match Photos */}
            <motion.div
              className="flex items-center justify-center mb-6 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
                <img
                  src={match.photos[0]}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg -ml-8">
                {/* Mock current user photo */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="You"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Heart Icon */}
              <motion.div
                className="absolute"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
              >
                <Heart className="h-8 w-8 text-pink-500 fill-current" />
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="space-y-3"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Button
                onClick={handleSendMessage}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>

              <Button onClick={onClose} variant="outline" className="w-full">
                Keep Swiping
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatchModal;
