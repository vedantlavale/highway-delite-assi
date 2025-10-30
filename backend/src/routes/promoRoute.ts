import { Router } from "express";
import { validatePromoCode } from "../controller/promo";

const promoRouter = Router();

promoRouter.post("/validate", validatePromoCode);

export default promoRouter;