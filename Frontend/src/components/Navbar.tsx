
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Info, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Determine step based on path
  const getStep = () => {
    switch (location.pathname) {
      case '/':
      case '/passenger-details':
        return 1;
      case '/flight-details':
        return 2;
      case '/feedback-selection':
      case (location.pathname.includes('/feedback/') ? location.pathname : ''):
        return 3;
      default:
        return 1;
    }
  };
  
  const currentStep = getStep();
  const isFeedbackPage = location.pathname.includes('/feedback/') || location.pathname === '/feedback-selection';

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="sticky top-0 z-50 w-full glass shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-flyerblue-600" />
          <span className="text-xl font-medium tracking-tight">Flyer Voice</span>
        </Link>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center justify-between space-x-6">
          {/* Progress indicator */}
          <div className="flex items-center space-x-1">
            <div className={cn(
              "flex items-center", 
              currentStep >= 1 ? "text-flyerblue-600" : "text-muted-foreground"
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center", 
                currentStep >= 1 ? "bg-flyerblue-100" : "bg-secondary"
              )}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Passenger</span>
            </div>
            
            <div className="w-8 h-px bg-muted-foreground/30" />
            
            <div className={cn(
              "flex items-center", 
              currentStep >= 2 ? "text-flyerblue-600" : "text-muted-foreground"
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center", 
                currentStep >= 2 ? "bg-flyerblue-100" : "bg-secondary"
              )}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Flight</span>
            </div>
            
            <div className="w-8 h-px bg-muted-foreground/30" />
            
            <div className={cn(
              "flex items-center", 
              currentStep >= 3 ? "text-flyerblue-600" : "text-muted-foreground",
              isFeedbackPage ? "hover:text-flyerblue-500" : ""
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center", 
                currentStep >= 3 ? "bg-flyerblue-100" : "bg-secondary",
                isFeedbackPage ? "hover:bg-flyerblue-200" : ""
              )}>
                3
              </div>
              <span className={cn(
                "ml-2 text-sm font-medium",
                isFeedbackPage ? "hover:text-flyerblue-400" : ""
              )}>Feedback</span>
            </div>
          </div>
          
          {/* Main navigation links */}
          <div className="flex items-center space-x-4">
            <Link to="/about-us" className="flex items-center text-muted-foreground hover:text-flyerblue-600 transition-colors">
              <Info className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">About Us</span>
            </Link>
            
            <Link to="/logout" className="flex items-center text-muted-foreground hover:text-flyerblue-600 transition-colors">
              <LogOut className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile navigation drawer */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-white glass shadow-lg z-50 md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              {/* Progress steps - mobile */}
              <div className="flex justify-between px-2 py-3 bg-background rounded-md">
                <div className={cn(
                  "flex flex-col items-center", 
                  currentStep >= 1 ? "text-flyerblue-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center", 
                    currentStep >= 1 ? "bg-flyerblue-100" : "bg-secondary"
                  )}>
                    1
                  </div>
                  <span className="mt-1 text-xs font-medium">Passenger</span>
                </div>
                
                <div className={cn(
                  "flex flex-col items-center", 
                  currentStep >= 2 ? "text-flyerblue-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center", 
                    currentStep >= 2 ? "bg-flyerblue-100" : "bg-secondary"
                  )}>
                    2
                  </div>
                  <span className="mt-1 text-xs font-medium">Flight</span>
                </div>
                
                <div className={cn(
                  "flex flex-col items-center", 
                  currentStep >= 3 ? "text-flyerblue-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center", 
                    currentStep >= 3 ? "bg-flyerblue-100" : "bg-secondary"
                  )}>
                    3
                  </div>
                  <span className="mt-1 text-xs font-medium">Feedback</span>
                </div>
              </div>
              
              {/* Navigation links - mobile */}
              <Link 
                to="/about-us" 
                className="flex items-center p-3 rounded-md hover:bg-muted"
                onClick={toggleMenu}
              >
                <Info className="h-5 w-5 mr-2" />
                <span className="font-medium">About Us</span>
              </Link>
              
              <Link 
                to="/logout" 
                className="flex items-center p-3 rounded-md hover:bg-muted"
                onClick={toggleMenu}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span className="font-medium">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
