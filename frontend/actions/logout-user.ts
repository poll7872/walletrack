"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("WALLETRACK_TOKEN");
  redirect("/auth/login");
}
