import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBox,
  FaTags,
  FaShoppingCart,
  FaChartLine,
  FaSignOutAlt,
  FaCog,
  FaBars,
  FaTimes,
  FaPlus,
  FaList,
} from "react-icons/fa";

const Sidebar = ({ topOffset = 64 }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button className="sb-mobile-toggle" onClick={() => setSidebarOpen(true)}>
        <FaBars />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sb-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sb-aside ${sidebarOpen ? "open" : ""}`}>
        <button className="sb-close-btn" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </button>

        <div className="sb-brand">MyShop Admin</div>

        <div className="sb-section">
          <button
            className="sb-profile"
            onClick={() => setProfileOpen((v) => !v)}
          >
            <FaUserCircle size={24} /> <span>Admin</span>
          </button>
          {profileOpen && (
            <div className="sb-dropdown">
              <button className="sb-dropitem">
                <FaCog /> <span>Settings</span>
              </button>
              <button className="sb-dropitem danger">
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        <nav className="sb-nav">
          <Link className="sb-link" to="/dashboard" onClick={() => setSidebarOpen(false)}>
            <FaChartLine /> Dashboard
          </Link>

          <div
            className={`sb-collapsible ${productOpen ? "open" : ""}`}
            onClick={() => setProductOpen((v) => !v)}
          >
            <div className="sb-link sb-parent">
              <FaBox /> Products
            </div>
            {productOpen && (
              <div className="sb-submenu">
                <Link className="sb-sublink" to="/add/products" onClick={() => setSidebarOpen(false)}>
                  <FaPlus /> Add Product
                </Link>
                <Link className="sb-sublink" to="/products-list" onClick={() => setSidebarOpen(false)}>
                  <FaList /> All Products
                </Link>
              </div>
            )}
          </div>

          <Link className="sb-link" to="/categories" onClick={() => setSidebarOpen(false)}>
            <FaTags /> Categories
          </Link>
          <Link className="sb-link" to="/orders" onClick={() => setSidebarOpen(false)}>
            <FaShoppingCart /> Orders
          </Link>
        </nav>
      </aside>

      <style>{`
        :root {
          --sb-w: 260px;
          --sb-bg: #fff;
          --sb-border: #e5e7eb;
          --sb-text: #1f2937;
          --sb-hover: #f3f4f6;
          --sb-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }
        .sb-mobile-toggle {
          position: fixed; left: 16px; top: calc(${topOffset}px + 10px);
          z-index: 100; font-size: 22px; background: #fff;
          border: 1px solid var(--sb-border); border-radius: 10px;
          padding: 10px 12px; box-shadow: var(--sb-shadow); cursor: pointer;
        }
        @media(min-width: 992px) { .sb-mobile-toggle { display: none; } }
        .sb-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.45);
          z-index: 90;
        }
        .sb-aside {
          position: fixed; left: 0; top: ${topOffset}px; width: var(--sb-w);
          height: calc(100vh - ${topOffset}px); background: var(--sb-bg);
          border-right: 1px solid var(--sb-border); box-shadow: var(--sb-shadow);
          display: flex; flex-direction: column; z-index: 100;
          transform: translateX(-100%); transition: transform 0.3s ease;
          overflow-y: auto;
        }
        .sb-aside.open { transform: translateX(0); }
        @media(min-width: 992px) { .sb-aside { transform: translateX(0); } }
        .sb-close-btn { margin-left: auto; margin-right: 8px; margin-top: 8px;
          background: transparent; border: none; font-size: 20px; cursor: pointer;
        }
        @media(min-width: 992px) { .sb-close-btn { display: none; } }
        .sb-brand { font-weight: 700; text-align: center; padding: 18px 16px; border-bottom: 1px solid var(--sb-border); font-size: 18px; }
        .sb-section { padding: 14px 16px; border-bottom: 1px solid var(--sb-border); }
        .sb-profile { display: flex; align-items: center; gap: 10px; background: transparent; border: none; color: var(--sb-text); font-weight: 600; cursor: pointer; }
        .sb-dropdown { margin-top: 10px; background: #fff; border: 1px solid var(--sb-border); border-radius: 10px; box-shadow: var(--sb-shadow); }
        .sb-dropitem { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none; background: transparent; cursor: pointer; }
        .sb-dropitem:hover { background: var(--sb-hover); } .sb-dropitem.danger { color: #ef4444; }
        .sb-nav { padding: 12px; } .sb-link { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; color: var(--sb-text); text-decoration: none; font-weight: 500; cursor: pointer; }
        .sb-link:hover { background: var(--sb-hover); } .sb-submenu { margin-left: 36px; margin-top: 4px; display: flex; flex-direction: column; gap: 6px; }
        .sb-sublink { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; font-size: 14px; color: var(--sb-text); text-decoration: none; }
        .sb-sublink:hover { background: var(--sb-hover); }
      `}</style>
    </>
  );
};

export default Sidebar;
