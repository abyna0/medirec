
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Calendar, 
  LogOut, 
  Search, 
  Bell, 
  Menu,
  X,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { User, UserRole } from '../types';
import { storage } from '../services/storage';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, active, isCollapsed, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-blue-600'
    }`}
    title={label}
  >
    <Icon size={22} className={`${active ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
    {!isCollapsed && <span className="font-medium whitespace-nowrap overflow-hidden">{label}</span>}
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authUser = storage.getAuthUser();
    if (!authUser) {
      navigate('/login');
    } else {
      setUser(authUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    storage.setAuthUser(null);
    navigate('/login');
  };

  const menuItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT] },
    { to: '/patients', icon: Users, label: 'Pasien', roles: [UserRole.ADMIN, UserRole.DOCTOR] },
    { to: '/appointments', icon: Calendar, label: 'Jadwal Temu', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT] },
    { to: '/records', icon: ClipboardList, label: 'Rekam Medis', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT] },
  ];

  if (!user) return null;

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  const getPageTitle = (path: string) => {
    if (path === '/') return 'Ringkasan';
    if (path === '/patients') return 'Daftar Pasien';
    if (path === '/appointments') return 'Jadwal & Antrean';
    if (path === '/records') return 'Riwayat Medis';
    return 'MediRec';
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex flex-col bg-white border-r border-slate-100 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center h-20 px-6 mb-4">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Stethoscope size={24} />
          </div>
          {!isCollapsed && <span className="ml-3 text-xl font-bold text-slate-800 tracking-tight">MediRec</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {filteredMenu.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              isCollapsed={isCollapsed}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50 space-y-2">
          <button 
            onClick={() => setCollapsed(!isCollapsed)}
            className="flex items-center space-x-3 px-3 py-3 w-full text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ChevronRight size={22} className={`transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
            {!isCollapsed && <span className="font-medium">Sembunyikan</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-3 w-full text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={22} />
            {!isCollapsed && <span className="font-medium">Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <Stethoscope size={24} />
              </div>
              <span className="text-xl font-bold text-slate-800">MediRec</span>
            </div>
            <button onClick={() => setMobileOpen(false)}><X size={24} className="text-slate-400" /></button>
          </div>
          <nav className="space-y-2">
            {filteredMenu.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                isCollapsed={false}
                active={location.pathname === item.to}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                {getPageTitle(location.pathname)}
              </h2>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-10 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Cari pasien atau data..."
                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-2 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <button className="relative p-2 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-slate-100"></div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-700 leading-tight">{user.name}</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">
                  {user.role === UserRole.ADMIN ? 'Administrator' : user.role === UserRole.DOCTOR ? 'Dokter' : 'Pasien'}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-sm border border-blue-50">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#FDFDFD] p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
