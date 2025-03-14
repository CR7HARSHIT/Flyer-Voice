
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Layout from '@/components/Layout';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!loginData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    
    if (!loginData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // For demo purposes, accept any valid input
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminName', loginData.name);
      
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
      
      navigate('/admin-dashboard');
    }
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">
            Please provide your administrator credentials to access the dashboard
          </p>
        </div>
        
        <div className="glass rounded-2xl p-6 md:p-8 shadow-sm max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Name</Label>
              <Input
                id="admin-name"
                name="name"
                value={loginData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-flyerblue-500 hover:bg-flyerblue-600 text-white mt-4"
            >
              Login
            </Button>
            
            <div className="text-center mt-4">
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-flyerblue-600 hover:text-flyerblue-700 transition-colors"
              >
                Back to Passenger Verification
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
