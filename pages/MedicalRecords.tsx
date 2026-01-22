
import React, { useState } from 'react';
import { 
  History, 
  FileText, 
  Plus, 
  Search, 
  ArrowRight,
  Stethoscope,
  Pill,
  Microscope,
  ClipboardList
} from 'lucide-react';
import { storage } from '../services/storage';
import { MedicalRecord, Patient } from '../types';

const RecordTimelineItem: React.FC<{ record: MedicalRecord }> = ({ record }) => (
  <div className="relative pl-8 pb-8 border-l border-slate-200 last:border-0 last:pb-0">
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 border-white bg-blue-600 shadow-sm"></div>
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">{record.date}</span>
          <h4 className="text-lg font-bold text-slate-900 mt-1">{record.diagnosis}</h4>
        </div>
        <div className="text-sm font-medium text-slate-500">
          Ditangani oleh <span className="text-slate-900 font-semibold">{record.doctorName}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-400">
            <Stethoscope size={16} />
            <span className="text-xs font-bold uppercase">Keluhan</span>
          </div>
          <p className="text-sm text-slate-600">{record.complaint}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-400">
            <Pill size={16} />
            <span className="text-xs font-bold uppercase">Resep Obat</span>
          </div>
          <p className="text-sm text-slate-600 italic">"{record.prescription}"</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-400">
            <Microscope size={16} />
            <span className="text-xs font-bold uppercase">Tindakan/Lab</span>
          </div>
          <p className="text-sm text-slate-600">{record.treatment}</p>
        </div>
      </div>
    </div>
  </div>
);

const MedicalRecords: React.FC = () => {
  const [records] = useState<MedicalRecord[]>(storage.getRecords());
  const [patients] = useState<Patient[]>(storage.getPatients());
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  const patientRecords = records.filter(r => r.patientId === selectedPatientId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Rekam Klinis</h1>
          <p className="text-slate-500 mt-1">Akses dan kelola riwayat medis lengkap pasien.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition-all shadow-lg shadow-blue-200 font-semibold text-sm">
          <Plus size={18} />
          <span>Konsultasi Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Cari Pasien</h3>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari..."
                className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {patients.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                    selectedPatientId === patient.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-bold ${selectedPatientId === patient.id ? 'text-white' : 'text-slate-900'}`}>{patient.name}</p>
                    <p className={`text-xs ${selectedPatientId === patient.id ? 'text-blue-100' : 'text-slate-500'}`}>{patient.id} • {patient.gender === 'Male' ? 'L' : 'P'}</p>
                  </div>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {selectedPatient ? (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl">
                      {selectedPatient.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedPatient.name}</h2>
                      <p className="text-slate-500">{selectedPatient.age} tahun • Terdaftar sejak {selectedPatient.registeredDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                      <FileText size={20} />
                    </button>
                    <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                      <History size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-0 px-4">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-2">
                  <History className="text-blue-600" size={24} />
                  <span>Timeline Riwayat Klinis</span>
                </h3>
                {patientRecords.length > 0 ? (
                  patientRecords.map(record => <RecordTimelineItem key={record.id} record={record} />)
                ) : (
                  <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ClipboardList size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">Belum ada rekam medis untuk pasien ini.</p>
                    <button className="mt-4 text-blue-600 font-bold hover:underline">Mulai Konsultasi Pertama</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white h-[400px] flex flex-col items-center justify-center rounded-3xl border border-slate-200 shadow-sm text-slate-400 p-8 text-center">
              <ClipboardList size={64} className="mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pilih Pasien</h3>
              <p className="max-w-xs mx-auto">Silakan pilih pasien dari daftar di sebelah kiri untuk melihat riwayat medis terperinci.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
