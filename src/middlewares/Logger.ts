import { Request, Response, NextFunction } from "express";

// Logger middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method} ${req.url}`);
	next();
};
