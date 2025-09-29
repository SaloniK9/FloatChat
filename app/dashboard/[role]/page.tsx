"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { 
    Search, BookOpen, DatabaseZap, Clock, Briefcase, Users, Map as MapIcon, Server, Settings, 
    MessageSquareQuote, Thermometer, Waves, AlertTriangle, X, Globe 
} from 'lucide-react';

// --- Type Definitions ---
interface Alert {
    id: number;
    type: 'critical' | 'warning' | 'info';
    message: string;
}

// --- New Reusable Widget Components ---

const AlertsPanel = () => {
    const [alerts, setAlerts] = useState<Alert[]>([
        { id: 1, type: 'critical', message: 'Critical Salinity Anomaly detected in Arabian Sea sector.' },
        { id: 2, type: 'warning', message: 'BGC Float #A4F2 offline for 3 hours.' },
        { id: 3, type: 'info', message: 'System maintenance scheduled for 10 PM IST.' },
    ]);

    if (alerts.length === 0) return null;

    const alertStyles = {
        critical: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700',
    };

    return (
        <div className="mb-6 space-y-3">
            {alerts.map(alert => (
                <div key={alert.id} className={`p-4 border-l-4 rounded-r-lg flex items-center justify-between shadow-sm ${alertStyles[alert.type]}`}>
                    <div className="flex items-center">
                        <AlertTriangle size={20} className="mr-3" />
                        <p className="font-medium">{alert.message}</p>
                    </div>
                    <button onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))} className="p-1 rounded-full hover:bg-black/10">
                        <X size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
};

interface DataChartCardProps {
    title: string;
    icon: React.ReactNode;
}

const DataChartCard = ({ title, icon }: DataChartCardProps) => (
     <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center text-gray-800 mb-4">
            {icon}
            <h3 className="font-bold ml-2">{title}</h3>
        </div>
        <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center border">
            <p className="text-gray-500">Chart Area</p>
        </div>
    </div>
);

const MapViewer = () => {
    const [mapMode, setMapMode] = useState('2d'); // '2d' or '3d'

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 col-span-1 md:col-span-2 row-span-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">BGC Float Tracking</h3>
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                    <button onClick={() => setMapMode('2d')} className={`px-3 py-1 text-sm rounded-md ${mapMode === '2d' ? 'bg-white shadow' : 'hover:bg-gray-300'}`}>2D</button>
                    <button onClick={() => setMapMode('3d')} className={`px-3 py-1 text-sm rounded-md ${mapMode === '3d' ? 'bg-white shadow' : 'hover:bg-gray-300'}`}>3D</button>
                </div>
            </div>
            <div className="h-full min-h-[400px] bg-gray-200 rounded-md flex items-center justify-center border relative">
                <p className="text-gray-500">Interactive {mapMode.toUpperCase()} Map Visualization</p>
                <div className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-md shadow">
                     <Globe size={24} className="text-blue-600" />
                </div>
            </div>
        </div>
    );
};


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


// --- Role-Specific Dashboard Pages ---
const StudentDashboard = () => (
    <div>
        <AlertsPanel />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Queries" value="142" icon={<Search size={24}/>} />
            <StatCard title="Datasets Accessed" value="12" icon={<DatabaseZap size={24}/>} />
            <StatCard title="BGC Floats Tracked" value="3" icon={<Globe size={24}/>} />
            <StatCard title="Active Alerts" value="2" icon={<AlertTriangle size={24}/>} />
            
            <MapViewer />

            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataChartCard title="Temperature (°C)" icon={<Thermometer size={20} />} />
                <DataChartCard title="Salinity (PSU)" icon={<Waves size={20} />} />
            </div>
        </div>
    </div>
);

const ResearcherDashboard = () => (
     <div>
        <AlertsPanel />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Active Projects" value="4" icon={<Briefcase size={24}/>} />
            <StatCard title="BGC Floats Monitored" value="28" icon={<Globe size={24}/>} />
            <StatCard title="Published Papers" value="2" icon={<BookOpen size={24}/>} />
            <StatCard title="API Calls Used" value="1,204" icon={<Server size={24}/>} />
        </div>
    </div>
);

const LocalDashboard = () => (
    <div>
        <AlertsPanel />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Monitored Region" value="Pimpri-Chinchwad" icon={<MapIcon size={24}/>} />
            <StatCard title="Active Alerts" value="2" icon={<AlertTriangle size={24}/>} />
            <StatCard title="Data Points" value="2,450" icon={<DatabaseZap size={24}/>} />
        </div>
    </div>
);

const AdminDashboard = () => (
    <div>
        <AlertsPanel />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value="256" icon={<Users size={24}/>} />
            <StatCard title="Data Sources" value="5" icon={<Server size={24}/>} />
            <StatCard title="System Status" value="Online" icon={<Settings size={24}/>} />
            <StatCard title="Critical Alerts" value="1" icon={<AlertTriangle size={24}/>} />
        </div>
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
    const username = (params.username as string) || (role ? `${role.charAt(0).toUpperCase() + role.slice(1)} User` : 'User');
    const [activePage, setActivePage] = useState('dashboard');

    // This check prevents rendering before the router is ready
    if (!role) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

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

