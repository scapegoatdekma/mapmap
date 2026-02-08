import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../widgets/Sidebar/Sidebar";

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app ${sidebarOpen ? "app--sidebar" : "app--nosidebar"}`}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />

      <main className="main">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? "⟨" : "⟩"}
        </button>

        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
