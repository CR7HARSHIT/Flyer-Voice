
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCustomQuestionsForCategory } from './FeedbackQuestionCategories';

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
        // Get the feedback questions for this category
        const feedbackQuestions = getCustomQuestionsForCategory(category.id);
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
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Button variant="ghost" className="justify-start px-0 text-flyerblue-600 hover:text-flyerblue-700 hover:bg-transparent">
                    View feedback
                  </Button>
                  
                  {hasSubcategories ? (
                    <Badge variant="outline" className="bg-flyerblue-50">
                      {category.subcategories.length} entities
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-flyerblue-50">
                      {feedbackQuestions.length} criteria
                    </Badge>
                  )}
                </div>
                
                {/* For special categories with subcategories, show the subcategories first */}
                {hasSubcategories && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Key entities:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <Badge key={sub.id} variant="secondary" className="text-xs bg-slate-100">
                          {sub.name}
                        </Badge>
                      ))}
                      {category.subcategories.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-slate-100">
                          +{category.subcategories.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                {/* For all categories, show the feedback criteria */}
                <div className="mt-2">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Feedback criteria:</p>
                  <div className="flex flex-wrap gap-1">
                    {feedbackQuestions.slice(0, 3).map((question) => (
                      <Badge key={question.id} variant="secondary" className="text-xs bg-slate-100">
                        {question.text}
                      </Badge>
                    ))}
                    {feedbackQuestions.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-slate-100">
                        +{feedbackQuestions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FeedbackCategoryList;
