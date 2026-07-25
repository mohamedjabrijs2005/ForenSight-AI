import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'system' | 'user' | 'ai';
  content: string;
  timestamp: string;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'SYSTEM ONLINE: ForenSight AI Core connected.',
      timestamp: new Date().toISOString()
    },
    {
      role: 'ai',
      content: 'Hello, Inspector. I am the ForenSight AI Assistant. I have analyzed the last 24 hours of incident reports. How can I assist you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        role: 'ai',
        content: data.response,
        timestamp: data.timestamp
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'ERROR: Connection to AI Core lost.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Bot className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Assistant</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Neural Core Active
          </p>
        </div>
      </div>

      <div className="flex-1 bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-sm">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'system' ? (
                <div className="w-full text-center text-xs font-mono text-muted-foreground my-4">
                  --- {msg.content} ---
                </div>
              ) : (
                <>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'ai' ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-xs font-bold text-foreground">
                        {msg.role === 'ai' ? 'ForenSight Core' : 'Inspector'}
                      </span>
                    </div>
                    <div className={`p-4 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                        : 'bg-muted/50 border border-border rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-muted/50 border border-border p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150"></span>
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 bg-muted/20 border-t border-border">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ForenSight AI to analyze data, find suspects, or dispatch units..."
              className="w-full bg-card border border-border rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-2 text-[10px] text-muted-foreground uppercase tracking-widest">
            AI responses may be subject to confidence margins
          </div>
        </div>
      </div>
    </div>
  );
}
