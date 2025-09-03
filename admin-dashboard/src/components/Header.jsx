import React, { useState, useEffect } from "react";
import { FaUserCircle, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Header = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle dark/light mode on body
  useEffect(() => {
    document.body.style.background = darkMode ? "#1f2937" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  // 🔹 Logout handler
  const handleLogout = () => {
    logout(); // clear token & admin
    toast.success("Logout successful!", { position: "top-right" });
    navigate("/admin-login");
  };

  return (
    <header className={`header ${darkMode ? "header-dark" : "header-light"}`}>
      <h2 className="logo">AdminPanel</h2>

      {!isMobile && (
        <div className="desktop-menu">
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <div
            className="user-section"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <FaUserCircle size={35} color={darkMode ? "#fff" : "#333"} />
            <div className="user-info">
              <span>Rinku Verma</span>
              <span>rinkusing@gmail.com</span>
            </div>

            {menuOpen && (
              <div className={`dropdown ${darkMode ? "dropdown-dark" : "dropdown-light"}`}>
                <ul>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li className="danger" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {isMobile && (
        <div className="mobile-toggle">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      )}

      {mobileMenu && isMobile && (
        <div className={`mobile-menu ${darkMode ? "mobile-dark" : "mobile-light"}`}>
          <div className="user-info-mobile">
            <FaUserCircle size={35} color={darkMode ? "#fff" : "#333"} />
            <div>
              <span>Rinku Verma</span>
              <span>rinkusing@gmail.com</span>
            </div>
          </div>
          <hr />
          <button className="mobile-dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li className="danger" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}

      <style>{`
        .header {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          transition: background 0.3s, color 0.3s;
        }
        .header-light { background: #fff; color: #000; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .header-dark { background: #1f2937; color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.4); }

        .logo { font-weight: 600; font-size: 20px; }

        .desktop-menu { display: flex; align-items: center; gap: 20px; position: relative; }
        .toggle-btn { border: none; background: transparent; cursor: pointer; font-size: 20px; color: inherit; }

        .user-section { display: flex; align-items: center; gap: 10px; cursor: pointer; position: relative; }
        .user-info { display: flex; flex-direction: column; line-height: 1.2; font-size: 12px; color: inherit; }
        .user-info span:first-child { font-weight: 600; font-size: 14px; }

        .dropdown { position: absolute; top: 60px; right: 0; border-radius: 8px; width: 180px; transition: background 0.3s, color 0.3s; }
        .dropdown-light { background: #fff; color: #000; border: 1px solid #ccc; }
        .dropdown-dark { background: #374151; color: #fff; border: 1px solid #555; }
        .dropdown ul { list-style: none; margin: 0; padding: 8px 0; }
        .dropdown li { padding: 10px 15px; cursor: pointer; }
        .dropdown li.danger { color: #ef4444; }

        .mobile-toggle { display: flex; }
        .mobile-toggle button { border: none; background: transparent; font-size: 24px; cursor: pointer; color: inherit; }

        .mobile-menu {
          position: absolute;
          top: 80px;
          right: 0;
          width: 220px;
          border-radius: 8px;
          padding: 15px;
          z-index: 150;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          transition: background 0.3s, color 0.3s;
        }
        .mobile-light { background: #fff; color: #000; }
        .mobile-dark { background: #374151; color: #fff; }
        .mobile-dark hr { border-color: #555; }
        .user-info-mobile div span:first-child { font-weight: 600; font-size: 14px; }
        .user-info-mobile div span:last-child { font-size: 12px; }
        .mobile-menu ul { list-style: none; margin: 15px 0 0; padding: 0; }
        .mobile-menu li { padding: 8px 0; cursor: pointer; }
        .mobile-menu li.danger { color: #ef4444; }

        hr { border: 1px solid #ddd; }

        @media (max-width: 768px) {
          .desktop-menu { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
