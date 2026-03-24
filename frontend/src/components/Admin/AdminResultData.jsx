import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaEllipsisH, FaTimes } from 'react-icons/fa';

const AdminResultData = () => {
  // --- STATE MANAGEMENT ---
  const [results, setResults] = useState([
    { id: 1, name: "Ishan Awasthi", class: "12-B", roll: "205", subject: "Computer Science", marks: 92, grade: "A+",status:"Pass" },
    { id: 2, name: "Sandip Bhatta", class: "12-A", roll: "102", subject: "Mathematics", marks: 88, grade: "A",status:"Pass" },
    { id: 3, name: "Aarav Shrestha", class: "11-C", roll: "304", subject: "Physics", marks: 76, grade: "B+",status:"Pass" },
    { id: 4, name: "Sneha Thapa", class: "10-B", roll: "215", subject: "English", marks: 95, grade: "A+",status:"Pass" },
    { id: 5, name: "Rohan Mehta", class: "12-B", roll: "208", subject: "Computer Science", marks: 45, grade: "C",status:"Fail" },
    { id: 6, name: "Priya Rai", class: "11-A", roll: "112", subject: "Chemistry", marks: 32, grade: "F",status:"Fail" },
    { id: 7, name: "Ankit Thapa", class: "10-A", roll: "105", subject: "Social Studies", marks: 82, grade: "A",status:"Pass" },
    { id: 8, name: "Meera Joshi", class: "12-C", roll: "301", subject: "Economics", marks: 68, grade: "B",status:"Pass" },
    { id: 9, name: "Siddharth Dhungana", class: "11-B", roll: "220", subject: "Biology", marks: 74, grade: "B+",status:"Pass" },
    { id: 10, name: "Kriti Bhatta", class: "10-C", roll: "310", subject: "Mathematics", marks: 55, grade: "C+",status:"Pass" },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("");

  const [formData, setFormData] = useState({
    name: '', class: '', roll: '', subject: '', marks: ''
  });

  const dropdownRef = useRef(null);

  // --- LOGIC HANDLERS ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenForm = (student = null) => {
    setOpenDropdown(null);
    if (student) {
      setEditingId(student.id);
      setFormData({ 
        name: student.name, class: student.class, 
        roll: student.roll, subject: student.subject, marks: student.marks 
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', class: '', roll: '', subject: '', marks: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const m = parseInt(formData.marks);
    const grade = m >= 90 ? 'A+' : m >= 80 ? 'A' : m >= 70 ? 'B+' : m >= 60 ? 'B' : m >= 40 ? 'C' : 'F';

    if (editingId) {
      setResults(results.map(item => item.id === editingId ? { ...formData, id: editingId, grade } : item));
    } else {
      setResults([{ ...formData, id: Date.now(), grade }, ...results]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    if (window.confirm("Are you sure you want to delete this record?")) {
      setResults(results.filter(item => item.id !== id));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered Data Logic
  const filteredResults = results.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.roll.includes(searchQuery);
    const matchesClass = filterClass === "" || item.class.startsWith(filterClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Result Data</h2>
          
          {/* --- SEARCH AND FILTER SECTION --- */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search by name or roll no."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
            />

            <select 
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Classes</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>

            <button 
              onClick={() => handleOpenForm()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
            >
              <FaPlus size={12} />
              <span>Add Result</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Student Name</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Class</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Roll No.</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Marks</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Grade</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResults.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">{student.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{student.class}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{student.roll}</td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-700">{student.marks}</td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-700">{student.grade}</td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-700">{student.status}</td>

                  <td className="px-4 py-4 text-center relative">
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
                    >
                      <FaEllipsisH className="text-gray-400" />
                    </button>

                    {openDropdown === index && (
                      <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden">
                        <ul className="py-1 text-sm text-gray-700 text-left">
                          <li onClick={() => { setViewStudent(student); setOpenDropdown(null); }} className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer">
                            <FaEye className="text-blue-500" /> View
                          </li>
                          <li onClick={() => handleOpenForm(student)} className="flex items-center gap-3 px-4 py-2 hover:bg-green-50 cursor-pointer">
                            <FaEdit className="text-green-500" /> Edit
                          </li>
                          <li onClick={() => handleDelete(student.id)} className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
                            <FaTrash /> Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredResults.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">No records found matching your search.</div>
          )}
        </div>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md z-[110]">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">{editingId ? "Edit Student Result" : "Add new Result"}</h3>
              <form className="space-y-4" onSubmit={handleSave}>
                <input required name="name" type="text" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Student Name" />
                <div className="flex gap-4">
                  <input required name="class" type="text" value={formData.class} onChange={handleChange} className="flex-1 border p-2 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Class (e.g. 12-A)" />
                  <input required name="roll" type="text" value={formData.roll} onChange={handleChange} className="flex-1 border p-2 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Roll No" />
                </div>
                <div className="flex gap-4">
                  <input required name="subject" type="text" value={formData.subject} onChange={handleChange} className="flex-1 border p-2 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Subject" />
                  <input required name="marks" type="number" value={formData.marks} onChange={handleChange} className="flex-1 border p-2 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Marks" />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm">Save Record</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW MODAL --- */}
      {viewStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewStudent(null)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm z-[110] p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-bold">Student Details</h3>
              <button onClick={() => setViewStudent(null)} className="text-gray-400 hover:text-gray-800"><FaTimes /></button>
            </div>
            <div className="space-y-3 text-sm">
              <p><strong>Name:</strong> {viewStudent.name}</p>
              <p><strong>Class:</strong> {viewStudent.class}</p>
              <p><strong>Roll No:</strong> {viewStudent.roll}</p>
              <p><strong>Subject:</strong> {viewStudent.subject}</p>
              <p><strong>Marks:</strong> {viewStudent.marks}</p>
              <p><strong>Grade:</strong> <span className="text-blue-600 font-bold">{viewStudent.grade}</span></p>
            </div>
            <button onClick={() => setViewStudent(null)} className="mt-6 w-full py-2 bg-blue-600 text-white rounded text-sm font-medium">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResultData;