import React from "react";
import { LinkPreview } from "./ui/link-preview";
import { Award, Briefcase, Footprints, Trees } from "lucide-react";

interface HistoryProps {
  lang: "id" | "en";
}

export const History: React.FC<HistoryProps> = ({ lang }) => {
  return (
    <section id="journal" className="py-20 border-t border-brand-rose-dust/30 dark:border-brand-plum-muted/20">
      
      {/* Editorial Page Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Heading & Info */}
        <div className="lg:col-span-4">
          <span className="font-mono text-xs tracking-widest text-brand-lavender-soft dark:text-brand-lavender-bright uppercase mb-4 block">
            {lang === "id" ? "// alur / sejarah" : "// timeline / history"}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight uppercase leading-none text-neutral-900 dark:text-neutral-50 mb-6">
            {lang === "id" ? <>Catatan <br /> Perjalanan.</> : <>Journey <br /> Journal.</>}
          </h1>
          <div className="w-12 h-[1px] bg-brand-rose-dust dark:bg-brand-plum-muted mb-8" />
          <p className="font-mono text-xs text-neutral-400 dark:text-neutral-500 max-w-[200px] leading-relaxed">
            {lang === "id"
              ? "Rekam jejak riwayat hidup, dedikasi sosial kepramukaan, minat olahraga kekuatan, serta pengalaman kerja praktis."
              : "Record of personal history, scouting social dedication, strength sports passion, and practical labor work experience."}
          </p>
        </div>

        {/* Right Column: Editorial Narrative Thread */}
        <div className="lg:col-span-8 border-l border-brand-rose-dust/30 dark:border-brand-plum-muted/20 pl-6 sm:pl-10 py-2 text-left">
          
          <div className="flex flex-col gap-14">
            
            {/* Poin 1: Powerlifting */}
            <div className="relative space-y-4">
              {/* Abstract point on the timeline border */}
              <div className="absolute w-2.5 h-2.5 rounded-full bg-brand-lavender-soft dark:bg-brand-lavender-bright -left-[31.5px] sm:-left-[47.5px] top-1.5 border border-brand-bg-light dark:border-brand-bg-dark" />
              
              <h3 className="font-display font-bold text-sm tracking-wider text-neutral-900 dark:text-neutral-50 uppercase flex items-center gap-2">
                <Footprints className="w-4 h-4 text-brand-lavender-soft dark:text-brand-lavender-bright" />
                <span>
                  {lang === "id" 
                    ? "01 / DEDIKASI OLAHRAGA KEKUATAN & POWERLIFTING" 
                    : "01 / STRENGTH SPORTS DEDICATION & POWERLIFTING"}
                </span>
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal text-justify">
                {lang === "id" ? (
                  <>
                    Di luar bidang akademik teknologi informasi, saya mendedikasikan waktu saya pada olahraga kekuatan, khususnya cabang{" "}
                    <LinkPreview
                      url="https://id.wikipedia.org/wiki/Angkat_berat"
                      imageSrc="/images/juara RSPC.jpeg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Powerlifting
                    </LinkPreview>
                    . Perjalanan ini saya mulai sepenuhnya dari tingkat paling dasar dengan membangun serta merancang program latihan kekuatan gym mandiri secara terstruktur. Dari disiplin harian mengangkat beban besi secara konsisten setiap hari, saya memberanikan diri untuk menguji batas ketahanan fisik di ajang kompetisi resmi. Dari dua turnamen besar yang telah saya ikuti, saya sukses menduduki podium Juara 2 di ajang{" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/Menang RSPC.jpeg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Riau Stronger 2025
                    </LinkPreview>{" "}
                    serta bersaing ketat menduduki Peringkat 5 di ajang{" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/Juara Neo.jpeg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Neolifter 2024
                    </LinkPreview>
                    .
                  </>
                ) : (
                  <>
                    Outside the IT academic field, I dedicate my time to strength sports, specifically {" "}
                    <LinkPreview
                      url="https://en.wikipedia.org/wiki/Powerlifting"
                      imageSrc="/images/juara RSPC.jpeg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Powerlifting
                    </LinkPreview>
                    . I started this journey completely from scratch by designing structured gym routines to build absolute strength. Through consistent daily heavy training, I tested my physical limits in official meets. Among the two major events I participated in, I successfully proved my dedication by securing a 2nd Place podium finish in the {" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/Menang RSPC.jpeg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Riau Stronger 2025
                    </LinkPreview>{" "}
                    and placing 5th in the {" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/Juara Neo.jpeg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Neolifter 2024
                    </LinkPreview>{" "}
                    competition.
                  </>
                )}
              </p>

              {/* Grid Album Display */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {lang === "id" ? "// Album Foto Powerlifting" : "// Powerlifting Photo Album"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
                  {["juara RSPC.jpeg", "Menang RSPC.jpeg", "Juara Neo.jpeg"].map((img, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-xl border border-brand-rose-dust/20 dark:border-brand-plum-muted/10 group bg-brand-rose-soft/5">
                      <img 
                        src={`/images/${img}`} 
                        alt="Powerlifting documentation" 
                        className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Poin 2: Gontor & Berkebun */}
            <div className="relative space-y-4">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 -left-[31.5px] sm:-left-[47.5px] top-1.5 border border-brand-bg-light dark:border-brand-bg-dark" />
              
              <h3 className="font-display font-bold text-sm tracking-wider text-neutral-900 dark:text-neutral-50 uppercase flex items-center gap-2">
                <Trees className="w-4 h-4 text-brand-lavender-soft dark:text-brand-lavender-bright" />
                <span>
                  {lang === "id" 
                    ? "02 / KEPEMIMPINAN PRAMUKA & PENGOLAHAN BERKEBUN DI PONDOK" 
                    : "02 / SCOUT LEADERSHIP & GARDENING MANAGEMENT AT GONTOR"}
                </span>
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal text-justify">
                {lang === "id" ? (
                  <>
                    Karakter ketangguhan mental saya dibentuk secara mendalam melalui keaktifan organisasi sejak masa sekolah (SMP &amp; SMA) di kepengurusan{" "}
                    <LinkPreview
                      url="https://id.wikipedia.org/wiki/Pramuka"
                      imageSrc="/images/pramuka.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Kepramukaan
                    </LinkPreview>
                    . Di sana, saya dipercaya memimpin lebih dari 400 anggota aktif sebagai Ketua Gugus Depan Pramuka Gontor (Gudep 15.089) periode 2018–2019. Selain memimpin organisasi kepramukaan, saya juga memiliki kesempatan berharga untuk terjun langsung mengelola{" "}
                    <LinkPreview
                      url="https://id.wikipedia.org/wiki/Pertanian"
                      imageSrc="/images/berkebun.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      pengolahan berkebun
                    </LinkPreview>{" "}
                    dan pertanian pondok. Saya mengelola penanaman tanaman keras produktif seperti alpukat, sirsak, dan durian, serta membudidayakan tanaman palawija musiman meliputi kacang panjang, terong, cabai, tomat, semangka, jagung, kacang tanah, dan labu jepang (japan).
                  </>
                ) : (
                  <>
                    My mental toughness was deeply shaped through organizational leadership since middle and high school in the {" "}
                    <LinkPreview
                      url="https://en.wikipedia.org/wiki/Scouting"
                      imageSrc="/images/pramuka.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Scouting
                    </LinkPreview>{" "}
                    community of Gontor. There, I was trusted to lead over 400 active members as the Gontor Scout Front Leader (Gudep 15.089) for the 2018–2019 period. Besides leading, I also managed the boarding school's {" "}
                    <LinkPreview
                      url="https://en.wikipedia.org/wiki/Agriculture"
                      imageSrc="/images/berkebun.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      gardening management
                    </LinkPreview>{" "}
                    and agricultural unit. I oversaw the cultivation of perennials like avocado, soursop, and durian, and managed seasonal crops like long beans, eggplant, chili, tomato, watermelon, corn, peanuts, and labu jepang (japan).
                  </>
                )}
              </p>

              {/* Grid Album Display */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {lang === "id" ? "// Album Foto Pertanian & Pramuka Gontor" : "// Gontor Agriculture & Scouting Photo Album"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
                  {["berkebun.jpg", "berkebun2.jpg", "berkebun5.jpg", "organisasipondok.jpg", "pramuka.jpg", "mengajar.jpg"].map((img, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-xl border border-brand-rose-dust/20 dark:border-brand-plum-muted/10 group bg-brand-rose-soft/5">
                      <img 
                        src={`/images/${img}`} 
                        alt="Gardening and scouting documentation" 
                        className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Poin 3: Prestasi Pramuka / Piala */}
            <div className="relative space-y-4">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-brand-lavender-soft dark:bg-brand-lavender-bright -left-[31.5px] sm:-left-[47.5px] top-1.5 border border-brand-bg-light dark:border-brand-bg-dark" />
              
              <h3 className="font-display font-bold text-sm tracking-wider text-neutral-900 dark:text-neutral-50 uppercase flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-lavender-soft dark:text-brand-lavender-bright" />
                <span>
                  {lang === "id" 
                    ? "03 / PRESTASI KEPRAMUKAAN & PIALA JUARA UMUM LP3 NASIONAL" 
                    : "03 / SCOUTING ACHIEVEMENTS & NATIONAL LP3 GENERAL WINNER TROPHY"}
                </span>
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal text-justify">
                {lang === "id" ? (
                  <>
                    Komitmen membimbing karakter dan keahlian kepramukaan membawa saya dan tim bersaing di tingkat nasional. Melalui kolaborasi taktis, latihan kepemimpinan yang keras, serta kedisiplinan tinggi, saya mendedikasikan piala{" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/prestasi pramuka.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      prestasi kepramukaan
                    </LinkPreview>{" "}
                    di sekolah dengan sukses membawa pulang gelar{" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/prestasipramuka3.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Juara Umum LP3
                    </LinkPreview>{" "}
                    se-Indonesia. Kemenangan ini merupakan lambang dedikasi sosial, kerja sama tim di bawah tekanan kompetisi yang ketat, dan pembuktian kepemimpinan organisasi di panggung nasional.
                  </>
                ) : (
                  <>
                    My commitment to guiding character and scouting expertise led our team to compete at the national level. Through tactical collaboration, intense leadership exercises, and high discipline, I dedicated my school's {" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/prestasi pramuka.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      scouting achievements
                    </LinkPreview>{" "}
                    by successfully bringing home the {" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/prestasipramuka3.jpg"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      LP3 General Champion
                    </LinkPreview>{" "}
                    trophy in Indonesia. This victory represents social dedication, teamwork under intense competition, and proof of organizational leadership on the national stage.
                  </>
                )}
              </p>

              {/* Grid Album Display */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {lang === "id" ? "// Album Foto Penghargaan & Prestasi LP3" : "// LP3 Awards & Achievements Photo Album"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                  {["prestasi pramuka.jpg", "prestasipramuka3.jpg", "prestasipramuka4.jpeg", "prestasipramuka5.jpg"].map((img, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-xl border border-brand-rose-dust/20 dark:border-brand-plum-muted/10 group bg-brand-rose-soft/5">
                      <img 
                        src={`/images/${img}`} 
                        alt="Trophy and scouting achievement documentation" 
                        className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Poin 4: Kerja Jasa & Retail */}
            <div className="relative space-y-4">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 -left-[31.5px] sm:-left-[47.5px] top-1.5 border border-brand-bg-light dark:border-brand-bg-dark" />
              
              <h3 className="font-display font-bold text-sm tracking-wider text-neutral-900 dark:text-neutral-50 uppercase flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-lavender-soft dark:text-brand-lavender-bright" />
                <span>
                  {lang === "id" 
                    ? "04 / PENGALAMAN KERJA LAYANAN, JASA, & RETAIL" 
                    : "04 / SERVICE, RETAIL & LABOR WORK EXPERIENCE"}
                </span>
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal text-justify">
                {lang === "id" ? (
                  <>
                    Etos kerja lapangan, tanggung jawab operasional, serta keterampilan komunikasi langsung saya asah secara aktif melalui berbagai pengalaman praktis di dunia retail dan jasa. Saya pernah menjalani peran sebagai{" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/barista.PNG"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Barista
                    </LinkPreview>{" "}
                    dan{" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/barista (2).PNG"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Waiter
                    </LinkPreview>{" "}
                    yang melatih ritme koordinasi pelayanan cepat saji secara dinamis serta berinteraksi secara sopan dengan pelanggan. Selain itu, saya juga memegang peranan penting sebagai Kasir Supermarket yang menguji ketelitian akurasi laporan transaksi harian dan pengelolaan sirkulasi kas kecil kedai. Seluruh pengalaman kerja ini membentuk pribadi saya menjadi lebih ulet, adaptif terhadap situasi bertekanan tinggi, dan berkomitmen tinggi terhadap integritas pelaporan operasional.
                  </>
                ) : (
                  <>
                    I actively honed my field work ethic, operational responsibility, and direct communication skills through practical roles in service and retail. I served as a {" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/barista.PNG"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Barista
                    </LinkPreview>{" "}
                    and {" "}
                    <LinkPreview
                      url="https://instagram.com/_ahdfarhan_"
                      imageSrc="/images/barista (2).PNG"
                      isStatic
                      className="font-bold border-b border-neutral-950 dark:border-neutral-50 text-neutral-950 dark:text-white pb-0.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors"
                    >
                      Waiter
                    </LinkPreview>{" "}
                    which trained me in rapid service coordination and polite customer interactions. Additionally, I took on a role as a Supermarket Cashier which validated my attention to detail in financial transactions and daily flow reporting. These experiences shaped me into a resilient, highly adaptive individual who values work integrity.
                  </>
                )}
              </p>

              {/* Grid Album Display */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {lang === "id" ? "// Album Foto Pengalaman Kerja" : "// Work Experience Photo Album"}
                </span>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  {["barista.PNG", "barista (2).PNG"].map((img, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-xl border border-brand-rose-dust/20 dark:border-brand-plum-muted/10 group bg-brand-rose-soft/5">
                      <img 
                        src={`/images/${img}`} 
                        alt="Work experience documentation" 
                        className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
