import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Social Media Design');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      setStatus('error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter your message.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setErrorMsg('');
    }, 800);
  };

  return (
    <div className="apple-glass-card p-6 sm:p-10 rounded-3xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-2xl font-bold text-white">
          SEND A MESSAGE
        </h3>
        <p className="text-xs text-white/60 font-sans font-light">
          Fill out the form below to reach out directly.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-[#2997FF]/10 border border-[#2997FF]/30 rounded-2xl space-y-4 text-center">
          <CheckCircle2 className="w-10 h-10 text-[#30D158] mx-auto" />
          <h4 className="text-2xl font-bold text-white">
            MESSAGE SENT
          </h4>
          <p className="text-xs text-white/70 font-sans font-light max-w-md mx-auto">
            Thank you for getting in touch! Rohit will review your message and respond shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs font-mono uppercase rounded-full transition-all cursor-pointer"
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-xs font-mono text-white/60 uppercase tracking-wider block">
              YOUR NAME *
            </label>
            <input
              id="contact-name"
              type="text"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-black/40 border border-white/15 focus:border-[#2997FF] rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none transition-all placeholder:text-white/20"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-xs font-mono text-white/60 uppercase tracking-wider block">
              YOUR EMAIL *
            </label>
            <input
              id="contact-email"
              type="email"
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              className="w-full bg-black/40 border border-white/15 focus:border-[#2997FF] rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none transition-all placeholder:text-white/20"
            />
          </div>

          {/* Project Type Dropdown */}
          <div className="space-y-2">
            <label htmlFor="contact-type" className="text-xs font-mono text-white/60 uppercase tracking-wider block">
              PROJECT TYPE
            </label>
            <select
              id="contact-type"
              value={projectType || 'Social Media Design'}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full bg-black/60 border border-white/15 focus:border-[#2997FF] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none cursor-pointer"
            >
              <option value="Social Media Design">Social Media Design</option>
              <option value="Poster Design">Poster Design</option>
              <option value="Digital Creatives">Digital Creatives</option>
              <option value="Photo Editing">Photo Editing</option>
              <option value="General Inquiry">General Inquiry / Collaboration</option>
            </select>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-xs font-mono text-white/60 uppercase tracking-wider block">
              YOUR MESSAGE *
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={message || ''}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your design project or idea..."
              className="w-full bg-black/40 border border-white/15 focus:border-[#2997FF] rounded-xl p-4 text-sm text-white font-sans focus:outline-none transition-all placeholder:text-white/20 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            data-cursor="SEND"
            className="w-full py-4 bg-gradient-to-r from-[#0071E3] to-[#2997FF] hover:from-[#2997FF] hover:to-[#64D2FF] text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(41,151,255,0.4)]"
          >
            {status === 'submitting' ? (
              <span>SENDING...</span>
            ) : (
              <>
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

