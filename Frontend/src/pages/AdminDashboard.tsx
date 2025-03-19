import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AdminData } from '@/lib/Interfaces';
import { 
  Plane, 
  ShoppingBag, 
  Building, 
  ChevronLeft, 
  Coffee, 
  ClipboardCheck, 
  HelpCircle, 
  Bath,
  Store,
  BarChart3 
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
  const { category, entityId } = useParams<{ category: string, entityId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(entityId || null);
  const [showCategorySelection, setShowCategorySelection] = useState<boolean>(false);
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
        { id: 'vistara', name: 'Vistara', questions: getCustomQuestionsForCategory('airline') }
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
        { id:   'loungekey', name: 'LoungeKey Lounge', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'air-india-maharaja', name: 'Air India Maharaja Lounge', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'tata-sky', name: 'Tata Sky Lounge', questions: getCustomQuestionsForCategory('lounge') },
        { id: 'centurion', name: 'Centurion Lounge (American Express) Lounge', questions: getCustomQuestionsForCategory('lounge') }
        ]
    },
    { 
      id: 'store', 
      title: 'Store Feedback', 
      description: 'Check customer feedback for shops and retail stores', 
      icon: <Store className="h-8 w-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-200',
      subcategories: [
        { id: 'dfs', name: 'Duty Free Shops', questions: getCustomQuestionsForCategory('store') },
        { id: 'whsmith', name: 'WHSmith', questions: getCustomQuestionsForCategory('store') },
        { id: 'inmotion', name: 'InMotion', questions: getCustomQuestionsForCategory('store') },
        { id: 'tumi', name: 'TUMI', questions: getCustomQuestionsForCategory('store') },
        { id: 'victorias-secret', name: 'Victoria\'s Secret', questions: getCustomQuestionsForCategory('store') }
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
    const category = feedbackCategories.find(cat => cat.id === categoryId);
    const hasSubcategories = ['airline', 'lounge', 'store'].includes(categoryId);
    
    if (hasSubcategories) {
      setSelectedCategory(categoryId);
      setShowCategorySelection(true);
      navigate(`/admin-dashboard`);
    } else {
      setSelectedCategory(categoryId);
      setShowCategorySelection(false);
      navigate(`/admin/feedback/${categoryId}`);
    }
  };
  
  const handleSubcategoryClick = (entityId: string) => {
    if (selectedCategory) {
      setSelectedEntityId(entityId);
      navigate(`/admin/feedback/${selectedCategory}/${entityId}`);
    }
  };
  
  const handleBackToDashboard = () => {
    setSelectedCategory(null);
    setSelectedEntityId(null);
    setShowCategorySelection(false);
    navigate('/admin-dashboard');
  };
  const AdminData: AdminData=JSON.parse(localStorage.getItem("UserName"))
  
  
  const selectedCategoryData = feedbackCategories.find(cat => cat.id === selectedCategory);

  const displaySubcategories = selectedCategoryData?.subcategories.length && selectedEntityId
    ? selectedCategoryData.subcategories.filter(sub => sub.id === selectedEntityId)
    : selectedCategoryData?.subcategories.length 
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
            <p className="text-muted-foreground mt-1">Welcome back, {AdminData?.userName}</p>
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
        
        {category ? (
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
              
              <h2 className="text-2xl font-semibold">
                {entityId 
                  ? selectedCategoryData?.subcategories.find(sub => sub.id === entityId)?.name 
                  : selectedCategoryData?.title}
              </h2>
              <p className="text-muted-foreground">{selectedCategoryData?.description}</p>
            </div>
            
            <FeedbackDisplay 
              category={category} 
              subcategories={displaySubcategories} 
            />
          </>
        ) : showCategorySelection && selectedCategory ? (
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
              
              <h2 className="text-2xl font-semibold">{selectedCategoryData?.title} Categories</h2>
              <p className="text-muted-foreground">Select a specific {selectedCategory} to view feedback</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedCategoryData?.subcategories.map((subcategory) => (
                <div 
                  key={subcategory.id}
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                  className={`cursor-pointer rounded-lg border ${selectedCategoryData.color} p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
                >
                  <h3 className="text-lg font-semibold mb-2">{subcategory.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    View feedback for {subcategory.name}
                  </p>
                </div>
              ))}
            </div>
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