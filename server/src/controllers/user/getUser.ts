import { AppDataSource } from "../../database/data-source";
import { User } from "../../entity/User";

export async function getUser(userId: number | undefined) {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
