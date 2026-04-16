import React from "react";
import Icon from "./Icon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = (
    <Icon name="chevron_right" size="md" />
  ),
}) => {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-300 flex items-center">{separator}</span>}
          {item.href && !item.active ? (
            <a
              href={item.href}
              className="hover:text-black transition-colors cursor-pointer outline-none"
            >
              {item.label}
            </a>
          ) : (
            <span className={item.active ? "text-purple-600 font-semibold cursor-pointer" : ""}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
