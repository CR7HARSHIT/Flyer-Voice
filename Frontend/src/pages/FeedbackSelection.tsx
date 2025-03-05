
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Coffee, 
  ClipboardCheck, 
  HelpCircle, 
  Plane, 
  Sofa, 
  Store, 
  Bath 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import FeedbackOption from '@/components/FeedbackOption';

const FeedbackSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleFeedbackSelect = (category: string, isSpecialCategory: boolean = false, specialType: string = '') => {
    // Special handling for categories with selection pages
    if (isSpecialCategory) {
      navigate(`/${specialType}-selection`);
    } else {
      navigate(`/feedback/${category}`);
    }
  };
  
  const feedbackOptions = [
    {
      icon: ShoppingBag,
      title: "Baggage",
      description: "Feedback on baggage handling, collection, and services",
      onClick: () => handleFeedbackSelect("baggage")
    },
    {
      icon: Coffee,
      title: "Food Court",
      description: "Rate your dining experience at airport restaurants",
      onClick: () => handleFeedbackSelect("food-court")
    },
    {
      icon: ClipboardCheck,
      title: "Check-In",
      description: "Share your experience with the check-in process",
      onClick: () => handleFeedbackSelect("check-in")
    },
    {
      icon: HelpCircle,
      title: "Help Desk",
      description: "Rate the assistance provided by help desk staff",
      onClick: () => handleFeedbackSelect("help-desk")
    },
    {
      icon: Plane,
      title: "Airline",
      description: "Provide feedback about the airline services",
      onClick: () => handleFeedbackSelect("airline", true, "airline")
    },
    {
      icon: Sofa,
      title: "Lounge",
      description: "Rate your experience at the airport lounges",
      onClick: () => handleFeedbackSelect("lounge", true, "lounge")
    },
    {
      icon: Store,
      title: "Store",
      description: "Share your shopping experience at airport stores",
      onClick: () => handleFeedbackSelect("store", true, "store")
    },
    {
      icon: Bath,
      title: "Washroom",
      description: "Rate the cleanliness and maintenance of washrooms",
      onClick: () => handleFeedbackSelect("washroom")
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="inline-block bg-flyerblue-100 text-flyerblue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Step 3 of 3
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Feedback Categories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a category to provide your valuable feedback. Your opinions help us improve the airport experience for all travelers.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {feedbackOptions.map((option, index) => (
            <motion.div key={index} variants={item}>
              <FeedbackOption 
                icon={option.icon}
                title={option.title}
                description={option.description}
                onClick={option.onClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default FeedbackSelection;
