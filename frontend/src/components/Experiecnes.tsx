import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useExperience } from "@/lib/hooks";
import { ArrowLeft, Clock } from "lucide-react";

export function Details() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { data: experience, isLoading: loading } = useExperience(id);

  useEffect(() => {
    if (experience && experience.slots.length > 0 && !selectedDate) {
      setSelectedDate(experience.slots[0].date);
    }
  }, [experience, selectedDate]);

  const getAvailableSpots = (time: string) => {
    if (!experience || !selectedDate) return 0;
    const slot = experience.slots.find(s => s.date === selectedDate);
    const timeSlot = slot?.times.find(t => t.time === time);
    return timeSlot ? timeSlot.available - timeSlot.booked : 0;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    const availableSpots = getAvailableSpots(selectedTime);
    if (availableSpots < quantity) {
      alert(`Only ${availableSpots} spots available`);
      return;
    }

    navigate("/checkout", {
      state: {
        experience,
        date: selectedDate,
        time: selectedTime,
        quantity
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showSearch />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showSearch />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500">Experience not found</p>
        </div>
      </div>
    );
  }

  const selectedSlot = experience.slots.find(s => s.date === selectedDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSearch />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Details
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Left side */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="w-full h-100 overflow-hidden rounded-lg mb-6 bg-gray-200">
              <img 
                src={experience.image} 
                alt={experience.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/800x400?text=' + encodeURIComponent(experience.title);
                }}
              />
            </div>

            {/* Title and Description */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-3">{experience.title}</h1>
              <p className="text-gray-600">{experience.description}</p>
            </div>

            {/* Choose date */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Choose date</h3>
              <div className="flex gap-2 flex-wrap">
                {experience.slots.map((slot) => (
                  <Button
                    key={slot.date}
                    variant={selectedDate === slot.date ? "default" : "outline"}
                    className={selectedDate === slot.date ? "bg-[#FFD643] hover:bg-[#FFD643] text-black font-semibold" : ""}
                    onClick={() => {
                      setSelectedDate(slot.date);
                      setSelectedTime("");
                    }}
                  >
                    {slot.date}
                  </Button>
                ))}
              </div>
            </div>

            {/* Choose time */}
            {selectedDate && selectedSlot && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Choose time</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedSlot.times.map((timeSlot) => {
                    const available = timeSlot.available - timeSlot.booked;
                    const isSoldOut = available === 0;
                    
                    return (
                      <Button
                        key={timeSlot.time}
                        variant={selectedTime === timeSlot.time ? "default" : "outline"}
                        className={`justify-between ${
                          selectedTime === timeSlot.time 
                            ? "bg-[#FFD643] hover:bg-[#FFD643] text-black font-semibold" 
                            : ""
                        } ${isSoldOut ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSoldOut}
                        onClick={() => setSelectedTime(timeSlot.time)}
                      >
                        <span className="flex items-center gap-2">
                          <Clock size={16} />
                          {timeSlot.time}
                        </span>
                        {isSoldOut ? (
                          <Badge variant="destructive" className="ml-2">Sold out</Badge>
                        ) : (
                          <Badge variant="outline" className="ml-2 text-green-600">
                            {available} left
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            )}

            {/* About */}
            <div className="p-4 rounded-lg">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm bg-gray-200 rounded-xl p-3 text-gray-600">{experience.about}</p>
            </div>
          </div>

          {/* Sidebar - Right side */}
          <div className="lg:col-span-1">
            <div className="p-6 sticky top-20 bg-gray-50 rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-4">
                <p className="text-base text-gray-600 mb-1">Starts at</p>
                <p className="text-2xl font-semibold">₹{experience.price}</p>
              </div>

              <div className="mb-6">
                <label className="text-base text-gray-600 mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8"
                  >
                    −
                  </Button>
                  <span className="text-base font-medium w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const available = getAvailableSpots(selectedTime);
                      if (quantity < available) {
                        setQuantity(quantity + 1);
                      }
                    }}
                    className="w-8 h-8"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-base text-gray-600">Subtotal</span>
                  <span className="text-base">₹{experience.price * quantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-base text-gray-600">Taxes</span>
                  <span className="text-base">₹{Math.round(experience.price * quantity * 0.06)}</span>
                </div>
                <hr className="my-3 border-gray-200" />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold">₹{experience.price * quantity + Math.round(experience.price * quantity * 0.06)}</span>
                </div>
              </div>

              <Button
                className="w-full bg-[#FFD643] hover:bg-[#FFD643] text-black font-medium text-lg p-3 my-4 rounded-xl mt-2"
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
