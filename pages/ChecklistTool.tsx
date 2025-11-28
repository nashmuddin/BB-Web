import React, { useState, useEffect, useCallback } from 'react';
import { ServiceType, ChecklistItem } from '../types';
import { generateProcessChecklist } from '../services/geminiService';
import { CheckCircle2, Circle, Loader2, Sparkles, ClipboardList, RefreshCw } from 'lucide-react';

interface ChecklistToolProps {
  initialService?: ServiceType;
  initialQuery?: string;
}

export const ChecklistTool: React.FC<ChecklistToolProps> = ({ initialService, initialQuery }) => {
  const [selectedService, setSelectedService] = useState<ServiceType>(initialService || ServiceType.EMPLOYMENT);
  const [userQuery, setUserQuery] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [checklist, setChecklist] = useState<{ title: string; items: ChecklistItem[] } | null>(null);

  const performGeneration = useCallback(async (service: ServiceType, query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setChecklist(null);

    const response = await generateProcessChecklist(service, query);
    
    if (response) {
      setChecklist({
        title: response.title,
        items: response.items.map((item, index) => ({
          id: `item-${index}`,
          task: item.task,
          description: item.description,
          isCompleted: false
        }))
      });
    }

    setLoading(false);
  }, []);

  // Auto-generate if initial props are provided
  useEffect(() => {
    if (initialService && initialQuery) {
      performGeneration(initialService, initialQuery);
    }
  }, [initialService, initialQuery, performGeneration]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    performGeneration(selectedService, userQuery);
  };

  const toggleItem = (id: string) => {
    if (!checklist) return;
    setChecklist({
      ...checklist,
      items: checklist.items.map(item => 
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    });
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-6rem)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Smart Process Assistant</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our AI-powered tool creates customized checklists for any process within our services. 
            Simply tell us what you need to do, and we'll guide you step-by-step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Department</label>
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value as ServiceType)}
                  className="w-full rounded-lg border-slate-200 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  {Object.values(ServiceType).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">What do you need help with?</label>
                <textarea
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g., Applying for a foreign worker work permit..."
                  className="w-full rounded-lg border-slate-200 border p-3 text-sm h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !userQuery.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <ClipboardList className="w-4 h-4 mr-2" /> Generate Checklist
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {!checklist && !loading && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ClipboardList className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No Checklist Generated</h3>
                <p className="text-slate-500">Fill out the form to generate a tailored process guide.</p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <h3 className="text-lg font-medium text-slate-900">Consulting AI...</h3>
                <p className="text-slate-500">Building your custom checklist for {selectedService}...</p>
              </div>
            )}

            {checklist && !loading && (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 px-6 py-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
                    <ClipboardList className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-500/30">
                      {selectedService}
                    </span>
                    <h2 className="text-2xl font-bold leading-tight">{checklist.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between text-sm text-slate-500 pb-6 border-b border-slate-100">
                    <span>{checklist.items.filter(i => i.isCompleted).length} of {checklist.items.length} completed</span>
                    <button 
                      onClick={() => setChecklist({...checklist, items: checklist.items.map(i => ({...i, isCompleted: false}))})}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" /> Reset
                    </button>
                  </div>

                  <div className="space-y-3">
                    {checklist.items.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                          item.isCompleted 
                            ? 'bg-blue-50 border-blue-100' 
                            : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm'
                        }`}
                      >
                        <div className={`mt-0.5 min-w-[20px] ${item.isCompleted ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-400'}`}>
                          {item.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className={`font-medium mb-1 transition-colors ${item.isCompleted ? 'text-blue-800 line-through decoration-blue-300' : 'text-slate-900'}`}>
                            {item.task}
                          </h4>
                          <p className={`text-sm ${item.isCompleted ? 'text-blue-600/70' : 'text-slate-500'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};