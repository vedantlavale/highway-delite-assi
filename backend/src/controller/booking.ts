import type { Request, Response } from "express";
import { z } from "zod";

import { Experience } from "../models/experience";
import { Checkout } from "../models/checkout";

const createBookingSchema = z.object({
  experienceId: z.string().min(1, "Experience ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email format"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  promoCode: z.string().optional(),
});

const emailParamSchema = z.object({
  email: z.email("Invalid email format"),
});

function generateBookingRef(): string {
  const prefix = 'HUF';
  const random = Math.floor(10000 + Math.random() * 90000);
  const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                  String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${prefix}${random}${letters}`;
}

// Promo codes configuration (imported from promo controller)
const PROMO_CODES = {
  'SAVE10': { type: 'percentage', value: 10 },
  'FLAT100': { type: 'flat', value: 100 },
  'WELCOME': { type: 'percentage', value: 15 },
  'ADVENTURE20': { type: 'percentage', value: 20 },
  'SUMMER25': { type: 'percentage', value: 25 },
  'WINTER30': { type: 'percentage', value: 30 },
  'FLAT200': { type: 'flat', value: 200 },
  'FAMILY15': { type: 'percentage', value: 15 },
  'STUDENT20': { type: 'percentage', value: 20 },
  'SENIOR25': { type: 'percentage', value: 25 },
  'FLASH50': { type: 'flat', value: 50 },
  'BULK30': { type: 'percentage', value: 30 },
  'LOYALTY40': { type: 'percentage', value: 40 },
  'NEWUSER50': { type: 'flat', value: 50 },
  'HOLIDAY35': { type: 'percentage', value: 35 }
} as const;

/**
 * Create a new booking for a user
 */
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = createBookingSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: validationResult.error.issues.map((err: z.core.$ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    const { experienceId, fullName, email, date, time, quantity, promoCode } = validationResult.data;

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }

    // Check if user already has a booking for this experience, date, and time
    const existingBooking = await Checkout.findOne({
      userEmail: email.toLowerCase(),
      experienceId,
      date,
      time,
      bookingStatus: { $ne: "Cancelled" },
    });

    if (existingBooking) {
      res.status(400).json({
        message:
          "You have already booked this experience for the selected date and time",
        existingBooking: existingBooking.bookingref,
      });
      return;
    }

    // Calculate pricing
    const subtotal = experience.price * quantity;
    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = PROMO_CODES[promoCode.toUpperCase() as keyof typeof PROMO_CODES];
      if (promo) {
        if (promo.type === "percentage") {
          discount = (subtotal * promo.value) / 100;
        } else if (promo.type === "flat") {
          discount = promo.value;
        }
      }
    }

    const afterDiscount = subtotal - discount;
    const taxes = Math.round(afterDiscount * 0.05); // 5% tax
    const total = afterDiscount + taxes;

    // Generate booking reference
    const bookingRef = generateBookingRef();

    // Create booking
    const booking = new Checkout({
      experienceId,
      experienceTitle: experience.title,
      fullName,
      userEmail: email.toLowerCase(),
      date,
      time,
      quantity,
      promocode: promoCode?.toUpperCase() || null,
      discount,
      subtotal,
      taxes,
      total,
      bookingref: bookingRef,
      bookingStatus: "Confirmed",
    });

    await booking.save();

    res.status(201).json({
      message: "Booking confirmed successfully",
      booking: {
        bookingRef: booking.bookingref,
        experienceName: booking.experienceTitle,
        date: booking.date,
        time: booking.time,
        quantity: booking.quantity,
        total: booking.total,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Booking error:", error);
    res
      .status(500)
      .json({ message: "Error creating booking", error: errorMessage });
  }
};

/**
 * Get bookings related to an email
 */
export const getBookingByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const emailValidation = emailParamSchema.safeParse(req.params);
    if (!emailValidation.success) {
      res.status(400).json({
        message: "Invalid email format",
        errors: emailValidation.error.issues.map((err: z.core.$ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    const { email } = emailValidation.data;

    const bookings = await Checkout.find({
      userEmail: email.toLowerCase(),
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: errorMessage });
  }
};