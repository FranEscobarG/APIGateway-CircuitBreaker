import { Request, Response } from "express";

export const usersHealthCheck = (req: Request, res: Response): void => {
  res.status(200).send("Users Service is healthy!");
};