import { createContext, useEffect, useState } from 'react';

const THREE_THOUSAND_MILLISECONDS = 3000;

const NotificationContext = createContext({
    notification: null,
    showNotification: function (notificationData) { },
    hideNotification: function () { }
});

export function NotificationContextProvider({ children }) {
    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        if (activeNotification &&
            ['success', 'error'].includes(activeNotification.status)) {
                const timer = setTimeout(() => hideNotificationHandler(), THREE_THOUSAND_MILLISECONDS);
        
                return () => clearTimeout(timer);
            }
    }, [activeNotification]);

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData);
    };
    const hideNotificationHandler = () => {
        setActiveNotification(null);
    };

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    };

    return (
        <NotificationContext.Provider value={context}>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;
