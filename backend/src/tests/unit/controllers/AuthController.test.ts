import { createResponse, createRequest } from "node-mocks-http";
import { AuthController } from "../../../controllers/AuthController";
import User from "../../../models/User";

jest.mock("../../../models/User");
jest.mock("../../../emails/AuthEmail", () => ({
  sendConfirmationEmail: jest.fn(),
}));

describe("AuthController.createAccount", () => {
  it("should return a statusCode 209 an error message if the email is already in use", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(true);
    const req = createRequest({
      method: "POST",
      url: "/api/auth/create-account",
      body: { email: "test@example.com", password: "testpassword" },
    });
    const res = createResponse();

    await AuthController.createAccount(req, res);

    const data = res._getJSONData();
    expect(data).toHaveProperty("error", "User already exists");
    expect(res.statusCode).toBe(409);
    expect(User.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledTimes(1);
  });
});
