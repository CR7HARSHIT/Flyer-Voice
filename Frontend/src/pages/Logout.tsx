
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    const logoutUser = async () => {
      // In a real app, this would be an actual logout call to an auth service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear any user data from localStorage if it exists
      localStorage.removeItem('user');
      
      // Show success message
      toast.success('Successfully logged out');
      
      // Redirect to home page
      navigate('/');
    };

    logoutUser();
  }, [navigate]);

  return (
    <Layout showNavbar={false}>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-flyerblue-600 animate-spin mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Logging out...</h1>
        <p className="text-gray-600">Please wait while we securely log you out</p>
      </div>
    </Layout>
  );
};

export default Logout;
