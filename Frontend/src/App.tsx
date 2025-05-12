import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PassengerDetails from "./pages/PassengerDetails";
import FlightDetails from "./pages/FlightDetails";
import FeedbackSelection from "./pages/FeedbackSelection";
import FeedbackDetail from "./pages/FeedbackDetail";
import AirlineSelection from "./pages/AirlineSelection";
import LoungeSelection from "./pages/LoungeSelection";
import StoreSelection from "./pages/StoreSelection";
import AboutUs from "./pages/AboutUs";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

const queryClient = new QueryClient();

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Handle the user's response
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');
      } else {
        console.log('❌ User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstall(false);
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/flight-details" element={<FlightDetails />} />
            <Route path="/feedback-selection" element={<FeedbackSelection />} />
            <Route path="/feedback/:category" element={<FeedbackDetail />} />
            <Route path="/feedback/:category/:entityId" element={<FeedbackDetail />} />
            <Route path="/airline-selection" element={<AirlineSelection />} />
            <Route path="/lounge-selection" element={<LoungeSelection />} />
            <Route path="/store-selection" element={<StoreSelection />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/feedback/:category" element={<AdminDashboard />} />
            <Route path="/admin/feedback/:category/:entityId" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Conditionally show the install button */}
          {showInstall && (
            <button
              onClick={handleInstallClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded fixed bottom-4 right-4"
            >
              📲 Install App
            </button>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
