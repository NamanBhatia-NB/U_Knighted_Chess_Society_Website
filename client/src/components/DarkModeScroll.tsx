import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function DarkModeScroll() {
  const { theme } = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [backgroundStyles, setBackgroundStyles] = useState({});
  
  // Handle scroll events
  useEffect(() => {
    // Only apply this effect in dark mode
    if (theme !== 'dark') {
      setBackgroundStyles({});
      return;
    }
    
    const handleScroll = () => {
      const position = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      
      // Don't proceed if there's not enough content to scroll
      if (documentHeight <= windowHeight) return;
      
      // Calculate scroll percentage (0-1)
      const scrollableDistance = documentHeight - windowHeight;
      // Clamp to first 30% of the page for the effect
      const scrollPercentage = Math.min(1, position / (scrollableDistance * 0.3));
      
      setScrollPosition(scrollPercentage);
      
      // Interpolate between colors based on scroll percentage
      const lightNavy = { h: 224, s: 40, l: 25 }; // Lighter navy
      const darkNavy = { h: 224, s: 71, l: 4 };   // Darker navy
      
      // Linear interpolation between colors
      const h = lightNavy.h;
      const s = lightNavy.s + scrollPercentage * (darkNavy.s - lightNavy.s);
      const l = lightNavy.l + scrollPercentage * (darkNavy.l - lightNavy.l);
      
      const bgColor = `hsl(${h} ${s}% ${l}%)`;
      
      console.log("Scroll position:", scrollPercentage, "Color:", bgColor);
      
      // Set the background color styles to be applied by the component
      // Apply background color to component AND body element
      document.body.style.backgroundColor = bgColor;
      document.documentElement.style.backgroundColor = bgColor;
      
      // Also set background color on main containers for good measure
      document.querySelectorAll('main').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.backgroundColor = 'transparent';
        }
      });
      
      setBackgroundStyles({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: bgColor,
        zIndex: -1,
        pointerEvents: 'none',
        transition: 'background-color 0.2s ease-out'
      });
    };
    
    // Initial call
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);
  
  // Only render this component in dark mode
  if (theme !== 'dark') {
    return null;
  }
  
  return (
    <div style={backgroundStyles} id="dark-mode-background" />
  );
}