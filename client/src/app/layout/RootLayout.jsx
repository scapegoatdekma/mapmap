import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Space, Typography, theme as antdTheme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  BranchesOutlined,
  UserOutlined,
  BankOutlined,
  EditOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

import Sidebar from "../../widgets/Sidebar/Sidebar";
import { useAuth } from "../../shared/hooks/useAuth";
import { navLinks } from "../../widgets/Sidebar/navConfig";
const { Header, Content } = Layout;

const icons = {
  Home: <HomeOutlined />,
  Map: <EnvironmentOutlined />,
  CalendarDays: <CalendarOutlined />,
  Route: <BranchesOutlined />,
  User: <UserOutlined />,
  Landmark: <BankOutlined />,
  PenSquare: <EditOutlined />,
  Shield: <SafetyOutlined />,
};

export default function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = antdTheme.useToken();
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const handler = (e) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleCollapse = (value) => {
    setCollapsed(value);
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 350);
  };

  const visibleLinks = useMemo(
    () => navLinks.filter((link) => link.roles.includes(role)),
    [role]
  );

  const selectedKey =
    visibleLinks
      .map((link) => link.to)
      .filter(
        (path) =>
          location.pathname === path ||
          (path !== "/" && location.pathname.startsWith(`${path}/`))
      )
      .sort((a, b) => b.length - a.length)[0] || "/";

  const mobileItems = visibleLinks.map((link) => ({
    key: link.to,
    icon: icons[link.icon],
    label: null,
  }));

  const isAuthRoute = location.pathname.startsWith("/auth");

  if (isAuthRoute) {
    return (
      <Layout style={{ minHeight: "100vh" }} className="app-layout auth-layout">
        <Content style={{ padding: 16 }} className="app-content auth-content">
          <div className="auth-shell">
            <Outlet />
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }} className="app-layout">
      {!isMobile && (
        <Sidebar
          collapsed={collapsed}
          onCollapse={handleCollapse}
          onBreakpoint={(broken) => handleCollapse(broken)}
        />
      )}
      <Layout className="app-layout__inner">
        <Header
          style={{
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: token.colorBgContainer,
            borderBottom: "1px solid #f0f0f0",
          }}
          className="app-header"
        >
          <Space size="small">
            {!isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => handleCollapse(!collapsed)}
              />
            )}
            <Typography.Text strong>MapMap</Typography.Text>
          </Space>
        </Header>
        <Content style={{ padding: 16 }} className="app-content">
          <Outlet />
        </Content>
        {isMobile && (
          <div className="mobile-nav">
            <div className="mobile-nav__inner">
              <div className="mobile-nav__menu">
                {mobileItems.map((item) => (
                  <button
                    key={item.key}
                    className={`mobile-nav__item ${
                      selectedKey === item.key ? "is-active" : ""
                    }`}
                    onClick={() => navigate(item.key)}
                    type="button"
                    aria-label={item.key}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Layout>
    </Layout>
  );
}
