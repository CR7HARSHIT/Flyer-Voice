
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PassengerForm from '@/components/PassengerForm';

const PassengerDetails: React.FC = () => {
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
            Step 1 of 3
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Passenger Verification</h1>
          <p className="text-muted-foreground">
            Please provide your details to help us identify your flight and process your feedback
          </p>
        </motion.div>
        
        <div className="glass rounded-2xl p-6 md:p-8 shadow-sm">
          <PassengerForm />
        </div>
      </div>
    </Layout>
  );
};

export default PassengerDetails;
