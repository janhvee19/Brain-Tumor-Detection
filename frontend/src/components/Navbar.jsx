import React from 'react';
import { Brain } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-slate-800 border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Brain className="h-8 w-8 text-blue-500" />
                        <span className="ml-2 text-xl font-bold text-white">NeuroScan AI</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#" className="bg-slate-900 text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="#" className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">History</a>
                            <a href="#" className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
