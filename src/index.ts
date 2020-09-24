import "reflect-metadata";
import * as bodyParser from "koa-bodyparser";
import { Container } from "inversify";
import { interfaces, InversifyKoaServer, TYPE } from "inversify-koa-utils";
import { DefaultController } from "./entrypoint/controllers/DefaultController";

const container = new Container();
container.bind<interfaces.Controller>(TYPE.Controller).to(DefaultController);

const server = new InversifyKoaServer(container);
server.setConfig((app) => {
    app.use(bodyParser());
});

const app = server.build();
app.listen(3000, () => {
    // eslint-disable-next-line
    console.log(`server started at http://localhost:${3000}`);
});
