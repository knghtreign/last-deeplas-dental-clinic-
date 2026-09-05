import { TreatmentInfo, ReviewItem, ClinicHotspot, FaqItem, ClinicSpacePhoto, ClinicService } from '../types';

// Generated asset paths
export const CLINIC_IMAGES = {
  heroToothWorkers: '/src/assets/images/hero_workers_tooth_1788252748342.jpg',
  isometricClinic: '/src/assets/images/isometric_clinic_1788252767756.jpg',
  drDeepalPortrait: '/src/assets/images/dr_deepal_portrait_1788253822193.jpg',
  drDeepalPortraitOld: '/src/assets/images/dr_deepal_portrait_1788252789547.jpg',
  malabarMap: '/src/assets/images/mumbai_malabar_map_1788252835651.jpg',
  smileResult: '/src/assets/images/smile_result_1788252853269.jpg',
  clinicSuite: '/src/assets/images/clinic_suite_interior_1788253761760.jpg',
  dentistAction: '/src/assets/images/dentist_treatment_action_1788253779087.jpg',
  clinicLounge: '/src/assets/images/clinic_lounge_reception_1788253794362.jpg',
  digitalScanner: '/src/assets/images/digital_dental_scanner_1788253808531.jpg',
  titaniumImplant: '/src/assets/images/titanium_dental_implant_1788260427614.jpg',
  patientPriya: '/src/assets/images/patient_priya_avatar_1788254358383.jpg',
  patientRahul: '/src/assets/images/patient_rahul_avatar_1788254378193.jpg',
  patientAnanya: '/src/assets/images/patient_ananya_avatar_1788254397087.jpg',
  paediatrics: '/src/assets/images/paediatric_dental_care_1788595045588.jpg',
  veneersCrowns: '/src/assets/images/dental_veneer_crown_1788595062863.jpg',
  dentalXray: '/src/assets/images/dental_xray_modern_1788595079091.jpg',
  dentalBonding: '/src/assets/images/dental_bonding_macro_1788595094151.jpg',
};

export const CLINIC_DETAILS = {
  name: "Dr. Deepal's Dental Clinic",
  doctor: "Dr. Deepal",
  role: "Cosmetic & Restorative Dental Surgeon",
  tagline: "Your smile, looked after.",
  subtext: "Dr. Deepal's Dental Clinic · Malabar Hill",
  address: "Shop No. 9, Gate No. 2, L.D. Ruparel Marg, near Priyadarshini Park, Malabar Hill, Mumbai, Maharashtra 400006",
  phone: "079777 76136",
  phoneClean: "+917977776136",
  email: "drdeepaldental@gmail.com",
  rating: "5.0",
  totalReviews: 84,
  neighborhood: "Malabar Hill, South Mumbai",
  landmark: "Near Priyadarshini Park (Gate No. 2)",
  hours: "Monday – Saturday: 10:00 AM – 8:00 PM (Sundays by appointment)",
  mapLink: "https://maps.google.com/?q=Dr.+Deepal%27s+Dental+Clinic+Shop+No+9+Gate+No+2+LD+Ruparel+Marg+near+Priyadarshini+Park+Malabar+Hill+Mumbai+400006",
};

export const TREATMENTS: TreatmentInfo[] = [
  {
    id: 'whitening',
    name: 'WHITENING',
    shortDesc: 'Laser-activated enamel brightening for a radiant, luminous natural shade.',
    tagline: 'Up to 8 shades whiter in 45 minutes.',
    duration: '45 mins',
    badge: 'Gentle Laser System',
    benefits: ['Zero enamel abrasion', 'Immediate visible results', 'Long-lasting glow']
  },
  {
    id: 'veneers',
    name: 'VENEERS',
    shortDesc: 'Ultra-thin handcrafted porcelain shells designed for harmonic smile symmetry.',
    tagline: 'Custom sculpted porcelain perfection.',
    duration: '2 appointments',
    badge: 'Micro-Thin Porcelain',
    benefits: ['Custom color-matched', 'Stain-resistant finish', 'Preserves natural tooth']
  },
  {
    id: 'implants',
    name: 'IMPLANTS',
    shortDesc: 'Titanium bio-integrated fixtures crowned with lifelike zirconia teeth.',
    tagline: 'Permanent, rock-solid root replacement.',
    duration: 'Lifelong durability',
    badge: 'Precision 3D Guided',
    benefits: ['Natural chewing strength', 'Bone preservation', 'Indistinguishable from natural']
  },
  {
    id: 'rootcanal',
    name: 'ROOT CANAL',
    shortDesc: 'Microscopic single-visit nerve therapy with painless rotary instruments.',
    tagline: 'Instant pain relief with zero trauma.',
    duration: 'Single sitting',
    badge: '100% Pain-Free Rotary',
    benefits: ['Saves natural tooth', 'Computer-controlled depth', 'Silent comfortable experience']
  },
  {
    id: 'cleaning',
    name: 'CLEANING',
    shortDesc: 'Ultrasonic air-polishing therapy eliminating biofilm and stubborn stains.',
    tagline: 'Deep prophylaxis & fresh gum rejuvenation.',
    duration: '30 mins',
    badge: 'Ultrasonic Hydro-Glow',
    benefits: ['Gentle on sensitivity', 'Polishes tea/coffee stains', 'Promotes gum vitality']
  },
];

export const CLINIC_HOTSPOTS: ClinicHotspot[] = [
  {
    id: 'care',
    label: 'Modern care',
    description: 'Digital 3D intraoral imaging with zero radiation discomfort.',
    x: 48,
    y: 42,
  },
  {
    id: 'comfort',
    label: 'Comfortable visits',
    description: 'Ergonomic memory-foam dental suites with noise-cancelling audio.',
    x: 28,
    y: 65,
  },
  {
    id: 'personal',
    label: 'Personal attention',
    description: 'Dr. Deepal personally oversees every minute of your treatment.',
    x: 72,
    y: 50,
  },
  {
    id: 'gentle',
    label: 'Gentle touch',
    description: 'Specialized stress-free protocols for anxious patients.',
    x: 60,
    y: 78,
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    patientName: 'A. Parekh',
    treatment: 'Aesthetic Smile Care',
    rating: 5,
    date: 'Verified Google Review',
    reviewText: "I feel so confident and happy with the result. Thank you all again for an exceptional experience. I highly recommend your office to anyone considering dental treatment. 5 stars and a huge smile!",
    avatarUrl: CLINIC_IMAGES.patientPriya,
    rotation: -3,
    verified: true
  },
  {
    id: 'rev-2',
    patientName: 'M. Zaveri',
    treatment: 'Root Canal & Restorative Care',
    rating: 5,
    date: 'Verified Google Review',
    reviewText: "Very gentle on operating and with perfection. Very satisfying, no complaints at all. Dr. Deepal is patient friendly and explains every step with complete clarity.",
    avatarUrl: CLINIC_IMAGES.patientRahul,
    rotation: 4,
    verified: true
  },
  {
    id: 'rev-3',
    patientName: 'R. Shah',
    treatment: 'Teeth Cleaning & Preventative Care',
    rating: 5,
    date: 'Verified Google Review',
    reviewText: "Great dentist! The place in Malabar Hill was very clean and had great service cleaning my teeth. Truly unhurried, comfortable, and pain-free experience.",
    avatarUrl: CLINIC_IMAGES.patientAnanya,
    rotation: -4,
    verified: true
  },
  {
    id: 'rev-4',
    patientName: 'K. Mehta',
    treatment: 'Smile Consultation & Care',
    rating: 5,
    date: 'Verified Google Review',
    reviewText: "The doctor was patient in explaining issues and making modifications until I was fully satisfied. Really happy with my decision.",
    avatarUrl: CLINIC_IMAGES.dentistAction,
    rotation: 3,
    verified: true
  }
];

export const DOCTOR_CREDENTIALS = [
  { id: 'c1', title: '21 Years', subtitle: 'Clinical Excellence' },
  { id: 'c2', title: 'MDS Prosthodontics', subtitle: '& Aesthetic Dentistry' },
  { id: 'c3', title: '5.0 ★ Rating', subtitle: '90+ Google Reviews' },
  { id: 'c4', title: 'Malabar Hill', subtitle: 'Private Boutique Practice' },
  { id: 'c5', title: '100% Pain-Free', subtitle: 'Gentle Patient Care' },
];

export const CLINIC_PHOTOS: ClinicSpacePhoto[] = [
  {
    id: 'space-1',
    title: 'Private Operatory Suite',
    subtitle: 'Ergonomic memory-foam dental lounge with sunlit park views',
    imageSrc: CLINIC_IMAGES.clinicSuite,
    tag: 'THE SUITE'
  },
  {
    id: 'space-2',
    title: 'Dr. Deepal in Procedure',
    subtitle: 'Microscopic precision dentistry and gentle patient care',
    imageSrc: CLINIC_IMAGES.dentistAction,
    tag: 'CARE IN ACTION'
  },
  {
    id: 'space-3',
    title: 'Serene Boutique Lounge',
    subtitle: 'A calm, stress-free space designed for relaxed consultations',
    imageSrc: CLINIC_IMAGES.clinicLounge,
    tag: 'THE SPACE'
  },
  {
    id: 'space-4',
    title: '3D Digital Intraoral Scanner',
    subtitle: 'Impression-free optical diagnostics with instant computer modeling',
    imageSrc: CLINIC_IMAGES.digitalScanner,
    tag: 'ADVANCED TECH'
  },
  {
    id: 'space-5',
    title: 'Micro-Sterilization & Precision',
    subtitle: 'Hospital-grade autoclaving and certified biological hygiene',
    imageSrc: CLINIC_IMAGES.heroToothWorkers,
    tag: 'CLEAN PROTOCOLS'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need an appointment before visiting?',
    answer: 'Yes, we operate as a private boutique clinic to ensure Dr. Deepal provides dedicated, unhurried time for each patient. For acute dental emergencies or toothaches, same-day priority walk-in slots are always preserved.'
  },
  {
    id: 'faq-2',
    question: 'What treatments do you offer at Malabar Hill?',
    answer: 'We provide 18 specialized dental services: Teeth Whitening, Bonding, Check-ups, Cosmetic Procedures, Dental Implants, Dentures & Bridges, Emergency Care, Extractions, Fillings & Sealants, Mouth Guards, Online Dentist Booking, Oral Surgery, Paediatrics, Root Canals, Teeth Cleaning, Teeth Reshaping, Veneers & Crowns, and digital X-Rays.'
  },
  {
    id: 'faq-3',
    question: 'How much does a consultation cost?',
    answer: 'Our comprehensive consultation includes a high-definition digital examination and personalized treatment plan with upfront, transparent pricing. No hidden fees or unexpected charges.'
  },
  {
    id: 'faq-4',
    question: 'Is dental treatment painful here?',
    answer: 'Not at all. We practice gentle dentistry using micro-fine topical numbing gels, computer-guided rotary instruments, and noise-cancelling comfort protocols that eliminate pain and dental anxiety completely.'
  },
  {
    id: 'faq-5',
    question: 'Where is the clinic located in Malabar Hill?',
    answer: 'We are situated at Shop No. 9, Gate No. 2, L.D. Ruparel Marg, directly adjacent to Priyadarshini Park in Malabar Hill, Mumbai, with easy curbside parking access.'
  },
  {
    id: 'faq-6',
    question: 'How can I book or reschedule my visit?',
    answer: 'You can instantly request your preferred date and time through the floating booking pill on this page, or speak directly with our clinic coordinator at 079777 76136.'
  }
];

export const CLINIC_SERVICES: ClinicService[] = [
  {
    id: 'srv-whitening',
    name: 'Teeth Whitening',
    category: 'AESTHETICS',
    shortDesc: 'Gentle laser-activated whitening brightening enamel up to 8 shades.',
    imageSrc: CLINIC_IMAGES.smileResult,
    tag: 'WHITENING',
    badge: 'Laser Brightening',
    color: '#E2F743',
  },
  {
    id: 'srv-bonding',
    name: 'Bonding',
    category: 'COSMETIC',
    shortDesc: 'Artistic composite resin sculpting fixing chips, gaps, and edges.',
    imageSrc: CLINIC_IMAGES.dentalBonding,
    tag: 'BONDING',
    badge: 'Micro-Sculpting',
    color: '#61A2EE',
  },
  {
    id: 'srv-checkups',
    name: 'Check-ups',
    category: 'PREVENTIVE',
    shortDesc: 'Comprehensive 3D optical diagnostics and gentle oral wellness review.',
    imageSrc: CLINIC_IMAGES.digitalScanner,
    tag: 'CHECK-UPS',
    badge: '3D Optical Scan',
    color: '#C8F8C3',
  },
  {
    id: 'srv-cosmetics',
    name: 'Cosmetic Procedures',
    category: 'SMILE DESIGN',
    shortDesc: 'Bespoke smile transformations tailored to natural facial harmony.',
    imageSrc: CLINIC_IMAGES.heroToothWorkers,
    tag: 'COSMETICS',
    badge: 'Bespoke Aesthetics',
    color: '#E2F743',
  },
  {
    id: 'srv-implants',
    name: 'Dental Implants',
    category: 'RESTORATION',
    shortDesc: 'Computer-guided titanium implants paired with lifelike zirconia crowns.',
    imageSrc: CLINIC_IMAGES.titaniumImplant,
    tag: 'IMPLANTS',
    badge: 'Permanent Root Fix',
    color: '#61A2EE',
  },
  {
    id: 'srv-dentures',
    name: 'Dentures & Bridges',
    category: 'PROSTHETICS',
    shortDesc: 'Custom fixed bridges and featherlight flexible modern prosthetics.',
    imageSrc: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=500&q=75',
    tag: 'BRIDGES',
    badge: 'Natural Alignment',
    color: '#C8F8C3',
  },
  {
    id: 'srv-emergency',
    name: 'Emergency Care',
    category: 'URGENT RELIEF',
    shortDesc: 'Same-day priority intervention for acute toothache or trauma.',
    imageSrc: CLINIC_IMAGES.dentistAction,
    tag: 'EMERGENCY',
    badge: 'Immediate Relief',
    color: '#E2F743',
  },
  {
    id: 'srv-extractions',
    name: 'Extractions',
    category: 'SURGICAL',
    shortDesc: 'Atraumatic gentle tooth removal with soothing numbing protocols.',
    imageSrc: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=500&q=75',
    tag: 'EXTRACTION',
    badge: 'Gentle & Painless',
    color: '#61A2EE',
  },
  {
    id: 'srv-fillings',
    name: 'Fillings & Sealants',
    category: 'RESTORATION',
    shortDesc: 'Seamless tooth-colored composite resins and cavity-guard sealants.',
    imageSrc: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=500&q=75',
    tag: 'FILLINGS',
    badge: 'Invisible Shield',
    color: '#C8F8C3',
  },
  {
    id: 'srv-guards',
    name: 'Mouth Guards',
    category: 'PROTECTION',
    shortDesc: 'Precision-molded guards for nighttime bruxism and athletic sports.',
    imageSrc: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=500&q=75',
    tag: 'GUARDS',
    badge: 'Custom Molded',
    color: '#E2F743',
  },
  {
    id: 'srv-booking',
    name: 'Online Dentist Booking',
    category: 'CONVENIENCE',
    shortDesc: 'Instant verified reservation directly into Dr. Deepal’s schedule.',
    imageSrc: CLINIC_IMAGES.clinicLounge,
    tag: 'BOOKING',
    badge: 'Instant Confirmation',
    color: '#61A2EE',
  },
  {
    id: 'srv-surgery',
    name: 'Oral Surgery',
    category: 'SURGERY',
    shortDesc: 'Sterile surgical suite for wisdom teeth, bone grafting, and contouring.',
    imageSrc: CLINIC_IMAGES.clinicSuite,
    tag: 'SURGERY',
    badge: 'Hospital-Grade Care',
    color: '#C8F8C3',
  },
  {
    id: 'srv-paediatrics',
    name: 'Paediatrics',
    category: 'CHILD CARE',
    shortDesc: 'Warm, fun, and fear-free dental visits designed specifically for young smiles.',
    imageSrc: CLINIC_IMAGES.paediatrics,
    tag: 'KIDS CARE',
    badge: 'Fear-Free Comfort',
    color: '#E2F743',
  },
  {
    id: 'srv-rootcanal',
    name: 'Root Canals',
    category: 'ENDODONTICS',
    shortDesc: 'Microscopic single-sitting rotary therapy relieving pain permanently.',
    imageSrc: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=500&q=75',
    tag: 'ROOT CANAL',
    badge: 'Single-Sitting',
    color: '#61A2EE',
  },
  {
    id: 'srv-cleaning',
    name: 'Teeth Cleaning',
    category: 'HYGIENE',
    shortDesc: 'Ultrasonic hydro-polishing dissolving plaque, tartar, and coffee stains.',
    imageSrc: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=75',
    tag: 'CLEANING',
    badge: 'Ultrasonic Glow',
    color: '#C8F8C3',
  },
  {
    id: 'srv-reshaping',
    name: 'Teeth Reshaping',
    category: 'AESTHETICS',
    shortDesc: 'Subtle micro-contouring smoothing jagged edges and uneven enamel.',
    imageSrc: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=500&q=75',
    tag: 'RESHAPING',
    badge: 'Enamel Sculpting',
    color: '#E2F743',
  },
  {
    id: 'srv-veneers',
    name: 'Veneers & Crowns',
    category: 'PROSTHODONTICS',
    shortDesc: 'Handcrafted wafer-thin porcelain veneers and monolithic zirconia crowns.',
    imageSrc: CLINIC_IMAGES.veneersCrowns,
    tag: 'VENEERS',
    badge: 'Custom Porcelain',
    color: '#61A2EE',
  },
  {
    id: 'srv-xray',
    name: 'X-Ray',
    category: 'DIAGNOSTICS',
    shortDesc: 'Instant ultra-low radiation digital panoramic and 3D CBCT imaging.',
    imageSrc: CLINIC_IMAGES.dentalXray,
    tag: '3D X-RAY',
    badge: 'HD Digital Scans',
    color: '#C8F8C3',
  },
];

