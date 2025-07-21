import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center">
        <img 
          src="/src/assets/img/wingmatch.png" 
          alt="WingMatch" 
          className="h-16 w-auto mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <a href="/" className="text-pink-500 hover:text-pink-600 underline font-medium">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
