import { useState, useEffect } from "react";
import { Link } from "wouter";
import { format } from "date-fns";

import Footer from "@/components/ChessSections/Footer";
import galleryData from "@/data/gallery.json";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  // Initialize animations and load data
  useEffect(() => {
    // Sort gallery by date - newest first
    const sortedGallery = [...galleryData].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setGallery(sortedGallery);
    setIsLoading(false);

    // Initialize scroll animations
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

  // Get all unique categories for filtering
  const allCategories = galleryData.map(item => item.category);
  const uniqueCategories = Array.from(new Set(allCategories));
  const categoryOptions = ["all", ...uniqueCategories];

  // Filter gallery based on selection
  const filteredGallery = filter === "all"
    ? gallery
    : gallery.filter(item => item.category === filter);

  // Format date for display
  const formatItemDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // Get category style
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "Tournament":
        return "bg-blue-100 text-blue-800 dark:bg-blue-100 dark:text-white dark:shadow-glow-blue";
      case "Workshop":
        return "bg-green-100 text-green-800 dark:bg-green-100 dark:text-white dark:shadow-glow-green";
      case "Event":
        return "bg-purple-100 text-purple-800 dark:bg-purple-100 dark:text-white dark:shadow-glow-purple";
      case "Community":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-100 dark:text-white dark:shadow-glow-yellow";
      case "Social":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-100 dark:text-white dark:shadow-glow-indigo";
      case "Special":
        return "bg-pink-100 text-pink-800 dark:bg-pink-100 dark:text-white dark:shadow-glow-pink";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-100 dark:text-gray-800";
    }
  };

  return (
    <>
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scrolled-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">Chess Society Gallery</h1>
            <p className="max-w-2xl mx-auto text-lg text-primary/70 dark:text-white/70">
              Explore moments from our tournaments, workshops, and community events throughout the year.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 scrolled-fade-in">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === category
                  ? 'bg-primary text-white dark:bg-accent dark:text-primary hover:bg-primary/90 hover:text-white dark:hover:bg-accent/90 dark:hover:text-primary shadow-md'
                  : 'bg-primary/10 dark:bg-primary/5 text-primary dark:text-primary/90 hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary'
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {isLoading ? (
              // Loading skeletons
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-lg h-72 animate-pulse">
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              ))
            ) : filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1 scrolled-fade-in relative group"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className={`inline-block self-start px-3 py-1 text-sm font-medium rounded-full mb-3 ${getCategoryStyle(item.category)}`}>
                      <span className="relative z-10">{item.category}</span>
                      <span className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent dark:from-white/10 dark:to-transparent"></span>
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{item.title}</h3>
                    <p className="text-white/80 mb-4 text-sm drop-shadow-sm">{item.description}</p>
                    <span className="text-white/60 text-xs">{formatItemDate(item.date)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-gray-800 dark:text-gray-200">No gallery items found for this category.</p>
                <button
                  onClick={() => setFilter("all")}
                  className="mt-4 px-4 py-2 bg-primary dark:bg-accent text-white dark:text-primary rounded-md hover:bg-primary/90 hover:text-white dark:hover:bg-accent/90 dark:hover:text-primary transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  View All Categories
                </button>
              </div>
            )}
          </div>

          {/* Call to action section */}
          <div className="bg-primary/5 dark:bg-white/5 rounded-2xl p-8 md:p-12 text-center mt-12 mb-8 scrolled-fade-in backdrop-blur-sm shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Join Us and Create Memories</h2>
            <p className="max-w-2xl mx-auto mb-8 text-primary/80 dark:text-white/80">
              Become part of our chess community and participate in our upcoming events and tournaments. Your moments could be featured in our gallery next!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/join" className="bg-primary text-white dark:bg-accent dark:text-primary px-6 py-3 rounded-lg hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors font-medium shadow-md">
                Join the Society
              </Link>
              <Link href="/events" className="bg-transparent border border-primary text-primary dark:border-white/70 dark:text-white/90 px-6 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-white/10 transition-colors font-medium">
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}