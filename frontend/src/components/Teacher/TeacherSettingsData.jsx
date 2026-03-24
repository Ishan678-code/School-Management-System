



import React, { useState } from "react";
import { Save, School, Calendar, ShieldCheck, Bell, Edit2 } from "lucide-react";

const TeacherSettingData = () => {

  const [activeTab, setActiveTab] = useState("School");

  const [notifications, setNotifications] = useState({
    email: true,
    attendance: false,
    enrollments: true,
    events: false,
    system: true
  });

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navItems = [
    { id: "School", name: "School", icon: <School className="w-4 h-4" />, color: "border-blue-500" },
    { id: "Academic", name: "Academic", icon: <Calendar className="w-4 h-4" />, color: "border-blue-500" },
    { id: "Roles", name: "Roles", icon: <ShieldCheck className="w-4 h-4" />, color: "border-blue-500" },
    { id: "Notifications", name: "Notifications", icon: <Bell className="w-4 h-4" />, color: "border-blue-500" },
  ];

  /* ---------------- School Form ---------------- */

  const SchoolForm = () => (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">School Name</label>
          <input
            type="text"
            defaultValue="EduManage International School"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">School Code</label>
          <input
            type="text"
            defaultValue="EMIS-2024"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Address</label>
        <textarea
          rows={2}
          defaultValue="123 Education Lane, Academic City"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone</label>
          <input
            type="text"
            defaultValue="+977 12345678"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            defaultValue="info@edumanage.com"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Website</label>
          <input
            type="url"
            defaultValue="https://www.edumanage.com"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          />
        </div>

      </div>

    </div>
  );

  /* ---------------- Academic Form ---------------- */

  const AcademicForm = () => (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Current Academic Year</label>
          <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
            <option>2025-26</option>
            <option>2026-27</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Current Semester</label>
          <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
            <option>Semester 1</option>
            <option>Semester 2</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Year Start Date</label>
          <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"/>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Year End Date</label>
          <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"/>
        </div>

      </div>

    </div>
  );

  /* ---------------- Roles Form ---------------- */

  const roles = [
    { name: "Admin", permissions: ["Full System Access","User Management","Settings","Reports"] },
    { name: "Teacher", permissions: ["Manage Attendance","Enter Marks","View Students"] },
    { name: "Student", permissions: ["View Attendance","View Results","Download Materials"] }
  ];

  const RolesForm = () => (
    <div className="space-y-4">

      {roles.map((role) => (

        <div key={role.name} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">

          <div className="flex justify-between items-start mb-4">

            <div>
              <h3 className="text-lg font-bold text-slate-900">{role.name}</h3>
              <p className="text-sm text-slate-400">{role.permissions.length} permissions</p>
            </div>

            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
              <Edit2 className="w-4 h-4"/>
            </button>

          </div>

          <div className="flex flex-wrap gap-2">

            {role.permissions.map((perm) => (
              <span
                key={perm}
                className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-md text-xs font-medium"
              >
                {perm}
              </span>
            ))}

          </div>

        </div>

      ))}

    </div>
  );

  /* ---------------- Notifications Form ---------------- */

  const notificationsList = [
    {key:"email",title:"Email Notifications",desc:"Receive notifications via email"},
    {key:"attendance",title:"Attendance Alerts",desc:"Get notified about low attendance"},
    {key:"enrollments",title:"New Enrollments",desc:"Notifications for new students"},
    {key:"events",title:"Event Reminders",desc:"Reminders for upcoming events"},
    {key:"system",title:"System Updates",desc:"Information about system maintenance"}
  ];

  const NotificationsForm = () => (
    <div className="space-y-6">

      {notificationsList.map((item) => (

        <div key={item.key} className="flex items-center justify-between border-b border-slate-100 pb-4">

          <div>
            <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>

          <button
            onClick={()=>toggleSwitch(item.key)}
            className={`relative w-12 h-6 rounded-full transition ${
              notifications[item.key] ? "bg-blue-600" : "bg-slate-300"
            }`}
          >

            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                notifications[item.key] ? "translate-x-6" : ""
              }`}
            />

          </button>

        </div>

      ))}

    </div>
  );

  /* ---------------- Render Tabs ---------------- */

  const renderContent = () => {
    switch(activeTab){
      case "School":
        return <SchoolForm/>;
      case "Academic":
        return <AcademicForm/>;
      case "Roles":
        return <RolesForm/>;
      case "Notifications":
        return <NotificationsForm/>;
      default:
        return null;
    }
  };

  return (

    <div className="p-6 bg-slate-50 min-h-screen">

      <div className="max-w-4xl mx-auto mb-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {navItems.map((item)=>(
            <button
              key={item.id}
              onClick={()=>setActiveTab(item.id)}
              className={`flex items-center justify-center gap-2 p-3 bg-white rounded-xl border-t-4 shadow-sm transition ${
                activeTab===item.id
                  ? `${item.color} text-slate-900 font-semibold`
                  : "border-transparent text-slate-500"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </button>
          ))}

        </div>

      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-4xl mx-auto">

        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">{activeTab} Management</h1>
          <p className="text-sm text-slate-500">Manage {activeTab.toLowerCase()} settings</p>
        </div>

        {renderContent()}

      </div>

      <div className="max-w-4xl mx-auto flex justify-end mt-6">

        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition">
          <Save className="w-4 h-4"/>
          Save Changes
        </button>

      </div>

    </div>
  );

};

export default TeacherSettingData;

