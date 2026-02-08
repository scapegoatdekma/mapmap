// src/widgets/Sidebar/navConfig.js
import { ROLES } from "../../shared/constants/roles";

export const navLinks = [
  {
    to: "/",
    label: "Home",
    icon: "Home",
    roles: [ROLES.USER, ROLES.KRAEVED, ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    to: "/map",
    label: "Map",
    icon: "Map",
    roles: [ROLES.USER, ROLES.KRAEVED, ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    to: "/poster",
    label: "Афиша",
    icon: "CalendarDays",
    roles: [ROLES.USER, ROLES.KRAEVED, ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    to: "/planner",
    label: "Планнер",
    icon: "Route",
    roles: [ROLES.USER, ROLES.KRAEVED, ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    to: "/profile",
    label: "Профиль",
    icon: "User",
    roles: [ROLES.USER, ROLES.KRAEVED, ROLES.EDITOR, ROLES.ADMIN],
  },

  // ======= роли выше обычного юзера =======

  {
    to: "/kraeved",
    label: "Кабинет краеведа",
    icon: "Landmark",
    roles: [ROLES.KRAEVED, ROLES.ADMIN],
  },
  {
    to: "/editor",
    label: "Редактор",
    icon: "PenSquare",
    roles: [ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    to: "/admin",
    label: "Admin",
    icon: "Shield",
    roles: [ROLES.ADMIN],
  },
];
