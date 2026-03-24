import React from 'react'

const ChildAttendance = () => {
   const attendanceData = [
    { day: 1, status: 'holiday' }, { day: 2, status: 'present' }, { day: 3, status: 'present' },
    { day: 4, status: 'present' }, { day: 5, status: 'present' }, { day: 6, status: 'present' },
    { day: 7, status: 'present' }, { day: 8, status: 'holiday' }, { day: 9, status: 'present' },
    { day: 10, status: 'present' }, { day: 11, status: 'absent' }, { day: 12, status: 'present' },
    { day: 13, status: 'present' }, { day: 14, status: 'present' }, { day: 15, status: 'holiday' },
    { day: 16, status: 'present' }, { day: 17, status: 'late' }, { day: 18, status: 'present' },
    { day: 19, status: 'present' }, { day: 20, status: 'present' }, { day: 21, status: 'present' },
    { day: 22, status: 'holiday' }, { day: 23, status: 'present' }, { day: 24, status: 'present' },
    { day: 25, status: 'present' }, { day: 26, status: 'present' }, { day: 27, status: 'present' },
    { day: 28, status: 'present' }, { day: 29, status: 'holiday' }, { day: 30, status: 'present' },
    { day: 31, status: 'present' }
  ];

   const getStatusStyles = (status) => {
    switch (status) {
      case 'present': return 'bg-[#d1e7dd] text-[#0f5132]';
      case 'absent': return 'bg-[#f8d7da] text-[#842029]';
      case 'late': return 'bg-[#fff3cd] text-[#664d03]';
      case 'holiday': return 'bg-[#e2e3e5] text-[#383d41]';
      default: return 'bg-white text-gray-800';
    }
  };

  return (
   <div className="space-y-4">
        {/* Attendance Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Present", value: "25", color: "text-emerald-600" },
            { label: "Absent", value: "1", color: "text-rose-600" },
            { label: "Holidays", value: "5", color: "text-gray-500" },
            { label: "Attendance", value: "96%", color: "text-gray-900" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-6 rounded-[1.5rem] text-center shadow-sm">
              <p className="text-gray-500 font-medium text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Detailed Calendar Card */}
        <div className="bg-white rounded-[1.5rem] border border-gray-200 p-10 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-8">March 2026</h3>
          
          <div className="grid grid-cols-7 gap-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-gray-400 font-bold text-sm mb-4">{day}</div>
            ))}
            
            {attendanceData.map((data, idx) => (
              <div 
                key={idx}
                className={`h-16 flex items-center justify-center rounded-xl font-bold text-lg transition-all border border-transparent hover:scale-105 cursor-default ${getStatusStyles(data.status)}`}
              >
                {data.day}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-10 pt-6 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-gray-500">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <span className="text-xs font-bold text-gray-500">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span className="text-xs font-bold text-gray-500">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#383d41]"></div>
              <span className="text-xs font-bold text-gray-500">Holiday</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ChildAttendance