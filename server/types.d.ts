import { User } from "./src/entity/User";

declare module "express-session" {
  interface SessionData {
    userId: User["id"];
  }
}
