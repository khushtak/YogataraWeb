// src/utils/auth.ts

/* ===============================
   👉 USER SAVE
================================ */
export const saveUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/* ===============================
   👉 USER GET
================================ */
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/* ===============================
   👉 TOKEN SAVE
================================ */
export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

/* ===============================
   👉 TOKEN GET
================================ */
export const getToken = () => {
  
  return localStorage.getItem("token");
};

/* ===============================
   👉 ROLE GET
================================ */
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

/* ===============================
   👉 LOGOUT
================================ */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
