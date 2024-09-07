// src/config/jwtConfig.ts
import dotenv from "dotenv";

dotenv.config();

const jwtConfig = {
	secret: process.env.JWT_SECRET as string,
	expiresIn: "1h",
};

export default jwtConfig;
