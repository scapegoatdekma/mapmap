// src/shared/hooks/useAuth.js
import { ROLES } from "../constants/roles";

export function useAuth() {
  // TODO: позже заменим на реальный auth из бекенда
  const user = {
    id: 1,
    name: "Demo User",
    role: ROLES.ADMIN, // меняй тут: ADMIN / KRAEVED / EDITOR / USER
  };

  return {
    user,
    isAuth: true,
    role: user?.role ?? ROLES.USER,
  };
}
