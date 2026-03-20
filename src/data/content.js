// ===== TEAM =====
export const TEAM = [
  {
    id: 1, initials: 'P', name: 'Pranav',
    role: 'Founder & Creative Director',
    photoUrl: '/team/founder.jpg',
    bio: '5+ years building digital products. Leads all web design, creative strategy, and client relationships. Obsessed with the intersection of aesthetics and performance.',
    skills: ['Web Design', 'Branding', 'Strategy'],
    gradient: 'linear-gradient(135deg,#2D1060,#7B5CF0)',
    bgGradient: 'linear-gradient(135deg,#1A0E2E,#2D1A55)',
    works: [
      { name: 'Nexora Jewellery', type: 'Brand + Web', color: '#9B7FFF' },
      { name: 'FarmFresh Co.', type: 'E-Commerce', color: '#FF4D2E' },
    ],
    stats: [{ n: '30+', l: 'Projects', key: 'projects' }, { n: '5yr', l: 'Exp', key: 'exp' }, { n: '4', l: 'Languages', key: 'langs' }],
  },
  {
    id: 2, initials: 'PR', name: 'Priya Reddy',
    role: 'SEO & Content Lead',
    bio: 'Data-driven SEO specialist with a journalism background. Turns keyword research into content that ranks and actually gets read. Google-certified.',
    skills: ['SEO', 'Content', 'Analytics'],
    gradient: 'linear-gradient(135deg,#601020,#C23535)',
    bgGradient: 'linear-gradient(135deg,#1A0A0A,#3D1010)',
    works: [
      { name: 'Zephyr Tech', type: 'SEO Campaign', color: '#C5F135' },
      { name: 'MedCare Clinic', type: 'Content', color: '#F5E642' },
    ],
    stats: [{ n: '20+', l: 'Campaigns', key: 'campaigns' }, { n: '3yr', l: 'Exp', key: 'exp' }, { n: '2', l: 'Certifications', key: 'certs' }],
  },
  {
    id: 3, initials: 'SK', name: 'Sai Krishna',
    role: 'Frontend Developer',
    bio: 'React & Webflow specialist. Turns designs into pixel-perfect, blazing-fast websites. Performance scores are never an afterthought.',
    skills: ['React', 'Webflow', 'Next.js'],
    gradient: 'linear-gradient(135deg,#105010,#2E9940)',
    bgGradient: 'linear-gradient(135deg,#0A1A0A,#103010)',
    works: [
      { name: 'SpiceRoute Foods', type: 'Web Dev', color: '#3B82F6' },
      { name: 'Nexora Jewellery', type: 'Frontend', color: '#FF4D2E' },
    ],
    stats: [{ n: '40+', l: 'Sites Built', key: 'sites' }, { n: '4yr', l: 'Exp', key: 'exp' }, { n: '99', l: 'PageSpeed', key: 'speed' }],
  },
  {
    id: 4, initials: 'NV', name: 'Nandini Varma',
    role: 'Brand Designer & Illustrator',
    bio: 'Creates visual identities that feel alive. Logo systems, packaging, brand guidelines from scratch. Studied at NID Ahmedabad.',
    skills: ['Figma', 'Illustration', 'Packaging'],
    gradient: 'linear-gradient(135deg,#604010,#C28020)',
    bgGradient: 'linear-gradient(135deg,#1A100A,#3D2510)',
    works: [
      { name: 'SpiceRoute Foods', type: 'Brand', color: '#9B7FFF' },
      { name: 'FarmFresh', type: 'Packaging', color: '#C5F135' },
    ],
    stats: [{ n: '25+', l: 'Brands', key: 'brands' }, { n: '4yr', l: 'Exp', key: 'exp' }, { n: 'NID', l: 'Ahmedabad' }],
    wide: true,
  },
  {
    id: 5, initials: 'RV', name: 'Rohit Varma',
    role: 'Video Editor & Motion Designer',
    bio: 'Short-form specialist. Reels, explainer videos, brand films. Makes brands move in a way that stops thumbs mid-scroll. Adobe Suite expert.',
    skills: ['Premiere', 'After Effects', 'Reels'],
    gradient: 'linear-gradient(135deg,#106060,#2099A8)',
    bgGradient: 'linear-gradient(135deg,#0A1818,#102A30)',
    works: [
      { name: 'MedCare Clinic', type: 'Social Videos', color: '#FF4D2E' },
      { name: 'Nexora Jewellery', type: 'Brand Film', color: '#F5E642' },
    ],
    stats: [{ n: '60+', l: 'Videos', key: 'videos' }, { n: '3yr', l: 'Exp', key: 'exp' }, { n: '1M+', l: 'Views', key: 'views' }],
    wide: true,
  },
]

// ===== PORTFOLIO =====
export const PORTFOLIO = [
  {
    id: 1, wide: true,
    name: 'Nexora Jewellery — Full Transformation',
    type: 'Brand Identity · Web Design · Motion',
    client: 'Nexora Jewellery, Hyderabad',
    result: '↑ 280% Traffic',
    gradient: 'linear-gradient(135deg,#1A0E2E,#3D1B8C)',
    label: 'Brand + Web',
  },
  {
    id: 2,
    name: 'Zephyr Tech — Search Growth',
    type: 'SEO · Content Strategy',
    client: 'Zephyr Technologies',
    result: 'Page 1 in 3 months',
    gradient: 'linear-gradient(135deg,#0A1A10,#1A5C2A)',
    label: 'SEO',
  },
  {
    id: 3,
    name: 'FarmFresh — Online Store',
    type: 'Web Dev · Shopify',
    client: 'FarmFresh Co., Vizag',
    result: '↑ 3× Conversions',
    gradient: 'linear-gradient(135deg,#1A0A0A,#7C1F1F)',
    label: 'E-Commerce',
  },
  {
    id: 4,
    name: 'MedCare — Social Rebrand',
    type: 'Social Media · Video',
    client: 'MedCare, Bhimavaram',
    result: '50K new followers',
    gradient: 'linear-gradient(135deg,#0A0F1A,#1A3566)',
    label: 'Social',
  },
  {
    id: 5,
    name: 'SpiceRoute — Brand Launch',
    type: 'Brand · Video',
    client: 'SpiceRoute Foods',
    result: '↑ 190% Brand Recall',
    gradient: 'linear-gradient(135deg,#1A1A0A,#4A4A10)',
    label: 'Brand + Video',
  },
]

// ===== SERVICES =====
export const SERVICES = [
  { num: '01', icon: '⬡', title: 'Web Design & Development', desc: 'Custom-built websites that load fast, look stunning, and convert — from landing pages to full e-commerce platforms.', tags: ['React', 'Webflow', 'Shopify', 'WordPress'], span: 7, tall: true, featured: true },
  { num: 'Avg. Result', title: '', stat: '3×', statSub: 'ROI', desc: 'Average return clients see after a full digital refresh.', span: 5, dark: true },
  { num: '02', icon: '◎', title: 'SEO & Content Strategy', desc: 'Rank higher, stay there. Technical audits + content that search engines and humans love.', tags: ['On-Page', 'Backlinks', 'Blogging'], span: 5 },
  { num: '03', icon: '◈', title: 'Brand Identity', desc: 'Logo, palette, typography and brand guidelines done right.', span: 4 },
  { num: '04', icon: '▶', title: 'Video & Content', desc: 'Reels, edits, short-form. Scroll-stopping.', span: 3 },
  { num: '05', icon: '📱', title: 'Social Media Management', desc: 'Consistent posting, real engagement, followers who care.', span: 6, lime: true },
  { num: 'Languages', span: 6, langs: true },
]

// ===== PRICING =====
export const PLANS = [
  {
    name: 'Starter',
    desc: 'Perfect for new businesses getting their digital presence off the ground.',
    priceMonthly: 15000,
    priceAnnual: 12000,
    features: [
      { text: '5-page website design', included: true },
      { text: 'Mobile responsive', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Contact form integration', included: true },
      { text: '1 revision round', included: true },
      { text: 'E-commerce', included: false },
      { text: 'Brand identity', included: false },
      { text: 'Social media management', included: false },
    ],
    cta: 'Get Started →',
  },
  {
    name: 'Growth',
    desc: 'For established businesses ready to dominate their market online.',
    priceMonthly: 35000,
    priceAnnual: 28000,
    popular: true,
    features: [
      { text: '15-page website + CMS', included: true },
      { text: 'Full brand identity', included: true },
      { text: 'Advanced SEO + 4 blogs/mo', included: true },
      { text: 'E-commerce ready', included: true },
      { text: '3 revision rounds', included: true },
      { text: 'Social media (2 platforms)', included: true },
      { text: 'Monthly analytics report', included: true },
      { text: 'Video production', included: false },
    ],
    cta: 'Get Started →',
  },
  {
    name: 'Enterprise',
    desc: 'Full-stack digital partner. Everything we do, under one retainer.',
    priceMonthly: null,
    priceAnnual: null,
    features: [
      { text: 'Unlimited pages + features', included: true },
      { text: 'Complete brand system', included: true },
      { text: 'Full SEO + content team', included: true },
      { text: 'Video production', included: true },
      { text: 'All social platforms', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Weekly strategy calls', included: true },
      { text: 'Priority support 24/7', included: true },
    ],
    cta: 'Talk to Us →',
  },
]

// ===== FAQ =====
export const FAQS = [
  { q: 'How long does a website project take?', a: 'Typically 2–4 weeks for a standard 5–10 page website. Larger projects (e-commerce, complex integrations) take 4–8 weeks. We\'ll give you a clear timeline before we start, and we stick to it.' },
  { q: 'Can you work with clients outside Andhra Pradesh?', a: 'Absolutely. We work with clients across India and internationally. All communication happens over Slack, WhatsApp, and video calls. We\'re fluent in English, Telugu, Hindi, and Spanish.' },
  { q: 'What do I need to provide to get started?', a: 'Just a brief overview of your business and goals. We\'ll handle the rest — research, strategy, design, development, and launch. The more context you share, the better we can tailor our work.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Yes. All packages include a post-launch support window. Growth and Enterprise clients also get monthly strategy calls and analytics reporting. We build long-term relationships, not just one-off projects.' },
  { q: 'How does the SEO service work?', a: 'We start with a full technical audit, then research the best keywords for your business. We optimize your existing pages, fix technical issues, build quality backlinks, and create content that ranks. Monthly reports show exactly what\'s improved.' },
  { q: 'Can I track my project progress in real time?', a: 'Yes! Every client gets access to our Client Portal where you can see project progress, deliverables, team messages, and upcoming milestones in real time.' },
  { q: 'Do you create content in Telugu and Hindi?', a: 'Yes! We\'re an Andhra Pradesh-based team fluent in Telugu and Hindi. We can create website copy, blog content, social media posts, and video scripts in all four languages: Telugu, Hindi, English, and Spanish.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfer (NEFT/RTGS/IMPS), UPI, Razorpay, and international wire transfers. We typically work on 50% upfront, 50% on delivery for projects, and monthly billing for retainers.' },
]

// ===== BLOG =====
export const POSTS = [
  { id: 1, cat: 'Web Design', catClass: 'cat-web', title: '10 Web Design Trends Dominating India in 2026', excerpt: 'From glassmorphism to bento grids — here\'s what Indian businesses are using to stand out online this year.', date: 'Mar 15, 2026', read: '6 min', gradient: 'linear-gradient(135deg,#12082A,#2D1A55)' },
  { id: 2, cat: 'SEO', catClass: 'cat-seo', title: 'Why Your Telugu Business Needs a Local SEO Strategy', excerpt: 'Local search in regional languages is exploding. Here\'s how to capture your Andhra Pradesh audience before your competitors do.', date: 'Mar 10, 2026', read: '8 min', gradient: 'linear-gradient(135deg,#0A1A10,#103020)' },
  { id: 3, cat: 'Branding', catClass: 'cat-brand', title: 'The Brand Identity Checklist Every Indian Business Needs', excerpt: 'A logo is not a brand. Here\'s the complete checklist of what a proper brand identity includes — and why each element matters.', date: 'Mar 5, 2026', read: '5 min', gradient: 'linear-gradient(135deg,#1A100A,#3A1F0A)' },
]

// ===== INSTAGRAM MOCK POSTS =====
export const IG_POSTS = [
  { id: 1, likes: 284, comments: 18, gradient: 'linear-gradient(135deg,#1A0E2E,#7B5CF0)' },
  { id: 2, likes: 412, comments: 31, gradient: 'linear-gradient(135deg,#0A1A10,#2E9940)' },
  { id: 3, likes: 195, comments: 12, gradient: 'linear-gradient(135deg,#1A0A0A,#C23535)' },
  { id: 4, likes: 339, comments: 24, gradient: 'linear-gradient(135deg,#1A100A,#C28020)' },
  { id: 5, likes: 518, comments: 42, gradient: 'linear-gradient(135deg,#0A0F1A,#2556A8)' },
  { id: 6, likes: 267, comments: 19, gradient: 'linear-gradient(135deg,#101A0A,#3A7010)' },
  { id: 7, likes: 445, comments: 35, gradient: 'linear-gradient(135deg,#1A0A10,#7C1A4A)' },
  { id: 8, likes: 302, comments: 27, gradient: 'linear-gradient(135deg,#0A1818,#0A5060)' },
  { id: 9, likes: 387, comments: 22, gradient: 'linear-gradient(135deg,#1A1A0A,#6A6A10)' },
  { id: 10, likes: 214, comments: 16, gradient: 'linear-gradient(135deg,#180A1A,#5C1080)' },
  { id: 11, likes: 476, comments: 38, gradient: 'linear-gradient(135deg,#0A180A,#1A7030)' },
  { id: 12, likes: 329, comments: 21, gradient: 'linear-gradient(135deg,#1A0C0A,#882010)' },
]

// ===== ADMIN DATA =====
export const LEADS = [
  { client: 'Ravi Kiran', service: 'Web Design', date: '18 Mar', status: 'new' },
  { client: 'Sunita Reddy', service: 'SEO Package', date: '17 Mar', status: 'progress' },
  { client: 'Arjun Mehta', service: 'Brand Identity', date: '16 Mar', status: 'followup' },
  { client: 'FarmFresh Co.', service: 'Full Package', date: '14 Mar', status: 'done' },
  { client: 'Zephyr Tech', service: 'SEO + Content', date: '12 Mar', status: 'done' },
]

export const PROJECTS = [
  { name: 'Nexora Jewellery', type: 'Brand + Web', icon: '💎', progress: 75, color: '#9B7FFF' },
  { name: 'FarmFresh Store', type: 'E-Commerce', icon: '🌿', progress: 40, color: '#9B7FFF' },
  { name: 'SpiceRoute Foods', type: 'Brand + Video', icon: '🌶', progress: 90, color: '#C5F135' },
  { name: 'MedCare Clinic', type: 'Social + SEO', icon: '🏥', progress: 55, color: '#F5E642' },
]

// ===== CLIENT PORTAL DATA =====
export const CLIENT_DEMO = {
  email: 'client@nexora.com',
  password: 'nexora123',
  name: 'Ravi',
  company: 'Nexora Jewellery',
  status: '🔨 Currently in Build Phase',
  complete: 75,
  daysLeft: 22,
  deliverables: 3,
  totalDeliverables: 7,
  timeline: [
    { title: 'Discovery & Research', date: '3 Mar 2026', done: true },
    { title: 'Strategy & Proposal', date: '8 Mar 2026', done: true },
    { title: 'Design & Development', date: 'Est. 28 Mar 2026', current: true },
    { title: 'Review & Revisions', date: 'Est. 3 Apr 2026', done: false },
    { title: 'Launch 🚀', date: 'Target: 10 Apr 2026', done: false },
  ],
  checklist: [
    { text: 'Brand Discovery Document', done: true },
    { text: 'Logo Design (3 concepts)', done: true },
    { text: 'Color Palette & Typography System', done: true },
    { text: 'Website Design (Figma Mockups)', done: false },
    { text: 'Website Development (React)', done: false },
    { text: 'SEO Setup & Analytics', done: false },
    { text: 'Final Review & Launch', done: false },
  ],
  messages: [
    { from: 'team', initials: 'P', name: 'Pranav · Team', text: 'Hi Ravi! The homepage design is ready for review. Sharing the Figma link shortly.' },
    { from: 'client', initials: 'RK', name: 'You', text: 'Looking great so far! Can we also add a Telugu version of the homepage?' },
    { from: 'team', initials: 'P', name: 'Pranav · Team', text: 'Absolutely! We already have the i18n system set up — Telugu will be added this week. ✓' },
  ],
}
