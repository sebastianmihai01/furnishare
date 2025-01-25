import React from "react";

/**
 * Cached token endpoint for persistent user sessions
 * @param email
 * @param token
 * @returns
 */
const useToken = async (
  email: string | null,
  token: string | null,
  clientId?: string | null
) => {
  if (!email || !token) return false;
  const request = await fetch(
    `${process.env.REST_URL || "localhost:3000"}/api/v1/sessions`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, email, clientId }),
    }
  );
  if (request.status != 200) {
    localStorage.setItem("isLoggedIn", "false"); //logout
    return false;
  }
  localStorage.setItem("isLoggedIn", "true");
  return true;
};

export default useToken;
