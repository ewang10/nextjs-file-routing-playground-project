import { useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";

const Layout = ({ children }) => {
    const notificationContext = useContext(NotificationContext);
    const activeNotification = notificationContext.notification;

    return (
        <>
            <MainHeader />
            <main>{children}</main>
            {
                activeNotification && (
                    <Notification
                        title={activeNotification.title}
                        message={activeNotification.message}
                        status={activeNotification.status}
                    />
                )
            }
        </>
    );
};

export default Layout;
