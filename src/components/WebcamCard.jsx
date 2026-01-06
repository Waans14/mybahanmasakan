import React from 'react';
import PropTypes from 'prop-types';

const WebcamCard = ({ children, isLoading }) => {
    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/50 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />

            {/* Content */}
            <div className="w-full h-full relative z-10 flex items-center justify-center">
                {children}

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm">
                        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-emerald-300 animate-pulse">Memuat Model...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

WebcamCard.propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool
};

export default WebcamCard;
