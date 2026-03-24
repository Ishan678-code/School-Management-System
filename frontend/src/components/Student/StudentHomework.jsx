import { useState, useContext } from "react";
import {
  Plus, Search, Calendar, BookOpen, Clock,
  CheckCircle, Circle, Edit, Trash2, MoreHorizontal,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const homeworkData = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Quadratic Equations Practice",
    description: "Solve exercises 1-20 from Chapter 5. Show all working steps.",
    class: "10A",
    teacher: "Dr. Sarah Johnson",
    dueDate: "2025-12-25",
    assignedDate: "2025-12-20",
    status: "pending",
  },
  {
    id: 2,
    subject: "Physics",
    title: "Newton's Laws Report",
    description: "Write a 500-word report on real-world applications of Newton's laws of motion.",
    class: "10A",
    teacher: "Prof. Michael Chen",
    dueDate: "2025-12-27",
    assignedDate: "2025-12-19",
    status: "pending",
  },
  {
    id: 3,
    subject: "English",
    title: "Essay Writing",
    description: 'Write an essay on "The Impact of Technology on Modern Education" (800-1000 words).',
    class: "10A",
    teacher: "Ms. Emily Davis",
    dueDate: "2025-12-24",
    assignedDate: "2025-12-18",
    status: "submitted",
  },
  {
    id: 4,
    subject: "Chemistry",
    title: "Lab Report: Titration",
    description: "Complete the lab report for the acid-base titration experiment conducted in class.",
    class: "10A",
    teacher: "Mr. Robert Wilson",
    dueDate: "2025-12-23",
    assignedDate: "2025-12-17",
    status: "graded",
  },
  {
    id: 5,
    subject: "Biology",
    title: "Cell Division Diagrams",
    description: "Draw and label diagrams for mitosis and meiosis. Include all phases.",
    class: "10A",
    teacher: "Dr. Lisa Anderson",
    dueDate: "2025-12-26",
    assignedDate: "2025-12-20",
    status: "pending",
  },
];

const subjectColors = {
  Mathematics: "bg-blue-100 text-blue-700 border border-blue-200",
  Physics:     "bg-purple-100 text-purple-700 border border-purple-200",
  English:     "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Chemistry:   "bg-green-100 text-green-700 border border-green-200",
  Biology:     "bg-red-100 text-red-700 border border-red-200",
};

const statusConfig = {
  pending:   { label: "Pending",   color: "bg-yellow-100 text-yellow-700", Icon: Circle },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700",     Icon: CheckCircle },
  graded:    { label: "Graded",    color: "bg-green-100 text-green-700",    Icon: CheckCircle },
};

export default function Homework() {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const filteredHomework = homeworkData.filter(
    (hw) =>
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Homework</h1>
        <p className="text-sm text-gray-500">
          {user?.role === "teacher" ? "Manage homework assignments" : "View your assignments"}
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search homework..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {user?.role === "teacher" && (
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" />
            Assign Homework
          </button>
        )}
      </div>

      {/* Add Homework Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-bold mb-1">Assign New Homework</h2>
            <p className="text-sm text-gray-500 mb-4">Create a new homework assignment for your class.</p>

            <form className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Title</label>
                <input type="text" placeholder="Homework title" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea rows={3} placeholder="Homework instructions..." className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Subject</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option value="">Select subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="english">English</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Class</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option value="">Select class</option>
                    <option value="10A">Class 10A</option>
                    <option value="10B">Class 10B</option>
                    <option value="9A">Class 9A</option>
                    <option value="9B">Class 9B</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Due Date</label>
                <input type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Pending",   status: "pending",   colorClass: "border-l-yellow-400", textClass: "text-yellow-600" },
          { label: "Submitted", status: "submitted", colorClass: "border-l-blue-500",   textClass: "text-blue-600" },
          { label: "Graded",    status: "graded",    colorClass: "border-l-green-500",  textClass: "text-green-600" },
        ].map(({ label, status, colorClass, textClass }) => (
          <div key={status} className={`bg-white rounded-xl shadow-sm border-l-4 p-5 ${colorClass}`}>
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-2xl font-bold ${textClass}`}>
              {filteredHomework.filter((h) => h.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* Homework List */}
      <div className="grid gap-4">
        {filteredHomework.map((homework) => {
          const daysRemaining = getDaysRemaining(homework.dueDate);
          const isOverdue = daysRemaining < 0;
          const isDueSoon = daysRemaining <= 2 && daysRemaining >= 0;
          const { label, color, Icon } = statusConfig[homework.status];

          return (
            <div
              key={homework.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 space-y-2">

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${subjectColors[homework.subject]}`}>
                      {homework.subject}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${color}`}>
                      <Icon className="h-3 w-3" /> {label}
                    </span>
                    {isOverdue && homework.status === "pending" && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-600">Overdue</span>
                    )}
                    {isDueSoon && homework.status === "pending" && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-600">Due Soon</span>
                    )}
                  </div>

                  <h3 className="font-semibold text-lg text-gray-800">{homework.title}</h3>
                  <p className="text-sm text-gray-500">{homework.description}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 pt-2">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Class {homework.class}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Assigned: {formatDate(homework.assignedDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Due: {formatDate(homework.dueDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {user?.role === "student" && homework.status === "pending" && (
                    <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Submit
                    </button>
                  )}
                  {user?.role === "teacher" && (
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdownId(openDropdownId === homework.id ? null : homework.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                      >
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </button>
                      {openDropdownId === homework.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-32">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 transition">
                            <Edit className="h-4 w-4" /> Edit
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                            <Trash2 className="h-4 w-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}