import React from "react";
import Icon from "./Icon";
import { useLocation, Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = (
    <Icon name="chevron_right" size="xs" className="text-black" />
  ),
}) => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  const generatedItems: BreadcrumbItem[] = items || (() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: "Home", href: "/", icon: "home" }
    ];

    pathnames.forEach((name, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      breadcrumbItems.push({
        label: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " "),
        href: isLast ? undefined : href,
        active: isLast,
      });
    });

    return breadcrumbItems;
  })();


  const renderItemContent = (item: BreadcrumbItem) => (
    <span className="flex items-center gap-1.5">
      {item.icon && <Icon name={item.icon} size="xs" filled={item.active} />}
      <span>{item.label}</span>
    </span>
  );

  return (
    <nav className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-500 font-bold py-4">
      {generatedItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-300 flex items-center">{separator}</span>}
          {item.href && !item.active ? (
            <Link
              to={item.href}
              className="hover:text-purple-600 transition-all cursor-pointer outline-none flex items-center"
            >
              {renderItemContent(item)}
            </Link>
          ) : (
            <span className={`flex items-center ${item.active ? "text-purple-600" : ""}`}>
              {renderItemContent(item)}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
