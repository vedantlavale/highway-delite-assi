import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, bookingRef } = 
    location.state as {
      success: boolean;
      bookingRef?: string;
    };

  if (!location.state) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        {success && (
          <>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-center">Booking Confirmed</h1>
              <p className="text-gray-700 mb-8 text-center">Ref ID: <span className="font-mono">{bookingRef}</span></p>
              <Button
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
