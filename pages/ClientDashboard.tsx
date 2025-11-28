import React, { useState, useEffect } from 'react';
import { ServiceType, User } from '../types';
import { ChecklistTool } from './ChecklistTool';
import { LayoutDashboard, FileText, Settings, LogOut, Bell, UserCircle } from 'lucide-react';
import { authService } from '../services/authService';

interface ClientDashboardProps {
  user: User;
  onLogout: () => void;
  initialChecklistRequest?: { service: ServiceType; query: string } | null;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, onLogout, initialChecklistRequest }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tools'>('overview');

  // Auto-switch to tools tab if a checklist request is passed
  useEffect(() => {
    if (initialChecklistRequest) {
      setActiveTab('tools');
    }
  }, [initialChecklistRequest]);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r border-slate-200 lg:fixed lg:h-full lg:pt-20 z-10">
        <div className="p-6 border-b border-slate-100 lg:hidden">
            <h2 className="text-lg font-bold text-slate-800">My Portal</h2>
        </div>
        <div className="p-4 space-y-2">
           <button 
             onClick={() => setActiveTab('overview')}
             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
           >
             <LayoutDashboard className="w-5 h-5" />
             <span>Overview</span>
           </button>
           <button 
             onClick={() => setActiveTab('tools')}
             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'tools' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
           >
             <FileText className="w-5 h-5" />
             <span>Process Assistant</span>
           </button>
           <div className="pt-4 mt-4 border-t border-slate-100">
             <button 
               className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
             >
               <Settings className="w-5 h-5" />
               <span>Settings</span>
             </button>
             <button 
               onClick={handleLogout}
               className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
             >
               <LogOut className="w-5 h-5" />
               <span>Log Out</span>
             </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64">
        {activeTab === 'overview' && (
           <div className="p-8 max-w-7xl mx-auto">
             <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
               <div>
                 <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}</h1>
                 <p className="text-slate-500 mt-1">Here's what's happening with your services today.</p>
               </div>
               <div className="flex items-center space-x-4">
                 <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span>
                 </button>
                 <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <div className="hidden md:block">
                      <div className="text-sm font-medium text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.company}</div>
                    </div>
                 </div>
               </div>
             </header>

             {/* Quick Stats/Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
               <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                 <div className="text-slate-500 text-sm font-medium mb-2">Active Services</div>
                 <div className="text-3xl font-bold text-slate-900">3</div>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                 <div className="text-slate-500 text-sm font-medium mb-2">Pending Actions</div>
                 <div className="text-3xl font-bold text-orange-600">2</div>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                 <div className="text-slate-500 text-sm font-medium mb-2">Saved Checklists</div>
                 <div className="text-3xl font-bold text-blue-600">5</div>
               </div>
             </div>

             {/* Recent Activity or Call to Action */}
             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Need a new process checklist?</h3>
                  <p className="text-slate-600">Use our AI assistant to generate a step-by-step guide for your next task.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('tools')}
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Go to Assistant
                </button>
             </div>
           </div>
        )}

        {activeTab === 'tools' && (
          <div className="p-4 md:p-8">
            <ChecklistTool 
              initialService={initialChecklistRequest?.service} 
              initialQuery={initialChecklistRequest?.query} 
            />
          </div>
        )}
      </div>
    </div>
  );
};