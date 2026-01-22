
import React, { useMemo } from 'react';
import { 
  Users, 
  CalendarCheck, 
  Activity, 
  Clock,
  Plus,
  ArrowRight
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { storage } from '../services/storage';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  changeColor: string;
  changeBg: string;
}> = ({ title, value, change, icon: Icon, iconBg, iconColor, changeColor, changeBg }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-3 rounded-2xl ${iconBg} ${iconColor}`}>
        <Icon size={22} />
      </div>
      <span className={`text-xs font-bold ${changeColor} ${changeBg} px-2 py-1 rounded-lg`}>
        {change}
      </span>
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p>
    <h3 className="text-3xl font-black text-slate-800 mt-1">{value}</h3>
  </div>
);

const Dashboard: React.FC = () => {
  const patients = storage.getPatients();
  const appointments = storage.getAppointments();
  const records = storage.getRecords();

  const data = useMemo(() => [
    { name: 'Sen', visits: 12 },
    { name: 'Sel', visits: 19 },
    { name: 'Rab', visits: 15 },
    { name: 'Kam', visits: 22 },
    { name: 'Jum', visits: 30 },
    { name: 'Sab', visits: 10 },
    { name: 'Min', visits: 8 },
  ], []);

  const stats = [
    { 
      title: 'Total Pasien', 
      value: patients.length, 
      change: '+12%', 
      isPositive: true, 
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      changeColor: 'text-blue-600',
      changeBg: 'bg-blue-50'
    },
    { 
      title: 'Janji Temu', 
      value: appointments.length, 
      change: '+5%', 
      isPositive: true, 
      icon: CalendarCheck,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      changeColor: 'text-emerald-600',
      changeBg: 'bg-emerald-50'
    },
    { 
      title: 'Rekam Baru', 
      value: records.length, 
      change: '+2%', 
      isPositive: true, 
      icon: Activity,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      changeColor: 'text-purple-600',
      changeBg: 'bg-purple-50'
    },
    { 
      title: 'Waktu Tunggu', 
      value: '18m', 
      change: '-3%', 
      isPositive: true, 
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      changeColor: 'text-amber-600',
      changeBg: 'bg-amber-50'
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Pusat Kesehatan</h1>
          <p className="text-slate-400 mt-2 font-medium">Memantau aktivitas klinik dan tren kesehatan pasien.</p>
        </div>
        <button className="flex items-center space-x-2 bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 font-bold text-sm">
          <Plus size={18} />
          <span>Tambah Rekam</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Trafik Klinik</h3>
              <p className="text-sm text-slate-400">Jumlah kunjungan dalam 7 hari terakhir</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-xl px-4 py-2 focus:ring-0">
              <option>7 Hari Terakhir</option>
              <option>Bulan Lalu</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} />
                <Tooltip 
                  cursor={{stroke: '#3B82F6', strokeWidth: 1}}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Antrean</h3>
            <button className="text-blue-500 hover:text-blue-600"><ArrowRight size={20}/></button>
          </div>
          <div className="space-y-6 flex-1">
            {appointments.slice(0, 4).map((appt) => (
              <div key={appt.id} className="flex items-center group cursor-pointer">
                <div className="w-12 h-12 bg-slate-50 group-hover:bg-blue-50 transition-colors rounded-2xl flex items-center justify-center font-bold text-slate-400 group-hover:text-blue-600 mr-4">
                  {appt.patientName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-700 text-sm leading-tight">{appt.patientName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{appt.time} • {appt.status === 'Scheduled' ? 'Dijadwalkan' : 'Selesai'}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            ))}
            {appointments.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
                  <CalendarCheck size={32}/>
                </div>
                <p className="text-slate-400 text-sm font-medium">Tidak ada jadwal temu</p>
              </div>
            )}
          </div>
          <button className="mt-8 w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors uppercase tracking-widest">
            Lihat Semua Jadwal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
