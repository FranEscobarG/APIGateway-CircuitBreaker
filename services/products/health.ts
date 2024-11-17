import { Request, Response } from "express";

export const productsHealthCheck = (req: Request, res: Response): void => {
  res.status(200).send("Products Service is healthy!");
};
