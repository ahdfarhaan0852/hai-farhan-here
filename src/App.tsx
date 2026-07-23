import React, { useEffect, useState } from "react";
import { Skills } from "./components/Skills";
import { LiquidRevealHero } from "./components/LiquidRevealHero";
import { ExperienceHub } from "./components/3d/ExperienceHub";
import { 
  Moon, 
  Sun, 
  Mail, 
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

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

function App() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    const savedTheme = localStorage.getItem("vite-portfolio-theme") || "dark";
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

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans bg-brand-bg-light text-neutral-900 dark:bg-brand-bg-dark dark:text-neutral-50 overflow-x-hidden scroll-smooth">
      
      {/* Floating Theme & Language Quick Toggle Controls (Header Navbar Removed) */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-neutral-950/80 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl">
        <button
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          aria-label="Toggle Language"
          className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors uppercase text-white cursor-pointer"
        >
          <span className={lang === "id" ? "text-purple-400 font-extrabold" : "text-neutral-400"}>ID</span>
          <span className="text-neutral-500 mx-1">|</span>
          <span className={lang === "en" ? "text-purple-400 font-extrabold" : "text-neutral-400"}>EN</span>
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 text-purple-300" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-300" />
          )}
        </button>
      </div>

      {/* 1. HERO SECTION (#home) - Face & Bio Liquid Reveal */}
      <section id="home" className="w-full min-h-screen">
        <LiquidRevealHero lang={lang} />
      </section>

      {/* 2. EXPERIENCE HUB SECTION - Dual 3D Portals (Left: Work & Education Journey | Right: Projects Carousel) */}
      <section id="experience" className="w-full">
        <ExperienceHub lang={lang} />
      </section>

      {/* 3. SKILLS SECTION & 4. CONTACT SECTION WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">
        {/* SKILLS SECTION */}
        <section id="skills" className="w-full pt-16">
          <Skills lang={lang} />
        </section>

        {/* CONTACT SECTION */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="py-24"
        >
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Social Card 1: WhatsApp */}
                <a 
                  href="https://wa.me/6285351561344" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-brand-lavender-soft/10 dark:bg-brand-lavender-bright/10 text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-neutral-400 block">WhatsApp / Phone</span>
                      <span className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100">+62 853-5156-1344</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-brand-lavender-soft dark:group-hover:text-brand-lavender-bright transition-colors" />
                </a>

                {/* Social Card 2: Email */}
                <a 
                  href="mailto:farhanahmad0852@gmail.com" 
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-brand-lavender-soft/10 dark:bg-brand-lavender-bright/10 text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-neutral-400 block">Email Direct</span>
                      <span className="font-display font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">farhanahmad0852@gmail.com</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-brand-lavender-soft dark:group-hover:text-brand-lavender-bright transition-colors" />
                </a>

                {/* Social Card 3: LinkedIn */}
                <a 
                  href="https://linkedin.com/in/ahmdfaarhaan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-brand-lavender-soft/10 dark:bg-brand-lavender-bright/10 text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-neutral-400 block">LinkedIn Profile</span>
                      <span className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100">ahmdfaarhaan</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-brand-lavender-soft dark:group-hover:text-brand-lavender-bright transition-colors" />
                </a>

                {/* Social Card 4: Instagram */}
                <a 
                  href="https://instagram.com/_ahdfarhan_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/30 dark:hover:bg-brand-plum-charcoal/30 flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-brand-lavender-soft/10 dark:bg-brand-lavender-bright/10 text-brand-lavender-soft dark:text-brand-lavender-bright">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-neutral-400 block">Instagram</span>
                      <span className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100">@_ahdfarhan_</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-brand-lavender-soft dark:group-hover:text-brand-lavender-bright transition-colors" />
                </a>

              </div>
            </div>

          </div>
        </motion.section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-brand-rose-dust/20 dark:border-brand-plum-muted/10 py-12 px-6 sm:px-12 lg:px-24 text-center font-mono text-xs text-neutral-400 dark:text-neutral-500">
        <p>© 2026 Ahmad Farhan. Built with React, Three.js, R3F & Tailwind CSS.</p>
      </footer>

    </div>
  );
}

export default App;
