
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Plane, 
  MessageCircle, 
  Mail, 
  Linkedin, 
  Target,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Flyer Voice</h1>
          <p className="text-muted-foreground">
            Flyer Voice is dedicated to improving your airport experience. We value your feedback and strive to make every journey as smooth and enjoyable as possible.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-flyerblue-500" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Our mission is to provide a platform for travelers to voice their opinions and experiences, enabling airports and service providers to make informed decisions and enhance their services.
          </p>
          
          <div className="flex items-center gap-3 mb-4">
            <History className="h-6 w-6 text-flyerblue-500" />
            <h2 className="text-2xl font-semibold">Previous Mission</h2>
          </div>
          <p className="text-muted-foreground">
            Before Flyer Voice, our team worked on several airport improvement initiatives across North America. We identified the need for a direct feedback system that connects travelers with service providers, which led to the creation of Flyer Voice in 2022. Since then, we've helped over 50 airports improve their customer satisfaction ratings by an average of 27%.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg p-6 shadow-md border border-flyerblue-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-flyerblue-400 to-flyerblue-600 flex items-center justify-center text-white text-xl font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">John Doe</h3>
                  <p className="text-flyerblue-600 font-medium mb-2">CEO & Founder</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    With 15+ years in aviation and customer experience, John leads our mission to transform airport feedback systems.
                  </p>
                  <div className="flex gap-3">
                    <a href="mailto:john@flyervoice.com" className="text-muted-foreground hover:text-flyerblue-500 transition-colors">
                      <Mail className="h-4 w-4" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-flyerblue-500 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg p-6 shadow-md border border-flyerblue-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-flyerblue-400 to-flyerblue-600 flex items-center justify-center text-white text-xl font-bold">
                  JS
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Jane Smith</h3>
                  <p className="text-flyerblue-600 font-medium mb-2">Head of Customer Relations</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Jane specializes in translating customer feedback into actionable improvements for airports and airlines.
                  </p>
                  <div className="flex gap-3">
                    <a href="mailto:jane@flyervoice.com" className="text-muted-foreground hover:text-flyerblue-500 transition-colors">
                      <Mail className="h-4 w-4" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-flyerblue-500 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigate('/flight-details')}
            className="bg-flyerblue-500 hover:bg-flyerblue-600 text-white w-full sm:w-auto"
          >
            <Plane className="mr-2 h-4 w-4" />
            Go to Flight Details
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            onClick={() => navigate('/feedback-selection')}
            className="bg-flyerblue-500 hover:bg-flyerblue-600 text-white w-full sm:w-auto"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Give Feedback
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutUs;
