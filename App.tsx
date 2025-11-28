import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ChecklistTool } from './pages/ChecklistTool';
import { AuthPage } from './pages/AuthPage';
import { ClientDashboard } from './pages/ClientDashboard';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { authService } from './services/authService';
import { ServiceType, ServiceInfo, User } from './types';
import { ArrowRight, Users, Shield, Briefcase, Monitor, CheckCircle, Quote, ArrowUpRight } from 'lucide-react';

/* --- Inline Components for simplicity and file count constraint --- */

// --- SERVICE DATA ---
const SERVICES: ServiceInfo[] = [
  {
    id: ServiceType.EMPLOYMENT,
    title: "Employment Agency",
    iconName: "Users",
    shortDesc: "Comprehensive staffing and recruitment solutions.",
    fullDesc: "We connect top talent with leading organizations. Our employment agency handles everything from recruitment and screening to work permit applications and onboarding.",
    features: ["Talent Acquisition", "Foreign Worker Permits", "Payroll Management", "HR Consulting"]
  },
  {
    id: ServiceType.INSURANCE,
    title: "Insurance Agency",
    iconName: "Shield",
    shortDesc: "Protecting what matters most with tailored policies.",
    fullDesc: "Our insurance division provides extensive coverage options for businesses and individuals, ensuring peace of mind in an unpredictable world.",
    features: ["Corporate Liability", "Group Health Insurance", "Asset Protection", "Risk Assessment"]
  },
  {
    id: ServiceType.MANAGEMENT,
    title: "Management Services",
    iconName: "Briefcase",
    shortDesc: "Optimizing operations for sustainable growth.",
    fullDesc: "Expert management consultancy to streamline your business processes, improve efficiency, and drive strategic growth.",
    features: ["Strategic Planning", "Process Optimization", "Financial Advisory", "Project Management"]
  },
  {
    id: ServiceType.IT,
    title: "IT Services",
    iconName: "Monitor",
    shortDesc: "Cutting-edge technology solutions for modern business.",
    fullDesc: "From custom software development to network security, our IT division empowers your business with digital tools for the future.",
    features: ["Software Development", "Cloud Infrastructure", "Cybersecurity", "Technical Support"]
  }
];

const IconMap: Record<string, React.FC<any>> = {
  Users: Users,
  Shield: Shield,
  Briefcase: Briefcase,
  Monitor: Monitor
};

// --- HOME PAGE COMPONENT ---
const HomePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
            Welcome to Bebest Group
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Synergy in Service,<br/>
            <span className="text-blue-400">Excellence in Execution.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
            A diversified conglomerate delivering integrated solutions across employment, insurance, management, and technology sectors.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onNavigate('services')}
              className="px-8 py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/50"
            >
              Explore Services
            </button>
            <button 
              onClick={() => onNavigate('portal')}
              className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center group"
            >
              Client Portal <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="bg-slate-50 py-24 relative z-20 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => {
              const Icon = IconMap[s.iconName];
              return (
                <div key={s.id} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {s.shortDesc}
                  </p>
                  <button 
                    onClick={() => onNavigate('services')} 
                    className="text-blue-600 text-sm font-medium hover:text-blue-800 inline-flex items-center"
                  >
                    Learn more <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Simplifying Complexity for Your Business
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              At Bebest Group, we understand that modern businesses face multifaceted challenges. 
              Our unique structure allows us to offer cross-functional expertise that standalone agencies cannot match.
            </p>
            <ul className="space-y-4">
              {[
                "Integrated workflow between insurance and HR.",
                "Tech-driven management solutions.",
                "End-to-end employee lifecycle management."
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 bg-slate-100 rounded-2xl p-8 md:p-12 relative">
             <Quote className="absolute top-8 left-8 text-blue-200 w-16 h-16 -z-0" />
             <blockquote className="relative z-10">
               <p className="text-xl italic text-slate-700 mb-6">
                 "Bebest Group streamlined our entire hiring process, from permits to insurance coverage. A truly one-stop solution."
               </p>
               <footer className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                 <div>
                   <div className="font-bold text-slate-900">Sarah Jenkins</div>
                   <div className="text-sm text-slate-500">Director of Ops, TechFlow Inc.</div>
                 </div>
               </footer>
             </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SERVICES PAGE COMPONENT ---
interface ServicesPageProps {
  onFeatureClick: (service: ServiceType, feature: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onFeatureClick }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Expertise</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Deep domain knowledge across four pillars of business excellence.
          </p>
        </div>

        <div className="space-y-20">
          {SERVICES.map((service, idx) => {
             const Icon = IconMap[service.iconName];
             const isEven = idx % 2 === 0;
             return (
               <div key={service.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden`}>
                 <div className="w-full md:w-2/5 bg-slate-900 p-12 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <Icon className="w-12 h-12 mb-6 text-blue-400 relative z-10" />
                    <h3 className="text-2xl font-bold mb-4 relative z-10">{service.title}</h3>
                    <p className="text-slate-300 relative z-10">{service.shortDesc}</p>
                 </div>
                 <div className="w-full md:w-3/5 p-12 flex flex-col justify-center">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">What we offer</h4>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      {service.fullDesc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feat, i) => (
                        <button 
                          key={i} 
                          onClick={() => onFeatureClick(service.id, feat)}
                          className="flex items-center text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
                          title="View details"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 group-hover:scale-125 transition-transform"></div>
                          <span className="flex-grow">{feat}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transition-all" />
                        </button>
                      ))}
                    </div>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [pendingChecklist, setPendingChecklist] = useState<{service: ServiceType, query: string} | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<{service: ServiceType, feature: string} | null>(null);

  useEffect(() => {
    // Check for existing session
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setActivePage('portal');
  };

  const handleLogout = () => {
    setUser(null);
    setPendingChecklist(null);
    setActivePage('home');
  };

  const handleFeatureClick = (service: ServiceType, feature: string) => {
    // Navigate to the detail page first
    setSelectedFeature({ service, feature });
    setActivePage('service-detail');
  };

  const handleSignUpFromDetail = () => {
    // When they click "Sign Up" from the detail page, we preserve the intent
    if (selectedFeature) {
        setPendingChecklist({
            service: selectedFeature.service,
            query: `Checklist process for ${selectedFeature.feature}`
        });
    }
    // If logged in, go to portal. If not, go to auth.
    if (user) {
        setActivePage('portal');
    } else {
        setActivePage('auth');
    }
  };

  const navigateTo = (page: string) => {
    if (page === 'portal') {
      if (!user) {
        setActivePage('auth');
      } else {
        setActivePage('portal');
      }
    } else {
      setActivePage(page);
    }
  };

  const renderContent = () => {
    switch(activePage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onFeatureClick={handleFeatureClick} />;
      case 'service-detail':
        return selectedFeature ? (
          <ServiceDetailPage 
            serviceType={selectedFeature.service} 
            featureName={selectedFeature.feature}
            onNavigate={navigateTo}
            onSignUp={handleSignUpFromDetail}
          />
        ) : <ServicesPage onFeatureClick={handleFeatureClick} />;
      case 'portal':
        return user 
          ? <ClientDashboard user={user} onLogout={handleLogout} initialChecklistRequest={pendingChecklist} /> 
          : <AuthPage onLoginSuccess={handleLogin} />;
      case 'auth':
        return <AuthPage onLoginSuccess={handleLogin} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };
  
  // Direct return for portal to ensure clean layout when logged in and active
  if (activePage === 'portal' && user) {
      return (
          <ClientDashboard user={user} onLogout={handleLogout} initialChecklistRequest={pendingChecklist} />
      );
  }

  return (
    <Layout activePage={activePage} onNavigate={navigateTo} user={user} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
}