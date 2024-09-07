import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { jwtConfig } from "../config";

export class UserService {
	async register(username: string, password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();

		return "User registered successfully";
	}

	async login(username: string, password: string): Promise<string> {
		const user = await User.findOne({ username });

		if (!user) {
			throw new Error("Invalid credentials");
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			throw new Error("Invalid credentials");
		}

		const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
			expiresIn: "1h",
		});
		return token;
	}

	async verifyToken(token: string): Promise<boolean> {
		try {
			jwt.verify(token, jwtConfig.secret);
			return true;
		} catch {
			return false;
		}
	}
}
