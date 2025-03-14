
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface RatingData {
  rating: string;
  count: number;
}

interface FeedbackRatingChartProps {
  feedbackItems: {
    rating: number;
  }[];
  title?: string;
}

const FeedbackRatingChart: React.FC<FeedbackRatingChartProps> = ({ 
  feedbackItems,
  title = "Rating Distribution"
}) => {
  // Calculate rating distribution with 0.5 step intervals
  const ratingDistribution: RatingData[] = [];
  
  // Initialize counts for all ratings 1-5 with 0.5 steps
  for (let i = 1; i <= 5; i += 0.5) {
    ratingDistribution.push({ rating: i.toFixed(1), count: 0 });
  }
  
  // Count occurrences of each rating, rounding to nearest 0.5
  feedbackItems.forEach(item => {
    if (item.rating >= 1 && item.rating <= 5) {
      const roundedRating = Math.round(item.rating * 2) / 2;
      const index = (roundedRating - 1) * 2;
      if (index >= 0 && index < ratingDistribution.length) {
        ratingDistribution[index].count += 1;
      }
    }
  });

  // Calculate average rating
  const totalRatings = feedbackItems.length;
  const sumRatings = feedbackItems.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : "N/A";
  
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
            <BarChart
              data={ratingDistribution}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="rating" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}★`}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                formatter={(value) => [`${value} reviews`, `${value} ★`]}
                labelFormatter={(label) => `Rating: ${label} stars`}
              />
              <Bar 
                dataKey="count" 
                name="Reviews"
                fill="#8B5CF6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackRatingChart;
