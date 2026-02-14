# backend API Docs

> Archivo generado automáticamente por OKO.
> Actualizado: 2026-02-14T15:18:05

- **Colecciones:** `3`

## Variables Globales

_Sin variables globales._

## Colecciones y Endpoints

### auth

| Alias | Method | URL | Variables |
|---|---|---|---|
| `CheckPassword` | `POST` | `{{base_url}}/api/auth/check-password` | `base_url` |
| `ConfirmAccount` | `POST` | `{{base_url}}/api/auth/confirm-account` | `base_url` |
| `CreateAccount` | `POST` | `{{base_url}}/api/auth/create-account` | `base_url` |
| `ForgotPassword` | `POST` | `{{base_url}}/api/auth/forgot-password` | `base_url` |
| `GetUserAuth` | `GET` | `{{base_url}}/api/auth/user` | `base_url` |
| `Login` | `POST` | `{{base_url}}/api/auth/login` | `base_url` |
| `ResetPassword` | `POST` | `{{base_url}}/api/auth/reset-password/{{token}}` | `base_url`, `token` |
| `updatePasswordUserAuth` | `POST` | `{{base_url}}/api/auth/update-password` | `base_url` |
| `ValidateToken` | `POST` | `{{base_url}}/api/auth/validate-token` | `base_url` |

### budget

| Alias | Method | URL | Variables |
|---|---|---|---|
| `CreateBudget` | `POST` | `{{base_url}}/api/budgets` | `base_url` |
| `DeleteById` | `DELETE` | `{{base_url}}/api/budgets/{{budget_id}}` | `base_url`, `budget_id` |
| `expense` | `GET` | `GetAll` | - |
| `GetAllBudget` | `GET` | `{{base_url}}/api/budgets` | `base_url` |
| `GetById` | `GET` | `{{base_url}}/api/budgets/{{budget_id}}` | `base_url`, `budget_id` |
| `UpdateById` | `PUT` | `{{base_url}}/api/budgets/{{budget_id}}` | `base_url`, `budget_id` |

### expense

| Alias | Method | URL | Variables |
|---|---|---|---|
| `Create` | `POST` | `{{base_url}}/api/budgets/{{budget_id}}/expenses` | `base_url`, `budget_id` |
| `DeleteById` | `DELETE` | `{{base_url}}/api/budgets/{{budget_id}}/expenses/{{expense_id}}` | `base_url`, `budget_id`, `expense_id` |
| `GetById` | `GET` | `{{base_url}}/api/budgets/{{budget_id}}/expenses/{{expense_id}}` | `base_url`, `budget_id`, `expense_id` |
| `UpdateById` | `PUT` | `{{base_url}}/api/budgets/{{budget_id}}/expenses/{{expense_id}}` | `base_url`, `budget_id`, `expense_id` |
