import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";
import { usersRouter } from "@modules/account/user/routes";
import { walletsRouter } from "@modules/wallets/routes";
import { expensesRouter } from "@modules/expenses/routes";

export class Application {
  private _app: express.Application;
  private _server!: http.Server;

  constructor() {
    this._app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(cors());
    this._app.use(helmet());
    this._app.use(compression());
    this._app.use(cookieParser());
  }

  private setupRoutes() {
    this._app.use("/users", usersRouter);
    this._app.use("/wallets", walletsRouter);
    this._app.use("/expenses", expensesRouter);
  }

  public start() {
    this._server = this._app.listen(5000, () => {
      console.log(`server running on port 5000`);
    });

    return this._server;
  }
}
