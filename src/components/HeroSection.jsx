import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Users, Receipt, PieChart, Zap, Shield, Heart } from 'lucide-react';

const features = [
  {
    icon: <Users size={24} />,
    title: 'Group Splitting',
    desc: 'Add friends, split expenses equally or custom',
    color: '#a855f7',
  },
  {
    icon: <Receipt size={24} />,
    title: 'Track Expenses',
    desc: 'Every rupee tracked with reason & timestamp',
    color: '#ec4899',
  },
  {
    icon: <PieChart size={24} />,
    title: 'Visual Summary',
    desc: 'Beautiful pie charts & settlement reports',
    color: '#3b82f6',
  },
  {
    icon: <Zap size={24} />,
    title: 'Instant Settle',
    desc: 'One-tap settle up with full history log',
    color: '#f59e0b',
  },
  {
    icon: <Shield size={24} />,
    title: 'Local & Private',
    desc: 'All data stays on your device, no servers',
    color: '#14b8a6',
  },
  {
    icon: <Heart size={24} />,
    title: 'Made with Love',
    desc: 'Crafted with ❤️ and ☕ for you & your friends',
    color: '#ef4444',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Decorative orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)',
          top: '10%',
          left: '-5%',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 250,
          height: 250,
          background: 'radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)',
          bottom: '15%',
          right: '-3%',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      {/* Hero Content */}
      <motion.div
        className="text-center max-w-3xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="badge badge-purple text-xs sm:text-sm">
            <Sparkles size={12} />
            Free & Open Source • No Sign-up Required
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Split Expenses{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text">Like a Pro</span>{' '}
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 14, -8, 14, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          >
            ✨
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed"
          style={{ color: '#94a3b8' }}
        >
          The smartest way to split bills with friends.
          Track every rupee, settle up instantly, and never argue about money again.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <motion.button
            className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center"
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(168,85,247,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} />
            Start Splitting — It's Free
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center"
            onClick={onGetStarted}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            See How It Works
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-16"
        >
          {[
            { value: '100%', label: 'Free Forever', emoji: '🆓' },
            { value: '0', label: 'Data Shared', emoji: '🔒' },
            { value: '∞', label: 'Splits', emoji: '✂️' },
            { value: '❤️', label: 'Made with Love', emoji: '' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.1, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold mb-0.5"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: 'linear-gradient(135deg, #c084fc, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.emoji} {stat.value}
              </div>
              <div className="text-xs sm:text-sm" style={{ color: '#64748b' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        className="w-full max-w-6xl mx-auto px-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-center text-xl sm:text-2xl font-bold mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Everything you need to{' '}
          <span className="gradient-text">split fairly</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass-card group cursor-default"
              whileHover={{
                scale: 1.03,
                rotateX: -2,
                rotateY: 2,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: '1000px' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                style={{
                  background: `${feat.color}15`,
                  color: feat.color,
                  border: `1px solid ${feat.color}25`,
                }}
              >
                {feat.icon}
              </div>
              <h3
                className="text-base font-semibold mb-1.5"
                style={{ color: '#f1f5f9' }}
              >
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-12"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '2px solid rgba(148,163,184,0.3)' }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: 'rgba(168,85,247,0.6)' }}
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
