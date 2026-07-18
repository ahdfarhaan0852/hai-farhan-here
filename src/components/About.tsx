import React from "react";
import { GraduationCap } from "lucide-react";

interface AboutProps {
  lang: "id" | "en";
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  return (
    <section id="about" className="py-20 border-t border-brand-rose-dust/30 dark:border-brand-plum-muted/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-4">
          <span className="font-mono text-xs tracking-widest text-brand-lavender-soft dark:text-brand-lavender-bright uppercase mb-4 block">
            {lang === "id" ? "// profil / latar belakang" : "// profile / background"}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-50 mb-6">
            {lang === "id" ? <>Tentang <br /> Saya.</> : <>About <br /> Me.</>}
          </h2>
          <div className="w-12 h-[1px] bg-brand-rose-dust dark:bg-brand-plum-muted" />
        </div>

        {/* Right Column: Content narrative and education */}
        <div className="lg:col-span-8 space-y-8 font-normal">
          {lang === "id" ? (
            <>
              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                Saya adalah mahasiswa Teknik Informatika di Universitas Muhammadiyah Riau (UMRI) yang memiliki minat mendalam pada <strong className="font-bold">Data Science (Python)</strong>, pengembangan kecerdasan buatan (AI), serta manajemen basis data <strong className="font-bold">MySQL</strong>. Selain kesibukan akademik, saya juga aktif mengelola usaha retail lokal <strong className="font-bold">alif-parcel</strong>.
              </p>

              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                Berbekal kedisiplinan tinggi yang ditempa dari latar belakang pendidikan pesantren di Pondok Modern Gontor, kepemimpinan pramuka, serta latihan beban intensif olahraga kekuatan Powerlifting, saya selalu berkomitmen untuk menyelaraskan ketelitian teknis dengan manajemen operasional yang terstruktur.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                I am an IT student at Universitas Muhammadiyah Riau (UMRI) with a deep interest in <strong className="font-bold">Data Science (Python)</strong>, artificial intelligence (AI) development, and <strong className="font-bold">MySQL</strong> database management. Beyond academic life, I actively manage a local retail business called <strong className="font-bold">alif-parcel</strong>.
              </p>

              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                Armed with high discipline forged from a boarding school education background at Pondok Modern Gontor, scouting leadership, and intensive strength training in Powerlifting, I am always committed to aligning technical precision with structured operational management.
              </p>
            </>
          )}

          {/* Education Timeline */}
          <div className="pt-6 space-y-6">
            <h3 className="font-display font-bold uppercase text-lg tracking-wider text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-lavender-soft dark:text-brand-lavender-bright" />
              <span>{lang === "id" ? "RIWAYAT PENDIDIKAN" : "EDUCATION HISTORY"}</span>
            </h3>

            <div className="border-l border-brand-rose-dust/30 dark:border-brand-plum-muted/20 pl-6 sm:pl-8 space-y-6">
              
              {/* Education 1 */}
              <div className="relative">
                <div className="absolute w-2 h-2 rounded-full bg-brand-lavender-soft dark:bg-brand-lavender-bright -left-[29px] sm:-left-[37px] top-2 border border-brand-bg-light dark:border-brand-bg-dark" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h4 className="font-display font-bold text-neutral-900 dark:text-neutral-50">Universitas Muhammadiyah Riau (UMRI)</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {lang === "id" ? "Sarjana Teknik Informatika" : "Bachelor of Informatics Engineering"}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">2023 – 2027</span>
                </div>
                <p className="text-xs text-neutral-500 mt-2 font-mono">
                  {lang === "id"
                    ? "Mata Kuliah Relevan: Basis Data, Pemrograman Web, Struktur Data, Pembelajaran Mesin."
                    : "Relevant Courses: Databases, Web Programming, Data Structures, Machine Learning."}
                </p>
              </div>

              {/* Education 2 */}
              <div className="relative">
                <div className="absolute w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 -left-[29px] sm:-left-[37px] top-2 border border-brand-bg-light dark:border-brand-bg-dark" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h4 className="font-display font-bold text-neutral-900 dark:text-neutral-50">Pondok Modern Darussalam Gontor</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {lang === "id" ? "Pendidikan Formal & Pengajaran Guru" : "Formal Education & Teacher Training"}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">2015 – 2023</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
