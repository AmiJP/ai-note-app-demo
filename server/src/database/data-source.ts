import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../entity/User";
import { Note } from "../entity/Note";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "noteapp.sqlite",
  entities: [User, Note],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: [],
});
