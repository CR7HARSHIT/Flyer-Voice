
import React from'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackRatingChartProps {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  feedbackItems: {
    // No rating property
  }[];
  title?: string; // Optional title property
}

const FeedbackRatingChart: React.FC<FeedbackRatingChartProps> = ({ 
  feedbackItems,
  title = "Rating Distribution"
}) => {
  
  console.log("Feedback rating feedback Items::",feedbackItems)
  // Calculate rating distribution with 0.5 step intervals
  const calculateRatingPercentages = () => {
    // Initialize counts for ratings 1-5 with 0.5 steps
    const ratingCounts: Record<string, number> = {};
    for (let i = 1; i <= 5; i += 1) {
      ratingCounts[i.toFixed(1)] = 0;
    }
    console.log("rating count::",ratingCounts)
    
    // Count occurrences of each rating, rounding to nearest 0.5
    feedbackItems?.forEach(item => {
      if (item.rating >= 1 && item.rating <= 5) {
        const roundedRating = Math.round(item.rating * 2) / 2;
        const key = roundedRating.toFixed(1);
        if (ratingCounts[key] !== undefined) {
          ratingCounts[key] += 1;
        }
      }
    });
    console.log("rating count::",ratingCounts)
    
    // Convert to percentage data for pie chart
    const totalRatings = feedbackItems.length;
    return Object.entries(ratingCounts).map(([rating, count]) => ({
      name: `${rating}★`,
      value: totalRatings > 0 ? (count / totalRatings) * 100 : 0,
      count: count,
      rating: parseFloat(rating)
    }));
  };

  const ratingData = calculateRatingPercentages();
  console.log("calculateRatingPercentages::",ratingData)
  // Calculate average rating
  const totalRatings = feedbackItems.length;
  const sumRatings = feedbackItems.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : "N/A";
  
  // Colors for the pie chart slices based on rating
  const getRatingColor = (rating: number) => {
    console.log(rating)
    if (rating > 0 && rating <= 1) return '#E63946'; // Bright Red for very low ratings
    if (rating > 1 && rating <= 2) return '#F4A261'; // Orange for low ratings
    if (rating > 2 && rating <= 3) return '#FFD700'; // Yellow for medium ratings
    if (rating > 3 && rating <= 4) return '#4CAF50'; // Green for good ratings
    if (rating > 4 && rating <= 5) return '#1D3557'; // Blue for high ratings
    return '#CCCCCC'; // Fallback Gray for invalid ratings
  };
  
  
  

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{data.count} reviews ({data.value.toFixed(1)}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {title} <span className="text-flyerblue-500 flex items-center gap-1">{averageRating} <Star className="h-4 w-4 fill-flyerblue-500" /></span>
        </CardTitle>
        <CardDescription>{totalRatings} total ratings</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ratingData.filter(item => item.count > 0)} // Only show ratings with data
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRatingColor(entry.rating)} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {ratingData
            .filter(item => item.count > 0)
            .sort((a, b) => b.rating - a.rating)
            .map((entry) => (
              <div 
                key={entry.name} 
                className={cn(
                  "flex flex-col items-center p-2 rounded-md",
                  "border border-gray-200"
                )}
              >
                <div className="text-lg font-medium">{entry.name}</div>
                <div className="text-sm text-muted-foreground">{entry.count} reviews</div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackRatingChart;