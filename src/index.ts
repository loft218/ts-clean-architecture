import "reflect-metadata";
import * as morgan from "morgan";
import { Container } from "inversify";
import DefaultController from "./entrypoint/controllers/DefaultController";
import IUserReadOnlyRepository from "./application/repositories/IUserReadOnlyRepository";
import { TYPES } from "./constants/types";
import UserRepository from "./infrastructure/repositories/UserRepository";
import IUserUseCase from "./application/usecases/IUserUseCase";
import UserUseCase from "./application/usecases/UserUseCase";
import UserController from "./entrypoint/controllers/UserController";
import {
    interfaces,
    InversifyRestifyServer,
    TYPE,
} from "inversify-restify-utils";

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

const server = new InversifyRestifyServer(container);
server.setConfig((app) => {
    var logger = morgan("dev");
    app.use(logger);

    app.on("restifyError", (req, res, err, callback) => {
        console.error(err.stack);
        return callback();
    });
});

const app = server.build();

app.listen(3000, () => {
    // eslint-disable-next-line
    console.log(`server started at http://localhost:${3000}`);
});
