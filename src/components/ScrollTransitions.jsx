import React, { useState, useEffect } from 'react';
import WaterTransition from './WaterTransition.jsx';

const ScrollTransitions = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
        
        // Trigger transition when entering a new section
        if (isInView && Math.abs(currentScrollY - lastScrollY) > 100) {
          setShowTransition(true);
          setLastScrollY(currentScrollY);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  return (
    <WaterTransition 
      isVisible={showTransition} 
      onComplete={handleTransitionComplete}
    />
  );
};

export default ScrollTransitions;

