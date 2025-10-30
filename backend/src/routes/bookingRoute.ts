import { Router } from "express";
import { createBooking,getBookingByEmail } from "../controller/booking";

export const bookingRouter = Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/:email", getBookingByEmail);