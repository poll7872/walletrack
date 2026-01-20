import request from "supertest";
import server from "../../server";
import { AuthController } from "../../controllers/AuthController";

jest.mock("../../emails/AuthEmail", () => ({
  AuthEmail: {
    sendConfirmationEmail: jest.fn(),
    sendPasswordResetToken: jest.fn(),
  },
}));

// Mock the nodemailer-express-handlebars
jest.mock("nodemailer-express-handlebars", () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

describe("Authentication - Create Account", () => {
  it("should display validation errors when form empty", async () => {
    const response = await request(server)
      .post("/api/auth/create-account")
      .send({});

    const createAccountMock = jest.spyOn(AuthController, "createAccount");
    expect(createAccountMock).not.toHaveBeenCalled();

    expect(response.status).toBe(400);
    expect(response.status).not.toBe(201);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(3);
  });

  it("should return 400 when the email is invalid", async () => {
    const response = await request(server)
      .post("/api/auth/create-account")
      .send({
        name: "Carlos",
        email: "not_valid_email",
        password: "12345678",
      });

    const createAccountMock = jest.spyOn(AuthController, "createAccount");
    expect(createAccountMock).not.toHaveBeenCalled();

    expect(response.status).toBe(400);
    expect(response.status).not.toBe(201);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("invalid email format");
  });

  it("should return 400 when the length the password is less than 8 characters", async () => {
    const response = await request(server)
      .post("/api/auth/create-account")
      .send({
        name: "Carlos",
        email: "carlos@gmail.com",
        password: "123456",
      });

    const createAccountMock = jest.spyOn(AuthController, "createAccount");
    expect(createAccountMock).not.toHaveBeenCalled();

    expect(response.status).toBe(400);
    expect(response.status).not.toBe(201);
    expect(response.body.errors[0].msg).toBe(
      "password not valid min 8 characters",
    );
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  it("should create a new account and return statusCode 201", async () => {
    const userData = {
      name: "Carlos",
      email: "carlos@gmail.com",
      password: "12345678",
    };
    const response = await request(server)
      .post("/api/auth/create-account")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });

  it("should return 409 when a user with the same email already exists", async () => {
    const userData = {
      name: "Carlos",
      email: "carlos@gmail.com",
      password: "12345678",
    };
    const response = await request(server)
      .post("/api/auth/create-account")
      .send(userData);

    expect(response.status).toBe(409);
    expect(response.status).not.toBe(201);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
    expect(response.body).toHaveProperty("error", "User already exists");
  });
});

describe("Authentication - Account Confirmation with Token", () => {
  it("should display error if token is empty or is not valid", async () => {
    const response = await request(server)
      .post("/api/auth/confirm-account")
      .send({ token: "not_valid" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("token is not valid");
  });

  it("should display error if token doesn't exists", async () => {
    const response = await request(server)
      .post("/api/auth/confirm-account")
      .send({ token: "123456" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid token");
    expect(response.status).not.toBe(200);
  });

  it("should confirm account with a valid token", async () => {
    const token = (globalThis as any).walletrackConfirmationToken;
    const response = await request(server)
      .post("/api/auth/confirm-account")
      .send({ token });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Account confirmed successfully",
    );
    expect(response.status).not.toBe(401);
  });
});
