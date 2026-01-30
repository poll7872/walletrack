import { cookies } from "next/headers";

export const getToken = async () => {
  const token = (await cookies()).get("WALLETRACK_TOKEN")?.value;
  return token;
};
