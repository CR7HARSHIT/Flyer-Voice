
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sofa } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

interface Lounge {
  id: string;
  name: string;
  logo: string;
}

const lounges: Lounge[] = [
  {
    id: 'plaza-premium',
    name: 'Plaza Premium Lounge',
    logo: '🛋️ PP'
  },
  {
    id: 'loungekey',
    name: 'LoungeKey',
    logo: '🛋️ LK'
  },
  {
    id: 'air-india-maharaja',
    name: 'Air India Maharaja Lounge',
    logo: '🛋️ AI'
  },
  {
    id: 'tata-sky',
    name: 'Tata Sky Lounge',
    logo: '🛋️ TS'
  },
  {
    id: 'centurion',
    name: 'Centurion Lounge (American Express)',
    logo: '🛋️ CL'
  }
];

const LoungeSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLoungeSelect = (loungeId: string) => {
    navigate(`/feedback/lounge/${loungeId}`);
  };
  
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
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="inline-block bg-flyerblue-100 text-flyerblue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Select Lounge
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Lounge Selection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please select the lounge you'd like to provide feedback for.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {lounges.map((lounge) => (
            <motion.div key={lounge.id} variants={item}>
              <button
                onClick={() => handleLoungeSelect(lounge.id)}
                className="w-full glass rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-glass-hover hover:-translate-y-1 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-flyerblue-100 flex items-center justify-center text-flyerblue-600 text-lg font-bold">
                    {lounge.logo}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{lounge.name}</h3>
                    <p className="text-sm text-muted-foreground">Tap to provide feedback</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoungeSelection;
