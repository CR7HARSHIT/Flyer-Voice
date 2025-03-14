
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, 
  ShoppingBag, 
  Building, 
  Clock, 
  MessageSquare, 
  BarChart3, 
  ChevronLeft, 
  Coffee, 
  ClipboardCheck, 
  HelpCircle, 
  Bath,
  Inbox,
  Store 
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import FeedbackCategoryList from '@/components/admin/FeedbackCategoryList';
import FeedbackDisplay from '@/components/admin/FeedbackDisplay';
import { getCustomQuestionsForCategory } from '@/components/admin/FeedbackQuestionCategories';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { category } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  
  // Check if admin is logged in
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isAdminLoggedIn) {
      toast({
        title: "Access Denied",
        description: "Please login as an admin to access this page.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);
  
  // All categories
  const feedbackCategories = [
    { 
      id: 'baggage', 
      title: 'Baggage Feedback', 
      description: 'View feedback on baggage handling, collection, and services', 
      icon: <ShoppingBag className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-50 border-amber-200',
      subcategories: [] // No subcategories for Baggage
    },
    { 
      id: 'food-court', 
      title: 'Food Court Feedback', 
      description: 'Review feedback about dining experiences at airport restaurants', 
      icon: <Coffee className="h-8 w-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-200',
      subcategories: [] // No subcategories for Food Court
    },
    { 
      id: 'check-in', 
      title: 'Check-In Feedback', 
      description: 'View feedback about the check-in process experience', 
      icon: <ClipboardCheck className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-50 border-indigo-200',
      subcategories: [] // No subcategories for Check-In
    },
    { 
      id: 'help-desk', 
      title: 'Help Desk Feedback', 
      description: 'Analyze feedback on assistance provided by help desk staff', 
      icon: <HelpCircle className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200',
      subcategories: [] // No subcategories for Help Desk
    },
    { 
      id: 'airline', 
      title: 'Airlines Feedback', 
      description: 'View feedback from passengers about different airlines', 
      icon: <Plane className="h-8 w-8 text-flyerblue-500" />,
      color: 'bg-blue-50 border-blue-200',
      subcategories: [
        { id: 'indigo', name: 'IndiGo', questions: getCustomQuestionsForCategory('airline') },
        { id: 'air-india', name: 'Air India', questions: getCustomQuestionsForCategory('airline') },
        { id: 'spicejet', name: 'SpiceJet', questions: getCustomQuestionsForCategory('airline') },
        { id: 'goair', name: 'GoAir', questions: getCustomQuestionsForCategory('airline') },
        { id: 'vistara', name: 'Vistara', questions: getCustomQuestionsForCategory('airline') },
        { id: 'airasia', name: 'AirAsia India', questions: getCustomQuestionsForCategory('airline') },
        { id: 'emirates', name: 'Emirates', questions: getCustomQuestionsForCategory('airline') },
        { id: 'lufthansa', name: 'Lufthansa', questions: getCustomQuestionsForCategory('airline') },
        { id: 'british-airways', name: 'British Airways', questions: getCustomQuestionsForCategory('airline') },
        { id: 'qatar-airways', name: 'Qatar Airways', questions: getCustomQuestionsForCategory('airline') },
        { id: 'singapore-airlines', name: 'Singapore Airlines', questions: getCustomQuestionsForCategory('airline') },
        { id: 'other-airlines', name: 'Other Airlines', questions: getCustomQuestionsForCategory('airline') }
      ]
    },
    { 
      id: 'lounge', 
      title: 'Lounges Feedback', 
      description: 'Review feedback about airport lounges and waiting areas', 
      icon: <Building className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-50 border-indigo-200',
      subcategories: [
        { id: 'plaza-premium', name: 'Plaza Premium Lounge', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'priority-pass', name: 'Priority Pass Lounge', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'airline-lounges', name: 'Airline Lounges', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'credit-card-lounges', name: 'Credit Card Lounges', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'business-lounges', name: 'Business Lounges', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'first-class-lounges', name: 'First Class Lounges', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'sleep-pods', name: 'Sleep Pods', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'day-hotels', name: 'Day Hotels', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'other-lounges', name: 'Other Lounges', questions: getCustomQuestionsForCategory('lounge') }
      ]
    },
    { 
      id: 'store', 
      title: 'Store Feedback', 
      description: 'Check customer feedback for shops and retail stores', 
      icon: <Store className="h-8 w-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-200',
      subcategories: [
        { id: 'duty-free', name: 'Duty Free Shops', questions: getCustomQuestionsForCategory('store') },
        { id: 'fashion', name: 'Fashion & Apparel', questions: getCustomQuestionsForCategory('store') },
        { id: 'electronics', name: 'Electronics', questions: getCustomQuestionsForCategory('store') },
        { id: 'books-magazines', name: 'Books & Magazines', questions: getCustomQuestionsForCategory('store') },
        { id: 'gifts-souvenirs', name: 'Gifts & Souvenirs', questions: getCustomQuestionsForCategory('store') },
        { id: 'convenience', name: 'Convenience Stores', questions: getCustomQuestionsForCategory('store') },
        { id: 'beauty-wellness', name: 'Beauty & Wellness', questions: getCustomQuestionsForCategory('store') },
        { id: 'jewelry-accessories', name: 'Jewelry & Accessories', questions: getCustomQuestionsForCategory('store') },
        { id: 'liquor-tobacco', name: 'Liquor & Tobacco', questions: getCustomQuestionsForCategory('store') },
        { id: 'other-stores', name: 'Other Stores', questions: getCustomQuestionsForCategory('store') }
      ]
    },
    { 
      id: 'washroom', 
      title: 'Washroom Feedback', 
      description: 'Review feedback on cleanliness and maintenance of washrooms', 
      icon: <Bath className="h-8 w-8 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      subcategories: [] // No subcategories for Washroom
    },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminName');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate(`/admin/feedback/${categoryId}`);
  };
  
  const handleBackToDashboard = () => {
    setSelectedCategory(null);
    navigate('/admin-dashboard');
  };
  
  const adminName = localStorage.getItem('adminName') || 'Admin';
  
  const selectedCategoryData = feedbackCategories.find(cat => cat.id === selectedCategory);

  // For categories without subcategories, create a default subcategory with the same questions
  const displaySubcategories = selectedCategoryData?.subcategories.length 
    ? selectedCategoryData.subcategories 
    : [{ 
        id: selectedCategoryData?.id || '', 
        name: selectedCategoryData?.title || '', 
        questions: selectedCategoryData ? getCustomQuestionsForCategory(selectedCategoryData.id) : []
      }];
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {adminName}</p>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              Logout
            </Button>
            <Button className="gap-2 bg-flyerblue-500 hover:bg-flyerblue-600">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>
        
        {selectedCategory ? (
          <>
            <div className="mb-6">
              <Button 
                variant="ghost" 
                className="gap-2 mb-4" 
                onClick={handleBackToDashboard}
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              
              <h2 className="text-2xl font-semibold">{selectedCategoryData?.title}</h2>
              <p className="text-muted-foreground">{selectedCategoryData?.description}</p>
            </div>
            
            <FeedbackDisplay 
              category={selectedCategory} 
              subcategories={displaySubcategories} 
            />
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Feedback Overview</h2>
              <p className="text-muted-foreground">
                Select a category below to view and manage passenger feedback. You can analyze trends, respond to issues, and generate reports.
              </p>
            </div>
            
            <FeedbackCategoryList 
              categories={feedbackCategories} 
              onCategoryClick={handleCategoryClick} 
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
