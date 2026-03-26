// StudentDirectory.jsx - Full implementation with Add Student & Status Toggle
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Search, 
  UserPlus, 
  X, 
  GraduationCap, 
  CheckCircle2, 
  UserMinus, 
  MoreVertical,
  Mail,
  Filter
} from "lucide-react";

const StudentDirectory = () => {
  // --- 1. STATE MANAGEMENT ---
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State for new student
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    grade: "10th",
    section: "A",
    status: "Active"
  });

  // --- 2. DATA FETCHING (MOCK) ---
  useEffect(() => {
    const loadMockData = () => {
      const mockData = [
        { id: "STU001", name: "Emma Thompson", grade: "10th", section: "A", email: "emma.t@school.edu", status: "Active", attendance: "98%" },
        { id: "STU002", name: "Liam Neeson", grade: "12th", section: "B", email: "liam.n@school.edu", status: "Inactive", attendance: "92%" },
        { id: "STU003", name: "Sophia Garcia", grade: "10th", section: "A", email: "sophia.g@school.edu", status: "Active", attendance: "85%" },
      ];
      setStudents(mockData);
      setIsLoading(false);
    };
    
    const timer = setTimeout(loadMockData, 800);
    return () => clearTimeout(timer);
  }, []);

  // --- 3. ACTIONS & HANDLERS ---
  
  // Toggle Active/Inactive status
  const toggleStatus = useCallback((id) => {
    setStudents(prev => prev.map(student => 
      student.id === id 
        ? { ...student, status: student.status === "Active" ? "Inactive" : "Active" } 
        : student
    ));
  }, []);

  // Handle adding new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    const studentToAdd = { 
      ...newStudent, 
      id: `STU${Math.floor(Math.random() * 9000) + 1000}`,
      attendance: "100%" 
    };
    setStudents(prev => [studentToAdd, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setNewStudent({ name: "", email: "", grade: "10th", section: "A", status: "Active" });
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Filtering Logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            student.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = filterGrade === "All" || student.grade === filterGrade;
      return matchesSearch && matchesGrade;
    });
  }, [students, searchTerm, filterGrade]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="text-blue-600" /> Student Directory
          </h1>
          <p className="text-slate-500 text-sm">Manage enrollment and student statuses</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <UserPlus size={18} /> Add Student
        </button>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name or ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="bg-slate-50 border-none rounded-xl px-4 py-2 text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
        >
          <option value="All">All Grades</option>
          <option value="10th">10th Grade</option>
          <option value="11th">11th Grade</option>
          <option value="12th">12th Grade</option>
        </select>
      </div>

      {/* STUDENT TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-20 text-center text-slate-400 animate-pulse font-medium">Loading student database...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Student</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">ID</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Grade/Section</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Status Toggle</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${student.status === 'Active' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className={`font-semibold transition-colors ${student.status === 'Active' ? 'text-slate-800' : 'text-slate-400'}`}>
                            {student.name}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Mail size={10} /> {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-500 font-mono">{student.id}</td>
                    <td className="p-4">
                      <span className="text-sm text-slate-700 font-medium">{student.grade} - {student.section}</span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleStatus(student.id)}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all
                          ${student.status === "Active" 
                            ? "bg-green-50 text-green-600 hover:bg-green-100 shadow-sm shadow-green-100" 
                            : "bg-red-50 text-red-600 hover:bg-red-100"}
                        `}
                      >
                        {student.status === "Active" ? <CheckCircle2 size={14} /> : <UserMinus size={14} />}
                        {student.status}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => deleteStudent(student.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- ADD STUDENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Enroll New Student</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Full Name</label>
                <input 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Alex River"
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Email Address</label>
                <input 
                  required
                  type="email"
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="alex@school.com"
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Grade</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none"
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                  >
                    <option>10th</option><option>11th</option><option>12th</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Section</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none"
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                  >
                    <option>A</option><option>B</option><option>C</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all mt-4"
              >
                Create Student Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDirectory;