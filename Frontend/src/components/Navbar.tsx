
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Info } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  // Determine step based on path
  const getStep = () => {
    switch (location.pathname) {
      case '/':
      case '/passenger-details':
        return 1;
      case '/flight-details':
        return 2;
      case '/feedback-selection':
        return 3;
      default:
        return 1;
    }
  };
  
  const currentStep = getStep();
  
  return (
    <header className="sticky top-0 z-50 w-full glass shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-flyerblue-600" />
          <span className="text-xl font-medium tracking-tight">Flyer Voice</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-flyerblue-600' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-flyerblue-100' : 'bg-secondary'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Passenger</span>
            </div>
            
            <div className="w-8 h-px bg-muted-foreground/30" />
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-flyerblue-600' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-flyerblue-100' : 'bg-secondary'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Flight</span>
            </div>
            
            <div className="w-8 h-px bg-muted-foreground/30" />
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-flyerblue-600' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-flyerblue-100' : 'bg-secondary'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Feedback</span>
            </div>
          </div>
          
          <Link to="/about-us" className="flex items-center text-muted-foreground hover:text-flyerblue-600 transition-colors">
            <Info className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">About Us</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
