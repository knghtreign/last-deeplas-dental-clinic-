import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Phone, MapPin, Star, ArrowUpRight, Heart, Clock } from 'lucide-react';
import { CLINIC_DETAILS } from '../data/clinicData';
import { PopBadge, StaggerHeading, TextHighlight } from './AnimatedText';
import { playPop, playSoftClick } from '../utils/soundEffects';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer id="contact" className="relative bg-[#0B1B33] text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-8 rounded-t-[48px] overflow-hidden -mt-6 z-20">
      
      {/* Background soft ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#61A2EE]/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#E2F743]/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Big Impact Callout */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <PopBadge className="mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#0B1B33] bg-[#E2F743] px-3.5 py-1.5 rounded-full inline-block font-['Outfit',sans-serif]">
                ✨ Appointments & Consultations
              </span>
            </PopBadge>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: 'spring', damping: 14, stiffness: 200 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-tight text-white"
            >
              Ready for your <br />
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px #E2F743',
                    '0 0 12px rgba(226,247,67,0.4)',
                    '0 0 0px #E2F743'
                  ]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="text-[#E2F743] underline decoration-[#61A2EE] decoration-wavy decoration-2 inline-block"
              >
                best smile?
              </motion.span>
            </motion.h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.button
              id="footer-book-btn"
              onClick={() => {
                playPop();
                onOpenBooking();
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="bg-[#E2F743] hover:bg-[#d8ed36] text-[#0B1B33] font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-2xl transition-colors font-['Outfit',sans-serif] flex items-center gap-2 cursor-pointer border-2 border-white"
            >
              <span>BOOK APPOINTMENT</span>
              <ArrowUpRight className="w-5 h-5 text-[#0B1B33]" />
            </motion.button>

            <motion.a
              id="footer-call-btn"
              href={`tel:${CLINIC_DETAILS.phoneClean}`}
              onClick={() => playSoftClick()}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-full border border-white/15 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#61A2EE]" />
              <span>{CLINIC_DETAILS.phone}</span>
            </motion.a>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10 text-slate-300">
          
          {/* Brand Col */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ delay: 0.05, type: 'spring', damping: 14 }}
            className="md:col-span-5 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-9 h-9 rounded-full bg-[#E2F743] text-[#0B1B33] flex items-center justify-center font-bold shadow-md"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span className="text-xl font-extrabold text-white font-['Outfit',sans-serif]">
                Dr. Deepal's Dental Clinic
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm font-medium">
              Dedicated to compassionate, pain-free, aesthetic dental care in the heart of Malabar Hill, Mumbai.
            </p>
            <div className="flex items-center gap-2 text-[#E2F743] text-xs font-bold pt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#E2F743] text-[#E2F743]" />
                ))}
              </div>
              <span className="font-['Outfit',sans-serif] font-black">5.0 Verified · 84 Reviews on Google</span>
            </div>
          </motion.div>

          {/* Location & Address */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ delay: 0.1, type: 'spring', damping: 14 }}
            className="md:col-span-4 space-y-2"
          >
            <span className="text-xs font-black text-white uppercase tracking-wider block font-['Outfit',sans-serif]">
              Clinic Address
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Shop No. 9, Gate No. 2, L.D. Ruparel Marg, <br />
              near Priyadarshini Park, Malabar Hill, <br />
              Mumbai, Maharashtra 400006
            </p>
            <motion.a
              href={CLINIC_DETAILS.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-1.5 text-xs text-[#E2F743] font-bold hover:underline pt-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open in Google Maps →</span>
            </motion.a>
          </motion.div>

          {/* Hours & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ delay: 0.15, type: 'spring', damping: 14 }}
            className="md:col-span-3 space-y-2"
          >
            <span className="text-xs font-black text-white uppercase tracking-wider block font-['Outfit',sans-serif] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E2F743]" />
              Clinic Hours
            </span>
            <p className="text-xs text-slate-300 font-medium">
              <strong className="text-white">Monday – Saturday:</strong><br />
              10:00 AM – 8:00 PM
            </p>
            <p className="text-xs text-slate-300 font-medium">
              <strong className="text-white">Sunday:</strong><br />
              By Appointment & Emergency
            </p>
            <p className="text-xs text-[#61A2EE] pt-1 font-bold">
              Phone: {CLINIC_DETAILS.phone}
            </p>
          </motion.div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dr. Deepal's Dental Clinic · Malabar Hill, Mumbai. All rights reserved.</p>
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 font-medium cursor-default"
          >
            Crafted for healthy smiles with <Heart className="w-3.5 h-3.5 text-[#E2F743] fill-[#E2F743] animate-pulse" />
          </motion.p>
        </div>

      </div>
    </footer>
  );
};

