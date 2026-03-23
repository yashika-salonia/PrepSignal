// Top navigation bar

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-display font-600 transition-colors duration-200 px-3 py-1.5 rounded-lg ${
      isActive
        ? "text-signal-400 bg-signal-500/10"
        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="PrepSignal Logo"
            className="w-10 h-10 rounded-xl object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-display font-900 text-white text-2xl tracking-tight">
            Prep<span className="text-signal-400">Signal</span>
          </span>
        </Link>

        {/* Nav links + actions */}
        {isAuthenticated ? (
          <div className="flex items-center gap-1 sm:gap-2">
            <nav className="hidden sm:flex items-center gap-1">
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/log" className={navLinkClass}>
                Log Problem
              </NavLink>
              <NavLink to="/attempts" className={navLinkClass}>
                History
              </NavLink>
            </nav>

            {/* Mobile nav */}
            <nav className="flex sm:hidden items-center gap-1">
              <NavLink to="/dashboard" className={navLinkClass}>
                📊
              </NavLink>
              <NavLink to="/log" className={navLinkClass}>
                ➕
              </NavLink>
              <NavLink to="/attempts" className={navLinkClass}>
                📋
              </NavLink>
            </nav>

            <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block" />

            {/* User menu */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-xs text-slate-500 font-body">
                {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="btn-ghost text-sm py-1.5 px-3"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm py-2 px-4">
              Login
            </Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-4">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
