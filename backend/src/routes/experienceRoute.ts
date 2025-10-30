import { Router } from "express";
import { getExperienceDetails,getExperiences } from "../controller/experience";

const experienceRouter = Router();

experienceRouter.get("/", getExperiences);

experienceRouter.get("/:id", getExperienceDetails);

export default experienceRouter;