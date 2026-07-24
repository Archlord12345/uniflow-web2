import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarW = collapsed ? 72 : 256;

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

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
        {/* Mobile header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <img src="/uniflow-logo.png" alt="UniFlow" className="h-7 object-contain" />
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
