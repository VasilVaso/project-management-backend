// src/config/dbConfig.ts
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
	uri: process.env.MONGODB_URI as string,
	options: {
		// You can omit useNewUrlParser and useUnifiedTopology if they are deprecated
	},
};

export default dbConfig;
