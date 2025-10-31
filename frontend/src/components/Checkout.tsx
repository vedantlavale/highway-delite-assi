import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { validatePromoCode, createBooking, type Experience } from "@/lib/api";

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, date, time, quantity } = location.state as {
    experience: Experience;
    date: string;
    time: string;
    quantity: number;
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [error, setError] = useState("");

  if (!experience) {
    navigate("/");
    return null;
  }

  const subtotal = experience.price * quantity;
  const afterDiscount = subtotal - promoDiscount;
  const taxes = Math.round(afterDiscount * 0.05);
  const total = afterDiscount + taxes;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setError("Please enter a promo code");
      return;
    }

    setPromoLoading(true);
    setError("");

    try {
      const result = await validatePromoCode(promoCode, subtotal);

      setPromoDiscount(result.discount);

      setPromoApplied(true);

      setError("");
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || "Invalid promo code");

      setPromoDiscount(0);

      setPromoApplied(false);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and privacy policy");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const bookingData = {
        experienceId: experience._id,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        date,
        time,
        quantity,
        promoCode: promoApplied ? promoCode.toUpperCase() : undefined
      };

      const result = await createBooking(bookingData);
      
      navigate("/result", {
        state: {
          success: true,
          bookingRef: result.booking.bookingRef,
          experience: experience.title,
          date,
          time,
          quantity,
          total
        }
      });
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string; existingBooking?: unknown } } }).response?.data?.message || "Booking failed. Please try again.";
      
      // Check if it's a duplicate booking error
      if (errorMessage.includes("already booked")) {
        navigate("/result", {
          state: {
            success: false,
            error: errorMessage,
            existingBooking: (err as { response?: { data?: { existingBooking?: unknown } } }).response?.data?.existingBooking
          }
        });
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSearch/>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Checkout
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form - Left side */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gray-200">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Full name and Email in same row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-sm text-gray-600">Full name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Your name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 bg-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 bg-gray-300"
                      />
                    </div>
                  </div>

                  {/* Promo code */}
                  <div>
                    <Label htmlFor="promoCode" className="text-sm text-gray-600">Promo code</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="promoCode"
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoApplied(false);
                          setPromoDiscount(0);
                        }}
                        disabled={promoApplied}
                        className="flex-1 bg-gray-300"
                      />
                      <Button
                        type="button"
                        onClick={handleApplyPromo}
                        disabled={promoLoading || promoApplied}
                        className="bg-black hover:bg-gray-800 text-white px-8"
                      >
                        {promoApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600 mt-1">
                        ✓ Promo code applied! You saved ₹{promoDiscount}
                      </p>
                    )}
                  </div>

                  {/* Terms checkbox */}
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the terms and safety policy
                    </label>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}
                </div>
              </form>
            </Card>
          </div>

          {/* Summary - Right side */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gray-200 shadow-lg">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold text-right">{experience.title}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{date}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold">{time}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Qty</p>
                  <p className="font-semibold">{quantity}</p>
                </div>
              </div>

              <div className="border-t border-gray-400 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
              </div>

              <div className="border-t border-gray-400 mt-4 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold">₹{total}</span>
                </div>

                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 text-lg"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Pay and Confirm"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
