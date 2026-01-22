
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Filter, 
  Download,
  UserPlus
} from 'lucide-react';
import { storage } from '../services/storage';
import { Patient } from '../types';

const PatientList: React.FC = () => {
  const [patients] = useState<Patient[]>(storage.getPatients());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    return patients.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pasien</h1>
          <p className="text-slate-500 mt-1">Kelola semua pasien yang terdaftar di sistem.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition-all font-semibold text-sm">
            <Download size={18} />
            <span>Ekspor</span>
          </button>
          <button 
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-200 font-semibold text-sm"
          >
            <UserPlus size={18} />
            <span>Daftar Pasien Baru</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau ID..."
              className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Pasien</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID Pasien</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usia/Kelamin</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal Daftar</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">No. Telepon</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{patient.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.age}th / {patient.gender === 'Male' ? 'L' : 'P'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.registeredDate}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Pasien tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
