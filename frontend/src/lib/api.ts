import axios from 'axios';
import { z } from 'zod';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

// Zod schemas
export const timeSlotSchema = z.object({
  time: z.string(),
  available: z.number(),
  booked: z.number(),
});

export const slotSchema = z.object({
  date: z.string(),
  times: z.array(timeSlotSchema),
});

export const experienceSchema = z.object({
  _id: z.string(),
  title: z.string(),
  location: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  minAge: z.number(),
  about: z.string(),
  slots: z.array(slotSchema),
});

export const bookingSchema = z.object({
  experienceId: z.string(),
  experienceName: z.string(),
  fullName: z.string(),
  email: z.string(),
  date: z.string(),
  time: z.string(),
  quantity: z.number(),
  promoCode: z.string().optional(),
  discount: z.number(),
  subtotal: z.number(),
  taxes: z.number(),
  total: z.number(),
  bookingRef: z.string(),
  status: z.string(),
});

export const promoCodeSchema = z.object({
  valid: z.boolean(),
  code: z.string(),
  discount: z.number(),
  type: z.string(),
  value: z.number(),
});

// Request schemas
export const createBookingRequestSchema = z.object({
  experienceId: z.string().min(1, "Experience ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email format"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  promoCode: z.string().optional(),
});

export const validatePromoRequestSchema = z.object({
  code: z.string().min(1, "Promo code is required"),
  subtotal: z.number().positive("Subtotal must be a positive number"),
});

export const paginationQuerySchema = z.object({
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(50).optional(),
  search: z.string().optional(),
});

// Response schemas
export const paginatedExperiencesResponseSchema = z.object({
  data: z.array(experienceSchema),
  pagination: z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    itemsPerPage: z.number(),
  }),
});

export const bookingResponseSchema = z.object({
  message: z.string(),
  booking: z.object({
    bookingRef: z.string(),
    experienceName: z.string(),
    date: z.string(),
    time: z.string(),
    quantity: z.number(),
    total: z.number(),
  }),
});

// Inferred types
export type Experience = z.infer<typeof experienceSchema>;
export type Slot = z.infer<typeof slotSchema>;
export type TimeSlot = z.infer<typeof timeSlotSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type PromoCode = z.infer<typeof promoCodeSchema>;
export type CreateBookingRequest = z.infer<typeof createBookingRequestSchema>;
export type ValidatePromoRequest = z.infer<typeof validatePromoRequestSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type PaginatedExperiencesResponse = z.infer<typeof paginatedExperiencesResponseSchema>;
export type BookingResponse = z.infer<typeof bookingResponseSchema>;

// Get all experiences with pagination and search
export const getExperiences = async (page = 1, limit = 9, search = ''): Promise<PaginatedExperiencesResponse> => {
  const queryValidation = paginationQuerySchema.safeParse({ page, limit, search });
  if (!queryValidation.success) {
    throw new Error(`Invalid query parameters: ${queryValidation.error.message}`);
  }

  const response = await api.get('/experiences', {
    params: queryValidation.data
  });
  
  const parsedResponse = paginatedExperiencesResponseSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error(`Invalid response format: ${parsedResponse.error.message}`);
  }
  
  return parsedResponse.data;
};

// Get single experience by ID
export const getExperience = async (id: string): Promise<Experience> => {
  if (!id || id.trim().length === 0) {
    throw new Error('Experience ID is required');
  }

  const response = await api.get(`/experiences/${id}`);
  
  const parsedResponse = experienceSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error(`Invalid response format: ${parsedResponse.error.message}`);
  }
  
  return parsedResponse.data;
};

// Validate promo code
export const validatePromoCode = async (code: string, subtotal: number): Promise<PromoCode> => {
  const requestValidation = validatePromoRequestSchema.safeParse({ code, subtotal });
  if (!requestValidation.success) {
    throw new Error(`Invalid request: ${requestValidation.error.message}`);
  }

  const response = await api.post('/promos/validate', requestValidation.data);
  
  const parsedResponse = promoCodeSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error(`Invalid response format: ${parsedResponse.error.message}`);
  }
  
  return parsedResponse.data;
};

// Create booking
export const createBooking = async (bookingData: CreateBookingRequest): Promise<BookingResponse> => {
  const validation = createBookingRequestSchema.safeParse(bookingData);
  if (!validation.success) {
    throw new Error(`Invalid booking data: ${validation.error.message}`);
  }

  const response = await api.post('/bookings', validation.data);
  
  const parsedResponse = bookingResponseSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error(`Invalid response format: ${parsedResponse.error.message}`);
  }
  
  return parsedResponse.data;
};

// Get user bookings
export const getUserBookings = async (email: string): Promise<Booking[]> => {
  if (!email || !z.email().safeParse(email).success) {
    throw new Error('Valid email is required');
  }

  const response = await api.get(`/bookings/${email}`);
  
  const parsedResponse = z.array(bookingSchema).safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error(`Invalid response format: ${parsedResponse.error.message}`);
  }
  
  return parsedResponse.data;
};

export default api;
