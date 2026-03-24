// cleanup and refactor of AdminReportData.jsx - added comments, memoization, and improved readability.
import {
  ChevronDown,
  Download,
  Check,
  Users,
  ClipboardCheck,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import AdminStudentReportData from "./AdminStudentReportData";
import { StatCard } from '../ui/StatCard';
import { ChartContainer } from '../ui/ChartContainer';

const TIME_OPTIONS = ["This Week", "This Month", "This Quarter", "This Year"];
const CLASS_OPTIONS = ["Class 10A", "Class 10B", "Class 9A", "Class 9B", "Class 8A", "Class 8B"];

const SUBJECT_DATA = [
  { name: "Math", score: 78, full: 100 },
  { name: "Physics", score: 85, full: 100 },
  { name: "Chemistry", score: 75, full: 100 },
  { name: "English", score: 82, full: 100 },
  { name: "Biology", score: 79, full: 100 },
];

const GRADE_DATA = [
  { name: "A+", value: 15, color: "#166534" },
  { name: "A", value: 25, color: "#14b8a6" },
  { name: "B", value: 30, color: "#1e40af" },
  { name: "C", value: 20, color: "#ca8a04" },
  { name: "D", value: 10, color: "#b91c1c" },
];

const ATTENDANCE_DATA = [
  { name: "A", value: 92 },
  { name: "B", value: 88 },
  { name: "C", value: 95 },
  { name: "D", value: 82 },
  { name: "E", value: 90 },
  { name: "F", value: 93 },
];

const MONTHLY_DATA = [
  { month: "Jan", value: 92 },
  { month: "Feb", value: 94 },
  { month: "Mar", value: 91 },
  { month: "Apr", value: 93 },
  { month: "May", value: 95 },
];

const AdminReportData = () => {

  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("This Month");

  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const toggleClassDropdown = React.useCallback(() => {
    setIsClassDropdownOpen((prev) => !prev);
    setIsTimeDropdownOpen(false);
  }, []);

  const toggleTimeDropdown = React.useCallback(() => {
    setIsTimeDropdownOpen((prev) => !prev);
    setIsClassDropdownOpen(false);
  }, []);

  const selectClass = React.useCallback((option) => {
    setSelectedClass(option);
    setIsClassDropdownOpen(false);
  }, []);

  const selectTime = React.useCallback((option) => {
    setSelectedTime(option);
    setIsTimeDropdownOpen(false);
  }, []);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">

          {/* CLASS DROPDOWN */}
          <div className="relative">
            <button
              onClick={toggleClassDropdown}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-slate-600 shadow-sm hover:bg-gray-50"
            >
              {selectedClass}
              <ChevronDown size={16} className={`${isClassDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isClassDropdownOpen && (
              <div className="absolute top-12 left-0 w-48 bg-white border-gray-100 rounded-xl shadow-lg p-1 z-20">
                {CLASS_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => selectClass(option)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                      option === selectedClass
                        ? "bg-[#2da594] text-white"
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {option}
                    {option === selectedClass && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TIME DROPDOWN */}
          <div className="relative">
            <button
              onClick={toggleTimeDropdown}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-slate-600 shadow-sm hover:bg-gray-50"
            >
              {selectedTime}
              <ChevronDown size={16} className={`${isTimeDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isTimeDropdownOpen && (
              <div className="absolute top-12 left-0 w-48 bg-white border-gray-100 rounded-xl shadow-lg p-1 z-20">
                {TIME_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => selectTime(option)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                      option === selectedTime
                        ? "bg-[#2da594] text-white"
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {option}
                    {option === selectedTime && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white border-gray-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-400 shadow-sm">
          <Download size={16} />
          Export Reports
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Avg Attendance" value="93.2%" change="+2.1%" icon={<ClipboardCheck size={20} />} />
        <StatCard label="Total Students" value="1,234" change="+12" icon={<Users size={20} />} />
        <StatCard label="Avg Performance" value="77.2%" change="+3.5%" icon={<TrendingUp size={20} />} />
        <StatCard label="Pass Rate" value="94.8%" change="+1.2%" icon={<GraduationCap size={20} />} />
      </div>

      {/* ATTENDANCE CHARTS (TOP) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <ChartContainer title="Attendance by Class">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ATTENDANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1e40af" radius={[4,4,0,0]} barSize={40}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Monthly Attendance Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
              <XAxis dataKey="month" axisLine={false} tickLine={false}/>
              <YAxis domain={[85,100]} axisLine={false} tickLine={false}/>
              <Tooltip/>
              <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} dot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

      </div>

      {/* PERFORMANCE CHARTS (BOTTOM) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <ChartContainer title="Subject-wise Performance">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={SUBJECT_DATA} margin={{left:20}}>
              <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} stroke="#f1f5f9"/>
              <XAxis type="number" domain={[0,100]} hide/>
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false}/>
              <Tooltip/>
              <Bar dataKey="full" fill="#cbd5e1" barSize={35}/>
              <Bar dataKey="score" fill="#166534" barSize={35}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Grade Distribution">
          <div className="flex flex-col h-full">

            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={GRADE_DATA} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {GRADE_DATA.map((entry,index)=>(
                    <Cell key={index} fill={entry.color}/>
                  ))}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {GRADE_DATA.map((item)=>(
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor:item.color}}/>
                  <span className="text-xs text-slate-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>

          </div>
        </ChartContainer>

      </div>

      {/* STUDENT REPORTS */}
      <AdminStudentReportData />

    </div>
  );
};





export default AdminReportData;
