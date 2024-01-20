import MainHeader from "./main-header";

const Layout = ({ children }) => (
    <>
        <MainHeader />
        <main>{children}</main>
    </>
);

export default Layout;
