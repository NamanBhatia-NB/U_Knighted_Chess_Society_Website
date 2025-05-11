import { Link } from "wouter";
import ChessModelViewer from "@/components/ChessModelViewer";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-col lg:flex-row w-full items-center overflow-hidden py-20" style={{ minHeight: '800px' }}>
      {/* Semi-transparent overlay to ensure text visibility in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent dark:from-black/50 dark:to-black/20 z-[1]"></div>
      
      <div className="container w-full px-4 sm:px-6 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 relative z-10">
        <div className="w-full lg:w-1/2 max-w-3xl mx-auto lg:mx-0 order-1 mt-6 lg:mt-0 glass dark:bg-black/30 p-6 rounded-xl backdrop-blur-md">
          <h1 className="font-bold font-display mb-6 text-center lg:text-left bg-transparent">
            <div className="flex flex-col space-y-2 md:space-y-4">
              <span className="text-3xl md:text-5xl lg:text-6xl text-accent dark:text-accent/90 drop-shadow-lg">U-knighted Chess Society</span>
              <span className="text-2xl md:text-4xl lg:text-5xl text-primary dark:text-white drop-shadow-md">Master the Game</span>
              <span className="text-2xl md:text-4xl lg:text-5xl text-primary dark:text-white drop-shadow-md">Elevate Your Mind</span>
            </div>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl mb-8 text-primary dark:text-white/90 text-center lg:text-left drop-shadow-md font-medium">
            Join our institute's premier chess community where strategy meets passion, and champions are made move by move.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <Link href="/join" className="bg-primary text-white dark:bg-accent dark:text-primary px-4 sm:px-6 py-3 rounded-lg hover:bg-accent hover:text-primary dark:hover:bg-accent/90 transition-colors text-center font-medium shadow-lg">
              Join the Society
            </Link>
            <Link href="/events" className="bg-transparent border border-primary text-primary dark:border-white dark:text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-white/10 transition-colors text-center font-medium shadow-md">
              Upcoming Events
            </Link>
          </div>
        </div>

        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] order-2 relative">
          {/* Add subtle glow effect behind 3D chess board in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent dark:from-accent/30 dark:to-transparent rounded-xl blur-xl transform scale-95 opacity-70 dark:opacity-90"></div>
          <ChessModelViewer />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-5 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent z-[5]"></div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-[6] hidden sm:block">
        <a href="#about" className="text-primary/70 hover:text-accent dark:text-white/70 dark:hover:text-accent transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
