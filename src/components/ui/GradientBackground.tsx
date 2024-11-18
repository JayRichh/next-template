'use client';

import { motion } from 'framer-motion';

export const GradientBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-gray-950 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-800 dark:to-pink-800 opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [30, -30, 30],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-300 to-teal-300 dark:from-blue-800 dark:to-teal-800 opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [0.8, 1.1, 0.8],
            x: [-20, 20, -20],
            y: [15, -15, 15],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-rose-300 to-orange-300 dark:from-rose-800 dark:to-orange-800 opacity-30 blur-3xl"
        />
      </div>
    </div>
  );
};
