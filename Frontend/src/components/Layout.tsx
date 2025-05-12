
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavbar = true }) => {
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };
// hello
  return (
    <div className="min-h-screen bg-gradient-to-b from-flyerblue-50 to-white">
      {showNavbar && <Navbar />}
      
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="container mx-auto px-4 py-8 md:px-6 md:py-12"
      >
        {children}
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Flyer Voice - Airport Feedback System</p>
      </footer>
    </div>
  );
};

export default Layout;
