import { useState, useEffect } from "react";
import { Link } from "wouter";
import galleryData from "@/data/gallery.json";
import { format } from "date-fns";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const sortedGallery = [...galleryData].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setGallery(sortedGallery);
    setIsLoading(false);
  }, []);

  const featuredItem = gallery.length > 0 ? gallery[0] : null;
  const galleryItems = gallery.slice(1, visibleCount + 1);
  const loadMoreItems = () => setVisibleCount((prev) => prev + 4);
  const hasMoreItems = visibleCount + 1 < gallery.length;

  const formatItemDate = (dateString: string) =>
    format(new Date(dateString), "MMMM d, yyyy");

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
    <section
      id="gallery"
      className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5 dark:from-transparent dark:to-transparent relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scrolled-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Chess Society Gallery
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-primary/70 dark:text-white/70">
            Explore moments from our tournaments, workshops, and chess community events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <div className="col-span-1 md:col-span-2 animate-pulse">
                <div className="rounded-xl overflow-hidden relative h-96">
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
              <div className="col-span-1 space-y-8">
                <div className="glass rounded-xl overflow-hidden shadow-lg h-44 animate-pulse">
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="glass rounded-xl overflow-hidden shadow-lg h-44 animate-pulse">
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {gallery.slice(0, visibleCount + 1).map((item, index) => (
                <div
                  key={item.id}
                  className={`scrolled-fade-in relative group rounded-xl overflow-hidden shadow-lg ${index === 0 ? "md:col-span-2 h-96" : "h-64"
                    }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className={`inline-block self-start px-2 py-1 text-xs font-medium rounded-full mb-2 ${getCategoryStyle(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">
                      {item.title}
                    </h3>
                    <span className="text-white/70 text-xs">{formatItemDate(item.date)}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="text-center mt-16 flex flex-col items-center justify-center gap-4">
          {/* Load More Button */}
          {visibleCount + 1 < gallery.length && (
            <button
              onClick={loadMoreItems}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-medium"
            >
              <span>Load More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
          )}

          {/* Explore Full Gallery Link */}
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-medium"
          >
            <span>Explore Full Gallery</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
