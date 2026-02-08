import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // временно: мок пользователя
  const [user, setUser] = useState({
    id: 1,
    name: "Dmitriy",
    role: "user", // user | historian | editor | admin
  });

  const value = useMemo(() => {
    return {
      user,
      setUser,
      isAuth: !!user,
      role: user?.role ?? "guest",
      logout: () => setUser(null),
      loginAs: (role) =>
        setUser({
          id: 1,
          name: "Demo",
          role,
        }),
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
