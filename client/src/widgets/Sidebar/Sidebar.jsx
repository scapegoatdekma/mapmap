import { Layout, Menu, Typography } from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  BranchesOutlined,
  UserOutlined,
  BankOutlined,
  EditOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { navLinks } from "./navConfig";

const { Sider } = Layout;

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

export default function Sidebar({ collapsed, onCollapse, onBreakpoint }) {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const visibleLinks = navLinks.filter((link) => link.roles.includes(role));
  const items = visibleLinks.map((link) => ({
    key: link.to,
    icon: icons[link.icon],
    label: link.label,
  }));

  const selectedKey =
    visibleLinks
      .map((link) => link.to)
      .filter(
        (path) =>
          location.pathname === path ||
          (path !== "/" && location.pathname.startsWith(`${path}/`))
      )
      .sort((a, b) => b.length - a.length)[0] || "/";

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={240}
      collapsedWidth={80}
      breakpoint="lg"
      onBreakpoint={onBreakpoint}
      theme="light"
      trigger={null}
      style={{ borderRight: "1px solid #f0f0f0" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "16px 16px 8px",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#1677ff",
          }}
        />
        {!collapsed && <Typography.Text strong>MapMap</Typography.Text>}
      </div>
      <Menu
        mode="inline"
        items={items}
        selectedKeys={[selectedKey]}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}
