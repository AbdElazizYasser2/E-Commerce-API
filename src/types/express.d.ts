import { IUser } from "./modules/user/user.model.ts";
import { TFunction } from "i18next";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      t: TFunction;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_URI: string;

      NODE_ENV: "development" | "production";

      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;

      EMAIL_HOST: string;
      EMAIL_PORT: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
    }
  }
}

export {};