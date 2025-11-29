import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Hi there! 👋 I'm Ask Bebest. How can I help you with our services today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsTyping(true);

    // Call Gemini API
    const response = await chatWithAssistant(userMessage, "General Inquiry");
    
    setIsTyping(false);
    setMessages(prev => [...prev, { text: response, isUser: false }]);
  };

  return (
    <>
      {/* Toggle Button - WhatsApp Style Green */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-slate-700 rotate-90' : 'bg-[#25D366] hover:bg-[#128C7E]'
        }`}
        title="Ask Bebest"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#075E54] p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Ask Bebest</h3>
              <p className="text-xs text-green-100 flex items-center opacity-90">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 bg-[#E5DDD5] space-y-4 relative">
          {/* Background pattern overlay effect */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex relative z-10 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
                  msg.isUser
                    ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none'
                    : 'bg-white text-slate-900 rounded-tl-none'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] text-right mt-1 opacity-50 ${msg.isUser ? 'text-slate-600' : 'text-slate-500'}`}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start relative z-10">
              <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-[#F0F2F5] border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#075E54] focus:ring-1 focus:ring-[#075E54] transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-[#075E54] text-white rounded-full hover:bg-[#004D40] disabled:opacity-50 disabled:hover:bg-[#075E54] transition-colors shadow-sm flex-shrink-0"
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 pl-0.5" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};