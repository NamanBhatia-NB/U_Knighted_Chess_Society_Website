
import JoinSection from "@/components/ChessSections/JoinSection";
import Footer from "@/components/ChessSections/Footer";
import { useEffect } from "react";

export default function Join() {
  // Initialize scroll animation
  useEffect(() => {
    const scrollFadeElements = document.querySelectorAll('.scrolled-fade-in');
    
    const checkScroll = () => {
      scrollFadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('fade-in-visible');
        }
      });
    };
    
    window.addEventListener('scroll', checkScroll);
    // Check on initial load
    checkScroll();
    
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <>
      
      <div className="pt-24">
        <JoinSection />
      </div>
      <Footer />
    </>
  );
}
