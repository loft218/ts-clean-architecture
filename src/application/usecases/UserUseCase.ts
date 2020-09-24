import { inject, injectable } from "inversify";
import { TYPES } from "src/constants/types";
import UserDto from "../dtos/UserDto";
import IUserReadOnlyRepository from "../repositories/IUserReadOnlyRepository";
import IUserUseCase from "./IUserUseCase";

@injectable()
export default class UserUseCase implements IUserUseCase {
    private userRepo: IUserReadOnlyRepository;

    constructor(
        @inject(TYPES.IUserReadOnlyRepository) userRepo: IUserReadOnlyRepository
    ) {
        this.userRepo = userRepo;
    }

    async getUser(id: string): Promise<UserDto> {
        const user = await this.userRepo.getById(id);
        return user;
    }
}
