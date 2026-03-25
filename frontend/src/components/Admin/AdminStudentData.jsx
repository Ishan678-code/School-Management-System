// AdminSidebar.jsx - Refactored to use unified UI tokens and components
import { memo, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Building2, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton } from '../ui'; 

const AdminSidebar = ({
    collapsed,
    setCollapsed,
    sidebarItems,
    mobileOpen,
    setMobileOpen,
    activeItem,
    setActiveItem
}) => {
  const navigate = useNavigate();
  
  const closeMobile = useCallback(() => setMobileOpen(false), [setMobileOpen]);
  
  const toggleCollapsed = useCallback(
    () => setCollapsed((prev) => !prev),
    [setCollapsed]
  );

  const handleLogout = useCallback(() => navigate("/login"), [navigate]);

  const handleItemClick = useCallback(
    (label) => {
      setActiveItem(label);
      setMobileOpen(false);
    },
    [setActiveItem, setMobileOpen]
  );

  // Dynamic Class logic for the sidebar container
  const asideClassName = useMemo(
    () => `
        fixed lg:static z-50 top-0 left-0 h-full
        ${collapsed ? "w-24" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        bg-white border-r border-slate-100
        flex flex-col
        transition-all duration-300 ease-in-out
      `,
    [collapsed, mobileOpen]
  );

  return (
    <>
      {/* Mobile Overlay - Consistent with Settings/Reports modals */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={closeMobile}
        />
      )}

      <aside className={asideClassName}>
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-50">
          <div className="min-w-[40px] h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
            <Building2 className="w-5 h-5 text-white" />
          </div>

          {!collapsed && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <h2 className="font-bold text-slate-800 text-sm tracking-tight">EduManage</h2>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Admin</p>
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleCollapsed}
            className="ml-auto text-slate-400 hover:text-blue-600 transition-colors hidden lg:block"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile Close Button */}
          <button onClick={closeMobile} className="ml-auto text-slate-400 lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Navigation - Standardized with Card-style hover states */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                onClick={() => handleItemClick(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                {!collapsed && (
                  <span className="animate-in fade-in duration-300">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile Section - Integrated with Shared Avatar Logic */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/30">
          <div className="flex items-center gap-3 px-2">
            <Avatar 
                initials="DSJ" 
                variant="blue" 
                className="w-9 h-9 border-2 border-white shadow-sm"
            />

            {!collapsed && (
              <div className="animate-in fade-in duration-300">
                <p className="text-sm font-bold text-slate-800 leading-tight">
                  Dr. Sarah Johnson
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">School Principal</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all mt-4"
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default memo(AdminSidebar);