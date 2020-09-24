import User from "src/domain/User";

export default interface IUserReadOnlyRepository {
    getById(id: string): Promise<User>;
}
