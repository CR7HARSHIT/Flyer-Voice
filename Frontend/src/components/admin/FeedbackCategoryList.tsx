
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  subcategories: Subcategory[];
}

interface FeedbackCategoryListProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

const FeedbackCategoryList: React.FC<FeedbackCategoryListProps> = ({ 
  categories, 
  onCategoryClick 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
      {categories.map((category, index) => {
        const hasSubcategories = ['airline', 'lounge', 'store'].includes(category.id);
        
        return (
          <motion.div
            key={category.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            onClick={() => onCategoryClick(category.id)}
            className={`cursor-pointer rounded-lg border ${category.color} p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1`}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{category.description}</p>
              <div className="flex justify-between items-center">
                <Button variant="ghost" className="justify-start px-0 text-flyerblue-600 hover:text-flyerblue-700 hover:bg-transparent">
                  View feedback
                </Button>
                
                {hasSubcategories ? (
                  <Badge variant="outline" className="flex items-center gap-1 bg-flyerblue-50">
                    Categories <ChevronRight className="h-3 w-3" />
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1 bg-flyerblue-50">
                    Details <ChevronRight className="h-3 w-3" />
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FeedbackCategoryList;