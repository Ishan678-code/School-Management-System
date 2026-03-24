import React from 'react';
import { 
  BarChart3, 
  GraduationCap, 
  Calendar, 
  Megaphone 
} from 'lucide-react';

const ParentOverview = () => {
  // 1. Data Definitions moved to the top level of the component
  const stats = [
    { label: "Attendance", value: "96%", sub: "25/26 days", icon: BarChart3 },
    { label: "Avg. Marks", value: "85.2", sub: "Across 6 subjects", icon: GraduationCap },
    { label: "Upcoming Exams", value: "2", sub: "Mid-terms in April", icon: Calendar },
    { label: "Announcements", value: "6", sub: "Recent notices", icon: Megaphone },
  ];

  const schedule = [
    { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mrs. Bhatta" },
    { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Verma" },
    { time: "9:30 - 10:15", subject: "English", teacher: "Mr. Sharma" },
    { time: "10:15 - 11:00", subject: "Nepali", teacher: "Mr. Poudel" },
    { time: "11:00 - 11:45", subject: "Social Studies", teacher: "Mr. Dhakal" },
  ];

  const grades = [
    { subject: "Mathematics", marks: "87/100", grade: "A" },
    { subject: "Science", marks: "92/100", grade: "A+" },
    { subject: "English", marks: "80/100", grade: "A-" },
    { subject: "Nepali", marks: "78/100", grade: "B+" },
    { subject: "Social Studies", marks: "85/100", grade: "A" },
  ];

  const notices = [
    {
      title: "Annual Sports Day",
      tag: "event",
      desc: "The annual sports day will be held on April 5th. All students are expected to participate in at least one event.",
      date: "2026-03-22"
    },
    {
      title: "Mid-Term Exam Schedule Released",
      tag: "exam",
      desc: "Mid-term examinations will commence from April 14th. The detailed subject-wise schedule has been uploaded.",
      date: "2026-03-20"
    },
    {
      title: "PTM Scheduled for March 28",
      tag: "general",
      desc: "Parent-Teacher Meeting is scheduled for Saturday, March 28th from 9 AM to 1 PM.",
      date: "2026-03-18"
    }
  ];

  // Helper function for tags
  const getTagStyles = (tag) => {
    switch (tag) {
      case 'event': return 'bg-blue-50 text-blue-600';
      case 'exam': return 'bg-amber-50 text-amber-600';
      case 'general': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* 1. Welcome Banner */}
      <div className="bg-blue-600 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-blue-100 font-medium mb-1">Welcome back,</p>
          <h1 className="text-4xl font-black mb-4 tracking-tight">Rajesh Sharma</h1>
          <p className="text-blue-100 text-sm">
            Viewing dashboard for <span className="text-white font-bold">Ishan Awasthi</span> — Class 8th-A
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-semibold mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.sub}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Today's Schedule */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="text-xl font-black text-slate-800">Today's Schedule <span className="text-slate-400 font-medium text-lg ml-1">(Monday)</span></h3>
          </div>
          <div className="p-8">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                  <th className="pb-4">Time</th>
                  <th className="pb-4">Subject</th>
                  <th className="pb-4 text-right">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {schedule.map((item, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 text-slate-500 font-medium">{item.time}</td>
                    <td className="py-5 font-black text-slate-800">{item.subject}</td>
                    <td className="py-5 text-right text-slate-500">{item.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="text-xl font-black text-slate-800">Recent Grades</h3>
          </div>
          <div className="p-8">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                  <th className="pb-4">Subject</th>
                  <th className="pb-4">Marks</th>
                  <th className="pb-4 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {grades.map((item, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 font-black text-slate-800">{item.subject}</td>
                    <td className="py-5 text-slate-500 font-medium">{item.marks}</td>
                    <td className="py-5 text-right">
                      <span className="bg-slate-100 text-slate-800 font-black text-xs px-3 py-1.5 rounded-lg">
                        {item.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcements Section - Now inside the same grid or a full-width container below */}
    {/* Announcements Section - Flex Column Layout */}
<div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
  <h3 className="text-xl font-black text-slate-800 mb-6">Latest Announcements</h3>
  
  <div className="flex flex-col gap-4"> {/* Changed from grid to flex-col */}
    {notices.map((notice, i) => (
      <div 
        key={i} 
        className="flex items-start gap-6 p-6 rounded-2xl border border-slate-50 hover:border-blue-100 transition-all group hover:bg-blue-50/10"
      >
        {/* Left Side: Icon Box */}
        <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
          <Megaphone size={20} />
        </div>
        
        {/* Right Side: Content Area */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-black text-slate-800 leading-none">{notice.title}</h4>
            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${getTagStyles(notice.tag)}`}>
              {notice.tag}
            </span>
          </div>
          
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {notice.desc}
          </p>
          
          <p className="text-[11px] font-bold text-slate-300 mt-3">
            {notice.date}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default ParentOverview;