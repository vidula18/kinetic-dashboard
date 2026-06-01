import React, { useState, useMemo } from 'react';
import { Search, LayoutDashboard, BarChart3, Users, Calendar, Bell } from 'lucide-react';
import { MOCK_LEADS } from './data/mockLeads';
import type { LabelType } from './data/labelConfig';
import { SplitScreenLayout } from './components/SplitScreenLayout';
import { LeadQueue } from './components/LeadQueue';
import { LeadDetail } from './components/LeadDetail';
import { QuickFilterBar } from './components/QuickFilterBar';
import { AIAlertsTable } from './components/AIAlertsTable';
import { FreshLeadsTable } from './components/FreshLeadsTable';
import { SalesTeamPerformance } from './components/SalesTeamPerformance';
import { SalesPerformance } from './components/SalesPerformance';

type TabType = 'Alerts' | 'Leads' | 'SalesTeamPerformance' | 'SalesPerformance';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('SalesTeamPerformance');
  const [activeFilter, setActiveFilter] = useState<LabelType | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(MOCK_LEADS[0]?.id || null);
  const [isCallActive, setIsCallActive] = useState(false);

  // Filter leads based on active filter
  const filteredLeads = useMemo(() => {
    return activeFilter 
      ? MOCK_LEADS.filter(lead => lead.labels.some(l => l.text === activeFilter))
      : MOCK_LEADS;
  }, [activeFilter]);

  // When filter changes, optionally auto-select the first lead in the new list
  const handleFilterChange = (filter: LabelType | null) => {
    setActiveFilter(filter);
    const newFilteredLeads = filter 
      ? MOCK_LEADS.filter(lead => lead.labels.some(l => l.text === filter))
      : MOCK_LEADS;
    
    if (newFilteredLeads.length > 0) {
      setSelectedLeadId(newFilteredLeads[0].id);
    } else {
      setSelectedLeadId(null);
    }
  };

  const selectedLead = useMemo(() => {
    return MOCK_LEADS.find(l => l.id === selectedLeadId) || null;
  }, [selectedLeadId]);

  const handleNavigateToLead = (leadName: string) => {
    const lead = MOCK_LEADS.find(l => l.name === leadName);
    if (lead) {
      setSelectedLeadId(lead.id);
      setActiveTab('Leads');
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col flex-shrink-0 z-30 relative shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">KA</div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Kinetic Age</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
        
        <div className="flex-1 py-4">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Workspace</p>
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border-r-4 border-blue-600">
              <LayoutDashboard className="mr-3 h-5 w-5 text-blue-600" /> Sales Inbox
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Users className="mr-3 h-5 w-5 text-gray-400" /> All Clients
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Calendar className="mr-3 h-5 w-5 text-gray-400" /> Appointments
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <BarChart3 className="mr-3 h-5 w-5 text-gray-400" /> Performance
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 flex items-center justify-between flex-shrink-0 z-20 shadow-sm sticky top-0">
          <div className="flex-1 flex items-center">
            <button className="lg:hidden p-2 text-gray-400 hover:text-gray-500 mr-2">
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 mr-6">Dashboard</h1>
            <div className="max-w-md w-full relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                placeholder="Search leads..." 
              />
            </div>
          </div>
          <div className="ml-4 flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Riddhi</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                AD
              </div>
            </div>
          </div>
        </header>



        {/* Tabs and Filters Area */}
        <div className="mb-2 mx-4 sm:mx-6 lg:mx-8 flex justify-between items-end border-b border-gray-200">
          <div className="flex space-x-1 overflow-x-auto min-w-0">
            <button 
              onClick={() => setActiveTab('Alerts')}
              className={`px-6 py-3 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                activeTab === 'Alerts' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}>
              Alerts
            </button>
            <button 
              onClick={() => setActiveTab('Leads')}
              className={`px-6 py-3 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                activeTab === 'Leads' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}>
              Leads
            </button>
            <button 
              onClick={() => setActiveTab('SalesTeamPerformance')}
              className={`px-6 py-3 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                activeTab === 'SalesTeamPerformance' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}>
              Sales Team Performance
            </button>
            <button 
              onClick={() => setActiveTab('SalesPerformance')}
              className={`px-6 py-3 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                activeTab === 'SalesPerformance' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}>
              Sales Performance
            </button>
          </div>
          
          {activeTab === 'Leads' && (
            <div className="flex-shrink-0 ml-4 pb-2 flex items-center">
              <QuickFilterBar 
                leads={MOCK_LEADS} 
                activeFilter={activeFilter} 
                onFilterChange={handleFilterChange} 
              />
            </div>
          )}
        </div>

        {activeTab === 'SalesTeamPerformance' && (
          <SalesTeamPerformance />
        )}

        {activeTab === 'SalesPerformance' && (
          <SalesPerformance onNavigateToLead={handleNavigateToLead} />
        )}

        {activeTab === 'Leads' && (
          /* Master-Detail Split Screen Layout */
          <div className="h-[600px] lg:h-[750px] flex-shrink-0 relative z-10 border-y border-gray-200 bg-white">
            <SplitScreenLayout 
              leftPane={
                <LeadQueue 
                  leads={filteredLeads} 
                  selectedLeadId={selectedLeadId} 
                  onSelectLead={setSelectedLeadId} 
                  isCompact={isCallActive}
                />
              }
              rightPane={
                <LeadDetail lead={selectedLead} onCallStateChange={setIsCallActive} />
              }
            />
          </div>
        )}
        
        {activeTab === 'Alerts' && (
          <div className="pb-12 mt-4">
            <FreshLeadsTable leads={MOCK_LEADS} onNavigateToLead={handleNavigateToLead} />
            <AIAlertsTable onNavigateToLead={handleNavigateToLead} />
          </div>
        )}
      </main>
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
