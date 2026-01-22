
import { UserRole, Patient, User, Appointment } from './types';

export const COLORS = {
  primary: '#0F172A',
  secondary: '#3B82F6',
  accent: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F8F9FA'
};

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'dr. Sarah Connor', email: 'sarah@medirec.com', role: UserRole.DOCTOR, specialty: 'Spesialis Jantung' },
  { id: 'u2', name: 'Admin Jane', email: 'admin@medirec.com', role: UserRole.ADMIN },
  { id: 'u3', name: 'Budi Santoso', email: 'budi@pasien.com', role: UserRole.PATIENT },
  { id: 'u4', name: 'dr. James Smith', email: 'james@medirec.com', role: UserRole.DOCTOR, specialty: 'Dokter Umum' }
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'P001', name: 'Siti Aminah', age: 28, gender: 'Female', address: 'Jl. Melati No. 123, Jakarta', phone: '0812-3456-7890', ktp: '1234567890', registeredDate: '2023-10-01' },
  { id: 'P002', name: 'Ahmad Subarjo', age: 45, gender: 'Male', address: 'Jl. Pinus Ave No. 45, Bandung', phone: '0812-9876-5432', ktp: '0987654321', registeredDate: '2023-11-15' },
  { id: 'P003', name: 'Rizky Pratama', age: 10, gender: 'Male', address: 'Komp. Mawar Indah, Surabaya', phone: '0813-1122-3344', ktp: '1122334455', registeredDate: '2024-01-20' }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'A001', patientId: 'P001', patientName: 'Siti Aminah', doctorId: 'u1', doctorName: 'dr. Sarah Connor', date: '2024-05-20', time: '09:00', status: 'Scheduled', queueNumber: 1 },
  { id: 'A002', patientId: 'P002', patientName: 'Ahmad Subarjo', doctorId: 'u1', doctorName: 'dr. Sarah Connor', date: '2024-05-20', time: '10:00', status: 'Scheduled', queueNumber: 2 }
];
