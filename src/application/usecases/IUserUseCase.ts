import UserDto from "../dtos/UserDto";

export default interface IUserUseCase {
    getUser(id: string): Promise<UserDto | undefined>;
}
