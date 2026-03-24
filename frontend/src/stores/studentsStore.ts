import { create } from 'zustand'

interface Student {
  id: string
  rollNo: string
  name: string
  class: string
  parent: string
  status: 'active' | 'inactive'
}

interface StudentsState {
  students: Student[]
  loading: boolean
  error: string | null
  fetchStudents: () => Promise<void>
  addStudent: (student: Omit<Student, 'id'>) => void
  updateStudent: (id: string, updates: Partial<Student>) => void
  deleteStudent: (id: string) => void
}

export const useStudentsStore = create<StudentsState>((set) => ({
  students: [],
  loading: false,
  error: null,
  
  fetchStudents: async () => {
    set({ loading: true, error: null })
    try {
      // Mock delay for realism
      await new Promise(r => setTimeout(r, 500))
      // In real: use api call
      const mockStudents: Student[] = [
        { id: '1', rollNo: '10A001', name: 'John Doe', class: '10A', parent: 'Jane Doe', status: 'active' },
        { id: '2', rollNo: '10A002', name: 'Jane Smith', class: '10A', parent: 'Bob Smith', status: 'active' },
        // ... more
      ]
      set({ students: mockStudents, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch students', loading: false })
    }
  },
  
  addStudent: (student) => {
    const newStudent = { id: crypto.randomUUID(), ...student }
    set(state => ({ students: [...state.students, newStudent] }))
  },
  
  updateStudent: (id, updates) => {
    set(state => ({
      students: state.students.map(s => s.id === id ? { ...s, ...updates } : s)
    }))
  },
  
  deleteStudent: (id) => {
    set(state => ({
      students: state.students.filter(s => s.id !== id)
    }))
  }
}))
