
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

interface Store {
  id: string;
  name: string;
  logo: string;
}

const stores: Store[] = [
  {
    id: 'dfs',
    name: 'DFS (Duty Free Shops)',
    logo: '🛍️ DFS'
  },
  {
    id: 'whsmith',
    name: 'WHSmith',
    logo: '🛍️ WHS'
  },
  {
    id: 'inmotion',
    name: 'InMotion',
    logo: '🛍️ IM'
  },
  {
    id: 'tumi',
    name: 'TUMI',
    logo: '🛍️ TM'
  },
  {
    id: 'victorias-secret',
    name: 'Victoria\'s Secret',
    logo: '🛍️ VS'
  }
];

const StoreSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStoreSelect = (storeId: string) => {
    navigate(`/feedback/store/${storeId}`);
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
            Select Store
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Store Selection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please select the store you'd like to provide feedback for.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {stores.map((store) => (
            <motion.div key={store.id} variants={item}>
              <button
                onClick={() => handleStoreSelect(store.id)}
                className="w-full glass rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-glass-hover hover:-translate-y-1 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-flyerblue-100 flex items-center justify-center text-flyerblue-600 text-lg font-bold">
                    {store.logo}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{store.name}</h3>
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

export default StoreSelection;
