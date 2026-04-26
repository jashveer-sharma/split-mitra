import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'split', label: 'Split Now', icon: '✂️' },
    { id: 'history', label: 'History', icon: '📜' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className="mx-auto transition-all duration-500"
          style={{
            maxWidth: scrolled ? '100%' : '1200px',
            padding: scrolled ? '0' : '0.75rem',
          }}
        >
          <div
            className="flex items-center justify-between transition-all duration-500"
            style={{
              background: scrolled
                ? 'rgba(10, 10, 26, 0.85)'
                : 'rgba(20, 20, 50, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: scrolled ? '0' : '16px',
              border: `1px solid ${scrolled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`,
              padding: '0.75rem 1.25rem',
              boxShadow: scrolled
                ? '0 4px 30px rgba(0,0,0,0.4)'
                : '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            {/* Logo */}
            <div onClick={() => onTabChange('home')} style={{ cursor: 'pointer' }}>
              <Logo size="sm" />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: activeTab === tab.id ? '#c084fc' : '#94a3b8',
                    background: activeTab === tab.id ? 'rgba(168,85,247,0.12)' : 'transparent',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-1.5">{tab.icon}</span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-2">
              <motion.button
                className="hidden sm:flex items-center gap-1.5 btn-primary text-sm py-2 px-4"
                onClick={() => onTabChange('split')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={14} />
                Start Splitting
              </motion.button>

              <button
                className="md:hidden p-2 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 rounded-2xl p-4"
              style={{
                background: 'rgba(15, 15, 40, 0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {tabs.map((tab, i) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors"
                  style={{
                    color: activeTab === tab.id ? '#c084fc' : '#94a3b8',
                    background: activeTab === tab.id ? 'rgba(168,85,247,0.12)' : 'transparent',
                    fontSize: '1rem',
                    fontWeight: 500,
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
              <div className="divider" />
              <motion.button
                className="w-full btn-primary text-center py-3"
                onClick={() => {
                  onTabChange('split');
                  setMobileOpen(false);
                }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                ✨ Start Splitting
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
