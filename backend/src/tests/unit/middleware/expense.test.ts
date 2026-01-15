import { createRequest, createResponse } from "node-mocks-http";
import { validateExpenseExists } from "../../../middleware/expense";
import Expense from "../../../models/Expense";
import { expenses } from "../../mocks/expenses";
import { hasAccess } from "../../../middleware/budget";
import { budgets } from "../../mocks/budgets";

jest.mock("../../../models/Expense", () => ({
  findByPk: jest.fn(),
}));

describe("Expenses Middleware - validateExpenseExists", () => {
  beforeEach(() => {
    (Expense.findByPk as jest.Mock).mockImplementation((id) => {
      const expense = expenses.filter((e) => e.id === id)[0] ?? null;
      return Promise.resolve(expense);
    });
  });

  it("should handle a non-existent budget", async () => {
    const req = createRequest({
      params: { expenseId: 120 },
    });
    const res = createResponse();
    const next = jest.fn();

    await validateExpenseExists(req, res, next);

    const data = res._getJSONData();
    expect(data).toHaveProperty("error", "expense not found");
    expect(res.statusCode).toBe(404);
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle error and statusCode 500", async () => {
    (Expense.findByPk as jest.Mock).mockRejectedValue(new Error());
    const req = createRequest({
      params: { expenseId: 1 },
    });

    const res = createResponse();
    const next = jest.fn();

    await validateExpenseExists(req, res, next);

    const data = res._getJSONData();
    expect(data).toHaveProperty("error", "error fetching expense");
    expect(res.statusCode).toBe(500);
    expect(next).not.toHaveBeenCalled();
  });

  it("should proceed to next middleware if expense exists", async () => {
    const req = createRequest({
      params: { expenseId: 1 },
    });
    const res = createResponse();
    const next = jest.fn();

    await validateExpenseExists(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.expense).toEqual(expenses[0]);
  });

  it("should prevent unathorized users from adding expenses", async () => {
    const req = createRequest({
      method: "POST",
      url: "/api/expenses/:budgetId/expenses",
      budget: budgets[0],
      user: { id: 20 },
      body: { name: "New Expense", amount: 500 },
    });
    const res = createResponse();
    const next = jest.fn();

    hasAccess(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      error: "access denied to this budget",
    });
  });
});
