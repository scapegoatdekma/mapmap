import { NavLink } from "react-router-dom";
import "./sidebar.scss";

import { useAuth } from "../../shared/hooks/useAuth";
import { navLinks } from "./navConfig";

import {
  Home,
  Map,
  CalendarDays,
  Route,
  User,
  Landmark,
  PenSquare,
  Shield,
} from "lucide-react";

const icons = {
  Home,
  Map,
  CalendarDays,
  Route,
  User,
  Landmark,
  PenSquare,
  Shield,
};

export default function Sidebar({ open, onToggle }) {
  const { role } = useAuth();

  const visibleLinks = navLinks.filter((link) => link.roles.includes(role));

  return (
    <aside className={`sider ${open ? "sider--open" : "sider--closed"}`}>
      <div className="sider-top">
        <div className="sider-logo">
          <span className="sider-logo__dot" />
          <span>Карта краеведа</span>
        </div>
      </div>

      <nav className="sider-nav">
        {visibleLinks.map((link) => {
          const Icon = icons[link.icon];

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `sider-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sider-ico">{Icon && <Icon size={18} />}</span>
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sider-bottom">
        <div className="sider-hint">
          <div className="sider-hint__title">TIP</div>
          <div className="sider-hint__text">
            Клик по карте добавляет метку.
          </div>
        </div>
      </div>
    </aside>
  );
}
