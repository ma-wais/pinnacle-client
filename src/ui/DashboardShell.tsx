import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  House,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import "./DashboardShell.css";

function SideLink({
  to,
  label,
  icon,
  collapsed,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
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
        <span className="d-flex text-xl">{icon}</span>
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSidebarCollapsed = () => setIsSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    const ensureStyle = (id: string, href: string) => {
      let link = document.getElementById(id) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
      return link;
    };

    const bootstrapLink = ensureStyle(
      "pm-dashboard-bootstrap-css",
      "/eduall/assets/css/bootstrap.min.css",
    );
    const mainLink = ensureStyle(
      "pm-dashboard-main-css",
      "/eduall/assets/css/main.css",
    );

    return () => {
      bootstrapLink?.remove();
      mainLink?.remove();
    };
  }, []);

  return (
    <div
      className={`dashbord-layout pm-dashboard-layout ${isSidebarCollapsed ? "pm-sidebar-collapsed" : "pm-sidebar-expanded"} bg-main-25 min-vh-100 ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* Mobile Sidebar Overlay */}
      <div
        className={`pm-sidebar-overlay d-lg-none ${isSidebarOpen ? "d-block" : "d-none"}`}
        onClick={toggleSidebar}
      ></div>

      <div className="d-flex">
        <aside
          className={`dashboard-sidebar pm-dashboard-sidebar px-20 py-32 bg-white border-end border-neutral-40 h-100 z-10 transition-1 ${isSidebarOpen ? "active" : ""}`}
        >
          <div
            className={`flex-between ${isSidebarCollapsed ? "ps-0 pe-0" : "ps-24 pe-16"}`}
          >
            <Link to="/" className="d-block">
              <img
                src="/eduall/assets/images/logo/logo.png"
                alt="Pinnacle Metals"
                className={`pm-sidebar-logo ${isSidebarCollapsed ? "collapsed" : ""}`}
              />
            </Link>
            <div className="d-flex align-items-center gap-8">
              <button
                onClick={toggleSidebar}
                className="d-lg-none text-neutral-400"
              >
                <X size={30} />
              </button>
            </div>
          </div>

          <div className="sidebar-menu mt-12">
            {!isSidebarCollapsed && (
              <span className="text-neutral-400 text-12 text-uppercase fw-bold d-block ps-24 tracking-wider">
                Main Menu
              </span>
            )}
            <ul className="pm-sidebar-list mt-16">
              {user?.role !== "admin" && (
                <SideLink
                  to="/dashboard"
                  label="Dashboard"
                  icon={<LayoutDashboard size={18} />}
                  collapsed={isSidebarCollapsed}
                />
              )}
              {user?.role === "admin" && (
                <>
                  <SideLink
                    to="/admin"
                    label="Admin Dashboard"
                    icon={<BarChart3 size={18} />}
                    collapsed={isSidebarCollapsed}
                  />
                  <SideLink
                    to="/admin/users"
                    label="User Management"
                    icon={<Users size={18} />}
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
            <ul className="pm-sidebar-list m-0">
              <SideLink
                to="/settings"
                label="Account Settings"
                icon={<Settings size={18} />}
                collapsed={isSidebarCollapsed}
              />
              <li>
                <Link
                  to={"/"}
                  className={`fw-medium d-flex align-items-center text-14 gap-12 ${isSidebarCollapsed ? "px-16 justify-content-center" : "px-24"} py-12 text-neutral-500 hover-bg-main-600 hover-text-white rounded-12 transition-1`}
                  title={isSidebarCollapsed ? "Back to Website" : undefined}
                >
                  <span className="d-flex text-xl">
                    <House size={18} />
                  </span>
                  {!isSidebarCollapsed && "Back to Website"}
                </Link>
              </li>
              <li className="mt-8">
                <button
                  type="button"
                  onClick={logout}
                  className={` d-flex align-items-center text-14 gap-12 ${isSidebarCollapsed ? "px-16 justify-content-center" : "px-24"} py-12 text-neutral-500 hover-bg-danger-600 hover-text-white rounded-12 transition-1 bg-transparent border-0 w-100 text-start`}
                  title={isSidebarCollapsed ? "Logout" : undefined}
                >
                  <span className="d-flex text-xl">
                    <LogOut size={18} />
                  </span>
                  {!isSidebarCollapsed && "Logout"}
                </button>
              </li>
            </ul>
          </div>

          <div
            className={`position-absolute bottom-0 start-0 w-100 ${isSidebarCollapsed ? "p-12" : "p-24"}`}
          >
            {/* link back to profile page */}
            <div className="bg-main-25 rounded-16 p-8 border border-neutral-30">
              <a
                href="/settings"
                className="d-flex align-items-center gap-12 text-neutral-700 text-decoration-none"
              >
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
              </a>
            </div>
          </div>
        </aside>

        <div className="dashbord-main pm-dashboard-main flex-grow-1">
          <header className="bg-white border-bottom border-neutral-40 px-32 py-20 sticky-top">
            <div className="d-flex align-items-center justify-content-between gap-24">
              <div className="flex-align gap-12">
                {/* burget for small screens and arrow for big screens */}
                <button
                  onClick={toggleSidebarCollapsed}
                  className="d-none border rounded-circle d-lg-inline-flex w-44 h-44 bg-gray-100 flex-center"
                  title={
                    isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  {isSidebarCollapsed ? (
                    <ChevronRight size={20} />
                  ) : (
                    <ChevronLeft size={20} />
                  )}
                </button>
                <button
                  onClick={toggleSidebar}
                  className="d-lg-none w-44 h-44 bg-gray-100 border rounded-circle flex-center"
                >
                  <Menu size={20} />
                </button>

                <h4 className="mb-0 text-neutral-700">{title}</h4>
              </div>
              <div className="d-flex align-items-center gap-16">
                <div className="d-sm-flex d-none flex-column align-items-end">
                  <span className="text-14 fw-bold text-neutral-700">
                    {user?.email.split("@")[0]}
                  </span>
                  <span className="text-neutral-400 text-12 text-capitalize">
                    Portal
                  </span>
                </div>
                <Link
                  to="/settings"
                  className="w-48 h-48 bg-main-50 border border-main-100 rounded-circle flex-center text-main-600 text-2xl hover-bg-main-100 transition-1"
                  title="Account Settings"
                >
                  <UserCircle size={22} />
                </Link>
                <button
                  onClick={logout}
                  className="w-44 h-44 bg-danger-50 border border-danger-100 rounded-circle flex-center text-danger-600 text-xl hover-bg-danger-100 transition-1"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </header>

          <main className="p-32">{children}</main>
        </div>
      </div>
    </div>
  );
}
