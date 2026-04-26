import { motion } from 'framer-motion';
import Logo from './Logo';
import { Heart, Coffee, GitBranch, Star } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      className="relative z-10 mt-16 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="divider" style={{ marginBottom: '2rem' }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Logo size="sm" />

          {/* Made with love */}
          <motion.div
            className="flex items-center gap-2 text-sm"
            style={{ color: '#64748b' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={14} style={{ color: '#ef4444', fill: '#ef4444' }} />
            </motion.span>
            <span>and</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Coffee size={14} style={{ color: '#f59e0b' }} />
            </motion.span>
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://github.com/jashveer-sharma/split-mitra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-colors"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#94a3b8',
              }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(168,85,247,0.3)',
                color: '#c084fc',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <GitBranch size={14} />
              GitHub
            </motion.a>
            <motion.a
              href="https://github.com/jashveer-sharma/split-mitra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-colors"
              style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.15)',
                color: '#fbbf24',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star size={14} />
              Star on GitHub
            </motion.a>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: '#475569' }}>
            © {new Date().getFullYear()} Split Mitra. Open source & free forever.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
