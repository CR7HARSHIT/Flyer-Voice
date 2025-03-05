
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Ticket, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const PassengerForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  
  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    mobile:'',
    pnr: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    pnr:'',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setPassengerData(prev => ({
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
    
    if (!passengerData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!passengerData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(passengerData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    
    if (!passengerData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(passengerData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Mobile number must be 10 digits';
      valid = false;
    }
    
    if (!passengerData.pnr.trim()) {
      newErrors.pnr = 'PNR is required';
      valid = false;
    } else if (passengerData.pnr.length < 6) {
      newErrors.pnr = 'PNR must be at least 6 characters';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
   ///////////////////////////////////////////////
   async function checkUser(userDetails:
    { name:string,
      email:string,
      mobile:string,
      pnr:string
   })
   {
      const response= await fetch("http://localhost:5000/api/user",
        {
          method:"POST",
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json",
          } ,
          body:JSON.stringify(userDetails)
        })
   
   const data=await response.json()
   console.log(`User Verification API response:${data}`)
   console.log(`User Verification API response of data:${data.success}`)
    return data.success
   } 
   ////////////////////////////////////////////////




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (validateForm()) {
      
      // Store passenger data in localStorage for now

      
      const success=await checkUser(passengerData)
      console.log(`x is ${success}`)
    if(success)
     {
       localStorage.setItem('passengerData', JSON.stringify(passengerData));
      
      toast({
        title: "Verification Successful",
        description: "Your details have been verified. Proceeding to flight details.",
      });
      
      navigate('/flight-details');
    }else{
      toast({
        title: "Verification Failed",
        description: "The details provided do not match our records. Please verify your PNR number and other information and try again.",
      });
    }
  
  };
}
  
  const formFieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };
  
  return (
    <div className="mx-auto max-w-md w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          className="space-y-2"
          custom={0} 
          initial="hidden" 
          animate="visible" 
          variants={formFieldVariants}
        >
          <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-flyerblue-500" />
            Full Name
          </Label>
          <div className="relative">
            <Input
              id="name"
              name="name"
              value={passengerData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`pl-3 h-11 ${errors.name ? 'border-destructive' : 'focus:border-flyerblue-300'}`}
            />
          </div>
          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          custom={1} 
          initial="hidden" 
          animate="visible" 
          variants={formFieldVariants}
        >
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-flyerblue-500" />
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={passengerData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={`pl-3 h-11 ${errors.email ? 'border-destructive' : 'focus:border-flyerblue-300'}`}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          custom={2} 
          initial="hidden" 
          animate="visible" 
          variants={formFieldVariants}
        >
          <Label htmlFor="mobile" className="text-sm font-medium flex items-center gap-2">
            <Phone className="w-4 h-4 text-flyerblue-500" />
            Mobile Number
          </Label>
          <Input
            id="mobile"
            name="mobile"
            value={passengerData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className={`pl-3 h-11 ${errors.mobile ? 'border-destructive' : 'focus:border-flyerblue-300'}`}
          />
          {errors.mobile && <p className="text-destructive text-sm">{errors.mobile}</p>}
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          custom={3} 
          initial="hidden" 
          animate="visible" 
          variants={formFieldVariants}
        >
          <Label htmlFor="pnr" className="text-sm font-medium flex items-center gap-2">
            <Ticket className="w-4 h-4 text-flyerblue-500" />
            PNR Number
          </Label>
          <Input
            id="pnr"
            name="pnr"
            value={passengerData.pnr}
            onChange={handleChange}
            placeholder="Enter your PNR number"
            className={`pl-3 h-11 ${errors.pnr ? 'border-destructive' : 'focus:border-flyerblue-300'}`}
          />
          {errors.pnr && <p className="text-destructive text-sm">{errors.pnr}</p>}
        </motion.div>
        
        <motion.div 
          custom={4} 
          initial="hidden" 
          animate="visible" 
          variants={formFieldVariants}
        >
          <Button 
            type="submit" 
            className="w-full bg-flyerblue-500 hover:bg-flyerblue-600 text-white h-11"
          >
            Proceed
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </form>
      
      <motion.div 
        className="mt-6 text-center"
        custom={5} 
        initial="hidden" 
        animate="visible" 
        variants={formFieldVariants}
      >
        <a 
          href="/admin-login" 
          className="text-sm text-flyerblue-600 hover:text-flyerblue-700 transition-colors"
        >
          Are you an admin? Click to Login
        </a>
      </motion.div>
    </div>
  );
}

export default PassengerForm;
