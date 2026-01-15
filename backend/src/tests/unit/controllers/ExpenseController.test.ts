import { createRequest, createResponse } from "node-mocks-http";
import Expense from "../../../models/Expense";
import { ExpensesController } from "../../../controllers/ExpenseController";
import { expenses } from "../../mocks/expenses";

jest.mock("../../../models/Expense", () => ({
  create: jest.fn(),
}));

describe("ExpenseController.create", () => {
  it("should create a new expense and respond with statusCode 201", async () => {
    const expenseMock = {
      save: jest.fn().mockResolvedValue(true),
    };

    (Expense.create as jest.Mock).mockResolvedValue(expenseMock);

    const req = createRequest({
      method: "POST",
      url: "/api/expenses/:budgetId/expenses",
      body: { name: "New Expense", amount: 500 },
      budget: { id: 1 },
    });
    const res = createResponse();

    await ExpensesController.create(req, res);

    const data = res._getJSONData();
    expect(data).toHaveProperty("message", "Expense created successfully");
    expect(res.statusCode).toBe(201);
    expect(expenseMock.save).toHaveBeenCalled();
    expect(expenseMock.save).toHaveBeenCalledTimes(1);
    expect(Expense.create).toHaveBeenCalledWith(req.body);
  });

  it("should handle error when creating an expense", async () => {
    const expenseMock = {
      save: jest.fn(),
    };

    (Expense.create as jest.Mock).mockRejectedValue(new Error());

    const req = createRequest({
      method: "POST",
      url: "/api/expenses/:budgetId/expenses",
      body: { name: "New Expense", amount: 500 },
      budget: { id: 1 },
    });
    const res = createResponse();

    await ExpensesController.create(req, res);
    const data = res._getJSONData();
    expect(data).toHaveProperty("error", "Error creating expense");
    expect(res.statusCode).toBe(500);
    expect(expenseMock.save).not.toHaveBeenCalled();
    expect(Expense.create).toHaveBeenCalledWith(req.body);
  });
});

describe("ExpenseController.getById", () => {
  it("should return an expense with ID 1", async () => {
    const req = createRequest({
      method: "GET",
      url: "/api/expenses/:budgetId/expenses/:expenseId",
      expense: expenses[0],
    });
    const res = createResponse();

    await ExpensesController.getById(req, res);
    const data = res._getJSONData();
    expect(data).toEqual(expenses[0]);
    expect(res.statusCode).toBe(200);
  });
});

describe("ExpenseController.updateById", () => {
  it("should handle expense update", async () => {
    const expenseMock = {
      ...expenses[0],
      update: jest.fn().mockResolvedValue(true),
    };

    const req = createRequest({
      method: "PUT",
      url: "/api/expenses/:budgetId/expenses/:expenseId",
      expense: expenseMock,
      body: { name: "Updated Expense", amount: 5000 },
    });
    const res = createResponse();

    await ExpensesController.updateById(req, res);
    const data = res._getJSONData();
    expect(data).toHaveProperty("message", "Expense updated successfully");
    expect(res.statusCode).toBe(200);
    expect(expenseMock.update).toHaveBeenCalled();
    expect(expenseMock.update).toHaveBeenCalledTimes(1);
    expect(expenseMock.update).toHaveBeenCalledWith(req.body);
  });
});

describe("ExpenseController.deleteById", () => {
  it("should delete the expense and return a success message", async () => {
    const expenseMock = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = createRequest({
      method: "DELETE",
      url: "/api/expenses/:budgetId/expenses/:expenseId",
      expense: expenseMock,
    });
    const res = createResponse();

    await ExpensesController.deleteById(req, res);
    const data = res._getJSONData();
    expect(data).toHaveProperty("message", "Expense deleted successfully");
    expect(res.statusCode).toBe(200);
    expect(expenseMock.destroy).toHaveBeenCalled();
    expect(expenseMock.destroy).toHaveBeenCalledTimes(1);
  });
});
