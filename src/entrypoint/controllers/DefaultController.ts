import { controller, httpGet, interfaces } from "inversify-koa-utils";
import { injectable } from "inversify";

@controller("/")
@injectable()
export default class DefaultController implements interfaces.Controller {
    @httpGet("/")
    index(): string {
        return "hello index";
    }
}
