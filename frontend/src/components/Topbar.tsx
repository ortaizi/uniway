import React, { useState } from 'react';
import { FiBell, FiMail, FiLink, FiMessageSquare } from 'react-icons/fi';
import UserPopup from '@/components/UserPopup';
import MailDropdown from '@/components/MailDropdown';
import LinksDropdown from '@/components/LinksDropdown';
import FeedbackDropdown from '@/components/FeedbackDropdown';

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
}

const Topbar: React.FC = () => {
    const [showUserPopup, setShowUserPopup] = useState<boolean>(false);
    const [showMailDropdown, setShowMailDropdown] = useState<boolean>(false);
    const [showLinksDropdown, setShowLinksDropdown] = useState<boolean>(false);
    const [showFeedbackDropdown, setShowFeedbackDropdown] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: 'מטלה חדשה',
            message: 'נפתחה מטלה חדשה בקורס מבוא למדעי המחשב',
            time: 'לפני 5 דקות',
            isRead: false
        },
        {
            id: 2,
            title: 'תזכורת',
            message: 'יש לך מבחן מחר בקורס אלגברה לינארית',
            time: 'לפני שעה',
            isRead: false
        }
    ]);

    const handleNotificationClick = (id: number) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        ));
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="topbar">
            <div className="topbar-left">
                <h1>Uniway</h1>
            </div>

            <div className="topbar-right">
                <div className="notification-icon">
                    <FiBell />
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                    <div className="notification-dropdown">
                        {notifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.isRead ? 'read' : ''}`}
                                onClick={() => handleNotificationClick(notification.id)}
                            >
                                <h4>{notification.title}</h4>
                                <p>{notification.message}</p>
                                <span className="time">{notification.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="icon-button" onClick={() => setShowMailDropdown(!showMailDropdown)}>
                    <FiMail />
                    {showMailDropdown && <MailDropdown />}
                </div>

                <div className="icon-button" onClick={() => setShowLinksDropdown(!showLinksDropdown)}>
                    <FiLink />
                    {showLinksDropdown && <LinksDropdown />}
                </div>

                <div className="icon-button" onClick={() => setShowFeedbackDropdown(!showFeedbackDropdown)}>
                    <FiMessageSquare />
                    {showFeedbackDropdown && <FeedbackDropdown />}
                </div>

                <div className="user-profile" onClick={() => setShowUserPopup(!showUserPopup)}>
                    <img src="/default-avatar.png" alt="User Profile" />
                    {showUserPopup && <UserPopup />}
                </div>
            </div>
        </div>
    );
};

export default Topbar; 