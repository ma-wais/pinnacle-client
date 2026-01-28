import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useState } from "react";

function SideLink({
  to,
  label,
  icon,
  collapsed,
}: {
  to: string;
  label: string;
  icon: string;
  collapsed: boolean;
}) {
  return (
    <li className="mb-8">
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            `fw-medium d-flex align-items-center text-14 gap-12 ${collapsed ? "px-16 justify-content-center" : "px-24"} py-12 rounded-12 item-hover`,
            isActive
              ? "bg-main-600 text-white"
              : "text-neutral-500 hover-bg-main-600 hover-text-white transition-1",
          ].join(" ")
        }
        title={collapsed ? label : undefined}
      >
        <span className="d-flex text-xl">
          <i className={icon}></i>
        </span>
        {!collapsed && label}
      </NavLink>
    </li>
  );
}

export default function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSidebarCollapsed = () =>
    setIsSidebarCollapsed(!isSidebarCollapsed);
  const sidebarWidth = isSidebarCollapsed ? 88 : 288;

  return (
    <div
      className={`dashbord-layout bg-main-25 min-vh-100 ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* Mobile Sidebar Overlay */}
      <div
        className={`sidebar-overlay d-lg-none ${isSidebarOpen ? "d-block" : "d-none"}`}
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          zIndex: 998,
        }}
      ></div>

      <div className="d-flex">
        <aside
          className={`dashboard-sidebar px-20 py-32 bg-white border-end border-neutral-40 h-100 z-10 transition-1 ${isSidebarOpen ? "active" : ""}`}
          style={{
            width: `${sidebarWidth}px`,
            position: "fixed",
            left: isSidebarOpen ? "0" : "var(--sidebar-shift, 0)",
            zIndex: 999,
          }}
        >
          <div
            className={`flex-between ${isSidebarCollapsed ? "ps-0 pe-0" : "ps-24 pe-16"}`}
          >
            <Link to="/" className="d-block">
              <img
                src="/eduall/assets/images/logo/logo.png"
                alt="Pinnacle Metals"
                style={{ maxHeight: isSidebarCollapsed ? "48px" : "100px" }}
              />
            </Link>
            <div className="d-flex align-items-center gap-8">
              <button
                onClick={toggleSidebar}
                className="d-lg-none border bg-transparent text-neutral-400"
              >
                <i className="ph ph-x text-2xl"></i>
              </button>
            </div>
          </div>

          <div className="sidebar-menu mt-12">
            {!isSidebarCollapsed && (
              <span className="text-neutral-400 text-12 text-uppercase fw-bold d-block ps-24 tracking-wider">
                Main Menu
              </span>
            )}
            <ul className="p-0 mt-16" style={{ listStyle: "none" }}>
              {user?.role !== "admin" && (
                <SideLink
                  to="/dashboard"
                  label="Dashboard"
                  icon="ph ph-squares-four"
                  collapsed={isSidebarCollapsed}
                />
              )}
              {user?.role === "admin" && (
                <>
                  <SideLink
                    to="/admin"
                    label="Admin Dashboard"
                    icon="ph ph-chart-bar"
                    collapsed={isSidebarCollapsed}
                  />
                  <SideLink
                    to="/admin/users"
                    label="User Management"
                    icon="ph ph-users"
                    collapsed={isSidebarCollapsed}
                  />
                </>
              )}
            </ul>

            {!isSidebarCollapsed && (
              <span className="text-neutral-400 text-12 text-uppercase fw-bold mb-16 mt-32 d-block ps-24 tracking-wider">
                System
              </span>
            )}
            <ul className="p-0 m-0" style={{ listStyle: "none" }}>
              <li>
                <a
                  href="https://dev4.inserito.com/pinnaclemetals/"
                  className={`fw-medium d-flex align-items-center text-14 gap-12 ${isSidebarCollapsed ? "px-16 justify-content-center" : "px-24"} py-12 text-neutral-500 hover-bg-main-600 hover-text-white rounded-12 transition-1`}
                  title={isSidebarCollapsed ? "Back to Website" : undefined}
                >
                  <span className="d-flex text-xl">
                    <i className="ph ph-house"></i>
                  </span>
                  {!isSidebarCollapsed && "Back to Website"}
                </a>
              </li>
              <li className="mt-8">
                <button
                  type="button"
                  onClick={logout}
                  className={`fw-medium d-flex align-items-center text-14 gap-12 ${isSidebarCollapsed ? "px-16 justify-content-center" : "px-24"} py-12 text-neutral-500 hover-bg-danger-600 hover-text-white rounded-12 transition-1 bg-transparent border-0 w-100 text-start`}
                  title={isSidebarCollapsed ? "Logout" : undefined}
                >
                  <span className="d-flex text-xl">
                    <i className="ph ph-sign-out"></i>
                  </span>
                  {!isSidebarCollapsed && "Logout"}
                </button>
              </li>
            </ul>
          </div>

          <div
            className={`position-absolute bottom-0 start-0 w-100 ${isSidebarCollapsed ? "p-12" : "p-24"}`}
          >
            <div className="bg-main-25 rounded-16 p-8 border border-neutral-30">
              <div
                className={`d-flex align-items-center gap-12 ${isSidebarCollapsed ? "justify-content-center" : ""}`}
              >
                <div className="w-40 h-40 bg-main-600 text-white rounded-circle flex-center text-lg font-bold">
                  {user?.email?.[0].toUpperCase()}
                </div>
                {!isSidebarCollapsed && (
                  <div className="overflow-hidden">
                    <div className="text-14 fw-bold text-neutral-700 truncate">
                      {user?.email?.split("@")[0]}
                    </div>
                    <div className="text-12 text-neutral-400 truncate">
                      {user?.role}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        <div
          className="dashbord-main flex-grow-1"
          style={{
            width: "100%",
            marginLeft: "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          <style>{`
            @media (min-width: 992px) {
              .dashbord-main {
                margin-left: ${sidebarWidth}px !important;
                width: calc(100% - ${sidebarWidth}px) !important;
              }
            }
          `}</style>
          <header className="bg-white border-bottom border-neutral-40 px-32 py-20 sticky-top">
            <div className="d-flex align-items-center justify-content-between gap-24">
              <div className="flex-align gap-12">
                <button
                  onClick={toggleSidebarCollapsed}
                  className="d-none border rounded-circle d-lg-inline-flex w-44 h-44 bg-gray-100 flex-center"
                  title={
                    isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  <i
                    className={`ph ${isSidebarCollapsed ? "ph-arrow-right" : "ph-arrow-left"} text-2xl`}
                  ></i>
                </button>
                <button
                  onClick={toggleSidebar}
                  className="d-lg-none w-44 h-44 bg-gray-100 border rounded-circle flex-center"
                >
                  <i className="ph ph-list text-2xl"></i>
                </button>
                <h4 className="mb-0 text-neutral-700">{title}</h4>
                <span className="w-1 h-24 bg-neutral-40 d-none d-sm-block"></span>
                <span className="text-neutral-400 text-14 d-none d-sm-block">
                  Viewing Secure Portal
                </span>
              </div>
              <div className="d-flex align-items-center gap-16">
                <div className="d-sm-flex d-none flex-column align-items-end">
                  <span className="text-14 fw-bold text-neutral-700">
                    Need Help?
                  </span>
                  <a href="tel:07398071934" className="text-main-600 text-12">
                    07398 071934
                  </a>
                </div>
                <div className="w-48 h-48 bg-main-25 border border-neutral-30 rounded-circle flex-center text-main-600 text-2xl">
                  <i className="ph ph-headphones"></i>
                </div>
              </div>
            </div>
          </header>

          <main className="p-32">{children}</main>
        </div>
      </div>
    </div>
  );
}
