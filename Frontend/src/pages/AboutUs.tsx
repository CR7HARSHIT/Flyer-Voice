import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Plane, 
  MessageCircle, 
  Mail, 
  Linkedin, 
 Github,
  Users,
  ExternalLink,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import harshimg from '../../public/imgHarsh.jpg'

interface DeveloperProps {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  website?: string;
}

const Developer: React.FC<DeveloperProps> = ({ 
  name, 
  role, 
  image, 
  github, 
  linkedin, 
  email,
  website
}) => {

  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-6 rounded-xl"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-flyerblue-100">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-muted-foreground mb-4">{role}</p>
        
        <div className="flex gap-2 mt-2">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
              </Button>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <Button variant="outline" size="icon" className="rounded-full">
                <Mail className="h-4 w-4" />
              </Button>
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AboutUs: React.FC = () => {
  const navigate=useNavigate()
  const developers = [
    {
      name: "Harshvardhan Singh Rao",
      role: "Full Stack Developer",
      image: `${harshimg}`,
      github: "https://github.com/CR7HARSHIT",
      linkedin: "https://www.linkedin.com/in/harshvardhanrao15022004/",
      email: "harshvardhanrao555@gmail.com"
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      email: "sarah@flyervoice.com"
    },
    {
      name: "Miguel Rodriguez",
      role: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      github: "https://github.com/miguelrodriguez",
      linkedin: "https://linkedin.com/in/miguelrodriguez",
      email: "miguel@flyervoice.com"
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-flyerblue-100 text-flyerblue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
            About Us
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn about Flyer Voice and the team behind the airport feedback platform.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-xl p-6 mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-flyerblue-100 p-3 rounded-full">
              <Building className="h-6 w-6 text-flyerblue-600" />
            </div>
            <h2 className="text-2xl font-bold">Flyer Voice</h2>
          </div>
          <p className="mb-4">
            Flyer Voice is an innovative platform designed to improve the airport experience by collecting 
            and analyzing passenger feedback. Our mission is to help airports, airlines, and businesses 
            better understand customer needs and preferences.
          </p>
          <p className="mb-4">
            Founded in 2024, we've already partnered with major airports across the country to implement 
            our feedback system, leading to measurable improvements in passenger satisfaction and 
            operational efficiency.
          </p>
          <p>
            Our platform makes it easy for travelers to share their experiences with various aspects of 
            the airport, from airline service to retail shops, helping create a more enjoyable journey 
            for everyone.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-flyerblue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-flyerblue-600" />
            </div>
            <h2 className="text-2xl font-bold">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {developers.map((dev, index) => (
              <Developer 
                key={index}
                name={dev.name}
                role={dev.role}
                image={dev.image}
                github={dev.github}
                linkedin={dev.linkedin}
                email={dev.email}
              />
            ))}
          </div>
        </motion.div>
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
 
