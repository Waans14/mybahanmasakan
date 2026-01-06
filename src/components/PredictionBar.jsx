import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PredictionBar = ({ className, probability, isHighest }) => {
    const percentage = (probability * 100).toFixed(1);

    return (
        <div className="w-full mb-4 group">
            <div className="flex justify-between items-center mb-1">
                <span className={clsx(
                    "font-medium transition-colors duration-300",
                    isHighest ? "text-emerald-400" : "text-slate-300"
                )}>
                    {className}
                </span>
                <span className={clsx(
                    "text-sm font-mono transition-colors duration-300",
                    isHighest ? "text-emerald-400" : "text-slate-500"
                )}>
                    {percentage}%
                </span>
            </div>
            <div className="w-full h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
                <motion.div
                    className={clsx(
                        "h-full rounded-full bg-gradient-to-r shadow-lg transition-all duration-300",
                        isHighest
                            ? "from-emerald-500 via-green-500 to-emerald-400 shadow-emerald-500/20"
                            : "from-slate-600 to-slate-500 opacity-60"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                />
            </div>
        </div>
    );
};

PredictionBar.propTypes = {
    className: PropTypes.string.isRequired,
    probability: PropTypes.number.isRequired,
    isHighest: PropTypes.bool
};

export default PredictionBar;
