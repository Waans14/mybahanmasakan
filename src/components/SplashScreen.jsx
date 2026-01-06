import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SplashScreen = ({ show }) => {
    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900 to-slate-900" />

            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-6">
                {/* Logo/Icon */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                    <img
                        src="/icon.png"
                        alt="myBahanmasak"
                        className="relative w-32 h-32 rounded-3xl shadow-2xl shadow-emerald-500/50"
                    />
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400 mb-2">
                        myBahanmasak
                    </h1>
                    <p className="text-slate-400 text-lg">Klasifikasi Bahan masakan Real-Time</p>
                </motion.div>

                {/* Loading Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col items-center space-y-3"
                >
                    <div className="flex space-x-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                                animate={{
                                    y: [-10, 10, -10],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                    <p className="text-slate-500 text-sm animate-pulse">Memuat Model AI...</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

SplashScreen.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default SplashScreen;
