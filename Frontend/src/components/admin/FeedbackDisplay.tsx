import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Inbox, Star, MessageSquare, User, Calendar, CloudCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FeedbackRatingChart from './FeedbackRatingChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FeedbackQuestion } from './FeedbackQuestionCategories';
import { useParams } from 'react-router-dom';
import {  formatDate} from  '../../lib/utils';
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
  category=category.replace(/-/g, '')
   console.log("category::",category)
   console.log("Subcategories::",subcategories)
   console.log("login data::",JSON.parse(localStorage.getItem("UserName")))
  const [activeTab, setActiveTab] = useState(subcategories[0]?.id || '');
 const [data,setData]=useState([]);
 const [isSubCat,setIsSubCat]=useState(false)
 const catFilter=["_id","name","createdAt","feedbackMessage","__v"]
 const [feedbackCategoryData,setFeedbackCategoryData]=useState({})
 const [pieChartData,setPieChartData]=useState([])
  // Generate mock data for each subcategory and question
  const mockFeedbackData: Record<string, Record<string, FeedbackItem[]>> = {};
  const roundToNearestInt = (value) => {
    if (value > 0 && value <= 0.5) return 0;
    if (value > 0.5 && value <= 1.5) return 1;
    if (value > 1.5 && value <= 2.5) return 2;
    if (value > 2.5 && value <= 3.5) return 3;
    if (value > 3.5 && value <= 4.5) return 4;
    if (value > 4.5) return 5;
    return -1; // Optional: Handle values less than or equal to 0
  };
  
 
  
   useEffect(()=>{
    const loginData = JSON.parse(localStorage.getItem("UserName"));
    const arr=['checkin','baggage','foodcourt','helpdesk','washroom']
    const fetchData = async (category) => {
      try {
        // Define headers, including Authorization if needed
        const headers = {
          'Content-Type': 'application/json',  // Ensure the request body is in JSON format
          'authorization': loginData?.token,  // Replace with the actual token
        };
    
        // Make the fetch request with the method, headers, and authorization
        const response = await fetch(`https://flyer-voice.onrender.com/api/${category}/`, {
          method: 'GET',           // HTTP method
          headers: headers,        // Headers object
        });
    
        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
    
        // Parse the response JSON
        const data = await response.json();
    
        // Log the data for debugging
        console.log("Received data:", data);
    
        // Proceed with handling the data...
        //  if(category===subcategories[0]?.id.replace(/-/g, '') ) 
        //  else console.log("SUBCATEGORY EXISTS")
        let tempData;
        if(arr.includes(category)){ setData(data?.data)
          tempData=data?.data
        }
          else{
                const subcat=subcategories[0].name;
                console.log("subcat::",subcat)
                console.log("Data after filter::",data?.data.filter((obj)=> obj?.name===subcat ))
                setData(data?.data.filter((obj)=> obj?.name===subcat ))
                tempData=data?.data.filter((obj)=> obj?.name===subcat )
                setIsSubCat(true)
          }       
           console.log("tempData::",tempData);
          const fcArr =  Object.keys(tempData[0]).filter(Element=>(!catFilter.includes(Element)))
          let tempObj={}
          fcArr.forEach(ele=>{
            
            tempObj={...tempObj,[ele]:[]}
          })
          tempData.forEach(Obj => {
            
            fcArr.forEach(key => {
              tempObj[key].push(Obj[key])
            })
          });
          console.log("tempObj:",tempObj)
          console.log("fcArr",fcArr)
        console.log("No error")
        setFeedbackCategoryData(tempObj)
        let tempPiedata=[];
        tempData.forEach(obj => {
          let sum=0;
          fcArr.forEach(key => {
            sum+=obj[key]
          })
          sum=sum/(fcArr.length)
          sum=roundToNearestInt(sum)
          tempPiedata=[...tempPiedata,{...obj,rating:sum}]
        });
        setPieChartData(tempPiedata)
        console.log("PieChart::",tempPiedata)
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log("error")
      }
    };
    
   
   fetchData(category)
   },[category])
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

  const renderStars = (rating: number ) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative h-4 w-4">
            {/* Empty star as the base */}
            <Star className="h-4 w-4 text-gray-300" />
            
            {/* Full star if i < rating */}
            {i < Math.floor(rating) && (
              <Star className="absolute inset-0 h-4 w-4 text-yellow-400 fill-yellow-400" />
            )}
  
            {/* Partial star for fractional part */}
            {i === Math.floor(rating) && rating % 1 !== 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(rating % 1) * 100}%` }} // Dynamically fill based on the decimal part
              >
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
            )}
          </div>
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
  console.log("data::",data)
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
                {data?.length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {subcategories.map((sub) => (
          <TabsContent key={sub.id} value={sub.id} className="mt-4">
            <div className="grid gap-6">
              {getAllFeedbackForSubcategory(sub.id).length > 0 && (
                <FeedbackRatingChart 
                  feedbackItems={pieChartData} 
                  title={`${sub.name} Overall Rating Distribution`}
                />
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>{sub.name} {isSubCat?"Feedback": ""} </CardTitle>
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
                   
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.keys(feedbackCategoryData).map( (ele,i)=> {
                            const arr=feedbackCategoryData[ele];
                            const sum = arr.reduce((acc, num) => acc + num, 0);
                           const avgRating = (sum / arr.length).toFixed(1);
                            return (
                              <TableRow key={ele}>
                                <TableCell className="font-medium">{ele[0].toUpperCase() + ele.slice(1)}</TableCell>
                                <TableCell>
                                  { (
                                    <div className="flex items-center gap-2">
                                      {avgRating}
                                      <div className="flex">
                                        {renderStars(Number(avgRating))}
                                      </div>
                                    </div>
                                  ) }
                                </TableCell>
                                
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                      
                      {/* List all feedback items for this subcategory */}
                      <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Individual Feedback</h3>
                           { data?.map((feedback,index) => {
                            
                            return (
                              <div key={feedback.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{`Comment ${index+1}`}</span>
                                  </div>
                                  
                                </div>
                                {/* <div className="pl-6 mb-1">
                                  {renderStars(feedback.rating)}
                                </div> */}
                                <div className="pl-6 mb-3">
                                  <p className="text-sm text-slate-700">"{feedback?.feedbackMessage}"</p>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {formatDate(feedback.createdAt)}
                                </div>
                              </div>
                            );
                          })}
                      
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