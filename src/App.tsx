import React, { useEffect, useState } from "react";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { History } from "./components/History";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ArrowDown, 
  MessageSquare, 
  Mail, 
  MapPin,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Inline Icons to avoid lucide-react version mismatches
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Helper component for navigation links
const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-display font-bold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
  >
    {children}
  </a>
);

function App() {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"id" | "en">("id");

  // Load theme preference on mount using a unique key
  useEffect(() => {
    const savedTheme = localStorage.getItem("vite-portfolio-theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("vite-portfolio-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: lang === "id" ? "Tentang" : "About", href: "#about" },
    { label: lang === "id" ? "Proyek" : "Projects", href: "#projects" },
    { label: lang === "id" ? "Keahlian" : "Skills", href: "#skills" },
    { label: lang === "id" ? "Catatan" : "Journal", href: "#journal" },
    { label: lang === "id" ? "Kontak" : "Contact", href: "#contact" }
  ];

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans bg-brand-bg-light text-neutral-900 dark:bg-brand-bg-dark dark:text-neutral-50 overflow-x-hidden scroll-smooth">
      
      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-brand-bg-light/80 dark:bg-brand-bg-dark/80 border-b border-brand-rose-dust/20 dark:border-brand-plum-muted/10 py-4 px-6 sm:px-12 lg:px-24 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-brand-lavender-soft dark:bg-brand-lavender-bright flex items-center justify-center font-display font-bold text-white dark:text-brand-bg-dark text-md shadow-sm transition-transform duration-300 group-hover:rotate-12">
            AF
          </div>
          <span className="font-display font-bold tracking-tight text-lg uppercase hidden sm:inline-block">Ahmad Farhan</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Language Switcher Button (ID | EN) */}
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            aria-label="Toggle Language"
            className="font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg border border-brand-rose-dust/40 dark:border-brand-plum-muted/40 bg-brand-rose-soft/20 dark:bg-brand-plum-charcoal/20 hover:bg-brand-rose-soft/40 dark:hover:bg-brand-plum-charcoal/40 transition-colors uppercase cursor-pointer"
          >
            <span className={lang === "id" ? "text-brand-lavender-soft dark:text-brand-lavender-bright font-extrabold" : "text-neutral-400 dark:text-neutral-500"}>ID</span>
            <span className="text-neutral-400 dark:text-neutral-500 font-normal mx-0.5">|</span>
            <span className={lang === "en" ? "text-brand-lavender-soft dark:text-brand-lavender-bright font-extrabold" : "text-neutral-400 dark:text-neutral-500"}>EN</span>
          </button>

          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-brand-rose-dust/40 dark:border-brand-plum-muted/40 bg-brand-rose-soft/20 dark:bg-brand-plum-charcoal/20 hover:bg-brand-rose-soft/60 dark:hover:bg-brand-plum-charcoal/60 transition-all duration-300 cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-brand-lavender-soft" />
            ) : (
              <Sun className="w-4 h-4 text-brand-lavender-bright" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-brand-rose-dust/40 dark:border-brand-plum-muted/40 md:hidden flex items-center justify-center text-neutral-600 dark:text-neutral-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[65px] left-0 w-full z-40 bg-brand-bg-light dark:bg-brand-bg-dark border-b border-brand-rose-dust/30 dark:border-brand-plum-muted/20 px-6 py-8 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.label} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION (#home) - Reusable Minimalist Hero Layout */}
      <section 
        id="home" 
        className="relative flex min-h-screen w-full flex-col items-center justify-between pt-24 pb-12 px-6 sm:px-12 lg:px-24"
      >
        {/* Helper layout spacing */}
        <div />

        {/* Main Content Area */}
        <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-12 gap-8 md:gap-4 my-auto">
          
          {/* Left Column: Description (md:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="z-20 order-2 md:order-1 md:col-span-4 text-left flex flex-col items-start gap-6"
          >
            <span className="font-mono text-xs tracking-widest text-brand-lavender-soft dark:text-brand-lavender-bright uppercase block">
              {lang === "id" ? "• perkenalan singkat" : "• personal introduction"}
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans text-justify">
              {lang === "id" 
                ? "Mahasiswa Teknik Informatika di Universitas Muhammadiyah Riau yang aktif mengelola usaha retail alif-parcel. Memiliki kegemaran berolahraga dengan minat mendalam di cabang Powerlifting, serta memiliki dedikasi kepemimpinan kuat melalui perjalanan panjang di organisasi kepramukaan."
                : "IT student at Universitas Muhammadiyah Riau who actively manages the alif-parcel retail business. Highly passionate about strength training with a deep focus on Powerlifting, combined with a strong leadership background forged through extensive scouting organizations."}
            </p>
            <a 
              href="#about" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-white underline decoration-brand-lavender-soft dark:decoration-brand-lavender-bright decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span>{lang === "id" ? "Pelajari Selengkapnya" : "Learn More"}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Center Column: Portrait Image with Circle Aksen (md:col-span-4) */}
          <div className="relative order-1 md:order-2 md:col-span-4 flex justify-center items-center h-[350px] md:h-[450px]">
            {/* Background circle in lavender color */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute z-0 h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] rounded-full bg-brand-lavender-soft/40 dark:bg-brand-plum-charcoal/50 border border-brand-rose-dust/30 dark:border-brand-plum-muted/20"
            />
            {/* User photo: farhan.jpg */}
            <motion.img
              src="/images/farhan.jpg"
              alt="Ahmad Farhan"
              className="relative z-10 h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px] object-cover rounded-full border-4 border-brand-bg-light dark:border-brand-bg-dark shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x400/c5b3d3/ffffff?text=Ahmad+Farhan`;
              }}
            />
          </div>

          {/* Right Column: Name Typography Overlay (md:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="z-20 order-3 md:order-3 md:col-span-4 flex items-center justify-start text-left"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tighter leading-[0.9] uppercase">
              AHMAD
              <br />
              <span className="text-brand-lavender-soft dark:text-brand-lavender-bright">FARHAN.</span>
            </h1>
          </motion.div>
        </div>

        {/* Footer Hero */}
        <footer className="z-30 flex w-full max-w-7xl items-center justify-between border-t border-brand-rose-dust/20 dark:border-brand-plum-muted/10 pt-6 text-xs sm:text-sm font-mono text-neutral-500">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center space-x-4"
          >
            <a href="https://github.com/ahdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors">GitHub</a>
            <span>/</span>
            <a href="https://www.linkedin.com/in/ahmdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors">LinkedIn</a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Pekanbaru, Riau, ID</span>
          </motion.div>
        </footer>
      </section>

      {/* PORTFOLIO CONTENT WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* ABOUT SECTION */}
        <About lang={lang} />

        {/* PROJECTS SECTION */}
        <Projects lang={lang} />

        {/* SKILLS SECTION */}
        <Skills lang={lang} />

        {/* JOURNAL SECTION (History) */}
        <History lang={lang} />

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-brand-rose-dust/30 dark:border-brand-plum-muted/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-4">
              <span className="font-mono text-xs tracking-widest text-brand-lavender-soft dark:text-brand-lavender-bright uppercase mb-4 block">
                {lang === "id" ? "// hubungi saya / kontak" : "// contact me"}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-50 mb-6">
                {lang === "id" ? <>Mulai <br /> Koneksi.</> : <>Build <br /> Connections.</>}
              </h2>
              <div className="w-12 h-[1px] bg-brand-rose-dust dark:bg-brand-plum-muted mb-8" />
              <p className="font-mono text-xs text-neutral-400 dark:text-neutral-500 max-w-[220px] leading-relaxed">
                {lang === "id" 
                  ? "Silakan hubungi saya melalui media sosial di samping untuk mendiskusikan peluang magang atau proyek kolaboratif."
                  : "Please reach out via the social links on the right to discuss internship opportunities or collaborative projects."}
              </p>
            </div>

            {/* Right Column: Contact Details */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Form placeholder / Grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Social Card 1: WhatsApp */}
                <a 
                  href="https://wa.me/6285351561344" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-rose-soft/40 dark:bg-brand-plum-charcoal/40 rounded-xl text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-mono text-xs text-neutral-400 uppercase">WhatsApp</h4>
                      <p className="font-display font-bold text-neutral-900 dark:text-neutral-100">+62 853-5156-1344</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Social Card 2: Email */}
                <a 
                  href="mailto:itsmeaan08@gmail.com"
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-rose-soft/40 dark:bg-brand-plum-charcoal/40 rounded-xl text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-mono text-xs text-neutral-400 uppercase">Email</h4>
                      <p className="font-display font-bold text-neutral-900 dark:text-neutral-100">itsmeaan08@gmail.com</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Social Card 3: LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/ahmdfaarhaan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-rose-soft/40 dark:bg-brand-plum-charcoal/40 rounded-xl text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <LinkedinIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-mono text-xs text-neutral-400 uppercase">LinkedIn</h4>
                      <p className="font-display font-bold text-neutral-900 dark:text-neutral-100">ahmdfaarhaan</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Social Card 4: Instagram */}
                <a 
                  href="https://instagram.com/_ahdfarhan_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-rose-soft/40 dark:bg-brand-plum-charcoal/40 rounded-xl text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <InstagramIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-mono text-xs text-neutral-400 uppercase">Instagram</h4>
                      <p className="font-display font-bold text-neutral-900 dark:text-neutral-100">@_ahdfarhan_</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

              </div>

            </div>

          </div>
        </section>

      </div>

      {/* MAIN FOOTER */}
      <footer className="w-full border-t border-brand-rose-dust/20 dark:border-brand-plum-muted/10 bg-brand-bg-light/50 dark:bg-brand-bg-dark/50 py-8 px-6 sm:px-12 lg:px-24 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
        <div>
          &copy; 2026 Ahmad Farhan. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/ahdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors">GitHub</a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/ahmdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors">LinkedIn</a>
          <span>/</span>
          <a href="https://instagram.com/_ahdfarhan_" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors">Instagram</a>
        </div>
      </footer>

    </div>
  );
}

export default App;
