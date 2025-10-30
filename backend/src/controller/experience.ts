import type { Request, Response } from "express";
import { z } from "zod";

import { Experience } from "../models/experience";

// Constants
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 50;

// Zod schemas for validation
const paginationQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : DEFAULT_PAGE)
    .refine(val => val >= 1, "Page must be greater than 0"),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : DEFAULT_LIMIT)
    .refine(val => val >= 1 && val <= MAX_LIMIT, `Limit must be between 1 and ${MAX_LIMIT}`),
  search: z.string().optional().transform(val => (val || "").trim()),
});

const experienceIdParamSchema = z.object({
  id: z.string().min(1, "Experience ID is required"),
});

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

const buildExperienceQuery = (searchTerm: string) => {
  if (!searchTerm) return {};

  return {
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { location: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  };
};

const calculatePaginationMeta = (
  currentPage: number,
  limit: number,
  totalItems: number
): PaginationMeta => ({
  currentPage,
  totalPages: Math.ceil(totalItems / limit),
  totalItems,
  itemsPerPage: limit,
});


const handleApiError = (res: Response, error: unknown, message: string, statusCode = 500) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`API Error: ${message}`, error);
  res.status(statusCode).json({ message, error: errorMessage });
};


export const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate query parameters with Zod
    const queryValidation = paginationQuerySchema.safeParse(req.query);
    if (!queryValidation.success) {
      res.status(400).json({
        message: "Invalid query parameters",
        errors: queryValidation.error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    const { page, limit, search } = queryValidation.data;
    const skip = (page - 1) * limit;

    const query = buildExperienceQuery(search);

    // Execute queries in parallel for better performance
    const [experiences, total] = await Promise.all([
      Experience.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ _id: 1 }),
      Experience.countDocuments(query)
    ]);

    const pagination = calculatePaginationMeta(page, limit, total);

    const response: PaginatedResponse<typeof experiences[0]> = {
      data: experiences,
      pagination,
    };

    res.json(response);
  } catch (error) {
    handleApiError(res, error, "Error fetching experiences");
  }
};

/**
 * Get details of a single experience by ID
 */
export const getExperienceDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate experience ID parameter with Zod
    const idValidation = experienceIdParamSchema.safeParse(req.params);
    if (!idValidation.success) {
      res.status(400).json({
        message: "Invalid experience ID",
        errors: idValidation.error.issues.map((err: z.core.$ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    const { id } = idValidation.data;

    const experience = await Experience.findById(id);

    if (!experience) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }

    res.json(experience);
  } catch (error) {
    handleApiError(res, error, "Error fetching experience details");
  }
};