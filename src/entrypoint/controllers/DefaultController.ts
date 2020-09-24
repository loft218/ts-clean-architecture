import * as Router from "koa-router";
import { controller, httpGet, interfaces } from "inversify-koa-utils";
import { injectable } from "inversify";

@controller("/")
@injectable()
export class DefaultController implements interfaces.Controller {
    @httpGet("/")
    index(ctx: Router.IRouterContext, next: () => Promise<any>): string {
        return "hello index";
    }
}
