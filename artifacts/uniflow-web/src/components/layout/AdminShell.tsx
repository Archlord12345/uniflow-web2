import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Home, Users, BookOpen, ChevronLeft, ChevronRight, X, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/mock-data';

interface AdminShellProps {
  children: React.ReactNode;
}

const adminNavItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/admin/users',     icon: Users,           label: 'Utilisateurs' },
  { href: '/admin/courses',   icon: BookOpen,        label: 'Cours' },
];

function AdminSidebarContent({ collapsed, setCollapsed, onClose }: {
  collapsed: boolean; setCollapsed: (v: boolean) => void; onClose?: () => void;
}) {
  const [location] = useLocation();

  return (
    <div className="flex h-full flex-col bg-[#111827] text-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800 shrink-0">
        <Link href="/admin/dashboard" className="flex items-center overflow-hidden">
          {collapsed ? (
            <img src="/uniflow-icon.png" alt="UniFlow" className="h-9 w-9 object-contain" />
          ) : (
            <div className="flex items-center gap-2">
              <img src="/uniflow-logo-nobg.png" alt="UniFlow Logo" className="h-8 object-contain" />
              <span className="font-bold text-lg tracking-tight">UniFlow <span className="text-[#0D9488]">Admin</span></span>
            </div>
          )}
        </Link>
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors shrink-0"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {/* Mobile close */}
        {onClose && (
          <button onClick={onClose} className="md:hidden h-7 w-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-800">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {adminNavItems.map((item) => {
          const active = location === item.href || (item.href !== '/admin/dashboard' && location.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 relative group',
                active
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="shrink-0 border-t border-gray-800 p-3 bg-gray-900/50">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="relative shrink-0">
            <div className="h-9 w-9 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-sm font-bold shadow-inner">
              AD
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-gray-900" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-white truncate">Admin Général</p>
                <p className="text-xs text-gray-400 truncate">Système</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <Link href="/" className="shrink-0 text-gray-400 hover:text-red-400 transition-colors p-1 rounded">
              <LogOut size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminShell({ children }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarW = collapsed ? 72 : 256;

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarW }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:block shrink-0 h-screen fixed left-0 top-0 z-30 overflow-hidden"
      >
        <AdminSidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
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
        <AdminSidebarContent collapsed={false} setCollapsed={() => {}} onClose={() => setMobileOpen(false)} />
      </motion.aside>

      {/* Main content */}
      <motion.div
        animate={{ marginLeft: sidebarW }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:block min-h-screen"
      >
        <main className="p-6 min-h-screen">{children}</main>
      </motion.div>

      {/* Mobile layout */}
      <div className="md:hidden min-h-screen flex flex-col">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <div className="font-bold text-lg text-[#1E3A8A]">UniFlow <span className="text-[#0D9488]">Admin</span></div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
