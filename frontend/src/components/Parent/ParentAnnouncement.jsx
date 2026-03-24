import React from 'react';
import { Megaphone, Calendar as CalendarIcon } from 'lucide-react';

const ParentAnnouncement = () => {
  const notices = [
    {
      title: "Annual Sports Day",
      tag: "event",
      desc: "The annual sports day will be held on April 5th. All students are expected to participate in at least one event. Please ensure your child wears the school sports uniform.",
      date: "2026-03-22",
      color: "emerald"
    },
    {
      title: "Mid-Term Exam Schedule Released",
      tag: "exam",
      desc: "Mid-term examinations will commence from April 14th. The detailed subject-wise schedule has been uploaded. Please help your child prepare accordingly.",
      date: "2026-03-20",
      color: "orange"
    },
    {
      title: "PTM Scheduled for March 28",
      tag: "general",
      desc: "Parent-Teacher Meeting is scheduled for Saturday, March 28th from 9 AM to 1 PM. Your presence is important to discuss your child's progress.",
      date: "2026-03-18",
      color: "slate"
    },
     {
      title: "Board Exam Scheduled for April 5",
      tag: "exam",
      desc: "The board exam is scheduled for April 5th. Please ensure your child is well-prepared and has all necessary materials.",
      date: "2026-04-05",
      color: "orange"
    }
  ];

  const getColorStyles = (color) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-50 text-emerald-500';
      case 'orange': return 'bg-orange-50 text-orange-500';
      case 'slate': return 'bg-slate-50 text-slate-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm max-w-5xl mx-auto animate-in fade-in duration-500">
      <h3 className="text-xl font-black text-slate-800 mb-8">Latest Announcements</h3>
      
      <div className="space-y-4">
        {notices.map((notice, i) => (
          <div 
            key={i} 
            className="flex items-start gap-6 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all group"
          >
            {/* Icon Column */}
            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${getColorStyles(notice.color)}`}>
              <Megaphone size={20} />
            </div>
            
            {/* Content Column */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-black text-slate-800 text-lg leading-tight">
                  {notice.title}
                </h4>
                <span className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border border-slate-100">
                  {notice.tag}
                </span>
              </div>
              
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {notice.desc}
              </p>
              
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarIcon size={14} />
                <span className="text-xs font-bold">{notice.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentAnnouncement;