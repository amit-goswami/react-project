import { jwtDecode } from "jwt-decode";

export const decodeJwtToken = (): { user_id?: string } | null => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in localStorage");
      return null;
    }

    const decodedToken: { user_id?: string } = jwtDecode(accessToken) as {
      user_id?: string;
    };

    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};
