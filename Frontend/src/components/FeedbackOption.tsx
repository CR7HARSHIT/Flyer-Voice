
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeedbackOptionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

const FeedbackOption: React.FC<FeedbackOptionProps> = ({
  icon: Icon,
  title,
  description,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      whileTap={{ y: 0, boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      className="glass rounded-xl p-5 cursor-pointer transition-all duration-300 hover:bg-white"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-flyerblue-100 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-flyerblue-600" />
        </div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeedbackOption;
