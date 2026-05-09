import { Outlet } from "react-router-dom";
import DocumentationLayout from "@/components/DocumentationLayout";

const Layout = () => {
    return (
        <DocumentationLayout>
            <Outlet />
        </DocumentationLayout>
    );
};

export default Layout;