import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  ChevronLeft,
  ChevronRight,
  Building2,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";

const TeacherSidebar = ({
    collapsed,
    setCollapsed,
    sidebarItems,
    mobileOpen,
    setMobileOpen,
    activeItem,
    setActiveItem
}) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:static z-50 top-0 left-0 h-full
        ${collapsed ? 'w-30 ': "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        bg-white border-r border-gray-200
        flex flex-col
        transition-all duration-300
      `}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>

          {!collapsed && (
            <div>
              <h2 className="font-bold text-gray-800 text-sm">EduManage</h2>
              <p className="text-xs text-gray-500">School Portal</p>
            </div>
          )}

          {/* Desktop Collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-gray-500 hover:text-gray-800 hidden lg:block"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-gray-500 hover:text-gray-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          
          {sidebarItems.map((item) => {
  const isActive = activeItem === item.label;

  return (
    <button
      key={item.label}
      onClick={() => {
        setActiveItem(item.label);
        setMobileOpen(false);
        
      }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      <item.icon className="w-5 h-5" />
      {!collapsed && <span>{item.label}</span>}
    </button>
  );
})}
        </nav>

        {/* Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">DSJ</span>
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Dr. Sarah Johnson
                </p>
                <p className="text-xs text-gray-500">Teacher</p>
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mt-4">
            <LogOut size={16} />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;