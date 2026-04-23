import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Breadcrumb } from "../ui";
import { routeConfig } from "../../data/navigation";
import { useScrollToTop } from "../../hooks/useScrollToTop";


const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    useScrollToTop();

    const handleToggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const currentTitle = routeConfig[location.pathname];

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
            <Sidebar isCollapsed={isCollapsed} onToggle={handleToggleSidebar} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <Header />
                <div className="flex-1 overflow-auto antialiased text-gray-900 font-['Inter']">
                    {currentTitle && (
                        <div className="pt-4 px-8 flex flex-col gap-2">
                            <Breadcrumb />
                        </div>
                    )}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;