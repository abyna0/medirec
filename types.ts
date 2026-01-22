
export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  NURSE = 'NURSE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialty?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  address: string;
  phone: string;
  ktp: string;
  registeredDate: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  complaint: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  labResultUrl?: string;
  status: 'Draft' | 'Finalized';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  queueNumber: number;
}
