
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to passenger details page
    navigate('/passenger-details');
  }, [navigate]);
  
  // This will only briefly show while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-flyerblue-50">
      <div className="text-center">
        <h1 className="text-2xl font-medium text-flyerblue-600">Flyer Voice</h1>
        <p className="mt-2 text-muted-foreground">Loading your feedback experience...</p>
      </div>
    </div>
  );
};

export default Index;
