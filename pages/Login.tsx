
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { storage } from '../services/storage';

const Login: React.FC = () => {
  const [email, setEmail] = useState('sarah@medirec.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const users = storage.getUsers();
      const user = users.find(u => u.email === email);

      if (user) {
        storage.setAuthUser(user);
        navigate('/');
      } else {
        setError('Email atau password salah. Silakan coba lagi.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center space-x-3 mb-10">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-200">
            <Stethoscope size={32} />
          </div>
          <span className="text-3xl font-black text-slate-900 tracking-tighter italic">MediRec</span>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Selamat Datang Kembali</h1>
            <p className="text-slate-500 mt-2">Masuk untuk mengakses dasbor medis Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Alamat Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300"
                  placeholder="nama@contoh.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Kata Sandi</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-12 text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Masuk Sekarang</span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center space-y-4">
            <p className="text-sm text-slate-500">Akun Demo:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={() => setEmail('sarah@medirec.com')} className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full font-bold text-slate-600 transition-colors">dr. Sarah (Dokter)</button>
              <button onClick={() => setEmail('admin@medirec.com')} className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full font-bold text-slate-600 transition-colors">Admin Jane (Admin)</button>
              <button onClick={() => setEmail('john@patient.com')} className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full font-bold text-slate-600 transition-colors">Budi Santoso (Pasien)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
