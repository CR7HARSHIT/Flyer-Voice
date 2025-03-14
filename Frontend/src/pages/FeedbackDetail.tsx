
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Send, ChevronLeft } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

// Define the feedback questions for each category
const FEEDBACK_QUESTIONS: Record<string, string[]> = {
  'baggage': [
    'How satisfied were you with the baggage drop-off process?',
    'How would you rate the speed of baggage delivery?',
    'How was the baggage handling in terms of care?',
    'Rate the clarity of information regarding baggage claim'
  ],
  'food-court': [
    'How satisfied were you with the food quality?',
    'Rate the cleanliness of the food court area',
    'How would you rate the variety of food options?',
    'How was the staff service at food establishments?'
  ],
  'check-in': [
    'How efficient was the check-in process?',
    'Rate the helpfulness of the check-in staff',
    'How would you rate the waiting time during check-in?',
    'How clear was the signage and directions for check-in?'
  ],
  'help-desk': [
    'How would you rate the knowledge of help desk staff?',
    'How satisfied were you with the waiting time?',
    'Rate the clarity of information provided',
    'How helpful was the assistance provided?'
  ],
  'airline': [
    'How would you rate the cabin crew service?',
    'Rate the comfort of your seat',
    'How was the in-flight entertainment?',
    'How satisfied were you with the food/beverages?'
  ],
  'lounge': [
    'How would you rate the comfort of the lounge?',
    'Rate the quality of food and beverages in the lounge',
    'How was the cleanliness of the lounge?',
    'How satisfied were you with the amenities provided?'
  ],
  'store': [
    'How would you rate the variety of products?',
    'Rate the pricing of items at airport stores',
    'How satisfied were you with the store staff service?',
    'How convenient was the shopping experience?'
  ],
  'washroom': [
    'How would you rate the cleanliness of the washrooms?',
    'Rate the availability of washroom amenities',
    'How satisfied were you with the privacy of facilities?',
    'How would you rate the maintenance of washroom facilities?'
  ],
  'indigo': [
    'How would you rate IndiGo\'s cabin crew service?',
    'Rate the comfort of your seat on the IndiGo flight',
    'How was the in-flight entertainment on IndiGo?',
    'How satisfied were you with IndiGo\'s food/beverages?'
  ],
  'air-india': [
    'How would you rate Air India\'s cabin crew service?',
    'Rate the comfort of your seat on the Air India flight',
    'How was the in-flight entertainment on Air India?',
    'How satisfied were you with Air India\'s food/beverages?'
  ],
  'spicejet': [
    'How would you rate SpiceJet\'s cabin crew service?',
    'Rate the comfort of your seat on the SpiceJet flight',
    'How was the in-flight entertainment on SpiceJet?',
    'How satisfied were you with SpiceJet\'s food/beverages?'
  ],
  'goair': [
    'How would you rate GoAir\'s cabin crew service?',
    'Rate the comfort of your seat on the GoAir flight',
    'How was the in-flight entertainment on GoAir?',
    'How satisfied were you with GoAir\'s food/beverages?'
  ],
  'vistara': [
    'How would you rate Vistara\'s cabin crew service?',
    'Rate the comfort of your seat on the Vistara flight',
    'How was the in-flight entertainment on Vistara?',
    'How satisfied were you with Vistara\'s food/beverages?'
  ]
};

// Dictionary to map store and lounge IDs to their names
const ENTITY_NAMES: Record<string, string> = {
  'lounge': 'Lounge Facilities',
  'plaza-premium': 'Plaza Premium Lounge',
  'loungekey': 'LoungeKey',
  'air-india-maharaja': 'Air India Maharaja Lounge',
  'tata-sky': 'Tata Sky Lounge',
  'centurion': 'Centurion Lounge (American Express)',
  
  'store': 'Store Experience',
  'dfs': 'DFS (Duty Free Shops)',
  'whsmith': 'WHSmith',
  'inmotion': 'InMotion',
  'tumi': 'TUMI',
  'victorias-secret': 'Victoria\'s Secret',
  
  'indigo': 'IndiGo',
  'air-india': 'Air India',
  'spicejet': 'SpiceJet',
  'goair': 'GoAir',
  'vistara': 'Vistara'
};

const FeedbackDetail: React.FC = () => {
  const { category, airlineId } = useParams<{ category: string, airlineId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ratings, setRatings] = useState<number[]>([]);
  const [comments, setComments] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  // Use airlineId as the category if it exists, otherwise use the category parameter
  const feedbackCategory = airlineId || category;
  
  const questions = feedbackCategory ? FEEDBACK_QUESTIONS[feedbackCategory] || [] : [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  const handleRatingChange = (value: number[]) => {
    const newRatings = [...ratings];
    newRatings[currentQuestionIndex] = value[0];
    setRatings(newRatings);
  };
  
  const handleNext = () => {
    if (ratings[currentQuestionIndex] === undefined) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    if (isLastQuestion) {
      setShowComments(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (showComments) {
      setShowComments(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Navigate back to feedback selection
      navigate('/feedback-selection');
    }
  };
  
  const handleBackToCategories = () => {
    navigate('/feedback-selection');
  };
  
  const handleSubmit = () => {
    // In a real app, you would send this data to a backend
    toast({
      title: "Feedback Submitted",
      description: `Thank you for your feedback on ${getCategoryName(feedbackCategory)}`,
    });
    
    // Navigate back to feedback selection after submission
    navigate('/feedback-selection');
  };
  
  const formatRating = (value: number) => {
    return value.toFixed(1);
  };
  
  // Display a friendly name for the category
  const getCategoryName = (category?: string) => {
    if (!category) return '';
    
    // Check if the category is in our entity names dictionary
    if (ENTITY_NAMES[category]) {
      return ENTITY_NAMES[category];
    }
    
    // Otherwise, format the category name from hyphenated to Title Case
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center relative"
        >
          {/* Back button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-0 top-0"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <span className="inline-block bg-flyerblue-100 text-flyerblue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Feedback
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{getCategoryName(feedbackCategory)}</h1>
          <p className="text-muted-foreground">
            {showComments ? "Add any additional comments" : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
          </p>
        </motion.div>
        
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-xl p-6 md:p-8"
        >
          {!showComments ? (
            <div className="space-y-8">
              <h2 className="text-xl font-medium text-center">{currentQuestion}</h2>
              
              <div className="space-y-8">
                <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                  <span>Not Satisfied</span>
                  <span>Very Satisfied</span>
                </div>
                <Slider
                  value={[ratings[currentQuestionIndex] || 2.5]}
                  min={0}
                  max={5}
                  step={0.1}
                  onValueChange={handleRatingChange}
                  className="mb-6"
                />
                <div className="text-center">
                  <span className="text-3xl font-bold text-flyerblue-600">
                    {formatRating(ratings[currentQuestionIndex] || 2.5)}
                  </span>
                  <span className="text-xl text-muted-foreground">/5.0</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  onClick={handleBackToCategories}
                  variant="outline"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Categories
                </Button>
                
                <Button 
                  onClick={handleNext} 
                  className="flex items-center justify-center"
                >
                  {isLastQuestion ? "Continue" : "Next"}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="comments" className="block text-sm font-medium mb-2">
                  Additional Comments (Optional)
                </label>
                <Textarea
                  id="comments"
                  placeholder="Please share any additional feedback or suggestions..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <div className="flex justify-between">
                <Button 
                  onClick={handlePrevious}
                  variant="outline"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
                
                <Button 
                  onClick={handleSubmit} 
                  className="flex items-center justify-center"
                >
                  Submit Feedback
                  <Send className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default FeedbackDetail;
