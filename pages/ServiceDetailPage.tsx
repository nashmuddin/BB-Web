import React, { useEffect, useState } from 'react';
import { ServiceType } from '../types';
import { generateServiceDescription } from '../services/geminiService';
import { ArrowLeft, Phone, UserPlus, Loader2, CheckCircle2, Building2 } from 'lucide-react';

interface ServiceDetailPageProps {
  serviceType: ServiceType;
  featureName: string;
  onNavigate: (page: string) => void;
  onSignUp: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ 
  serviceType, 
  featureName, 
  onNavigate, 
  onSignUp 
}) => {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadContent = async () => {
      setLoading(true);
      const text = await generateServiceDescription(serviceType, featureName);
      if (isMounted) {
        setDescription(text);
        setLoading(false);
      }
    };
    loadContent();
    return () => { isMounted = false; };
  }, [serviceType, featureName]);

  return (
    <div className="min-h-screen bg-white pt-10 pb-20">
      {/* Header Image / Pattern */}
      <div className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={() => onNavigate('services')}
            className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </button>
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/30 border border-blue-500/50 text-blue-200 text-sm font-semibold mb-4">
            {serviceType}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {featureName}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Professional solutions tailored to your business needs.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Building2 className="w-6 h-6 mr-3 text-blue-600" />
                Service Overview
              </h2>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-600" />
                  <p>Loading service details...</p>
                </div>
              ) : (
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6 text-lg">
                  {description.split('\n').map((paragraph, idx) => (
                    paragraph.trim() && <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Why choose Bebest Group?</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Industry compliant processes", "Dedicated support team", "Streamlined efficiency", "Transparent reporting"].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="w-full md:w-80 flex-shrink-0 space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to proceed?</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Sign up for our Client Portal to access checklists, track applications, and manage this service online.
                </p>
                <button 
                  onClick={onSignUp}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg shadow-blue-900/10"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up / Login
                </button>
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full mix-blend-overlay filter blur-xl opacity-20 -mr-6 -mt-6"></div>
                <h3 className="text-lg font-bold mb-2">Have questions?</h3>
                <p className="text-sm text-slate-300 mb-6">
                  Speak directly with our specialists to discuss your specific requirements.
                </p>
                <a 
                  href="tel:8111786" 
                  className="w-full bg-white text-slate-900 py-3 px-4 rounded-lg font-bold hover:bg-slate-100 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call 8111786
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};