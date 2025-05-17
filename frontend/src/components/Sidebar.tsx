import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCalendar, FiBook, FiFileText, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import logo from '@/assets/logo.png';
import useAuthStore from '@/hooks/useAuthStore';

interface NavItem {
    path: string;
    icon: React.ReactNode;
    label: string;
}

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const location = useLocation();
    const clearAuth = useAuthStore(state => state.clearAuth);

    const navItems: NavItem[] = [
        { path: '/work', icon: <FiHome />, label: 'דף הבית' },
        { path: '/schedule', icon: <FiCalendar />, label: 'לוח זמנים' },
        { path: '/courses', icon: <FiBook />, label: 'קורסים' },
        { path: '/assignments', icon: <FiFileText />, label: 'מטלות' },
        { path: '/students', icon: <FiUsers />, label: 'סטודנטים' },
        { path: '/settings', icon: <FiSettings />, label: 'הגדרות' },
    ];

    const handleLogout = () => {
        clearAuth();
        window.location.href = '/login';
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <img src={logo} alt="Uniway Logo" className="logo" />
                {!isCollapsed && <h1>Uniway</h1>}
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        {!isCollapsed && <span className="label">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-button">
                    <span className="icon"><FiLogOut /></span>
                    {!isCollapsed && <span className="label">התנתק</span>}
                </button>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="collapse-button"
                    aria-label={isCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar; 