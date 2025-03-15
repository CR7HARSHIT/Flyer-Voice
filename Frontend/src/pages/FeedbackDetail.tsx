/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Send, ChevronLeft } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import FEEDBACK_QUESTIONS from '@/lib/FeedbackQuestions';
import FeedbackCategoryList from '@/components/admin/FeedbackCategoryList';

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
  'air-india': 'AirIndia',
  'spicejet': 'SpiceJet',
  'goair': 'GoAir',
  'vistara': 'Vistara'
};

const FeedbackDetail: React.FC = () => {
  const { category, entityId } = useParams<{ category: string, entityId?: string }>();
  console.log(`category::${category},entityId::${entityId}`)
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedbackData,setFeedbackData]=useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [ratings, setRatings] = useState<number[]>([]);
  const [comments, setComments] = useState("");
  const [showComments, setShowComments] = useState(false);
  
  // Use entityId as the category if it exists, otherwise use the category parameter
  const feedbackCategory =  (category ? category.replace(/-/g, "") : undefined)
  console.log("Feedback Category::",feedbackCategory)
  const questions = feedbackCategory ? FEEDBACK_QUESTIONS[feedbackCategory] || [] : [];
  const currentQuestion = questions[currentQuestionIndex]?.q;
  const isLastQuestion = currentQuestionIndex === Object.keys(questions)?.length - 1;
  const isFirstQuestion = currentQuestionIndex === 1;
  
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
      setFeedbackData({
      ...feedbackData,
      [questions[currentQuestionIndex]?.ref] :ratings[currentQuestionIndex]
      })
    if (isLastQuestion) {
      setShowComments(true);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (showComments) {
      setShowComments(false);
    } else if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Navigate back to feedback selection
      navigate('/feedback-selection');
    }
  };
  
  const handleBackToCategories = () => {
    navigate('/feedback-selection');
  };
  
   const dataSendFN=async ()=>{
    try {
      const response = await fetch(`http://localhost:5000/api/${feedbackCategory}/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...feedbackData,
          [questions[currentQuestionIndex]?.ref] : comments
          }),
      });
    
      
      if (!response.ok) {
        throw new Error("Something went wrong with submitting your feedback.");
      }
      toast({
        title: "Feedback Submitted",
        description: `Thank you for your feedback on ${getCategoryName(feedbackCategory)}`,
      });
      
    } catch (err) {
      console.error("Error submitting feedback:", err)
      toast({
        title: "Cant Submit Feedback",
        description: "Due to Some issue cant submit feedback try after some time.",
        variant: "destructive",
      });
      ;}
  }
  const handleSubmit = () => {
    // In a real app, you would send this data to a backend
    if(comments.length < 2 ){
      toast({
        title: "Commnets Required",
        description: `Please provide a valid comment before submitting feedback on ${getCategoryName(feedbackCategory)}`,
        variant: "destructive",
      });    
    } else
    {  
      dataSendFN();
    
    
    // Navigate back to feedback selection after submission
    navigate('/feedback-selection');
  }
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
  useEffect(()=>{
    if(entityId){
      setFeedbackData({...feedbackData,name:ENTITY_NAMES[entityId]})
    }
  },[])
  console.log("questions::",questions)
  
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{getCategoryName(feedbackCategory)} {entityId ? "("+ ENTITY_NAMES[entityId]+")" :""}</h1>
          <p className="text-muted-foreground">
            {showComments ? "Add any additional comments" : `Question ${currentQuestionIndex } of ${Object.keys(questions)?.length }`}
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
                {currentQuestion}
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
