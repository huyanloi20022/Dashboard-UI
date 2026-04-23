import { NavLink } from "react-router-dom";
import { Icon, Button, IconButton } from "./ui";
import { navigationItems } from "../data/navigation";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {

  return (
    <aside
      className={`h-screen scrollbar-hide border-r fixed left-0 top-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm flex flex-col pt-4 pb-6 font-['Inter'] text-[13px] xl:text-sm antialiased z-50 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      <div className="px-6 mb-4 xl:mb-8 flex items-center gap-3 relative group">
        <div className="w-7 h-7 xl:w-8 xl:h-8 flex-shrink-0 bg-purple-600 rounded-lg flex items-center justify-center text-white">
          <Icon name="dataset" size="lg" className="scale-90 xl:scale-100" filled />
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
        >
          <h1 className="text-xl xl:text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
            Nexus
          </h1>
          <p className="text-[9px] xl:text-[10px] uppercase tracking-wider text-gray-400 font-bold">
            Enterprise Analytics
          </p>
        </div>
        <Button
          onClick={onToggle}
          variant="secondary"
          size="sm"
          className={`absolute border-2 border-purple-600 dark:border-purple-400 -right-4 top-2 xl:top-2 w-7 h-7 rounded-full outline-none flex items-center justify-center shadow-xl transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""
            }`}
        >
          <Icon name="double_arrow" size="xxs" />
        </Button>
      </div>

      <nav className="flex-1 space-y-0.5 xl:space-y-1 overflow-y-auto scrollbar-hide">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-6 py-2 xl:py-3 transition-all active:scale-95 duration-150 ease-in-out whitespace-nowrap border-r-4 ${isActive
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-semibold border-purple-600"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} filled={isActive} />
                </div>
                <span
                  className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0 invisible" : "opacity-100"
                    }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-6 py-2 xl:py-4 space-y-2 xl:space-y-4">
        {!isCollapsed && (
          <div className="p-3 xl:p-4 rounded-xl bg-purple-600 text-white text-center whitespace-nowrap overflow-hidden transition-all duration-300">
            <p className="text-[10px] xl:text-xs font-medium mb-1 xl:mb-2">Grow your business</p>
            <Button variant="secondary" size="sm" fullWidth className="text-[10px] xl:text-xs">
              Upgrade Plan
            </Button>
          </div>
        )}

        {isCollapsed && (
          <div className="flex justify-center -ml-1 py-2">
            <IconButton
              variant="primary"
              icon={<Icon name="rocket_launch" size="sm" />}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
