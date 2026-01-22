
import { Patient, MedicalRecord, User, Appointment } from '../types';
import { MOCK_PATIENTS, MOCK_USERS, MOCK_APPOINTMENTS } from '../constants';

const KEYS = {
  USERS: 'medirec_users',
  PATIENTS: 'medirec_patients',
  RECORDS: 'medirec_records',
  APPOINTMENTS: 'medirec_appointments',
  AUTH: 'medirec_auth_user'
};

export const storage = {
  init: () => {
    if (!localStorage.getItem(KEYS.USERS)) localStorage.setItem(KEYS.USERS, JSON.stringify(MOCK_USERS));
    if (!localStorage.getItem(KEYS.PATIENTS)) localStorage.setItem(KEYS.PATIENTS, JSON.stringify(MOCK_PATIENTS));
    if (!localStorage.getItem(KEYS.APPOINTMENTS)) localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(MOCK_APPOINTMENTS));
    if (!localStorage.getItem(KEYS.RECORDS)) localStorage.setItem(KEYS.RECORDS, JSON.stringify([]));
  },

  getUsers: (): User[] => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  getPatients: (): Patient[] => JSON.parse(localStorage.getItem(KEYS.PATIENTS) || '[]'),
  getRecords: (): MedicalRecord[] => JSON.parse(localStorage.getItem(KEYS.RECORDS) || '[]'),
  getAppointments: (): Appointment[] => JSON.parse(localStorage.getItem(KEYS.APPOINTMENTS) || '[]'),

  savePatient: (patient: Patient) => {
    const pts = storage.getPatients();
    const index = pts.findIndex(p => p.id === patient.id);
    if (index > -1) pts[index] = patient;
    else pts.push(patient);
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(pts));
  },

  saveRecord: (record: MedicalRecord) => {
    const recs = storage.getRecords();
    recs.push(record);
    localStorage.setItem(KEYS.RECORDS, JSON.stringify(recs));
  },

  saveAppointment: (appt: Appointment) => {
    const appts = storage.getAppointments();
    appts.push(appt);
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appts));
  },

  getAuthUser: (): User | null => JSON.parse(localStorage.getItem(KEYS.AUTH) || 'null'),
  setAuthUser: (user: User | null) => localStorage.setItem(KEYS.AUTH, JSON.stringify(user))
};
