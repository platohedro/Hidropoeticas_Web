import React, { useEffect, useState } from 'react';
import './WaterBackground.css';

const WaterBackground = () => {
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    const updateRatioW = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      let ratioW = 1;
      
      if (aspectRatio >= 5) ratioW = 5;
      else if (aspectRatio >= 4) ratioW = 4;
      else if (aspectRatio >= 3) ratioW = 3;
      else if (aspectRatio >= 2) ratioW = 2;
      else if (aspectRatio >= 1) ratioW = 1;
      
      document.documentElement.style.setProperty('--ratioW', ratioW.toString());
    };

    // Check if current page is home page
    const checkHomePage = () => {
      const pathname = window.location.pathname;
      setIsHomePage(pathname === '/' || pathname === '');
    };

    checkHomePage();
    updateRatioW();
    window.addEventListener('resize', updateRatioW);

    return () => {
      window.removeEventListener('resize', updateRatioW);
    };
  }, []);

  return (
    <div className="water-background">
      <div className="surface"></div>
      <div className="caustics"></div>
      {isHomePage && <div className="bg"></div>}
      <div className="sun">
        <div className="sun-layer1"></div>
        <div className="sun-layer2"></div>
        <div className="sun-layer3"></div>
      </div>
      
      <svg style={{ display: 'none' }}>
        <filter id="noise1">
          <feTurbulence 
            type="turbulence" 
            baseFrequency=".05" 
            numOctaves="1" 
            seed="3" 
            stitchTiles='stitch' 
          />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
    </div>
  );
};

export default WaterBackground;
