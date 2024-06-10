import { Router } from "express";
import { getAmortisationSchedule } from "../controller/amortisationController";

const router = Router();

router.post('/amortisation-schedule', getAmortisationSchedule);

export default router;