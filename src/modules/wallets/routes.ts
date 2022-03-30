import { Router } from "express";

import { ensureAuthenticated } from "@src/middlewares/ensureAuthenticated";
import { CreateWalletController } from "./controllers/createWalletController";
import { DeleteWalletController } from "./controllers/deleteWalletController";
import { FindWalletByNameController } from "./controllers/findWalletByNameController";
import { GetAllWalletsController } from "./controllers/getAllWalletsController";
import { UpdateWalletNameController } from "./controllers/updateWalletNameController";
import { FindWalletByIdController } from "./controllers/findWalletByIdController";

const getAllWalletsController = new GetAllWalletsController();
const findWalletByNameController = new FindWalletByNameController();
const findWalletByIdController = new FindWalletByIdController();
const createWalletController = new CreateWalletController();
const deleteWalletController = new DeleteWalletController();
const updateWalletNameController = new UpdateWalletNameController();

const walletsRouter = Router();

walletsRouter.use(ensureAuthenticated);

walletsRouter.get("/:userId", getAllWalletsController.handle);
walletsRouter.get("/find/name/:name", findWalletByNameController.handle);
walletsRouter.get("/find/id/:id", findWalletByIdController.handle);
walletsRouter.post("/create", createWalletController.handle);
walletsRouter.post("/delete", deleteWalletController.handle);
walletsRouter.patch("/update", updateWalletNameController.handle);

export { walletsRouter };
