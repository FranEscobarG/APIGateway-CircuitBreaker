import express from "express";
import { CreateUser } from "../../../application/users/use-cases/create-user";
import { GetUsers } from "../../../application/users/use-cases/get-users";
import { UserModel } from "../../db/user.model";
import { User } from "../../../domain/users/user.entity";

const router = express.Router();

// Mapear el modelo Sequelize a la entidad User
const userRepository = {
  create: async (user: User) => {
    const createdUser = await UserModel.create(user);
    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.age
    );
  },
  findAll: async () => {
    const users = await UserModel.findAll();
    return users.map(
      (user) => new User(user.id, user.name, user.email, user.age)
    );
  },
};

// Endpoint para crear un usuario
router.post("/", async (req, res) => {
  const createUser = new CreateUser(userRepository);
  const user = await createUser.execute(req.body.name, req.body.email, req.body.age);
  res.status(201).json(user);
});

// Endpoint para obtener todos los usuarios
router.get("/", async (req, res) => {
  const getUsers = new GetUsers(userRepository);
  const users = await getUsers.execute();
  res.status(200).json(users);
});

export default router;
