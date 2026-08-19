import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactForm } from './ContactForm';
import { Phone, MapPin, Mail, ArrowUpRight, Copy, Check, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#0071E3]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2997FF] mb-12">
          <span>05</span>
          <span className="w-8 h-[1px] bg-[#2997FF]" />
          <span>CONTACT & COLLABORATION</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Info (6 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.98]">
                LET'S <br />
                <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">CREATE</span> <br />
                SOMETHING.
              </h2>
              <p className="text-base sm:text-lg text-white/60 font-sans max-w-md font-light">
                Have a project, idea or creative opportunity? I'd be happy to hear from you.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              
              {/* Phone Card */}
              <div className="apple-glass-card p-6 rounded-3xl flex items-center justify-between transition-all hover:border-[#2997FF]/40">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#2997FF] font-semibold block">
                    DIRECT PHONE / CALL
                  </span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-lg sm:text-2xl font-bold text-white hover:text-[#2997FF] font-mono transition-colors block"
                  >
                    {PERSONAL_INFO.phoneFormatted}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    data-cursor="CALL"
                    className="p-3 bg-[#2997FF] text-white hover:bg-[#64D2FF] rounded-full transition-all text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(41,151,255,0.4)]"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline font-semibold">CALL</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-colors text-white cursor-pointer"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-[#30D158]" /> : <Copy className="w-4 h-4 text-white/60" />}
                  </button>
                </div>
              </div>

              {/* WhatsApp Quick Connect */}
              {PERSONAL_INFO.whatsappUrl && (
                <div className="apple-glass-card p-6 rounded-3xl flex items-center justify-between transition-all hover:border-[#30D158]/40">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#30D158] font-semibold block">
                      WHATSAPP CHAT
                    </span>
                    <a
                      href={PERSONAL_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold text-white hover:text-[#30D158] font-mono transition-colors block"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>

                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="WHATSAPP"
                    className="p-3 bg-[#30D158]/20 hover:bg-[#30D158] text-[#30D158] hover:text-white border border-[#30D158]/40 rounded-full transition-all text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(48,209,88,0.2)]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-semibold">MESSAGE</span>
                  </a>
                </div>
              )}

              {/* Email Address Card */}
              <div className="apple-glass-card p-6 rounded-3xl flex items-center justify-between transition-all hover:border-[#BF5AF2]/40">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#BF5AF2] font-semibold block">
                    EMAIL INQUIRIES
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm sm:text-base font-mono text-white/90 hover:text-[#BF5AF2] transition-colors block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    data-cursor="EMAIL"
                    className="p-3 bg-[#BF5AF2]/20 hover:bg-[#BF5AF2] text-[#BF5AF2] hover:text-white border border-[#BF5AF2]/40 rounded-full transition-all text-xs font-mono flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-colors text-white cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#30D158]" /> : <Copy className="w-4 h-4 text-white/60" />}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="apple-glass-card p-6 rounded-3xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#64D2FF] font-semibold block">
                    LOCATION & BASE
                  </span>
                  <p className="text-base font-semibold text-white">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
                <MapPin className="w-5 h-5 text-[#64D2FF]" />
              </div>

            </div>

            {/* Social Links Bar */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                CREATIVE NETWORKS & SOCIALS
              </span>
              <div className="flex flex-wrap gap-3">
                {PERSONAL_INFO.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LINK"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#2997FF] rounded-full text-xs font-mono text-white hover:text-[#2997FF] transition-all flex items-center gap-2 group backdrop-blur-md"
                  >
                    <span>{s.name} →</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#2997FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form (6 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <ContactForm />
          </motion.div>

        </div>

      </div>
    </section>
  );
}

