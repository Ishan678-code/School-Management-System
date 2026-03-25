import { useState, useMemo, useCallback } from "react";
import { Search, Bell, Menu } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTeacherData from "../components/Admin/AdminTeacherData";
import AdminStudentData from "../components/Admin/AdminStudentData";
import AdminClassData from "../components/Admin/AdminClassData";
import AdminFeesData from "../components/Admin/AdminFeesData";
import AdminAttendanceData from "../components/Admin/AdminAttendanceData";
import AdminEventData from "../components/Admin/AdminEventData";
import AdminAnnouncementData from "../components/Admin/AdminAnnouncementData";
import AdminReportData from "../components/Admin/AdminReportData";
import AdminSettingsData from "../components/Admin/AdminSettingsData";
import AdminTimetableData from "../components/Admin/AdminTimetableData";
import AdminResultData from "../components/Admin/AdminResultData";

import { LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardCheck, Clock, CalendarDays, Megaphone, BarChart3, Settings, UserPlus, CheckCircle2, ReceiptText, Building2, ChartBar } from "lucide-react";

// Inline dashboard data (moved from dashboardData.js)
const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Teachers" },
  { icon: GraduationCap, label: "Students" },
  { icon: Building2, label: "Classes" },
  { icon: ReceiptText, label: "Fees" },
  { icon: ClipboardCheck, label: "Attendance" },
  { icon: Clock, label: "Timetable" },
  { icon: ChartBar, label: "Results" },
  { icon: CalendarDays, label: "Events" },
  { icon: Megaphone, label: "Announcements" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const statsCards = [
  {
    title: "Total Students",
    value: "1,234",
    sub: "Active enrollments",
    change: "+12%",
    changeLabel: "from last month",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Total Teachers",
    value: "89",
    sub: "Across all departments",
    change: "+5%",
    changeLabel: "from last month",
    icon: Users,
    color: "bg-cyan-100 text-cyan-600"
  },
  {
    title: "Active Classes",
    value: "45",
    sub: "12 sections",
    change: null,
    changeLabel: null,
    icon: BookOpen,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Today's Attendance",
    value: "92%",
    sub: "1,135 students present",
    change: "+3%",
    changeLabel: "from last month",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-600"
  },
];

const chartData = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 90 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 70 },
  { day: "Sun", value: 95 },
];

const activities = [
  {
    icon: UserPlus,
    title: "New student enrolled",
    desc: "Emma Watson joined Class 10A",
    time: "5 minutes ago",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: ClipboardCheck,
    title: "Attendance marked",
    desc: "Class 8B attendance completed",
    time: "15 minutes ago",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Megaphone,
    title: "New announcement",
    desc: "Annual sports day schedule published",
    time: "1 hour ago",
    color: "bg-orange-100 text-orange-600"
  },
];

const NOTIFICATIONS = [
  { id: 1, title: "New Admission", desc: "Siddharth added to Class 10A", time: "2 mins ago", unread: true },
  { id: 2, title: "Fee Payment", desc: "Monthly fee received from Roll #22", time: "1 hour ago", unread: true },
  { id: 3, title: "Exam Results", desc: "Board exams result are now available", time: "5 hours ago", unread: true },
];

const HeaderActions = ({
  activeItem,
  dateInfo,
  showNotifications,
  notifications,
  onToggleNotifications,
  onCloseNotifications,
  placeholder = "Search...",
}) => (
  <div className="flex flex-1 items-center justify-between">
    <div className="hidden md:block">
      <h1 className="text-xl font-bold text-slate-800">{activeItem}</h1>
      <p className="text-xs text-gray-500">
        {activeItem === "Dashboard" ? "School overview and analytics" : `Manage ${activeItem.toLowerCase()}`}
      </p>
    </div>

    <div className="flex items-center gap-6 ml-auto">
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 w-48 lg:w-64 rounded-xl border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={onToggleNotifications}
            className={`relative p-2 rounded-xl transition-all ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Bell className="w-5 h-5" />
            {notifications.some(n => n.unread) && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={onCloseNotifications} />
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex gap-3 transition-colors ${n.unread ? 'bg-blue-50/20' : ''}`}>
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800 leading-tight">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{n.desc}</p>
                        <p className="text-[10px] text-slate-400 mt-2">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-end min-w-max">
          <p className="text-xs font-bold text-slate-700 leading-none">{dateInfo.day}</p>
          <p className="text-[10px] text-gray-400 mt-1 leading-none">{dateInfo.fullDate}</p>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const dateInfo = useMemo(() => {
    const now = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    return {
      day: now.toLocaleDateString("en-US", { weekday: "long" }),
      fullDate: now.toLocaleDateString("en-US", options),
    };
  }, []);
  
  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = NOTIFICATIONS;

  const toggleNotifications = useCallback(
    () => setShowNotifications((prev) => !prev),
    []
  );
  const closeNotifications = useCallback(
    () => setShowNotifications(false),
    []
  );

  const renderHeaderContent = useMemo(() => {
    switch (activeItem) {
      case "Teachers": return "Search teachers...";
      case "Students": return "Search students...";
      case "Dashboard":
      default: return "Search everything...";
    }
  }, [activeItem]);

  const renderContent = useMemo(() => {
    switch (activeItem) {
      case "Teachers": return <AdminTeacherData />;
      case "Students": return <AdminStudentData />;
      case "Classes": return <AdminClassData />;
      case "Fees": return <AdminFeesData />;
      case "Attendance": return <AdminAttendanceData />;
      case "Timetable": return <AdminTimetableData />;
      case "Events": return <AdminEventData />;
      case "Announcements": return <AdminAnnouncementData />;
      case "Results": return <AdminResultData />;
      case "Reports": return <AdminReportData />;
      case "Settings": return <AdminSettingsData />;
      case "Dashboard":
      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {statsCards.map((card) => (
                <div key={card.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{card.sub}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
              <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-6 text-slate-800">Weekly Attendance Overview</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorView)" />
                    <defs>
                      <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-6 text-slate-800">Recent Activity</h3>
                <div className="space-y-5">
                  {activities.map((a, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center ${a.color}`}>
                        <a.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800 leading-none">{a.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{a.desc}</p>
                      </div>
                      <span className="text-[10px] font-medium text-gray-400">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  }, [activeItem]);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        sidebarItems={sidebarItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center h-20 shadow-sm z-10">
          <button
            className="lg:hidden text-gray-600 mr-4 p-2 hover:bg-slate-100 rounded-lg"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
          <HeaderActions
            activeItem={activeItem}
            dateInfo={dateInfo}
            showNotifications={showNotifications}
            notifications={notifications}
            onToggleNotifications={toggleNotifications}
            onCloseNotifications={closeNotifications}
            placeholder={renderHeaderContent}
          />
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-[1400px] mx-auto">{renderContent}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
