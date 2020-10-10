import "mocha";
import chai from "chai";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import { mockRequest, mockResponse } from "../helpers/MockHttp";

import UserController from "../../src/entrypoint/controllers/UserController";
import UserUseCase from "../../src/application/usecases/UserUseCase";
import FakeUserRepository from "../helpers/FakeUserRepository";

const { expect } = chai;

chai.use(sinonChai);

describe("User Controller", () => {
    let sut: UserController;
    let sandbox: SinonSandbox = null;
    let userUseCase: UserUseCase;
    let fakeRepository: FakeUserRepository;

    const req: any = mockRequest();
    const res: any = mockResponse();

    const user = { id: "1", name: "张三", gender: "m" };

    beforeEach(() => {
        fakeRepository = new FakeUserRepository();
        userUseCase = new UserUseCase(fakeRepository);
        sandbox = sinon.createSandbox();

        sut = new UserController(userUseCase);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("getUser", () => {
        it("should return 200 and a user", async () => {
            sandbox.spy(res, "status");
            sandbox.spy(res, "json");

            const req = { params: { id: "1" } } as any;
            await sut.getUser(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(user);
        });
    });
});
