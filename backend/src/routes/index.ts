import { Router } from "express";

import experienceRouter from "./experienceRoute";
import { bookingRouter } from "./bookingRoute";
import promoRouter from "./promoRoute";


const rootRouter = Router();

rootRouter.use("/experiences", experienceRouter);
rootRouter.use("/bookings", bookingRouter);
rootRouter.use("/promos", promoRouter);

export default rootRouter;