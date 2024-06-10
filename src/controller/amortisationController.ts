import { Request, Response } from "express";
import { calculateAmortisationSchedule } from "../services/amortisationService";
import { GenerateAmortisationScheduleRequest } from "../model/amortisationModel";

// controller to handle the request and response for amortisation schedule
export const getAmortisationSchedule = async (req: Request, res: Response) => {
  try {
    const request: GenerateAmortisationScheduleRequest = req.body;
    // Calculate the amortisation schedule
    const schedule = await calculateAmortisationSchedule(request);
    res.json(schedule);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};