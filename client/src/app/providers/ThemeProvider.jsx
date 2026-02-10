import { App, ConfigProvider, theme as antdTheme } from "antd";

const lightTheme = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: "#1677ff",
    colorBgLayout: "#f5f6f8",
    colorBgContainer: "#ffffff",
    colorText: "#1f2937",
    colorTextSecondary: "#4b5563",
    colorBorder: "#e5e7eb",
    borderRadius: 10,
    fontFamily: '"Kumbh Sans", "Montserrat", sans-serif',
  },
  components: {
    Card: {
      colorBorderSecondary: "#e5e7eb",
      boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
    },
    Layout: {
      headerBg: "#ffffff",
      bodyBg: "#f5f6f8",
    },
  },
};

export function ThemeProvider({ children }) {
  return (
    <ConfigProvider theme={lightTheme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
