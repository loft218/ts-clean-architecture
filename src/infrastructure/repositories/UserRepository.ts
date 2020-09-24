import { injectable } from "inversify";
import IUserReadOnlyRepository from "src/application/repositories/IUserReadOnlyRepository";
import User from "src/domain/User";

@injectable()
export default class UserRepository implements IUserReadOnlyRepository {
    private _users: User[] = [{ id: "1", name: "张三", gender: "m" }];

    getById(id: string): Promise<User> {
        const user = this._users.find((u) => u.id === id);
        return Promise.resolve(user);
    }
}
