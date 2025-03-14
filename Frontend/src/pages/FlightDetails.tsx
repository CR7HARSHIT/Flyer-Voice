
import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import FlightInfoCard from '@/components/FlightInfoCard';
import { FlightInfo } from '@/lib/Interfaces';
const FlightDetails: React.FC = () => {
  console.log("FlightDetails Componenet rendered") // debug 
  const [flightData,setFlightData]=useState<FlightInfo | null>(null);
  const navigate = useNavigate();
  const storedData = localStorage.getItem("UserName");
  console.log('storedData::',storedData)
  const userData = storedData ? JSON.parse(storedData) : null;
  const handleContinue = () => {
    navigate('/feedback-selection');
  };
  useEffect(()=>{
    console.log("USEEFFECT EXECUTED") //debug
    async function flightfn(){
      try {
        const data= await fetch(`https://aerodatabox.p.rapidapi.com/flights/number/${userData?.flightNumber}?withAircraftImage=false&withLocation=false`, {
          method: 'GET',
          headers: {
            "X-RapidAPI-Key": "f8b1fc798bmshd3fd5dbb496e3a1p165482jsne9fcdb005ffe",
            "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com"
          }
        })
         const response=await data.json()
         console.log('response:',response)
         setFlightData(response[0])   
      } catch (error) {
        console.error("The error while making an API call for flight data is: ",error) // debug
      }
     
    }
    flightfn();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="inline-block bg-flyerblue-100 text-flyerblue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Step 2 of 3
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Flight Details</h1>
          <p className="text-muted-foreground">
            Please verify your flight information before proceeding to feedback
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <FlightInfoCard data={flightData} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Button 
            onClick={handleContinue}
            className="bg-flyerblue-500 hover:bg-flyerblue-600 text-white px-8 h-11"
          >
            Continue to Feedback
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FlightDetails;
