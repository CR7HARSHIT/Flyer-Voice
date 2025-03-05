
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
