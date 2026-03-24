// Core Types
export interface User {
  id: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  name: string;
  email: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  class: string;
  parent: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  class: string;
  email: string;
}

// API Response
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;}
