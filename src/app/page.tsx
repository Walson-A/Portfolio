"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Home()
{
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E8E8E8] font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-10 py-4 bg-opacity-40 backdrop-blur-md bg-[#0D0D0D]/60 z-50 border-b border-[#1F1F1F]">
        <h1 className="text-2xl font-bold text-[#4FD1C5]">Walson Argan RENE</h1>
        <ul className="flex space-x-8 text-sm">
          <li className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Accueil</li>
          <li className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Compétences</li>
          <li className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Projets</li>
          <li className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="flex flex-col justify-center items-center text-center h-screen px-6 relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1.5 }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#4FD1C5]/20 blur-[120px]" />

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-[44px] md:text-[64px] font-extrabold tracking-tight mb-6">
          Walson Argan RENE
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
          className="px-6 py-3 rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D]/40">
          <span className="text-xl md:text-2xl font-semibold text-gray-300">
            Étudiant ingénieur à l’EPITA
          </span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base md:text-lg text-gray-300 max-w-2xl mt-6">
          Passionné par le développement et la création numérique. J’aime comprendre, concevoir et améliorer des systèmes.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }}
          className="text-gray-400 max-w-xl mt-4">
          Je cherche à renforcer mes compétences en développement au sein d’une entreprise, afin de gagner en expérience concrète et de participer à des projets réels.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="flex space-x-4 mt-8">
          <Button className="bg-[#4FD1C5] text-[#0D0D0D] font-medium hover:bg-[#3CBFAF]">Voir les projets</Button>
          <Button className="bg-[#141414] text-[#E8E8E8] border border-[#2A2A2A] hover:bg-[#1A1A1A]">Me contacter</Button>
        </motion.div>
      </section>

      {/* Compétences — timeline à gauche, sections longues et intégrées */}
      <section id="skills" className="px-6 md:px-10 py-20">
        <h3 className="text-3xl font-semibold mb-10 text-[#4FD1C5] text-center">Compétences</h3>


        <div className="relative max-w-5xl mx-auto">
          {/* barre verticale totalement à gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#4FD1C5]/60 via-[#1F1F1F] to-transparent" />


          {/* Bloc 1 */}
          <div className="relative pl-8 md:pl-12 mb-16">
            {/* point */}
            <span className="absolute left-0 -translate-x-1/2 mt-2 h-3 w-3 rounded-full bg-[#4FD1C5] shadow-[0_0_12px_rgba(79,209,197,0.6)]" />
            <h4 className="text-xl font-bold">Ingénierie logicielle et algorithmique</h4>
            <p className="text-gray-300 mt-3 leading-relaxed">
              J’aborde le développement comme un travail d’ingénierie : comprendre le besoin, concevoir une solution robuste
              et efficace, l’implémenter proprement puis l’optimiser. Sur <b>OCR Word Search (C)</b>, j’ai géré la mémoire
              et mis en place un pipeline d’analyse performant. Avec <b>StickHunt (Unity/C#)</b>, j’ai travaillé la logique temps réel
              et une architecture simple et claire. Sur <b>Atlas (Python)</b>, j’ai orchestré STT/TTS et LLM pour une réponse
              vocale utile et rapide.
            </p>
          </div>


          {/* Bloc 2 */}
          <div className="relative pl-8 md:pl-12 mb-16">
            <span className="absolute left-0 -translate-x-1/2 mt-2 h-3 w-3 rounded-full bg-[#4FD1C5] shadow-[0_0_12px_rgba(79,209,197,0.6)]" />
            <h4 className="text-xl font-bold">Collaboration et travail en équipe</h4>
            <p className="text-gray-300 mt-3 leading-relaxed">
              Communication claire, Git propre (branches, PR, revues) et priorisation. Dans <b>OCR</b>, on a réparti les modules,
              défini des conventions et ajouté une CI simple. Sur <b>StickHunt</b>, j’ai coordonné le binôme gameplay/tech avec des tâches
              nettes et des revues courtes. Pour <b>JoinSparks.fr</b>, j’ai synchronisé le travail sur une base web partagée pour livrer
              vite et propre.
            </p>
          </div>


          {/* Bloc 3 */}
          <div className="relative pl-8 md:pl-12">
            <span className="absolute left-0 -translate-x-1/2 mt-2 h-3 w-3 rounded-full bg-[#4FD1C5] shadow-[0_0_12px_rgba(79,209,197,0.6)]" />
            <h4 className="text-xl font-bold">Créativité et innovation technologique</h4>
            <p className="text-gray-300 mt-3 leading-relaxed">
              Je prototye rapidement pour tester des idées et créer des expériences utiles. <b>Atlas</b> explore une interface vocale
              naturelle. Avec <b>Pö</b> (React), j’ai pensé une productivité sans friction (état global, composants réutilisables).
              <b> StickHunt</b> m’a permis de travailler une boucle de jeu simple avec un feedback immédiat.
            </p>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projects" className="px-10 py-20 text-center">
        <h3 className="text-3xl font-semibold mb-10 text-[#4FD1C5]">Projets</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["JoinSparks", "StickHunt", "Atlas"].map((project, i) => (
            <Card key={i} className="bg-[#111111] border-[#1F1F1F] hover:border-[#4FD1C5]/40 transition-all rounded-2xl hover:shadow-[#4FD1C5]/10">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2 text-[#E8E8E8]">{project}</h4>
                <p className="text-gray-400 text-sm">Projet de développement intégrant créativité et performance technique.</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button className="bg-[#4FD1C5] text-black hover:bg-[#3CBFAF]">Voir tous les projets</Button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-10 py-20 text-center">
        <h3 className="text-3xl font-semibold mb-6 text-[#4FD1C5]">Contact</h3>
        <p className="text-gray-400 mb-8">Une idée, une collaboration ou un retour ? Écrivez-moi.</p>
        <div className="flex justify-center space-x-6">
          <Button variant="outline" className="border-[#4FD1C5] text-[#E8E8E8] hover:bg-[#4FD1C5]/10">LinkedIn</Button>
          <Button variant="outline" className="border-[#4FD1C5] text-[#E8E8E8] hover:bg-[#4FD1C5]/10">GitHub</Button>
          <Button variant="outline" className="border-[#4FD1C5] text-[#E8E8E8] hover:bg-[#4FD1C5]/10">Email</Button>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-600 text-sm border-t border-[#1F1F1F]">
        © 2025 Walson Argan RENE — Portfolio personnel
      </footer>
    </div>
  )
}
