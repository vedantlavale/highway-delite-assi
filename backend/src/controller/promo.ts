
import type { Request, Response } from "express";
import { z } from "zod";

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

// Zod schema for promo code validation
const promoValidationSchema = z.object({
  code: z.string().min(1, "Promo code is required").transform(val => val.toUpperCase()),
  subtotal: z.number().positive("Subtotal must be a positive number"),
});

interface PromoValidationResponse {
  valid: boolean;
  code: string;
  discount: number;
  type: 'percentage' | 'flat';
  value: number;
}


export const validatePromoCode = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body with Zod
    const validationResult = promoValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: validationResult.error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    const { code: promoCode, subtotal } = validationResult.data;

    const promo = PROMO_CODES[promoCode as keyof typeof PROMO_CODES];

    if (!promo) {
      res.status(404).json({ message: "Invalid promo code" });
      return;
    }

    let discount = 0;
    if (promo.type === "percentage") {
      discount = (subtotal * promo.value) / 100;
    } else if (promo.type === "flat") {
      discount = promo.value;
    }

    const response: PromoValidationResponse = {
      valid: true,
      code: promoCode,
      discount: Math.round(discount),
      type: promo.type,
      value: promo.value,
    };

    res.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error validating promo code:", error);
    res
      .status(500)
      .json({ message: "Error validating promo code", error: errorMessage });
  }
};