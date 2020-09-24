import { TYPES } from "src/constants/types";
import { inject, injectable } from "inversify";
import { Request } from "restify";
import { Controller, Get, interfaces } from "inversify-restify-utils";
import IUserUseCase from "src/application/usecases/IUserUseCase";
import UserDto from "src/application/dtos/UserDto";

@Controller("/user")
@injectable()
export default class UserController implements interfaces.Controller {
    private readonly userUseCase: IUserUseCase;

    constructor(@inject(TYPES.IUserUseCase) userUseCase: IUserUseCase) {
        this.userUseCase = userUseCase;
    }

    @Get("/:id")
    getUser(req: Request): Promise<UserDto> {
        return this.userUseCase.getUser(req.params?.id);
    }
}
