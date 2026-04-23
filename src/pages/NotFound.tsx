import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '../components/ui';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 pt-5 text-center animate-in fade-in duration-700">
            {/* Visual Element */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-purple-200 blur-3xl opacity-30 rounded-full scale-150"></div>
                <div className="relative">
                    <span className="text-[120px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-indigo-900 leading-none select-none">
                        404
                    </span>
                    <div className="absolute -bottom-2 right-0 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 rotate-12 animate-bounce">
                        <Icon name="explore_off" size="xl" className="text-purple-600" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Lost in the data?
            </h1>
            <p className="text-gray-500 max-w-md mb-10 text-lg leading-relaxed">
                The page you're looking for doesn't exist or has been moved to another coordinate in the cloud.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/">
                    <Button variant="primary" size="lg" className="px-8 py-6 rounded-2xl shadow-lg shadow-purple-200 group">
                        <span className="flex items-center gap-2">
                            <Icon name="arrow_back" size="md" className="group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </span>
                    </Button>
                </Link>
                <Button variant="secondary" size="lg" className="px-8 py-6 rounded-2xl">
                    Report Issue
                </Button>
            </div>

            {/* Footer Tag */}
            <p className="mt-20 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                Nexus Enterprise Analytics
            </p>
        </div>
    );
};

export default NotFound;