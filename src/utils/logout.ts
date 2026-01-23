export const logoutUser = (navigate?: (path: string) => void) => {
  // 🔥 CLEAR ALL STORAGE
  localStorage.clear();
  sessionStorage.clear();

  // 🔥 REMOVE DARK CLASS
  document.documentElement.classList.remove("dark");

  // 🔥 OPTIONAL: CLEAR COOKIES (basic)
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
  });

  // 🔥 REDIRECT
  if (navigate) {
    navigate("/", { replace: true });
  } else {
    window.location.href = "/";
  }
};
