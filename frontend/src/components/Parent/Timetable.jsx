import React from 'react';

const Timetable = () => {
  const scheduleData = [
     {
    day: "Monday",
    slots: [
      { time: "8:00 – 8:45", subject: "Mathematics", teacher: "Mrs. Kapoor" },
      { time: "8:45 – 9:30", subject: "Science", teacher: "Mr. Verma" },
      { time: "9:45 – 10:30", subject: "English", teacher: "Ms. Bhatia" },
      { time: "10:30 – 11:15", subject: "Hindi", teacher: "Mrs. Reddy" },
      { time: "11:30 – 12:15", subject: "Social Studies", teacher: "Mr. Joshi" },
      { time: "12:15 – 1:00", subject: "Computer Science", teacher: "Ms. Nair" },
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "8:00 – 8:45", subject: "Physics", teacher: "Dr. Sharma" },
      { time: "8:45 – 9:30", subject: "Physical Education", teacher: "Mr. Kumar" },
      { time: "9:45 – 10:30", subject: "Mathematics", teacher: "Ms. Bhatia" },
      { time: "10:30 – 11:15", subject: "Hindi", teacher: "Mrs. Reddy" },
      { time: "11:30 – 12:15", subject: "Geography", teacher: "Mr. Singh" },
      { time: "12:15 – 1:00", subject: "Computer Science", teacher: "Ms. Nair" },
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "8:00 – 8:45", subject: "Chemistry", teacher: "Mrs. Dutta" },
      { time: "8:45 – 9:30", subject: "Biology", teacher: "Dr. Mehta" },
      { time: "9:45 – 10:30", subject: "Mathematics", teacher: "Mr. Rao" },
      { time: "10:30 – 11:15", subject: "English", teacher: "Ms. Fernandes" },
      { time: "11:30 – 12:15", subject: "History", teacher: "Mr. Khan" },
      { time: "12:15 – 1:00", subject: "Computer Science", teacher: "Mr. Iyer" },
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "8:00 – 8:45", subject: "Physics", teacher: "Dr. Sharma" },
      { time: "8:45 – 9:30", subject: "Art", teacher: "Ms. Gupta" },
      { time: "9:45 – 10:30", subject: "Mathematics", teacher: "Mrs. Kapoor" },
      { time: "10:30 – 11:15", subject: "Hindi", teacher: "Mrs. Reddy" },
      { time: "11:30 – 12:15", subject: "Civics", teacher: "Mr. Joshi" },
      { time: "12:15 – 1:00", subject: "Computer Science", teacher: "Ms. Nair" },
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "8:00 – 8:45", subject: "Biology", teacher: "Dr. Mehta" },
      { time: "8:45 – 9:30", subject: "Chemistry", teacher: "Mrs. Dutta" },
      { time: "9:45 – 10:30", subject: "English", teacher: "Ms. Fernandes" },
      { time: "10:30 – 11:15", subject: "Mathematics", teacher: "Mr. Rao" },
      { time: "11:30 – 12:15", subject: "Geography", teacher: "Mr. Singh" },
      { time: "12:15 – 1:00", subject: "Computer Science", teacher: "Mr. Iyer" },
    ]
  },
 
  {
    day: "Sunday",
    slots: [
      { time: "8:00 – 8:45", subject: "Yoga", teacher: "Mr. Anand" },
      { time: "8:45 – 9:30", subject: "Meditation", teacher: "Ms. Kaur" },
      { time: "9:45 – 10:30", subject: "Creative Writing", teacher: "Ms. Thomas" },
      { time: "10:30 – 11:15", subject: "Public Speaking", teacher: "Mr. Bose" },
      { time: "11:30 – 12:15", subject: "Life Skills", teacher: "Mrs. Sharma" },
      { time: "12:15 – 1:00", subject: "Club Activities", teacher: "Mr. Das" },
    ]
  }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-10">
      {scheduleData.map((daySchedule, index) => (
        <div 
          key={index} 
          className="bg-white rounded-[1.5rem] border border-slate-100 p-8 shadow-sm"
        >
          {/* Day Heading */}
          <h3 className="text-xl font-black text-slate-800 mb-6">{daySchedule.day}</h3>
          
          <div className="space-y-3">
            {daySchedule.slots.map((slot, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
              >
                {/* Time Column */}
                <div className="w-32 text-slate-400 font-medium text-sm">
                  {slot.time}
                </div>

                {/* Subject Column - Pill Style */}
                <div className="flex-1 flex justify-center">
                  <span className="bg-slate-100 text-slate-700 font-black text-xs px-4 py-1.5 rounded-full border border-slate-200 group-hover:bg-white transition-colors">
                    {slot.subject}
                  </span>
                </div>

                {/* Teacher Column */}
                <div className="w-32 text-right text-slate-400 font-medium text-sm">
                  {slot.teacher}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timetable;