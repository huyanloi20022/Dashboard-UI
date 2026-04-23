export interface NavItem {
    icon: string;
    label: string;
    name: string;
    path: string;
}

export const navigationItems: NavItem[] = [
    { icon: "grid_view", label: "Overview", name: "overview", path: "/" },
    { icon: "payment", label: "Payment", name: "payment", path: "/payment" },
    { icon: "group", label: "Customers", name: "customers", path: "/customers" },
    { icon: "inventory_2", label: "Product", name: "products", path: "/products" },
    { icon: "receipt_long", label: "Invoice", name: "invoice", path: "/invoice" },
    { icon: "chat", label: "Messages", name: "messages", path: "/messages" },
    { icon: "robot_2", label: "Automation", name: "automation", path: "/automation" },
];

export const routeConfig = navigationItems.reduce((acc, item) => {
    acc[item.path] = item.label;
    return acc;
}, {} as Record<string, string>);
