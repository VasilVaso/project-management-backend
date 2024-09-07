// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";

interface AuthRequest extends Request {
	user?: any; // To store user info from token
}

export const authenticateToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.sendStatus(401); // Unauthorized

	jwt.verify(token, jwtConfig.secret, (err, user) => {
		if (err) return res.sendStatus(403); // Forbidden
		req.user = user;
		next();
	});
};
