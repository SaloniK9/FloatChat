"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    LayoutDashboard, 
    FileText, 
    DatabaseZap, 
    Bot, 
    Settings, 
    CircleUserRound, 
    Briefcase,
    Map,
    Users,
    Server,
    LogOut,
    ChevronLeft,
    ChevronRight,
    MessageSquareQuote
} from 'lucide-react';

const FloatChatLogo = ({ className = "w-10 h-10 text-white" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50C75 63.8071 63.8071 75 50 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M37.5 50C37.5 43.0964 43.0964 37.5 50 37.5C56.9036 37.5 62.5 43.0964 62.5 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="20" cy="50" r="4" fill="currentColor"/><circle cx="28" cy="35" r="3" fill="currentColor"/><circle cx="40" cy="23" r="3" fill="currentColor"/><circle cx="55" cy="20" r="4" fill="currentColor"/><circle cx="70" cy="28" r="3" fill="currentColor"/><circle cx="80" cy="40" r="4" fill="currentColor"/><circle cx="80" cy="60" r="3" fill="currentColor"/>
    </svg>
);

const getNavLinks = (role: string) => {
    const baseLinks = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    ];

    const studentLinks = [
        ...baseLinks,
        { id: 'research', icon: <FileText size={20} />, label: 'Research Paper' },
        { id: 'extraction', icon: <DatabaseZap size={20} />, label: 'Data Extraction' },
        { id: 'ai-bot', icon: <Bot size={20} />, label: 'AI Bot' },
    ];
    
    // "Account" link has been removed from this universal list
    const universalLinks = [
        { id: 'feedback', icon: <MessageSquareQuote size={20} />, label: 'Feedback' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    switch (role) {
        case 'researcher':
            return [...studentLinks, { id: 'workspace', icon: <Briefcase size={20} />, label: 'Workspace' }, ...universalLinks];
        case 'local':
            return [...baseLinks, { id: 'regional-data', icon: <Map size={20} />, label: 'Regional Data' }, ...universalLinks];
        case 'admin':
            return [
                ...baseLinks,
                { id: 'user-management', icon: <Users size={20} />, label: 'User Management' },
                { id: 'data-sources', icon: <Server size={20} />, label: 'Data Sources' },
                { id: 'system-settings', icon: <Settings size={20} />, label: 'System Settings' },
                { id: 'feedback', icon: <MessageSquareQuote size={20} />, label: 'Feedback' },
            ];
        default: // Student
            return [...studentLinks, ...universalLinks];
    }
};

interface DashboardLayoutProps {
    role: string;
    username: string;
    activePage: string;
    setActivePage: (page: string) => void;
    children: React.ReactNode;
}

export default function DashboardLayout({ role, username, activePage, setActivePage, children }: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navLinks = getNavLinks(role);

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className={`flex flex-col bg-blue-950 text-gray-300 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className={`flex items-center h-20 border-b border-blue-900 ${isSidebarOpen ? 'px-6' : 'justify-center'}`}>
                    <FloatChatLogo />
                    {isSidebarOpen && <span className="ml-3 text-xl font-bold text-white">FloatChat</span>}
                </div>
                
                <nav className="flex-1 mt-4 space-y-2">
                    {navLinks.map((link) => (
                        <button 
                            key={link.id} 
                            onClick={() => setActivePage(link.id)}
                            className={`flex items-center w-full text-left py-3 transition-colors duration-200 ${isSidebarOpen ? 'px-6' : 'justify-center'} ${activePage === link.id ? 'bg-blue-700 text-white' : 'hover:bg-blue-900 hover:text-white'}`}
                        >
                            {link.icon}
                            {isSidebarOpen && <span className="ml-4 font-medium">{link.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className={`border-t border-blue-900 p-4 ${isSidebarOpen ? 'space-y-4' : ''}`}>
                    <div className="flex items-center">
                        <CircleUserRound size={40} className="w-10 h-10 rounded-full bg-blue-800 text-white p-1" />
                        {isSidebarOpen && (
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-white">{username}</p>
                                <p className="text-xs text-gray-400 capitalize">{role}</p>
                            </div>
                        )}
                    </div>
                     <Link href="/" className={`flex items-center w-full py-2 transition-colors duration-200 text-gray-400 hover:text-white ${isSidebarOpen ? 'px-2' : 'justify-center'}`}>
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between h-20 bg-white border-b border-gray-200 px-8">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 capitalize">
                        {activePage.replace('-', ' ')}
                    </h1>
                    <div className="w-10 h-10"></div> {/* Spacer */}
                </header>
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

