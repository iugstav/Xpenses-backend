import { Router } from "express";
import { ensureAuthenticated } from "@src/middlewares/ensureAuthenticated";
import { AuthenticationController } from "./controllers/authenticationController";
import { CreateUserController } from "./controllers/createUserController";
import { GetUserByEmailController } from "./controllers/getUserByEmailController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticationController();
const getUserByEmailController = new GetUserByEmailController();

const usersRouter = Router();

usersRouter.post("/create", createUserController.handle);

usersRouter.post("/auth", authenticateUserController.handle);

usersRouter.use(ensureAuthenticated);

usersRouter.get("/:email", getUserByEmailController.handle);

export { usersRouter };
