import { AppDataSource } from "../../database/data-source";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const user = new User();

  const userAlreadyExist = await AppDataSource.manager.findOne(User, {
    where: { email: email },
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  if (userAlreadyExist) {
    throw new Error("User already exists");
  }

  user.name = name;
  user.email = email;
  user.password = hashedPassword;
  const result = await AppDataSource.manager.save(user);

  return {
    message: "User registered successfully",
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
    },
  };
}
