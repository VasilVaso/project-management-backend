import jwt from "jsonwebtoken";

// Generate a token
export const generateToken = (userId: string) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
		expiresIn: "1h",
	});
};

// Verify a token
export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET as string);
};
