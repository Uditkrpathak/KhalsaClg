import api from "./api";

/**
 * LOGIN
 */
const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};

/**
 * LOGOUT
 */
const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
};

/**
 * GET STORED USER
 */
const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * CHECK AUTH
 */
const isAuthenticated = () => {
  return Boolean(localStorage.getItem("accessToken"));
};

export default {
  login,
  logout,
  getStoredUser,
  isAuthenticated
};
