import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { Sparkles, X, Check, Calendar, Clock, User, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLINIC_DETAILS, TREATMENTS } from '../data/clinicData';
import { playSparkle, playPop, playSoftClick } from '../utils/soundEffects';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  defaultTreatment?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  defaultTreatment = 'Consultation & Checkup'
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10 AM - 1 PM)');
  const [selectedService, setSelectedService] = useState(defaultTreatment);
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 12,
    mass: 0.3
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) return;

    playSparkle();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F4F2BA', '#4BB88E', '#122620', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setPatientName('');
    setPhone('');
    onClose();
  };

  return (
    <>
      {/* 1. The Persistent Floating Booking Pill with Slender Circular Progress Ring */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 180 }}
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center pointer-events-auto max-w-[calc(100vw-24px)]"
        >
          <div className="relative flex items-center">
            
            {/* Circular Progress Indicator Wrapper */}
            <div className="relative group">
              <motion.button
                id="persistent-booking-pill"
                onClick={() => {
                  playPop();
                  onOpen();
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-2 sm:gap-3 bg-[#122620] hover:bg-[#1b382f] text-white px-3 py-2 sm:pl-4 sm:pr-3 sm:py-3 rounded-full shadow-[0_12px_35px_rgba(18,38,32,0.3)] border-2 border-white/80 transition-all font-['Outfit',sans-serif] z-10 select-none cursor-pointer"
              >
                {/* Left Live Dot */}
                <div className="relative flex items-center justify-center shrink-0">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#F4F2BA]" />
                  <span className="absolute w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#F4F2BA] animate-ping opacity-75" />
                </div>

                {/* Pill Text - Compact on Mobile */}
                <div className="text-left pr-0.5">
                  <span className="block text-[10px] sm:text-[12px] font-black tracking-wider text-[#F4F2BA] uppercase leading-none">
                    <span className="sm:hidden">TOOTH HURTING? BOOK</span>
                    <span className="hidden sm:inline">TOOTH HURTING? BOOK VISIT</span>
                  </span>
                  <span className="hidden sm:block text-[9px] sm:text-[10px] text-slate-300 font-medium leading-none mt-1">
                    Malabar Hill · Dr. Deepal
                  </span>
                </div>

                {/* Circular Progress Ring Icon Container */}
                <div className="relative w-6 h-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 shrink-0">
                  {/* Slender SVG Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                    {/* Background faint ring */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/15"
                    />
                    {/* Active dynamic filled progress ring */}
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#F4F2BA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        pathLength: smoothProgress,
                      }}
                    />
                  </svg>

                  {/* Arrow Icon in Ring Center */}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#F4F2BA] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            </div>

          </div>
        </motion.div>
      )}

      {/* 2. Expanding Modal from Center with Spring Animation */}
      <AnimatePresence>
        {isOpen && (
          <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playSoftClick();
                onClose();
              }}
              className="absolute inset-0 bg-[#122620]/75 backdrop-blur-xl"
            />

            {/* Panel expanding physically from center */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.2, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 14, stiffness: 180 }}
              className="relative w-full max-w-md bg-white rounded-[36px] p-6 sm:p-8 shadow-2xl border-2 border-white/90 overflow-hidden z-10"
            >
              {/* Header Gradient Arc */}
              <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-[#4BB88E] via-[#F4F2BA] to-[#4BB88E]" />
              
              {/* Close Button */}
              <button
                id="close-booking-modal-btn"
                onClick={() => {
                  playSoftClick();
                  onClose();
                }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-[#122620] flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-3 py-1 rounded-full shadow-sm">
                      Malabar Hill · Shop No. 9
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#122620] font-['Outfit',sans-serif] mt-2.5">
                      BOOK YOUR VISIT
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Select your preferred timing for Dr. Deepal's clinic.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Patient Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-['Outfit',sans-serif]">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Rohini Mehta"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#4BB88E] focus:bg-white text-slate-800 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-['Outfit',sans-serif]">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="079777 76136"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#4BB88E] focus:bg-white text-slate-800 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-['Outfit',sans-serif]">
                        Treatment Interest
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#4BB88E] focus:bg-white text-slate-800 text-xs sm:text-sm px-4 py-3 rounded-2xl outline-none transition-all font-medium"
                      >
                        <option value="Consultation & General Checkup">Consultation & General Checkup</option>
                        <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                        <option value="Custom Porcelain Veneers">Custom Porcelain Veneers</option>
                        <option value="Zirconia Dental Implants">Zirconia Dental Implants</option>
                        <option value="Single-Sitting Root Canal">Single-Sitting Root Canal</option>
                        <option value="Ultrasonic Hydro Cleaning">Ultrasonic Hydro Cleaning</option>
                        <option value="Emergency Toothache Relief">Emergency Toothache Relief</option>
                      </select>
                    </div>

                    {/* Preferred Slot */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Date
                        </label>
                        <select
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3 py-2.5 rounded-xl outline-none"
                        >
                          <option value="Today">Today (Urgent)</option>
                          <option value="Tomorrow">Tomorrow</option>
                          <option value="This Weekend">This Weekend</option>
                          <option value="Next Week">Next Week</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Time Slot
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3 py-2.5 rounded-xl outline-none"
                        >
                          <option value="Morning (10 AM - 1 PM)">10 AM – 1 PM</option>
                          <option value="Afternoon (2 PM - 5 PM)">2 PM – 5 PM</option>
                          <option value="Evening (5 PM - 8 PM)">5 PM – 8 PM</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      id="submit-booking-btn"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                      className="w-full bg-[#F4F2BA] hover:bg-[#eae89f] text-[#122620] font-black text-sm sm:text-base py-4 rounded-2xl shadow-lg shadow-amber-200/30 transition-colors flex items-center justify-center gap-2 mt-2 font-['Outfit',sans-serif] border-2 border-white cursor-pointer"
                    >
                      <span>Book Appointment →</span>
                    </motion.button>
                  </form>
                </div>
              ) : (
                /* Confirmation Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#122620] font-['Outfit',sans-serif]">
                    Appointment Requested!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 mb-6">
                    Thank you <strong className="text-[#122620]">{patientName}</strong>. Dr. Deepal's team at Malabar Hill will confirm your {selectedService} slot ({preferredDate}, {preferredTime}) shortly at <strong>{phone}</strong>.
                  </p>

                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-left text-xs text-slate-700 space-y-1 mb-6">
                    <p className="font-bold text-[#122620]">📍 Dr. Deepal's Dental Clinic</p>
                    <p>Shop No. 9, Gate No. 2, L.D. Ruparel Marg, Malabar Hill, Mumbai</p>
                    <p className="text-[#4BB88E] font-bold">📞 Direct Clinic Line: 079777 76136</p>
                  </div>

                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                    className="w-full bg-[#122620] text-[#F4F2BA] font-black text-xs py-3.5 rounded-2xl hover:bg-[#1c3a31] transition-colors border border-white/20 cursor-pointer"
                  >
                    Done & Close
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

