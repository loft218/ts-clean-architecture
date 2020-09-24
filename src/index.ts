import "reflect-metadata";
import * as morgan from "koa-morgan";
import * as bodyParser from "koa-bodyparser";
import { Container } from "inversify";
import { interfaces, InversifyKoaServer, TYPE } from "inversify-koa-utils";
import DefaultController from "./entrypoint/controllers/DefaultController";
import IUserReadOnlyRepository from "./application/repositories/IUserReadOnlyRepository";
import { TYPES } from "./constants/types";
import UserRepository from "./infrastructure/repositories/UserRepository";
import IUserUseCase from "./application/usecases/IUserUseCase";
import UserUseCase from "./application/usecases/UserUseCase";
import UserController from "./entrypoint/controllers/UserController";

const container = new Container();

// bind controllers
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(DefaultController)
    .whenTargetNamed("DefaultController");
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(UserController)
    .whenTargetNamed("UserController");

// bind repositories
container
    .bind<IUserReadOnlyRepository>(TYPES.IUserReadOnlyRepository)
    .to(UserRepository);

// bind services
container.bind<IUserUseCase>(TYPES.IUserUseCase).to(UserUseCase);

const server = new InversifyKoaServer(container);
server.setConfig((app) => {
    app.use(bodyParser()).use(morgan("dev"));
});

const app = server.build();
app.listen(3000, () => {
    // eslint-disable-next-line
    console.log(`server started at http://localhost:${3000}`);
});
