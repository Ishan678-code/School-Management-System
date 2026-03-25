import React, { useState } from "react";
import { Download, Users, TrendingUp, GraduationCap, ClipboardCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StatCard, ChartContainer, Select } from '../ui';
import AdminStudentReportData from "./AdminStudentReportData";

const AdminReportData = () => {
  const [selectedTime, setSelectedTime] = useState("This Month");

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Statistics Row using StatCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,284" icon={Users} trend={12} />
        <StatCard title="Attendance" value="94.2%" icon={ClipboardCheck} trend={-2} colorClass="text-emerald-600" bgClass="bg-emerald-50" />
        <StatCard title="Avg. Performance" value="78.5%" icon={TrendingUp} trend={5} colorClass="text-orange-600" bgClass="bg-orange-50" />
        <StatCard title="Graduation Rate" value="99.1%" icon={GraduationCap} colorClass="text-purple-600" bgClass="bg-purple-50" />
      </div>

      {/* 2. Charts Row using ChartContainer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <ChartContainer 
          title="Subject Performance" 
          extra={<Select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} options={["Weekly", "Monthly"]} />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SUBJECT_DATA} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="score" fill="#166534" barSize={20} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Grade Distribution">
          <div className="flex flex-col h-full">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={GRADE_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {GRADE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {GRADE_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-slate-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

      </div>

      {/* 3. Nested Student Report Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <AdminStudentReportData />
      </div>

    </div>
  );
};

const SUBJECT_DATA = [
  { name: "Math", score: 78 },
  { name: "Physics", score: 85 },
  { name: "Chemistry", score: 75 },
];

const GRADE_DATA = [
  { name: "A+", value: 15, color: "#166534" },
  { name: "A", value: 35, color: "#22c55e" },
  { name: "B", value: 30, color: "#eab308" },
];

export default AdminReportData;