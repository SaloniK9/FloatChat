"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../app/components/DashboardLayout';
import { 
    Search, BookOpen, DatabaseZap, Briefcase, Users, Map as MapIcon, Server, Settings, 
    Thermometer, Waves, AlertTriangle, X, Globe, Send, User, BotMessageSquare, Bell, Printer, Wind
} from 'lucide-react';

// --- Type Definition for Float Data ---
interface FloatData {
    id: string;
    lat: number;
    lon: number;
    temp: number;
    salinity: number;
}

// --- Mock Data for UI Demonstration ---
const mockFloats: FloatData[] = [
    { id: 'F7A9', lat: 18.52, lon: 73.85, temp: 28.5, salinity: 35.2 },
    { id: 'B3C1', lat: 19.07, lon: 72.87, temp: 29.1, salinity: 36.1 },
    { id: 'D9E4', lat: 18.92, lon: 72.83, temp: 28.8, salinity: 35.8 },
];

const mockPapers = [
    { title: "Analysis of Salinity Variation in the Arabian Sea", author: "INCOIS", year: 2024, link: "https://www.incois.gov.in/documents/Research-Papers/paper1.pdf" },
    { title: "Impact of BGC Floats on Climate Modeling", author: "IIT Madras", year: 2023, link: "https://www.iitm.ac.in/documents/Research-Papers/paper2.pdf" },
    { title: "Real-time Ocean Temperature Monitoring", author: "CSIR-NIO", year: 2024, link: "https://www.nio.org/document/research-papers/paper3.pdf" },
];

// --- Reusable UI Components ---

const FloatDetailModal = ({ float, onClose, role }: { float: FloatData | null, onClose: () => void, role: string }) => {
    if (!float) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"><X size={20}/></button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">BGC Float Details: <span className="text-blue-600">{float.id}</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-bold text-gray-700 mb-2">Live Data</h3>
                        <p><strong>Temperature:</strong> {float.temp}°C</p>
                        <p><strong>Salinity:</strong> {float.salinity} PSU</p>
                        <p><strong>Location:</strong> {float.lat}, {float.lon}</p>
                    </div>
                    {role === 'local' && (
                         <div>
                            <h3 className="font-bold text-gray-700 mb-2">Analysis & Commentary</h3>
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg">
                                <p className="font-semibold">High Salinity Alert!</p>
                                <p>Salinity at this point is unusually high. This could indicate a higher concentration of nutrients, increasing the chances of finding more fish in this area.</p>
                            </div>
                        </div>
                    )}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-bold text-gray-700 mb-2">Data Trends</h3>
                        <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center border">
                             <p className="text-gray-500">Graphs for Temperature & Salinity Trends</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MapViewer = ({ onFloatClick }: { onFloatClick: (float: FloatData) => void }) => {
    const [mapMode, setMapMode] = useState('2d');
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <h3 className="font-bold text-gray-800">BGC Float Tracking (INCOIS Style)</h3>
                <div className="flex items-center gap-4">
                     <p className="text-xs text-gray-500">Last Updated: {lastUpdated}</p>
                    <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                        <button onClick={() => setMapMode('2d')} className={`px-3 py-1 text-sm rounded-md transition-colors ${mapMode === '2d' ? 'bg-white shadow' : 'hover:bg-gray-300'}`}>2D</button>
                        <button onClick={() => setMapMode('3d')} className={`px-3 py-1 text-sm rounded-md transition-colors ${mapMode === '3d' ? 'bg-white shadow' : 'hover:bg-gray-300'}`}>3D</button>
                    </div>
                </div>
            </div>
            <div className="h-[60vh] min-h-[500px] bg-gray-800 rounded-md flex items-center justify-center border relative overflow-hidden">
                <p className="text-gray-400 z-10">Interactive {mapMode.toUpperCase()} Map Visualization (Leaflet/Cesium)</p>
                {mockFloats.map(float => (
                    <button 
                        key={float.id}
                        onClick={() => onFloatClick(float)}
                        className="absolute w-4 h-4 bg-cyan-400 rounded-full z-20 hover:scale-150 transition-transform shadow-lg border-2 border-white"
                        style={{ top: `${(19.1 - float.lat) * 250}%`, left: `${(float.lon - 72.8) * 200}%` }}
                        title={`BGC Float ${float.id}`}
                    ></button>
                ))}
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

const DataChartCard = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
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


const MainDashboard = ({ role, onFloatClick }: { role: string, onFloatClick: (float: FloatData) => void }) => {
    const roleSpecificStats = () => {
        switch(role) {
            case 'researcher':
                return <>
                    <StatCard title="Active Projects" value="4" icon={<Briefcase size={24}/>} />
                    <StatCard title="Team Members" value="6" icon={<Users size={24}/>} />
                    <StatCard title="Published Papers" value="2" icon={<BookOpen size={24}/>} />
                    <StatCard title="API Calls Used" value="1,204" icon={<Server size={24}/>} />
                </>;
            case 'local':
                return <>
                    <StatCard title="Monitored Region" value="Pimpri-Chinchwad" icon={<MapIcon size={24}/>} />
                    <StatCard title="Active Alerts" value="2" icon={<AlertTriangle size={24}/>} />
                    <StatCard title="Data Points" value="2,450" icon={<DatabaseZap size={24}/>} />
                    <StatCard title="BGC Floats" value="3" icon={<Globe size={24}/>} />
                </>;
             case 'admin':
                return <>
                    <StatCard title="Total Users" value="256" icon={<Users size={24}/>} />
                    <StatCard title="Data Sources" value="5" icon={<Server size={24}/>} />
                    <StatCard title="System Status" value="Online" icon={<Settings size={24}/>} />
                    <StatCard title="Critical Alerts" value="1" icon={<AlertTriangle size={24}/>} />
                </>;
            default: // Student
                 return <>
                    <StatCard title="Total Queries" value="142" icon={<Search size={24}/>} />
                    <StatCard title="Datasets Accessed" value="12" icon={<DatabaseZap size={24}/>} />
                    <StatCard title="BGC Floats Tracked" value="3" icon={<Globe size={24}/>} />
                    <StatCard title="Active Alerts" value="2" icon={<AlertTriangle size={24}/>} />
                </>;
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roleSpecificStats()}
            </div>
            <MapViewer onFloatClick={onFloatClick} />
            <div>
                <h2 className="text-2xl font-bold text-gray-800 my-6">Detailed Analysis Graphs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DataChartCard title="Temperature (°C)" icon={<Thermometer size={20} />} />
                    <DataChartCard title="Salinity (PSU)" icon={<Waves size={20} />} />
                    <DataChartCard title="Wind Speed (km/h)" icon={<Wind size={20} />} />
                    <DataChartCard title="Pressure (hPa)" icon={<DatabaseZap size={20} />} />
                </div>
            </div>
        </div>
    );
};

const ChatBotPanel = () => {
    const [messages, setMessages] = useState([{ text: "Hello! I am FloatChat AI. How can I help you analyze ocean data today?", sender: 'bot' }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() === '') return;
        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages); setInput(''); setIsLoading(true);
        try {
            const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input }) });
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
        } catch (error) {
            console.error("Chat API error:", error);
            setMessages([...newMessages, { text: "Sorry, I'm having trouble connecting to the AI service. Please try again.", sender: 'bot' }]);
        } finally { setIsLoading(false); }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border h-full flex flex-col max-h-[80vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><BotMessageSquare className="mr-2 text-blue-600"/>AI Chat Assistant</h2>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'bot' ? '' : 'justify-end'}`}>
                        {msg.sender === 'bot' && <div className="p-2 bg-blue-600 text-white rounded-full self-start"><BotMessageSquare size={20}/></div>}
                        <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>{msg.text}</div>
                        {msg.sender === 'user' && <div className="p-2 bg-gray-200 text-gray-800 rounded-full self-start"><User size={20}/></div>}
                    </div>
                ))}
                {isLoading && <div className="flex items-start gap-3"><div className="p-2 bg-blue-600 text-white rounded-full"><BotMessageSquare size={20}/></div><div className="p-3 bg-gray-200 text-gray-500 rounded-lg">Analyzing...</div></div>}
            </div>
            <div className="mt-4 flex">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about salinity, temperature..." className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"/>
                <button onClick={handleSend} className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading}><Send size={20}/></button>
            </div>
        </div>
    );
};

const SettingsPage = ({ user }: { user: { username: string, role: string }}) => {
     return (
        <div className="bg-white p-8 rounded-lg shadow-md border max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <nav className="space-y-2">
                        <a href="#profile" className="flex items-center px-4 py-2 text-blue-600 bg-blue-100 rounded-md font-semibold"><User className="mr-3" size={20}/> Profile</a>
                        <a href="#notifications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><Bell className="mr-3" size={20}/> Notifications</a>
                    </nav>
                </div>
                <div className="md:col-span-2 space-y-10">
                    <form id="profile" className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Edit Profile</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" defaultValue={user.username} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" defaultValue={`${user.role}@floatchat.com`} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save All Changes</button>
                        </div>
                    </form>
                    <div id="notifications">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Notification Preferences</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-md">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Email Notifications</h4>
                                    <p className="text-sm text-gray-600">Receive critical alerts and updates via email.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResearchPaperPage = () => (
    <div className="bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Research Papers & Documents</h2>
        <div className="space-y-4">
            {mockPapers.map((paper, index) => (
                <div key={index} className="flex flex-wrap items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                    <div>
                        <a href={paper.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">{paper.title}</a>
                        <p className="text-sm text-gray-600">{paper.author} ({paper.year})</p>
                    </div>
                    <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 flex-shrink-0">
                        <Printer size={16} /> Print
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const FeedbackPage = () => (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Submit Feedback</h2>
        <p className="mt-2 text-gray-600 mb-6">We value your input! Let us know how we can improve.</p>
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                    <option>General Comment</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea rows={5} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" placeholder="Describe your experience..."></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Submit Feedback
            </button>
        </form>
    </div>
);

const GenericPage = ({ title }: { title: string }) => (
    <div className="bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">{title.replace('-', ' ')}</h2>
        <p className="mt-4 text-gray-600">This is a placeholder page for the {title.replace('-', ' ')} section.</p>
    </div>
);

// --- Main Page Component ---
export default function DashboardPage() {
    const params = useParams();
    const role = params.role as string;
    const username = (params.username as string) || (role ? `${role.charAt(0).toUpperCase() + role.slice(1)} User` : 'User');
    const [activePage, setActivePage] = useState('dashboard');
    const [isMapModalOpen, setMapModalOpen] = useState(false);
    const [selectedFloat, setSelectedFloat] = useState<FloatData | null>(null);

    const handleFloatClick = (float: FloatData) => { setSelectedFloat(float); setMapModalOpen(true); };

    if (!role) { return <div className="flex h-screen items-center justify-center">Loading...</div>; }

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <MainDashboard role={role} onFloatClick={handleFloatClick} />;
            case 'research':
                return <ResearchPaperPage />;
            case 'ai-bot':
                return <ChatBotPanel />;
            case 'settings':
                return <SettingsPage user={{ username, role }} />;
            case 'feedback':
                return <FeedbackPage />;
            default:
                return <GenericPage title={activePage} />;
        }
    };

    return (
        <>
            <DashboardLayout 
                role={role} 
                username={username}
                activePage={activePage} 
                setActivePage={setActivePage}
            >
                {renderContent()}
            </DashboardLayout>
            {isMapModalOpen && <FloatDetailModal float={selectedFloat} onClose={() => setMapModalOpen(false)} role={role} />}
        </>
    );
}

