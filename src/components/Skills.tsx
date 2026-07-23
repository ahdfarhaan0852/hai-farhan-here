import React from "react";
import { Languages, ShieldCheck, Layers } from "lucide-react";

import { motion } from "framer-motion";

interface SkillTech {
  name: string;
  logoPath: string;
}

interface SkillCategory {
  title: string;
  items: SkillTech[];
}

interface SkillsProps {
  lang: "id" | "en";
}

export const Skills: React.FC<SkillsProps> = ({ lang }) => {
  const categorizedSkills: SkillCategory[] = [
    {
      title: "FRONT-END",
      items: [
        { name: "HTML5", logoPath: "/logos/html5.png" },
        { name: "CSS3", logoPath: "/logos/css3.jpg" },
        { name: "JavaScript", logoPath: "/logos/jss.png" },
        { name: "React.js", logoPath: "/logos/react-native.jpg" },
        { name: "Tailwind CSS", logoPath: "/logos/tailwind.svg" },
        { name: "Vite", logoPath: "/logos/vitejs.svg" },
        { name: "Framer Motion", logoPath: "/logos/frammer motion.png" },
        { name: "Next.js", logoPath: "/logos/nextjs.svg" }
      ]
    },
    {
      title: "BACK-END",
      items: [
        { name: "Node.js", logoPath: "/logos/nodejs-logo.svg" },
        { name: "PHP", logoPath: "/logos/php.svg" },
        { name: "Python", logoPath: "/logos/python.svg" },
        { name: "Flask", logoPath: "/logos/flask.png" }
      ]
    },
    {
      title: "AI / MACHINE LEARNING",
      items: [
        { name: "Jupyter Notebook", logoPath: "/logos/jupyter-notebook.png" },
        { name: "Anaconda", logoPath: "/logos/anaconda.png" }
      ]
    },
    {
      title: "DATABASE",
      items: [
        { name: "MySQL", logoPath: "/logos/mysql-logo.svg" },
        { name: "PostgreSQL", logoPath: "/logos/PostgreSQL-Logo.wine.png" },
        { name: "Firebase", logoPath: "/logos/firebase-1-logo.svg" },
        { name: "Supabase", logoPath: "/logos/supabase.jpg" }
      ]
    },
    {
      title: "TOOLS & DEVOPS",
      items: [
        { name: "Docker", logoPath: "/logos/docker.svg" },
        { name: "n8n", logoPath: "/logos/n8n-color.png" },
        { name: "Git", logoPath: "/logos/git.jpg" },
        { name: "VS Code", logoPath: "/logos/visual-studio-code-logo.svg" },
        { name: "Postman", logoPath: "/logos/postman-icon.svg" },
        { name: "Netlify", logoPath: "/logos/netlify.svg" }
      ]
    }
  ];

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column: Title */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 z-20">
          <span className="font-mono text-xs tracking-widest text-brand-lavender-soft dark:text-brand-lavender-bright uppercase mb-4 block">
            {lang === "id" ? "// kapabilitas / keahlian" : "// capabilities / skills"}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-50 mb-6">
            {lang === "id" ? <>Keahlian <br /> Kunci.</> : <>Key <br /> Skills.</>}
          </h2>
          <div className="w-12 h-[1px] bg-brand-rose-dust dark:bg-brand-plum-muted" />
        </div>

        {/* Right Column: Horizontal Grids Per Section */}
        <div className="lg:col-span-9 space-y-12 w-full">
          {categorizedSkills.map((category, catIndex) => (
            <div key={catIndex} className="space-y-4">
              {/* Section Sub-heading */}
              <h3 className="font-display font-bold text-sm tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-2 border-b border-brand-rose-dust/10 dark:border-brand-plum-muted/10 pb-2 uppercase">
                <Layers className="w-4 h-4 text-brand-lavender-soft dark:text-brand-lavender-bright" />
                <span>{category.title}</span>
              </h3>

              {/* Grid of Logo Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl border border-brand-rose-dust/30 dark:border-brand-plum-muted/30 bg-brand-rose-soft/10 dark:bg-brand-plum-charcoal/10 hover:bg-brand-rose-soft/20 dark:hover:bg-brand-plum-charcoal/20 hover:scale-[1.04] transition-all duration-300 min-h-[140px]"
                  >
                    {/* Logo Image */}
                    <div className="w-16 h-16 flex items-center justify-center shrink-0">
                      <img 
                        src={item.logoPath} 
                        alt={`${item.name} logo`} 
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:bg-white/90 dark:p-2 dark:rounded-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    {/* Label */}
                    <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-4 text-center leading-none">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Languages & Soft Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-normal border-t border-brand-rose-dust/20 dark:border-brand-plum-muted/10 pt-10">
            
            {/* Languages */}
            <div className="space-y-4">
              <h3 className="font-display font-bold uppercase text-lg tracking-wider text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                <Languages className="w-5 h-5 text-brand-lavender-soft dark:text-brand-lavender-bright" />
                <span>{lang === "id" ? "BAHASA" : "LANGUAGES"}</span>
              </h3>
              
              <div className="flex flex-col gap-3 font-mono text-sm">
                <div className="flex justify-between border-b border-brand-rose-dust/10 dark:border-brand-plum-muted/10 pb-1">
                  <span className="text-neutral-500">Bahasa Indonesia</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {lang === "id" ? "Native / Lancar" : "Native / Fluent"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-brand-rose-dust/10 dark:border-brand-plum-muted/10 pb-1">
                  <span className="text-neutral-500">Bahasa Inggris</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {lang === "id" ? "Lancar / Menguasai" : "Fluent / Proficient"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-brand-rose-dust/10 dark:border-brand-plum-muted/10 pb-1">
                  <span className="text-neutral-500">Bahasa Arab</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {lang === "id" ? "Lancar / Cakap" : "Fluent / Conversational"}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Values */}
            <div className="space-y-4">
              <h3 className="font-display font-bold uppercase text-lg tracking-wider text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-lavender-soft dark:text-brand-lavender-bright" />
                <span>{lang === "id" ? "NILAI PERSONAL & DISIPLIN" : "PERSONAL VALUES & DISCIPLINE"}</span>
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-normal text-justify">
                {lang === "id" 
                  ? "Disiplin tinggi & ketahanan fisik (ditempa lewat latihan kekuatan atletik Powerlifting), kepemimpinan lapangan (memimpin 400+ anggota sebagai Ketua Gugus Depan Pramuka Gontor), manajemen anggaran panitia, serta transparansi pelaporan."
                  : "High discipline & physical resilience (forged through competitive Powerlifting strength training), field leadership (led 400+ members as Gontor Scouting Front Leader), committee budget planning, and transparent reporting."}
              </p>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
};
