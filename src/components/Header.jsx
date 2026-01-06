import React from 'react';
import { Camera } from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
                    <Camera className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
                    myBahanMasakan
                </h1>
            </div>
            <p className="text-slate-400 text-lg font-medium">Klasifikasi Bahan Masakan Real-Time</p>
        </header>
    );
};

export default Header;
