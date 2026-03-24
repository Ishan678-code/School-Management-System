import { useMemo, useState } from 'react'
import { ChevronDown, Search, Trophy, TrendingUp, Users, CheckCircle2, XCircle } from 'lucide-react'

const AdminResultData = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A')
  const [selectedTerm, setSelectedTerm] = useState('Term 1')
  const [isClassOpen, setIsClassOpen] = useState(false)
  const [isTermOpen, setIsTermOpen] = useState(false)
  const [query, setQuery] = useState('')

  const classes = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B', 'Class 8A']
  const terms = ['Term 1', 'Term 2', 'Term 3']

  const results = RESULT_DATA

  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    return results.filter((row) => {
      const matchesClass = row.className === selectedClass
      const matchesTerm = row.term === selectedTerm
      const matchesQuery = !trimmed ||
        row.name.toLowerCase().includes(trimmed) ||
        row.roll.toLowerCase().includes(trimmed)
      return matchesClass && matchesTerm && matchesQuery
    })
  }, [results, selectedClass, selectedTerm, query])

  const stats = useMemo(() => {
    if (!filteredResults.length) {
      return { average: 0, passRate: 0, topScore: 0, total: 0 }
    }
    let totalScore = 0
    let passCount = 0
    let topScore = 0
    filteredResults.forEach((row) => {
      totalScore += row.total
      if (row.status === 'Pass') passCount += 1
      if (row.total > topScore) topScore = row.total
    })
    const average = Math.round(totalScore / filteredResults.length)
    const passRate = Math.round((passCount / filteredResults.length) * 100)
    return { average, passRate, topScore, total: filteredResults.length }
  }, [filteredResults])

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsClassOpen((prev) => !prev)}
              className="flex items-center justify-between gap-4 bg-white px-4 py-2.5 border border-slate-200 rounded-xl w-full sm:min-w-[160px] shadow-sm hover:border-blue-400 transition-all"
            >
              <span className="text-sm font-semibold">{selectedClass}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isClassOpen ? 'rotate-180' : ''}`} />
            </button>
            {isClassOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-40 overflow-hidden">
                {classes.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => { setSelectedClass(cls); setIsClassOpen(false) }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                      cls === selectedClass ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsTermOpen((prev) => !prev)}
              className="flex items-center justify-between gap-4 bg-white px-4 py-2.5 border border-slate-200 rounded-xl w-full sm:min-w-[140px] shadow-sm hover:border-blue-400 transition-all"
            >
              <span className="text-sm font-semibold">{selectedTerm}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isTermOpen ? 'rotate-180' : ''}`} />
            </button>
            {isTermOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-40 overflow-hidden">
                {terms.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => { setSelectedTerm(term); setIsTermOpen(false) }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                      term === selectedTerm ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full lg:w-[320px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search student or roll"
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-slate-800">{stats.total}</h3>
        </div>
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex justify-between items-center">
          <div>
            <p className="text-blue-700/60 text-xs font-bold uppercase tracking-wider mb-1">Class Average</p>
            <h3 className="text-3xl font-black text-blue-600">{stats.average}</h3>
          </div>
          <div className="bg-blue-500 text-white p-2.5 rounded-xl shadow-lg shadow-blue-200"><TrendingUp className="w-6 h-6" /></div>
        </div>
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex justify-between items-center">
          <div>
            <p className="text-emerald-700/60 text-xs font-bold uppercase tracking-wider mb-1">Pass Rate</p>
            <h3 className="text-3xl font-black text-emerald-600">{stats.passRate}%</h3>
          </div>
          <div className="bg-emerald-500 text-white p-2.5 rounded-xl shadow-lg shadow-emerald-200"><Users className="w-6 h-6" /></div>
        </div>
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex justify-between items-center">
          <div>
            <p className="text-amber-700/60 text-xs font-bold uppercase tracking-wider mb-1">Top Score</p>
            <h3 className="text-3xl font-black text-amber-600">{stats.topScore}</h3>
          </div>
          <div className="bg-amber-500 text-white p-2.5 rounded-xl shadow-lg shadow-amber-200"><Trophy className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-black text-lg text-slate-800">Result Overview</h3>
            <p className="text-xs text-slate-400">Marks summary for {selectedClass} · {selectedTerm}</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
            {filteredResults.length} records
          </span>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full text-left min-w-[780px]">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Roll No.</th>
                <th className="px-6 py-4">Subjects</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredResults.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-400">
                    No results found. Try a different class, term, or search.
                  </td>
                </tr>
              )}
              {filteredResults.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-300">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${row.color}`}>
                        {row.initials}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500 tracking-tight">{row.roll}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {row.subjects.map((subject) => (
                        <span key={subject.name} className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide bg-slate-50 text-slate-500">
                          {subject.name}: {subject.score}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide ${row.gradeColor}`}>
                      {row.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide flex items-center gap-1.5 ${
                        row.status === 'Pass' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {row.status === 'Pass' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sm:hidden p-4 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Swipe left to see more info →</p>
        </div>
      </div>
    </div>
  )
}

export default AdminResultData

const RESULT_DATA = [
  {
    id: 1,
    name: 'Alex Thompson',
    roll: 'STU001',
    className: 'Class 10A',
    term: 'Term 1',
    initials: 'AT',
    color: 'bg-blue-100 text-blue-600',
    subjects: [
      { name: 'Math', score: 88 },
      { name: 'Sci', score: 91 },
      { name: 'Eng', score: 84 },
    ],
    total: 263,
    grade: 'A',
    gradeColor: 'bg-emerald-100 text-emerald-600',
    status: 'Pass',
  },
  {
    id: 2,
    name: 'Emma Watson',
    roll: 'STU002',
    className: 'Class 10A',
    term: 'Term 1',
    initials: 'EW',
    color: 'bg-purple-100 text-purple-600',
    subjects: [
      { name: 'Math', score: 79 },
      { name: 'Sci', score: 86 },
      { name: 'Eng', score: 90 },
    ],
    total: 255,
    grade: 'A-',
    gradeColor: 'bg-blue-100 text-blue-600',
    status: 'Pass',
  },
  {
    id: 3,
    name: 'John Doe',
    roll: 'STU003',
    className: 'Class 10A',
    term: 'Term 1',
    initials: 'JD',
    color: 'bg-emerald-100 text-emerald-600',
    subjects: [
      { name: 'Math', score: 62 },
      { name: 'Sci', score: 58 },
      { name: 'Eng', score: 65 },
    ],
    total: 185,
    grade: 'C',
    gradeColor: 'bg-amber-100 text-amber-600',
    status: 'Fail',
  },
  {
    id: 4,
    name: 'Maya Patel',
    roll: 'STU004',
    className: 'Class 10A',
    term: 'Term 1',
    initials: 'MP',
    color: 'bg-rose-100 text-rose-600',
    subjects: [
      { name: 'Math', score: 92 },
      { name: 'Sci', score: 89 },
      { name: 'Eng', score: 94 },
    ],
    total: 275,
    grade: 'A+',
    gradeColor: 'bg-emerald-100 text-emerald-600',
    status: 'Pass',
  },
  {
    id: 5,
    name: 'Noah Kim',
    roll: 'STU005',
    className: 'Class 10B',
    term: 'Term 1',
    initials: 'NK',
    color: 'bg-sky-100 text-sky-600',
    subjects: [
      { name: 'Math', score: 84 },
      { name: 'Sci', score: 77 },
      { name: 'Eng', score: 81 },
    ],
    total: 242,
    grade: 'B+',
    gradeColor: 'bg-amber-100 text-amber-600',
    status: 'Pass',
  },
  {
    id: 6,
    name: 'Sara Ali',
    roll: 'STU006',
    className: 'Class 10B',
    term: 'Term 1',
    initials: 'SA',
    color: 'bg-orange-100 text-orange-600',
    subjects: [
      { name: 'Math', score: 90 },
      { name: 'Sci', score: 93 },
      { name: 'Eng', score: 88 },
    ],
    total: 271,
    grade: 'A',
    gradeColor: 'bg-emerald-100 text-emerald-600',
    status: 'Pass',
  },
  {
    id: 7,
    name: 'Liam Chen',
    roll: 'STU007',
    className: 'Class 9A',
    term: 'Term 1',
    initials: 'LC',
    color: 'bg-indigo-100 text-indigo-600',
    subjects: [
      { name: 'Math', score: 73 },
      { name: 'Sci', score: 70 },
      { name: 'Eng', score: 75 },
    ],
    total: 218,
    grade: 'B',
    gradeColor: 'bg-blue-100 text-blue-600',
    status: 'Pass',
  },
  {
    id: 8,
    name: 'Aisha Khan',
    roll: 'STU008',
    className: 'Class 9B',
    term: 'Term 1',
    initials: 'AK',
    color: 'bg-teal-100 text-teal-600',
    subjects: [
      { name: 'Math', score: 68 },
      { name: 'Sci', score: 62 },
      { name: 'Eng', score: 70 },
    ],
    total: 200,
    grade: 'C+',
    gradeColor: 'bg-amber-100 text-amber-600',
    status: 'Pass',
  },
  {
    id: 9,
    name: 'Grace Lee',
    roll: 'STU009',
    className: 'Class 8A',
    term: 'Term 1',
    initials: 'GL',
    color: 'bg-fuchsia-100 text-fuchsia-600',
    subjects: [
      { name: 'Math', score: 55 },
      { name: 'Sci', score: 58 },
      { name: 'Eng', score: 52 },
    ],
    total: 165,
    grade: 'D',
    gradeColor: 'bg-rose-100 text-rose-600',
    status: 'Fail',
  },
]
