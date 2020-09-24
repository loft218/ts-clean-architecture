import { injectable } from "inversify";
import { Controller, Get, interfaces } from "inversify-restify-utils";

@Controller("/")
@injectable()
export default class DefaultController implements interfaces.Controller {
    @Get("/")
    index(): string {
        return "hello index";
    }
}
