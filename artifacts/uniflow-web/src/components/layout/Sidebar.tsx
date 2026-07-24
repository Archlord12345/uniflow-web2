import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Home, BookOpen, Calendar, ClipboardList, CheckSquare,
  BarChart2, MessageSquare, Bell, Settings, LogOut,
  ChevronLeft, ChevronRight, X, Video, Library, HelpCircle,
  Users, Shield, UserCog, BookUser, GraduationCap, ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole, ROLE_PROFILES, UserRole } from '@/lib/role-context';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const navItemsByRole: Record<UserRole, Array<{ href: string; icon: any; label: string; badge?: number }>> = {
  etudiant: [
    { href: '/dashboard',      icon: Home,          label: 'Accueil' },
    { href: '/courses',        icon: BookOpen,       label: 'Mes Cours' },
    { href: '/schedule',       icon: Calendar,       label: 'Emploi du temps' },
    { href: '/devoirs',        icon: ClipboardList,  label: 'Devoirs & TPs' },
    { href: '/attendance',     icon: CheckSquare,    label: 'Mes Présences' },
    { href: '/notes',          icon: BarChart2,      label: 'Notes & Bulletins' },
    { href: '/messages',       icon: MessageSquare,  label: 'Messages',      badge: 1 },
    { href: '/notifications',  icon: Bell,           label: 'Notifications', badge: 3 },
    { href: '/video',          icon: Video,          label: 'Visioconférence' },
    { href: '/resources',      icon: Library,        label: 'Bibliothèque' },
    { href: '/settings',       icon: Settings,       label: 'Paramètres' },
    { href: '/support',        icon: HelpCircle,     label: 'Aide' },
  ],
  delegue: [
    { href: '/dashboard',      icon: Home,          label: 'Tableau de bord' },
    { href: '/attendance',     icon: CheckSquare,    label: 'Pointage Classe', badge: 2 },
    { href: '/courses',        icon: BookOpen,       label: 'Cours L2 Info' },
    { href: '/schedule',       icon: Calendar,       label: 'Emploi du temps' },
    { href: '/devoirs',        icon: ClipboardList,  label: 'Devoirs Promotion' },
    { href: '/messages',       icon: MessageSquare,  label: 'Annonces Classe', badge: 2 },
    { href: '/notifications',  icon: Bell,           label: 'Alertes',         badge: 4 },
    { href: '/video',          icon: Video,          label: 'Visioconférence' },
    { href: '/settings',       icon: Settings,       label: 'Paramètres' },
  ],
  enseignant: [
    { href: '/teacher/dashboard',  icon: Home,          label: 'Espace Enseignant' },
    { href: '/teacher/courses',    icon: BookOpen,       label: 'Mes Enseignements' },
    { href: '/schedule',           icon: Calendar,       label: 'Planning & Salles' },
    { href: '/teacher/attendance', icon: CheckSquare,    label: 'Validation Présences' },
    { href: '/teacher/grades',     icon: BarChart2,      label: 'Saisie Notes & CC' },
    { href: '/video',              icon: Video,          label: 'Lancer Visioconférence' },
    { href: '/messages',           icon: MessageSquare,  label: 'Annonces Etudiants' },
    { href: '/settings',           icon: Settings,       label: 'Paramètres' },
  ],
  admin: [
    { href: '/admin/dashboard', icon: Home,          label: 'Console Admin' },
    { href: '/admin/users',     icon: Users,         label: 'Gestion Étudiants' },
    { href: '/admin/teachers',  icon: BookUser,      label: 'Gestion Enseignants' },
    { href: '/admin/courses',   icon: BookOpen,       label: 'Offre Académique (UE)' },
    { href: '/admin/schedules', icon: Calendar,       label: 'Emplois du temps' },
    { href: '/admin/rooms',     icon: Library,        label: 'Salles & Amphis' },
    { href: '/admin/stats',     icon: BarChart2,      label: 'Statistiques' },
    { href: '/settings',        icon: Settings,       label: 'Configuration' },
  ],
  superadmin: [
    { href: '/admin/dashboard', icon: Shield,        label: 'Pilotage Direction' },
    { href: '/admin/users',     icon: UserCog,       label: 'Utilisateurs & RBAC' },
    { href: '/admin/courses',   icon: BookOpen,       label: 'Offre Académique' },
    { href: '/admin/schedules', icon: Calendar,       label: 'Planning Salles' },
    { href: '/admin/sync',      icon: BarChart2,      label: 'Audit & Sync Offline' },
    { href: '/settings',        icon: Settings,       label: 'Paramètres Système' },
  ]
};

const roleIcons: Record<UserRole, any> = {
  etudiant: GraduationCap,
  delegue: Users,
  enseignant: BookUser,
  admin: UserCog,
  superadmin: Shield,
};

function SidebarContent({ collapsed, setCollapsed, onClose }: {
  collapsed: boolean; setCollapsed: (v: boolean) => void; onClose?: () => void;
}) {
  const [location, navigate] = useLocation();
  const { role, setRole, user } = useRole();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const navItems = navItemsByRole[role] || navItemsByRole.etudiant;

  function handleSwitchRole(newRole: UserRole) {
    setRole(newRole);
    setShowRoleMenu(false);
    if (newRole === 'admin' || newRole === 'superadmin') {
      navigate('/admin/dashboard');
    } else if (newRole === 'enseignant') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100 shrink-0">
        <Link href={role === 'admin' || role === 'superadmin' ? '/admin/dashboard' : role === 'enseignant' ? '/teacher/dashboard' : '/dashboard'} className="flex items-center overflow-hidden">
          {collapsed ? (
            <img src="/uniflow-icon.png" alt="U" className="h-9 w-9 object-contain" />
          ) : (
            <img src="/uniflow-logo.png" alt="UniFlow" className="h-9 object-contain" />
          )}
        </Link>
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {/* Mobile close */}
        {onClose && (
          <button onClick={onClose} className="md:hidden h-7 w-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = location === item.href || (item.href !== '/dashboard' && item.href !== '/admin/dashboard' && location.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 relative group',
                active
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon size={18} className="shrink-0" />
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Badge */}
              {item.badge && !collapsed && (
                <span className={cn(
                  'flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold px-1',
                  active ? 'bg-white text-[#1E3A8A]' : 'bg-[#1E3A8A] text-white'
                )}>
                  {item.badge}
                </span>
              )}
              {item.badge && collapsed && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
              )}
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover:block">
                  <div className="bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mascot Assistant Banner */}
      {!collapsed && (
        <div className="mx-2 mb-2 p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100 flex items-center gap-3">
          <img src="/uniflow-mascot-owl.png" alt="Mascotte UniFlow" className="w-10 h-10 object-contain shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#1E3A8A]">UniFlow Assistant</p>
            <p className="text-[10px] text-gray-500 truncate">Soutien académique & FAQ</p>
          </div>
        </div>
      )}

      {/* User Card with Role Switcher */}
      <div className="shrink-0 border-t border-gray-100 p-3 relative">
        {/* Role Popup menu */}
        {showRoleMenu && !collapsed && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1">Changer d'espace profil</p>
            {(Object.keys(ROLE_PROFILES) as UserRole[]).map((rKey) => {
              const prof = ROLE_PROFILES[rKey];
              const Icon = roleIcons[rKey];
              const isCurrent = role === rKey;
              return (
                <button
                  key={rKey}
                  onClick={() => handleSwitchRole(rKey)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isCurrent ? 'bg-blue-50 text-[#1E3A8A] font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} style={{ color: prof.avatarColor }} />
                  <div className="text-left flex-1 truncate">
                    <span className="block truncate">{prof.nomComplet}</span>
                    <span className="text-[10px] text-gray-400 block truncate">{prof.role}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          {/* Avatar */}
          <button
            onClick={() => !collapsed && setShowRoleMenu(!showRoleMenu)}
            className="relative shrink-0 text-left focus:outline-none group"
          >
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.initiales}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
          </button>

          <AnimatePresence initial={false}>
            {!collapsed && (
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setShowRoleMenu(!showRoleMenu)}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.nomComplet}</p>
                  <ChevronUp size={14} className={`text-gray-400 transition-transform ${showRoleMenu ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-xs font-medium truncate" style={{ color: user.avatarColor }}>{user.role}</p>
              </div>
            )}
          </AnimatePresence>

          {!collapsed && (
            <Link href="/" className="shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1 rounded">
              <LogOut size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:block shrink-0 h-screen fixed left-0 top-0 z-30 overflow-hidden"
      >
        <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-y-0 left-0 w-64 z-50 md:hidden"
      >
        <SidebarContent collapsed={false} setCollapsed={() => {}} onClose={() => setMobileOpen(false)} />
      </motion.aside>
    </>
  );
}

