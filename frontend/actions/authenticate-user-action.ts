"use server";

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionStateType = {
  errors: string[];
};

export async function authenticate(
  prevState: ActionStateType,
  formData: FormData,
) {
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const auth = LoginSchema.safeParse(loginCredentials);
  if (!auth.success) {
    return { errors: auth.error.issues.map((error) => error.message) };
  }

  const url = `${process.env.API_URL}/auth/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
    };
  }

  (await cookies()).set({
    name: "WALLETRACK_TOKEN",
    value: json,
    httpOnly: true,
    path: "/",
  });

  redirect("/admin");
}
