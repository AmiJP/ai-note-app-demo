import { AppDataSource } from "../../database/data-source";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export const checkUserCredentials = async (email: string, password: string) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
