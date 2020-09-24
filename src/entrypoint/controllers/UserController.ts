import {
    controller,
    httpGet,
    interfaces,
    requestParam,
} from "inversify-koa-utils";
import { inject, injectable } from "inversify";
import IUserUseCase from "src/application/usecases/IUserUseCase";
import { TYPES } from "src/constants/types";
import UserDto from "src/application/dtos/UserDto";

@controller("/user")
@injectable()
export default class UserController implements interfaces.Controller {
    private readonly userUseCase: IUserUseCase;

    constructor(@inject(TYPES.IUserUseCase) userUseCase: IUserUseCase) {
        this.userUseCase = userUseCase;
    }

    @httpGet("/:id")
    getUser(@requestParam("id") id: string): Promise<UserDto> {
        return this.userUseCase.getUser(id);
    }
}
