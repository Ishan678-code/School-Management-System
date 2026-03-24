import React, { useCallback, useMemo, useState } from "react";

const YEARS = ["2021", "2022", "2023", "2024"];

const INITIAL_STUDENT_REPORTS = [
  {
    id: 1,
    name: "Aarav Shrestha",
    className: "Class 10A",
    performance: { "2021": 76, "2022": 81, "2023": 84, "2024": 88 },
  },
  {
    id: 2,
    name: "Sita Gurung",
    className: "Class 10B",
    performance: { "2021": 82, "2022": 85, "2023": 87, "2024": 90 },
  },
  {
    id: 3,
    name: "Ramesh Adhikari",
    className: "Class 9A",
    performance: { "2021": 69, "2022": 73, "2023": 78, "2024": 80 },
  },
  {
    id: 4,
    name: "Priya Rana",
    className: "Class 9B",
    performance: { "2021": 88, "2022": 89, "2023": 91, "2024": 93 },
  },
];

const clampScore = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return Math.max(0, Math.min(100, num));
};

const AdminStudentReportData = () => {
  const [rows, setRows] = useState(INITIAL_STUDENT_REPORTS);
  const [editingId, setEditingId] = useState(null);

  const isEditing = useCallback(
    (id) => editingId === id,
    [editingId]
  );

  const handleEdit = useCallback((id) => {
    setEditingId(id);
  }, []);

  const handleSave = useCallback(() => {
    setEditingId(null);
  }, []);

  const handleChange = useCallback((id, year, value) => {
    const nextValue = clampScore(value);
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              performance: {
                ...row.performance,
                [year]: nextValue,
              },
            }
          : row
      )
    );
  }, []);

  const averages = useMemo(() => {
    return rows.reduce((acc, row) => {
      const sum = YEARS.reduce((total, year) => total + Number(row.performance[year] || 0), 0);
      acc[row.id] = Math.round(sum / YEARS.length);
      return acc;
    }, {});
  }, [rows]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-lg font-bold text-slate-800">Student Yearly Performance</h2>
        <p className="text-sm text-slate-500">
          Admins can edit yearly performance scores directly in the table.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-gray-100">
              <th className="py-3 pr-4 font-semibold">Student</th>
              <th className="py-3 pr-4 font-semibold">Class</th>
              {YEARS.map((year) => (
                <th key={year} className="py-3 pr-4 font-semibold text-center">
                  {year}
                </th>
              ))}
              <th className="py-3 pr-4 font-semibold text-center">Avg</th>
              <th className="py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 last:border-b-0">
                <td className="py-4 pr-4 font-medium text-slate-700">{row.name}</td>
                <td className="py-4 pr-4 text-slate-600">{row.className}</td>
                {YEARS.map((year) => (
                  <td key={year} className="py-4 pr-4 text-center">
                    {isEditing(row.id) ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.performance[year]}
                        onChange={(event) => handleChange(row.id, year, event.target.value)}
                        className="w-16 text-center px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2da594]/30"
                      />
                    ) : (
                      <span className="text-slate-700 font-medium">{row.performance[year]}%</span>
                    )}
                  </td>
                ))}
                <td className="py-4 pr-4 text-center text-slate-700 font-semibold">
                  {averages[row.id]}%
                </td>
                <td className="py-4 text-right">
                  {isEditing(row.id) ? (
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#2da594] text-white"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(row.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(AdminStudentReportData);
