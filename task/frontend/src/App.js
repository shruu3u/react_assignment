import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Reports from "./pages/reports";
import Graphs from "./pages/graphs";
import Settings from "./pages/settings";

import "./App.css";

// Company logo in assets
import logo from "./assets/logo.png";

// Navigation icons
import homeIcon from "./assets/icons/home.svg";
import homeActive from "./assets/icons/home_active.svg";

import settingsIcon from "./assets/icons/settings.svg";
import settingsActive from "./assets/icons/settings_active.svg";

import graphsIcon from "./assets/icons/graphs.svg";
import graphsActive from "./assets/icons/graphs_active.svg";

import reportsIcon from "./assets/icons/reports.svg";
import reportsActive from "./assets/icons/reports_active.svg";

// Sidebar
function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", defaultIcon: homeIcon, activeIcon: homeActive },
    { path: "/graphs", label: "Graphs", defaultIcon: graphsIcon, activeIcon: graphsActive },
    { path: "/reports", label: "Reports", defaultIcon: reportsIcon, activeIcon: reportsActive },
    { path: "/settings", label: "Settings", defaultIcon: settingsIcon, activeIcon: settingsActive },
  ];

  return (
    <aside className="sidebar">
      {/* logo box*/}
      <div className="logo-box">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>

      {/* navigation menu */}
      <ul className="nav-menu">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <li
              key={item.path}
              className={`nav-item ${isActive ? "nav-item-active" : ""}`}
            >
              <Link to={item.path} className="nav-link">
                <span className="nav-icon">
                  <img
                    src={isActive ? item.activeIcon : item.defaultIcon}
                    alt={item.label}
                    className="icon-img"
                  />
                </span>
                <span className="nav-label">{item.label}</span> 
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

//Main app
function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
