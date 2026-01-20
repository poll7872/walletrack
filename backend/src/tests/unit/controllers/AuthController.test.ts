import { createResponse, createRequest } from "node-mocks-http";
import { AuthController } from "../../../controllers/AuthController";
import User from "../../../models/User";
import { hashPassword, verifyPassword } from "../../../utils/auth";
import { generateToken } from "../../../utils/token";
import { AuthEmail } from "../../../emails/AuthEmail";
import { generateJWT } from "../../../utils/jwt";

jest.mock("../../../models/User");
jest.mock("../../../utils/auth");
jest.mock("../../../utils/token");
jest.mock("../../../utils/jwt");
jest.mock("../../../emails/AuthEmail", () => ({
  AuthEmail: {
    sendConfirmationEmail: jest.fn(),
    sendPasswordResetToken: jest.fn(),
  },
}));

describe("AuthController.createAccount", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a statusCode 409 an error message if the email is already in use", async () => {
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

  it("should register a new user and return a statusCode 200 and a success message", async () => {
    const req = createRequest({
      method: "POST",
      url: "/api/auth/create-account",
      body: { email: "test@example.com", password: "testpassword" },
      name: "Test name",
    });
    const res = createResponse();

    (User.findOne as jest.Mock).mockResolvedValue(null);
    const mockSave = jest.fn();
    (User.create as jest.Mock).mockResolvedValue({
      ...req.body,
      save: mockSave,
      name: req.name || "Test name",
    });
    (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");
    (generateToken as jest.Mock).mockReturnValue("123456");
    (AuthEmail.sendConfirmationEmail as jest.Mock).mockResolvedValue(undefined);

    await AuthController.createAccount(req, res);

    const data = res._getJSONData();
    expect(data).toHaveProperty("message", "Account created successfully");
    expect(res.statusCode).toBe(201);
    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(User.create).toHaveBeenCalledTimes(1);

    expect(mockSave).toHaveBeenCalled();
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(generateToken).toHaveBeenCalled();
    expect(hashPassword).toHaveBeenCalledWith("testpassword");

    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledWith({
      name: "Test name",
      email: req.body.email,
      token: "123456",
    });
    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledTimes(1);
  });
});

describe("AuthController.login", () => {
  it("should return a statusCode 404 if user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: { email: "test@example.com", password: "testpassword" },
    });
    const res = createResponse();

    await AuthController.login(req, res);

    const data = res._getJSONData();
    expect(data).toHaveProperty("error", "User does not exist");
    expect(res.statusCode).toBe(404);
  });

  it("should return 403 if the account has not been confirmed", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
      password: "testpassword",
      confirmed: false,
    });

    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: { email: "test@example.com", password: "testpassword" },
    });
    const res = createResponse();

    await AuthController.login(req, res);

    const data = res._getJSONData();
    expect(data).toHaveProperty("error", "Account not confirmed");
    expect(res.statusCode).toBe(403);
  });

  it("should return 401 if the password is incorrect", async () => {
    const userMock = {
      id: 1,
      email: "test@example.com",
      password: "testpassword",
      confirmed: true,
    };
    (User.findOne as jest.Mock).mockResolvedValue(userMock);

    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: { email: "test@example.com", password: "testpassword" },
    });
    const res = createResponse();

    (verifyPassword as jest.Mock).mockResolvedValue(false);

    await AuthController.login(req, res);

    const data = res._getJSONData();
    expect(data).toHaveProperty("error", "Incorrect password");
    expect(res.statusCode).toBe(401);
    expect(verifyPassword).toHaveBeenCalledWith(
      req.body.password,
      userMock.password,
    );
    expect(verifyPassword).toHaveBeenCalledTimes(1);
  });

  it("should return a JWT if authentication is successful", async () => {
    const userMock = {
      id: 1,
      email: "test@example.com",
      password: "testpassword",
      confirmed: true,
    };
    (User.findOne as jest.Mock).mockResolvedValue(userMock);

    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: { email: "test@example.com", password: "testpassword" },
    });
    const res = createResponse();

    const fakeJWT = "fakeJWT";

    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (generateJWT as jest.Mock).mockReturnValue(fakeJWT);

    await AuthController.login(req, res);

    const data = res._getJSONData();
    expect(data).toEqual(fakeJWT);
    expect(res.statusCode).toBe(200);
    expect(generateJWT).toHaveBeenCalledTimes(1);
    expect(generateJWT).toHaveBeenCalledWith(userMock.id);
  });
});
