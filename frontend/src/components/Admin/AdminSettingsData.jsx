// AdminSettingsData.jsx - Admin page for managing school settings
import React from "react";
import { Save, School, Calendar, ShieldCheck, Bell, Edit2, CheckCircle } from "lucide-react";
import { Button, Input, Select, Card, StatusBadge } from '../ui';
import useSettingsForm from "../../hooks/useSettingsForm";

const SchoolForm = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">School Name</label>
        <Input defaultValue="EduManage International School" />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">School Code</label>
        <Input defaultValue="EMIS-2024" />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Full Address</label>
      <textarea
        rows={3}
        defaultValue="123 Education Lane, Academic City"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 hover:border-slate-300 focus:border-blue-500 resize-none"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone</label>
        <Input defaultValue="+977 12345678" />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Admin Email</label>
        <Input type="email" defaultValue="info@edumanage.com" />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Website</label>
        <Input type="url" defaultValue="https://www.edumanage.com" />
      </div>
    </div>
  </div>
);

const AcademicForm = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Academic Year</label>
        <Select options={["2025-26", "2026-27"]} />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Semester</label>
        <Select options={["Semester 1", "Semester 2"]} />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Year Start Date</label>
        <Input type="date" />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Year End Date</label>
        <Input type="date" />
      </div>
    </div>
  </div>
);

const RolesForm = () => {
  const roles = [
    { name: "Admin", permissions: ["Full System Access", "User Management", "Settings", "Reports"], variant: "info" },
    { name: "Teacher", permissions: ["Manage Attendance", "Enter Marks", "View Students"], variant: "success" },
    { name: "Student", permissions: ["View Attendance", "View Results", "Download Materials"], variant: "default" }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
      {roles.map((role) => (
        <Card key={role.name} className="p-5 flex flex-col gap-4 group hover:border-blue-200 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">{role.name}</h3>
                <StatusBadge status="Active" variant={role.variant} />
              </div>
              <p className="text-xs text-slate-400 mt-1">{role.permissions.length} Global Permissions</p>
            </div>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-2">
              <Edit2 className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {role.permissions.map((perm) => (
              <span key={perm} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-100 shadow-sm">
                {perm}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

const NotificationsForm = ({ notifications, toggleNotification }) => {
  const notificationsList = [
    { key: "email", title: "Email Notifications", desc: "Receive summary reports via email" },
    { key: "attendance", title: "Attendance Alerts", desc: "Notify parents automatically for absences" },
    { key: "enrollments", title: "New Enrollments", desc: "Alert admin when a new student is registered" },
    { key: "events", title: "Event Reminders", desc: "Push notifications for upcoming holidays" },
  ];

  return (
    <div className="divide-y divide-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-400">
      {notificationsList.map((item) => (
        <div key={item.key} className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
          <div>
            <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => toggleNotification(item.key)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ${notifications[item.key] ? "bg-emerald-500" : "bg-slate-200"}`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${notifications[item.key] ? "translate-x-5" : ""}`} />
          </button>
        </div>
      ))}
    </div>
  );
};

const AdminSettingsData = () => {
  const { activeTab, setActiveTab, notifications, toggleNotification, showSaved, handleSave } = useSettingsForm();

  const navItems = [
    { id: "School", icon: <School className="w-4 h-4" /> },
    { id: "Academic", icon: <Calendar className="w-4 h-4" /> },
    { id: "Roles", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "Notifications", icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all border shadow-sm ${
                activeTab === item.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-blue-100"
                  : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              {item.id}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900">{activeTab} Configuration</h1>
          <p className="text-xs text-slate-500 font-medium">Update your school's global {activeTab.toLowerCase()} preferences.</p>
        </div>
        
        <div className="p-8">
          {activeTab === "School" && <SchoolForm />}
          {activeTab === "Academic" && <AcademicForm />}
          {activeTab === "Roles" && <RolesForm />}
          {activeTab === "Notifications" && (
            <NotificationsForm notifications={notifications} toggleNotification={toggleNotification} />
          )}
        </div>

        {/* Action Bar inside Card */}
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Last modified: Today at 10:45 AM
          </p>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Toast Notification */}
      {showSaved && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold">Settings updated successfully!</span>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsData;