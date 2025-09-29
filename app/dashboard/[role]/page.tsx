"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { Search, BookOpen, DatabaseZap, Clock, Briefcase, Users, Map, Server, Settings, MessageSquareQuote } from 'lucide-react';

// --- Reusable Widget Components ---
const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);

const InteractiveMap = () => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 col-span-1 md:col-span-2 row-span-2">
        <h3 className="font-bold text-gray-800 mb-4">Interactive Data Map</h3>
        <div className="h-full min-h-[400px] bg-gray-200 rounded-md flex items-center justify-center border">
            <p className="text-gray-500">Interactive Map Visualization</p>
        </div>
    </div>
);

const ChartCard = ({ title }: { title: string }) => (
     <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
        <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center border">
            <p className="text-gray-500">Chart Area</p>
        </div>
    </div>
);

// --- Role-Specific Dashboard Pages ---
const StudentDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Queries" value="142" icon={<Search size={24}/>} />
        <StatCard title="Datasets Accessed" value="12" icon={<DatabaseZap size={24}/>} />
        <StatCard title="Papers Viewed" value="8" icon={<BookOpen size={24}/>} />
        <StatCard title="Time Saved" value="~16 Hours" icon={<Clock size={24}/>} />
        <InteractiveMap />
        <div className="col-span-1 lg:col-span-2">
            <ChartCard title="Salinity Trend Analysis" />
        </div>
    </div>
);

const ResearcherDashboard = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value="4" icon={<Briefcase size={24}/>} />
        <StatCard title="Team Members" value="6" icon={<Users size={24}/>} />
        <StatCard title="Published Papers" value="2" icon={<BookOpen size={24}/>} />
        <StatCard title="API Calls Used" value="1,204" icon={<Server size={24}/>} />
    </div>
);

const LocalDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Monitored Region" value="Pimpri-Chinchwad" icon={<Map size={24}/>} />
        <StatCard title="Active Alerts" value="2" icon={<DatabaseZap size={24}/>} />
        <StatCard title="Data Points" value="2,450" icon={<Server size={24}/>} />
    </div>
);

const AdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="256" icon={<Users size={24}/>} />
        <StatCard title="Data Sources" value="5" icon={<Server size={24}/>} />
        <StatCard title="System Status" value="Online" icon={<Settings size={24}/>} />
        <StatCard title="API Usage" value="85%" icon={<DatabaseZap size={24}/>} />
    </div>
);

// --- Generic Page for other links ---
const GenericPage = ({ title }: { title: string }) => (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">{title.replace('-', ' ')}</h2>
        <p className="mt-4 text-gray-600">This is a placeholder page for the {title.replace('-', ' ')} section. Content will be added here.</p>
    </div>
);

const FeedbackPage = () => (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Submit Feedback</h2>
        <p className="mt-2 text-gray-600 mb-6">We value your input! Let us know how we can improve.</p>
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>General Comment</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea rows={5} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your experience..."></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Submit Feedback
            </button>
        </form>
    </div>
);

// --- Main Page Component ---
export default function DashboardPage() {
    const params = useParams();
    const role = params.role as string;
    const [activePage, setActivePage] = useState('dashboard');
    // Placeholder for username - in a real app, this would come from an auth context or API call
    const [username, setUsername] = useState('Student123'); 

    const renderContent = () => {
        if (activePage === 'dashboard') {
            switch(role) {
                case 'student': return <StudentDashboard />;
                case 'researcher': return <ResearcherDashboard />;
                case 'local': return <LocalDashboard />;
                case 'admin': return <AdminDashboard />;
                default: return <StudentDashboard />;
            }
        }
        if (activePage === 'feedback') {
            return <FeedbackPage />;
        }
        return <GenericPage title={activePage} />;
    };

    return (
        <DashboardLayout 
            role={role} 
            username={username} 
            activePage={activePage} 
            setActivePage={setActivePage}
        >
            {renderContent()}
        </DashboardLayout>
    );
}

