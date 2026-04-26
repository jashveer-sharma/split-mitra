import { motion } from 'framer-motion';

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { wrapper: 36, icon: 18, text: '1.1rem' },
    md: { wrapper: 44, icon: 22, text: '1.35rem' },
    lg: { wrapper: 64, icon: 32, text: '2rem' },
    xl: { wrapper: 80, icon: 40, text: '2.5rem' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <motion.div
      className="flex items-center gap-2 select-none cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Animated Logo Icon */}
      <div className="relative" style={{ width: s.wrapper, height: s.wrapper }}>
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #a855f7, #ec4899, #3b82f6, #a855f7)',
            padding: 2,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: '#0a0a1a' }}
          />
        </motion.div>

        {/* Inner glowing circle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: s.wrapper - 8,
              height: s.wrapper - 8,
              background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Rupee symbol */}
            <svg
              width={s.icon}
              height={s.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M7 4h10M7 8h10M7 4c0 0 2 8 5 8s5-8 5-8M12 12l-5 8h2l3-4.5L15 20h2l-5-8"
                stroke="url(#logoGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="logoGrad" x1="7" y1="4" x2="17" y2="20">
                  <stop stopColor="#c084fc" />
                  <stop offset="1" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Floating sparkle dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: i === 0 ? '#a855f7' : i === 1 ? '#ec4899' : '#3b82f6',
            }}
            animate={{
              x: [0, Math.cos((i * 120 * Math.PI) / 180) * (s.wrapper * 0.6)],
              y: [0, Math.sin((i * 120 * Math.PI) / 180) * (s.wrapper * 0.6)],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            initial={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <motion.span
          style={{
            fontSize: s.text,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            background: 'linear-gradient(135deg, #c084fc, #f472b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Split Mitra
        </motion.span>
        {size !== 'sm' && (
          <motion.span
            style={{
              fontSize: `calc(${s.text} * 0.45)`,
              color: '#64748b',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Split Smarter ✨
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
