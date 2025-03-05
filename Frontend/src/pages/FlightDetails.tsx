
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import FlightInfoCard from '@/components/FlightInfoCard';

const FlightDetails: React.FC = () => {
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate('/feedback-selection');
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="inline-block bg-flyerblue-100 text-flyerblue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Step 2 of 3
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Flight Details</h1>
          <p className="text-muted-foreground">
            Please verify your flight information before proceeding to feedback
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FlightInfoCard />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Button 
            onClick={handleContinue}
            className="bg-flyerblue-500 hover:bg-flyerblue-600 text-white px-8 h-11"
          >
            Continue to Feedback
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FlightDetails;
