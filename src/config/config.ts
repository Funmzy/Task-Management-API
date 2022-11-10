import dotenv from "dotenv";

dotenv.config();


export const config = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "",
    NODE_ENV: process.env.NODE_ENV || "",
    MONGO_URL: process.env.MONGO_URL || "",
    AMQP_URL: process.env.AMQP_URL || ""
  };