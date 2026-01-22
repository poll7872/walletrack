import request from "supertest";
import server from "../../server";
import { AuthController } from "../../controllers/AuthController";
import User from "../../models/User";
import * as authUtil from "../../utils/auth";
import * as jwtUtil from "../../utils/jwt";

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

describe("Authentication - Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display validation errors when form empty", async () => {
    const response = await request(server).post("/api/auth/login").send({});
    const loginMock = jest.spyOn(AuthController, "login");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe("invalid email format");
    expect(response.body.errors[1].msg).toBe("password is required");
    expect(loginMock).not.toHaveBeenCalled();
  });

  it("should return 400 when email is invalid", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "not_valid_email",
      password: "12345678",
    });
    const loginMock = jest.spyOn(AuthController, "login");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("invalid email format");
    expect(loginMock).not.toHaveBeenCalled();
  });

  it("should return 404 error if the user is not found", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "email@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).toHaveProperty("error", "User does not exist");
  });

  it("should return 403 error if the user account is not confirmed", async () => {
    (jest.spyOn(User, "findOne") as jest.Mock).mockResolvedValue({
      id: 1,
      confirmed: false,
      password: "hashed_password",
      email: "user_not_confirmed@example.com",
    });
    const response = await request(server).post("/api/auth/login").send({
      email: "user_not_confirmed@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(403);
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.body).toHaveProperty("error", "Account not confirmed");
  });

  it("should return 401 error if password is incorrect", async () => {
    const findOne = (
      jest.spyOn(User, "findOne") as jest.Mock
    ).mockResolvedValue({
      id: 1,
      confirmed: true,
      password: "hashed_password",
    });

    const verifyPassword = jest
      .spyOn(authUtil, "verifyPassword")
      .mockResolvedValue(false);
    const response = await request(server).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(403);
    expect(response.body).toHaveProperty("error", "Incorrect password");

    expect(findOne).toHaveBeenCalledTimes(1);
    expect(verifyPassword).toHaveBeenCalledTimes(1);
  });

  it("should generate a jwt and return 200", async () => {
    const findOne = (
      jest.spyOn(User, "findOne") as jest.Mock
    ).mockResolvedValue({
      id: 1,
      confirmed: true,
      password: "hashed_password",
    });

    const verifyPassword = jest
      .spyOn(authUtil, "verifyPassword")
      .mockResolvedValue(true);

    const generateJWT = jest
      .spyOn(jwtUtil, "generateJWT")
      .mockReturnValue("jwt_token");

    const response = await request(server).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual("jwt_token");

    expect(generateJWT).toHaveBeenCalled();
    expect(generateJWT).toHaveBeenCalledTimes(1);
    expect(generateJWT).toHaveBeenCalledWith(1);

    expect(findOne).toHaveBeenCalled();
    expect(findOne).toHaveBeenCalledTimes(1);

    expect(verifyPassword).toHaveBeenCalled();
    expect(verifyPassword).toHaveBeenCalledTimes(1);
    expect(verifyPassword).toHaveBeenCalledWith("password", "hashed_password");
  });
});

let jwt: string;

async function authenticateUser() {
  const response = await request(server).post("/api/auth/login").send({
    email: "carlos@gmail.com",
    password: "12345678",
  });
  jwt = response.body;

  expect(response.status).toBe(200);
}

describe("GET /api/budgets", () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  beforeAll(async () => {
    await authenticateUser();
  });

  it("should reject unauthenticated access to budgets without a token", async () => {
    const response = await request(server).get("/api/budgets");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should reject unauthenticated access to budgets with jwt not valid", async () => {
    const response = await request(server)
      .get("/api/budgets")
      .auth("no_valid", { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Token not valid");
  });

  it("should allow authenticated acces to budgets with a valid jwt", async () => {
    const response = await request(server)
      .get("/api/budgets")
      .auth(jwt, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.status).not.toBe(401);
    expect(response.body).not.toHaveProperty("error", "Unauthorized");
    expect(response.body).toHaveLength(0);
  });
});

describe("POST /api/budgets", () => {
  beforeAll(async () => {
    await authenticateUser();
  });

  it("should reject unauthenticated post request to  budgets without a token", async () => {
    const response = await request(server).post("/api/budgets");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should return error and status code 400 when send a form empty", async () => {
    const response = await request(server)
      .post("/api/budgets")
      .auth(jwt, { type: "bearer" })
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });

  it("should create a budget and return 201", async () => {
    const response = await request(server)
      .post("/api/budgets")
      .auth(jwt, { type: "bearer" })
      .send({ name: "compras", amount: 1000 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "budget created successfully",
    );
  });
});

describe("GET /api/budgets/:id", () => {
  beforeAll(async () => {
    await authenticateUser();
  });

  it("should reject unauthenticated GET request to  budget id without a token", async () => {
    const response = await request(server).get("/api/budgets/1");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should return 400 bad request when id is not valid", async () => {
    const response = await request(server)
      .get("/api/budgets/not_valid")
      .auth(jwt, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe("Invalid budget ID");
    expect(response.body.errors).toHaveLength(1);
  });

  it("should return 404 bad request when budgetId not found", async () => {
    const response = await request(server)
      .get("/api/budgets/100")
      .auth(jwt, { type: "bearer" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "budget not found");
  });

  it("should a single budget by id", async () => {
    const response = await request(server)
      .get("/api/budgets/1")
      .auth(jwt, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(404);
  });
});

describe("PUT /api/budgets/:id", () => {
  beforeAll(async () => {
    await authenticateUser();
  });

  it("should reject unauthenticated PUT request to  budget id without a token", async () => {
    const response = await request(server).put("/api/budgets/1");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should display validation errors if the form is empty", async () => {
    const response = await request(server)
      .put("/api/budgets/1")
      .auth(jwt, { type: "bearer" })
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });

  it("should update a budget by id an return successfully message", async () => {
    const response = await request(server)
      .put("/api/budgets/1")
      .auth(jwt, { type: "bearer" })
      .send({ name: "budget-update", amount: 2000 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "budget updated successfully",
    );
  });
});

describe("DELETE /api/budgets/:id", () => {
  beforeAll(async () => {
    await authenticateUser();
  });

  it("should reject unauthenticated PUT request to  budget id without a token", async () => {
    const response = await request(server).delete("/api/budgets/1");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should return 404 not found whe a budget doesnt exists", async () => {
    const response = await request(server)
      .delete("/api/budgets/100")
      .auth(jwt, { type: "bearer" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "budget not found");
  });

  it("should delete a budget by id an return successfully message", async () => {
    const response = await request(server)
      .delete("/api/budgets/1")
      .auth(jwt, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "budget deleted successfully",
    );
  });
});
