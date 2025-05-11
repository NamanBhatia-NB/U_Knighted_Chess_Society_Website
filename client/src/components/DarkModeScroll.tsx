import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function DarkModeScroll() {
  const { theme } = useTheme();
  const [backgroundStyles, setBackgroundStyles] = useState({});

  useEffect(() => {
    if (theme !== 'dark') {
      setBackgroundStyles({});
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
      return;
    }

    const handleScroll = () => {
      const position = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (documentHeight <= windowHeight) return;

      const scrollableDistance = documentHeight - windowHeight;
      const scrollPercentage = Math.min(1, position / (scrollableDistance * 0.3)); // Only affect first 30% of scroll

      // HSL interpolation from light black (l=16%) to deep black (l=4%)
      const light = 16;
      const dark = 4;
      const l = light + scrollPercentage * (dark - light);
      const bgColor = `hsl(0, 0%, ${l}%)`; // hue=0, saturation=0 (pure grayscale)

      document.body.style.backgroundColor = bgColor;
      document.documentElement.style.backgroundColor = bgColor;

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
        transition: 'background-color 0.2s ease-out',
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  if (theme !== 'dark') return null;

  return <div style={backgroundStyles} id="dark-mode-background" />;
}
