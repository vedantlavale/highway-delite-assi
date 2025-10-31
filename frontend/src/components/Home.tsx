import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getExperiences, type Experience } from "../lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getCacheKey = (page: number, query: string) => `experiences_${page}_${query}`;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key: string) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setCachedData = (key: string, data: { data: Experience[]; pagination: { totalPages: number } }) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {
    // Ignore storage errors
  }
};

export function Home() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});

  const fetchExperiences = useCallback(async () => {
    const cacheKey = getCacheKey(currentPage, searchQuery);
    
    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setExperiences(cachedData.data);
      setTotalPages(cachedData.pagination.totalPages);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getExperiences(currentPage, 8, searchQuery);
      setExperiences(data.data);
      setTotalPages(data.pagination.totalPages);
      
      // Cache the data
      setCachedData(cacheKey, data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      setExperiences([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  // Initial load - check cache immediately
  useEffect(() => {
    const cacheKey = getCacheKey(1, "");
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setExperiences(cachedData.data);
      setTotalPages(cachedData.pagination.totalPages);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getAvailabilityStatus = (experience: Experience) => {
    const totalAvailable = experience.slots.reduce((sum, slot) => {
      return (
        sum +
        slot.times.reduce((timeSum, time) => {
          return timeSum + (time.available - time.booked);
        }, 0)
      );
    }, 0);

    return totalAvailable;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onSearch={handleSearch} showSearch={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="h-96 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No experiences found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {experiences.map((experience) => {
                const availableSpots = getAvailabilityStatus(experience);
                return (
                  <Card
                    key={experience._id}
                    className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 flex flex-col bg-white rounded-lg"
                  >
                    <div className="relative w-full h-48 overflow-hidden bg-gray-200 rounded-t-lg">
                      {imageLoadingStates[experience._id] !== false && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                      )}
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
                          imageLoadingStates[experience._id] === false ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => {
                          setImageLoadingStates(prev => ({
                            ...prev,
                            [experience._id]: false
                          }));
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const fallbackUrl = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center`;
                          
                          // Only set fallback if not already a fallback
                          if (!target.src.includes('unsplash.com')) {
                            target.src = fallbackUrl;
                          }
                          
                          setImageLoadingStates(prev => ({
                            ...prev,
                            [experience._id]: false
                          }));
                        }}
                      />
                    </div>
                    <div className="p-4 flex flex-col grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-base leading-tight pr-2 text-gray-900">
                          {experience.title}
                        </h3>
                        <div className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                          {experience.location}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {experience.description}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-xs text-gray-500">From </span>
                            <span className="text-lg font-bold text-gray-900">
                              ₹{experience.price}
                            </span>
                          </div>
                          {availableSpots > 0 ? (
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-600 text-xs"
                            >
                              {availableSpots} slots
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-red-600 border-red-600 text-xs"
                            >
                              Sold out
                            </Badge>
                          )}
                        </div>
                        <Button
                          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm py-2"
                          onClick={() =>
                            navigate(`/experience/${experience._id}`)
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className={
                        currentPage === i + 1
                          ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                          : ""
                      }
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
