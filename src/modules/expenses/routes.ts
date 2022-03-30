import { ensureAuthenticated } from "@src/middlewares/ensureAuthenticated";
import { Router } from "express";
import { CreateExpenseController } from "./controllers/createExpenseController";
import { DeleteExpenseController } from "./controllers/deleteExpenseController";
import { FindExpenseByIdController } from "./controllers/findExpenseByIdController";
import { FindExpenseByNameController } from "./controllers/findExpenseByNameController";
import { GetWalletExpensesController } from "./controllers/getWalletExpensesController";
import { UpdateExpenseAmountController } from "./controllers/updateExpenseAmountController";

const findExpenseByIdController = new FindExpenseByIdController();
const findExpenseByNameController = new FindExpenseByNameController();
const getWalletExpensesController = new GetWalletExpensesController();
const createExpenseController = new CreateExpenseController();
const deleteExpenseController = new DeleteExpenseController();
const updateExpenseAmountController = new UpdateExpenseAmountController();

const expensesRouter = Router();

expensesRouter.use(ensureAuthenticated);

expensesRouter.get("/find/id/:id", findExpenseByIdController.handle);
expensesRouter.get("/find/name/:name", findExpenseByNameController.handle);
expensesRouter.get("/all/:walletId", getWalletExpensesController.handle);

expensesRouter.post("/create", createExpenseController.handle);
expensesRouter.post("/delete", deleteExpenseController.handle);

expensesRouter.patch("/amount/update", updateExpenseAmountController.handle);

export { expensesRouter };
