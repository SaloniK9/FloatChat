"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

// --- Reusable Components ---

const FloatChatLogo = ({ className = "w-24 h-24 text-white" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50C75 63.8071 63.8071 75 50 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M37.5 50C37.5 43.0964 43.0964 37.5 50 37.5C56.9036 37.5 62.5 43.0964 62.5 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="20" cy="50" r="3" fill="currentColor"/>
        <circle cx="28" cy="35" r="2" fill="currentColor"/>
        <circle cx="40" cy="23" r="2" fill="currentColor"/>
        <circle cx="55" cy="20" r="3" fill="currentColor"/>
        <circle cx="70" cy="28" r="2" fill="currentColor"/>
        <circle cx="80" cy="40" r="3" fill="currentColor"/>
        <circle cx="80" cy="60" r="2" fill="currentColor"/>
    </svg>
);

const BackgroundWaves = () => (
    <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: "rgba(56, 189, 248, 0.3)"}} />
                    <stop offset="100%" style={{stopColor: "rgba(37, 99, 235, 0)"}} />
                </linearGradient>
            </defs>
            <path fill="url(#wave-gradient)" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="rgba(30, 64, 175, 0.5)" d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,240C672,245,768,203,864,181.3C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
    </div>
);

// Define the type for the TabButton props
interface TabButtonProps {
    value: string;
    label: string;
    role: string;
    setRole: (role: string) => void;
}

const TabButton = ({ value, label, role, setRole }: TabButtonProps) => (
    <button
        type="button"
        onClick={() => setRole(value)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === value ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
    >
        {label}
    </button>
);

// --- The Main Landing Page Component ---
export default function LandingPage() {
    const [view, setView] = useState('signup'); // 'signup', 'login'
    const [role, setRole] = useState('student'); // 'student', 'researcher', 'local', 'admin'
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Submitting ${view} for ${role}`);
        router.push(`/dashboard/${role}`);
    };

    const getFormFields = () => {
        const commonFields = (
            <>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input name="username" required className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <div className="relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input name="password" type={showPassword ? 'text' : 'password'} required className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </>
        );

        if (view === 'login') return commonFields;

        // Signup fields
        switch (role) {
            case 'researcher':
                return <>
                    <div><label className="block text-gray-700 text-sm font-bold mb-2">Email</label><input name="email" type="email" required className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                    <div><label className="block text-gray-700 text-sm font-bold mb-2">ID of Organisation</label><input name="orgId" required className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                    {commonFields}
                </>;
            case 'local':
                return <>
                    <div><label className="block text-gray-700 text-sm font-bold mb-2">Region</label><input name="region" required className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                    {commonFields}
                </>;
            case 'admin':
                 return <>
                    <div><label className="block text-gray-700 text-sm font-bold mb-2">Admin Email</label><input name="email" type="email" required className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                    {commonFields}
                    <p className="text-xs text-gray-500 mt-1">Two-step authentication will be set up after registration.</p>
                </>;
            default: // Student
                return <>
                    <div><label className="block text-gray-700 text-sm font-bold mb-2">University Email</label><input name="email" type="email" required className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                    <div><label className="block text-gray-700 text-sm font-bold mb-2">College / Institution</label><input name="college" required className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                    {commonFields}
                </>;
        }
    };
    
    return (
        <main className="flex w-full h-screen bg-gray-100">
            {/* Left Branding Panel */}
            <div className="hidden lg:flex w-2/5 flex-col items-center justify-center bg-blue-950 text-white p-12 text-center relative overflow-hidden">
                <BackgroundWaves />
                <div className="z-10 flex flex-col items-center">
                    <FloatChatLogo />
                    <h1 className="text-4xl font-bold mt-4">FloatChat</h1>
                    <p className="text-lg text-blue-200 mt-2">
                        Your Conversational Gateway to Ocean Data
                    </p>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
                    <div className="flex justify-center bg-gray-100 p-1 rounded-lg mb-6">
                        <TabButton value="student" label="Student" role={role} setRole={setRole} />
                        <TabButton value="researcher" label="Researcher" role={role} setRole={setRole} />
                        <TabButton value="local" label="Local" role={role} setRole={setRole} />
                        <TabButton value="admin" label="Admin" role={role} setRole={setRole} />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                       <span className="capitalize">{view === 'signup' ? 'Create Your' : 'Log into Your'}</span> <span className="capitalize">{role}</span> Account
                    </h2>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {getFormFields()}
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            {view === 'signup' ? 'Create Account' : 'Log In'}
                        </button>
                    </form>
                    
                    <div className="text-center text-sm text-gray-600 mt-6">
                        <span>{view === 'signup' ? "Already have an account?" : "Don't have an account?"}</span>
                        <button onClick={() => setView(view === 'signup' ? 'login' : 'signup')} className="text-blue-600 hover:underline font-semibold ml-1">
                             {view === 'signup' ? 'Log In' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

