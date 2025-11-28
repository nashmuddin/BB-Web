import React from 'react';
import { MapPin, Phone, Clock, Building2, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-10 pb-20">
       {/* Hero */}
       <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We are here to assist you. Reach out to us for any inquiries regarding our services or visit our office.
            </p>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
         <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Contact Info */}
                <div className="p-8 md:p-12 bg-blue-50/50">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Get in Touch</h2>
                    
                    <div className="space-y-10">
                        <div className="flex items-start group">
                            <div className="w-12 h-12 bg-white border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 mr-5 shadow-sm group-hover:scale-105 transition-transform">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-lg">Our Office</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    No.27, 1st Flr, Airport Mall,<br/>
                                    Berakas, BB2713,<br/>
                                    Brunei Darussalam
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                             <div className="w-12 h-12 bg-white border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 mr-5 shadow-sm group-hover:scale-105 transition-transform">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-lg">Phone Number</h3>
                                <p className="text-slate-600 mb-2">Call us for immediate assistance.</p>
                                <a href="tel:8111786" className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors">
                                    8111786
                                </a>
                            </div>
                        </div>

                         <div className="flex items-start group">
                             <div className="w-12 h-12 bg-white border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 mr-5 shadow-sm group-hover:scale-105 transition-transform">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-lg">Business Hours</h3>
                                <p className="text-slate-600">
                                    Monday - Friday: 8:00 AM - 5:00 PM<br/>
                                    Saturday: 8:00 AM - 12:00 PM<br/>
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual / Map Placeholder */}
                <div className="relative min-h-[300px] bg-slate-100 flex items-center justify-center overflow-hidden group">
                   <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                   
                   <div className="text-center p-8 relative z-10">
                       <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                           <Building2 className="w-10 h-10 text-slate-800" />
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Us at Airport Mall</h3>
                       <p className="text-slate-500 mb-6 max-w-xs mx-auto">We are conveniently located on the 1st floor.</p>
                       
                       <a 
                        href="https://www.google.com/maps/search/?api=1&query=Airport+Mall+Berakas" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
                      >
                        Open in Google Maps <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                   </div>
                </div>
            </div>
         </div>
       </div>
    </div>
  );
}