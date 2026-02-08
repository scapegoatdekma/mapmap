import { useAuth } from "../../app/providers/AuthProvider";

export function useRole() {
  const { role } = useAuth();

  const isAdmin = role === "admin";
  const isEditor = role === "editor";
  const isHistorian = role === "historian";
  const isUser = role === "user";

  return {
    role,
    isAdmin,
    isEditor,
    isHistorian,
    isUser,
  };
}
