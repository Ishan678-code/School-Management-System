import React from 'react';
import { Search, ChevronDown, Plus, Calendar, Clock, MapPin, Users } from 'lucide-react';

const events = [
  {
    type: "Sports",
    title: "Annual Sports Day",
    description: "Annual sports competition featuring track and field events, team sports, a...",
    date: "Sun, Dec 28, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Main Sports Ground",
    audience: "All Students",
    colorClass: "border-l-green-500",
    badgeClass: "bg-green-50 text-green-600"
  },
  {
    type: "Meeting",
    title: "Parent-Teacher Meeting",
    description: "Quarterly meeting to discuss student progress and academic performance.",
    date: "Mon, Jan 5, 2026",
    time: "10:00 AM - 1:00 PM",
    location: "School Auditorium",
    audience: "Parents & Teachers",
    colorClass: "border-l-orange-400",
    badgeClass: "bg-orange-50 text-orange-600"
  },
  {
    type: "Academic",
    title: "Science Fair",
    description: "Students showcase their science projects and innovations.",
    date: "Thu, Jan 15, 2026",
    time: "11:00 AM - 3:00 PM",
    location: "Science Lab Building",
    audience: "Class 8-10",
    colorClass: "border-l-blue-600",
    badgeClass: "bg-blue-50 text-blue-600"
  },
  {
    type: "Cultural",
    title: "Cultural Festival",
    description: "Annual cultural celebration with performances, art exhibitions, and foo...",
    date: "Tue, Jan 20, 2026",
    time: "5:00 PM - 9:00 PM",
    location: "School Main Hall",
    audience: "All Students",
    colorClass: "border-l-teal-400",
    badgeClass: "bg-teal-50 text-teal-600"
  },
  {
    type: "Holiday",
    title: "Republic Day Celebration",
    description: "National holiday celebration with flag hoisting and cultural programs.",
    date: "Mon, Jan 26, 2026",
    time: "8:00 AM - 12:00 PM",
    location: "School Ground",
    audience: "Staff & Students",
    colorClass: "border-l-red-500",
    badgeClass: "bg-red-50 text-red-600"
  },
  {
    type: "Academic",
    title: "Mid-Term Examinations",
    description: "Mid-term examination period for all classes.",
    date: "Sun, Feb 1, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Respective Classrooms",
    audience: "All Students",
    colorClass: "border-l-blue-700",
    badgeClass: "bg-blue-50 text-blue-700"
  }
];

const AdminEventData = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-slate-800">
      {/* Header / Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3 w-full max-w-2xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-sm"
            />
          </div>

          {/* Type Dropdown */}
          <button className="flex items-center justify-between gap-2 min-w-[140px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50 transition-colors">
            All Types <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Add Event Button */}
        <button className="bg-[#2540D0] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all">
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-[6px] ${event.colorClass} p-6 flex flex-col gap-3`}
          >
            {/* Category Badge */}
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${event.badgeClass}`}>
                {event.type}
              </span>
            </div>

            {/* Content */}
            <h3 className="font-bold text-xl text-slate-800 tracking-tight">{event.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
              {event.description}
            </p>

            {/* Metadata with Lucide Icons */}
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Clock size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <MapPin size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Users size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{event.audience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEventData;