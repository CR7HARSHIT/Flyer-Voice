
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Inbox, Star, MessageSquare, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FeedbackRatingChart from './FeedbackRatingChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FeedbackQuestion } from './FeedbackQuestionCategories';

interface Subcategory {
  id: string;
  name: string;
  questions: FeedbackQuestion[];
}

interface FeedbackItem {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  questionId: string;
}

interface FeedbackDisplayProps {
  category: string;
  subcategories: Subcategory[];
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ category, subcategories }) => {
  const [activeTab, setActiveTab] = useState(subcategories[0]?.id || '');
  
  // Generate mock data for each subcategory and question
  const mockFeedbackData: Record<string, Record<string, FeedbackItem[]>> = {};
  
  subcategories.forEach(sub => {
    mockFeedbackData[sub.id] = {};
    
    // For each subcategory, generate feedback for each question
    sub.questions.forEach(question => {
      mockFeedbackData[sub.id][question.id] = Array(Math.floor(Math.random() * 3) + 1).fill(null).map((_, i) => ({
        id: `${sub.id}-${question.id}-feedback-${i}`,
        customerName: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Williams', 'Michael Brown'][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 5) + 1,
        comment: [
          'Great experience overall!',
          'Service could be improved.',
          'The staff was very helpful.',
          'Had to wait too long.',
          'Very clean and well-maintained facilities.'
        ][Math.floor(Math.random() * 5)],
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        questionId: question.id
      }));
    });
  });

  // Calculate total feedback count for a subcategory
  const getTotalFeedbackCount = (subId: string) => {
    if (!mockFeedbackData[subId]) return 0;
    
    return Object.values(mockFeedbackData[subId])
      .reduce((total, questionFeedback) => total + questionFeedback.length, 0);
  };
  
  // Get all feedback items for a subcategory
  const getAllFeedbackForSubcategory = (subId: string) => {
    if (!mockFeedbackData[subId]) return [];
    
    return Object.values(mockFeedbackData[subId])
      .flat();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  const noFeedbackDisplay = (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="bg-slate-100 p-4 rounded-full mb-4">
        <Inbox className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No Feedback Yet</h3>
      <p className="text-muted-foreground max-w-sm">
        There's no feedback for this category yet. Check back later or explore other categories.
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent space-x-2 space-y-2 sm:space-y-0">
          {subcategories.map((sub) => (
            <TabsTrigger 
              key={sub.id} 
              value={sub.id}
              className="data-[state=active]:bg-flyerblue-100 data-[state=active]:text-flyerblue-700 border"
            >
              {sub.name}
              <Badge className="ml-2 bg-flyerblue-500">
                {getTotalFeedbackCount(sub.id)}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {subcategories.map((sub) => (
          <TabsContent key={sub.id} value={sub.id} className="mt-4">
            <div className="grid gap-6">
              {getAllFeedbackForSubcategory(sub.id).length > 0 && (
                <FeedbackRatingChart 
                  feedbackItems={getAllFeedbackForSubcategory(sub.id)} 
                  title={`${sub.name} Overall Rating Distribution`}
                />
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>{sub.name} Feedback</CardTitle>
                  <CardDescription>
                    Review and manage feedback for {sub.name} across different aspects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {getTotalFeedbackCount(sub.id) > 0 ? (
                    <div className="space-y-8">
                      {/* Show feedback by question categories in a tabular format */}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Average Rating</TableHead>
                            <TableHead>Responses</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sub.questions.map(question => {
                            const feedbacksForQuestion = mockFeedbackData[sub.id][question.id] || [];
                            const avgRating = feedbacksForQuestion.length 
                              ? (feedbacksForQuestion.reduce((sum, fb) => sum + fb.rating, 0) / feedbacksForQuestion.length).toFixed(1)
                              : '-';
                            
                            return (
                              <TableRow key={question.id}>
                                <TableCell className="font-medium">{question.text}</TableCell>
                                <TableCell>
                                  {feedbacksForQuestion.length ? (
                                    <div className="flex items-center gap-2">
                                      {avgRating}
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <Star 
                                            key={i} 
                                            className={`h-3 w-3 ${i < parseFloat(avgRating as string) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  ) : '-'}
                                </TableCell>
                                <TableCell>{feedbacksForQuestion.length}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                      
                      {/* List all feedback items for this subcategory */}
                      <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Individual Feedback</h3>
                        {Object.entries(mockFeedbackData[sub.id]).flatMap(([questionId, feedbacks]) => 
                          feedbacks.map(feedback => {
                            const question = sub.questions.find(q => q.id === questionId);
                            return (
                              <div key={feedback.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{feedback.customerName}</span>
                                  </div>
                                  <Badge variant="outline" className="bg-slate-50">
                                    {question?.text || questionId}
                                  </Badge>
                                </div>
                                <div className="pl-6 mb-1">
                                  {renderStars(feedback.rating)}
                                </div>
                                <div className="pl-6 mb-3">
                                  <p className="text-sm text-slate-700">"{feedback.comment}"</p>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {feedback.date}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  ) : (
                    noFeedbackDisplay
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeedbackDisplay;
