import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  GitBranch,
  Volume2,
  VolumeX,
  Award,
  Calendar,
  MapPin,
  ChevronRight,
  ShieldCheck,
  User,
  Users,
  Sparkles,
  Info
} from 'lucide-react';

export interface LineageMember {
  id: string;
  generation: number;
  name: string;
  title: string;
  era: string;
  isLiving: boolean;
  contribution: string;
  dialect: string;
  voiceNoteUrl?: string;
  voiceTranscript: string;
  portraitUrl: string;
  signatureMotif: string;
}

export interface LineageFamily {
  id: string;
  familyName: string;
  craftName: string;
  region: string;
  generationsCount: number;
  establishedEra: string;
  description: string;
  members: LineageMember[];
}

export const FAMOUS_LINEAGES: LineageFamily[] = [
  {
    id: 'khatri-rogan',
    familyName: 'Khatri Artisan Lineage of Nirona',
    craftName: 'Nirona Castor-Oil Rogan Art',
    region: 'Nirona, Kutch District, Gujarat',
    generationsCount: 8,
    establishedEra: 'c. 1780 CE (Late Mughal & Princely Kutch Era)',
    description: 'The sole surviving family lineage on Earth practicing authentic castor-oil Rogan fabric painting. Originally migrated from Sindh over 240 years ago, safeguarding the secret temperature-controlled castor oil boiling technique.',
    members: [
      {
        id: 'khatri-gen1',
        generation: 1,
        name: 'Ustad Valji Khatri',
        title: 'Founding Patriarch & Master Formulator',
        era: '1780 – 1835 CE',
        isLiving: false,
        contribution: 'Perfected the 48-hour subterranean clay pot boiling method to extract ductile ricinoleic gum paste from wild castor seeds.',
        dialect: 'Old Kutchhi (કચ્છી)',
        voiceTranscript: '“તેલને એવી રીતે પકવવું જોઈએ કે તે તારની જેમ ખેંચાય, પણ તૂટે નહીં. આ આપણી માટીની અમાનત છે.” (Oil must be boiled until it stretches like raw silk thread without snapping. This is the sacred trust of our desert soil.)',
        portraitUrl: '/images/heritage/artisan_rogan.jpg',
        signatureMotif: 'Jharokha Geometrical Border',
      },
      {
        id: 'khatri-gen3',
        generation: 3,
        name: 'Master Harji Valji Khatri',
        title: 'Master Colorist of Kutch',
        era: '1840 – 1905 CE',
        isLiving: false,
        contribution: 'Introduced natural stone and plant pigments (katha, turmeric, indigo) into the castor matrix to achieve vibrant yellow, ochre, and turquoise tones.',
        dialect: 'Kutchhi Sindhi',
        voiceTranscript: '“કાચા રંગોને તેલમાં ઓગાળીને જ આપણે સૂર્યનો પ્રકાશ કાપડ પર ઉતારી શકીએ છીએ.” (Only by dissolving raw earth minerals into warm oil can we imprint the sun’s eternal light onto dark cloth.)',
        portraitUrl: '/images/heritage/artisan_rogan.jpg',
        signatureMotif: 'Peacock Feather Arabesque',
      },
      {
        id: 'khatri-gen5',
        generation: 5,
        name: 'Gafur Bhai Khatri',
        title: 'Preserver of the Endangered Flame',
        era: '1910 – 1982 CE',
        isLiving: false,
        contribution: 'Defended the craft from total extinction during the post-independence influx of industrial machine-printed synthetic textiles by dedicating his entire home as a guild sanctum.',
        dialect: 'Kutchhi',
        voiceTranscript: '“જ્યારે મિલો આવી, ત્યારે બધાએ કલમ છોડી દીધી. પણ મેં મારા દીકરાઓને કહ્યું કે જ્યાં સુધી આપણી આંગળીઓમાં તેલનો જીવ છે, ત્યાં સુધી રોગન મરી શકે નહીં.” (When the industrial mills arrived, everyone abandoned the stylus. But I told my sons: as long as oil runs in our veins, Rogan cannot die.)',
        portraitUrl: '/images/heritage/artisan_rogan.jpg',
        signatureMotif: 'Sacred Tree of Life (Kalpavriksha)',
      },
      {
        id: 'khatri-gen7',
        generation: 7,
        name: 'Abdul Gafur Khatri',
        title: 'Padma Shri & National Awardee (2019)',
        era: '1955 – Present',
        isLiving: true,
        contribution: 'Elevated Rogan art onto the global diplomatic stage; gifted masterworks to global heads of state and opened the lineage to train hundreds of village women for the first time in 300 years.',
        dialect: 'Contemporary Kutchhi / Gujarati',
        voiceTranscript: '“રોગન માત્ર કલા નથી, તે ધ્યાન છે. સોય અને હાથ વચ્ચેનો સંબંધ જ આખી સૃષ્ટિને કાગળ પર લાવે છે.” (Rogan is not merely a craft; it is deep meditation. The silent dialogue between stylus, palm, and silk gives birth to the universe.)',
        portraitUrl: '/images/heritage/artisan_rogan.jpg',
        signatureMotif: 'Monumental 12-Branch Kalpavriksha',
      },
      {
        id: 'khatri-gen8',
        generation: 8,
        name: 'Rizwan & Sufiyan Khatri',
        title: 'Digital Archivists & Master Stylus Practitioners',
        era: '1992 – Present',
        isLiving: true,
        contribution: 'Pioneered digital provenance tracking, microscopic pigment analysis, and contemporary royal silk architectural commissions.',
        dialect: 'Kutchhi / English',
        voiceTranscript: '“We are bridging our great-great-grandfather’s 1780 castor formula with digital authenticity preservation so no counterfeit can ever steal our ancestors’ legacy.”',
        portraitUrl: '/images/heritage/artisan_rogan.jpg',
        signatureMotif: 'Fractal Solar Mandala',
      },
    ],
  },
  {
    id: 'ansari-varanasi',
    familyName: 'Ansari Master Weavers Gharana',
    craftName: 'Varanasi Kadwa Zari Brocade',
    region: 'Madanpura, Varanasi, Uttar Pradesh',
    generationsCount: 7,
    establishedEra: 'c. 1810 CE (Avadh & Kashi Court Era)',
    description: 'Seven unbroken generations of master weavers specialized in the intricate Kadwa technique where each gold and silver motif is hand-engraved and individually locked without any loose floats on the reverse.',
    members: [
      {
        id: 'ansari-gen1',
        generation: 1,
        name: 'Ustad Bismillah Ansari',
        title: 'Court Master Weaver of Kashi',
        era: '1810 – 1865 CE',
        isLiving: false,
        contribution: 'Developed the 12-pedal wooden draw-loom system to weave pure 24K real gold wire (*zari*) alongside mulberry silk for temple hangings.',
        dialect: 'Classical Awadhi / Urdu',
        voiceTranscript: '“तार को ऐसा बांधो कि कपड़ा सदियों तक सोने की तरह दमके।” (Bind the warp so that the silk radiates like solid gold across the centuries.)',
        portraitUrl: '/images/heritage/artisan_kalamkari.jpg',
        signatureMotif: 'Shikargah Royal Hunt Motif',
      },
      {
        id: 'ansari-gen4',
        generation: 4,
        name: 'Haji Noor Mohammad Ansari',
        title: 'Innovator of the Interlocking Zari Technique',
        era: '1890 – 1958 CE',
        isLiving: false,
        contribution: 'Eliminated the rough floats on the back of traditional brocades, creating reversible sarees worn by royal dynasties across India and Nepal.',
        dialect: 'Bhojpuri / Awadhi',
        voiceTranscript: '“कढ़वा की असली पहचान यही है कि पीछे एक भी धागा अधूरा न छूटे।” (The true hallmark of Kadwa is that on the reverse, not a single loose thread is left unanchored.)',
        portraitUrl: '/images/heritage/artisan_kalamkari.jpg',
        signatureMotif: 'Kalka Paisley Boota',
      },
      {
        id: 'ansari-gen7',
        generation: 7,
        name: 'Master Irfan Ansari',
        title: 'Living National Master (2024)',
        era: '1968 – Present',
        isLiving: true,
        contribution: 'Preserves 80-year-old wooden jacquard punch-card archives and leads a cooperative of 140 traditional weaver families in Varanasi.',
        dialect: 'Kashi Hindi / Awadhi',
        voiceTranscript: '“यह करघा हमारी इबादत है। जब ताना और बाना मिलते हैं, तो बनारस का इतिहास जीवित हो उठता है।” (This handloom is our prayer. When the warp and weft embrace, the living soul of Varanasi breathes.)',
        portraitUrl: '/images/heritage/artisan_kalamkari.jpg',
        signatureMotif: 'Jangla Floral Vine with Silver Meenakari',
      },
    ],
  },
];

export const LineageTreeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('khatri-rogan');
  const [activeMemberId, setActiveMemberId] = useState<string>('khatri-gen7');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const selectedFamily = FAMOUS_LINEAGES.find((f) => f.id === selectedFamilyId) || FAMOUS_LINEAGES[0];
  const activeMember = selectedFamily.members.find((m) => m.id === activeMemberId) || selectedFamily.members[0];

  const handleSelectFamily = (id: string) => {
    setSelectedFamilyId(id);
    const family = FAMOUS_LINEAGES.find((f) => f.id === id);
    if (family && family.members.length > 0) {
      setActiveMemberId(family.members[family.members.length - 2]?.id || family.members[0].id);
    }
    setIsPlayingAudio(false);
  };

  const handleToggleVoice = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#121216] border border-white/15 rounded-3xl shadow-2xl text-[#F5F3EF] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#08080A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/20 text-[#FF7A00] flex items-center justify-center border border-[#FF7A00]/30 shadow-md">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Interactive Lineage Trees (Gharana / Guru-Shishya Parampara)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30">
                    7–10 Generations
                  </span>
                </h3>
                <p className="text-xs text-[#A19E95] font-mono">
                  Visual genealogical mapping of master artisan families preserving sacred techniques across centuries
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A19E95] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Family Gharana Selector Pills */}
          <div className="px-6 py-3 bg-[#0E0E12] border-b border-white/10 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-mono text-[#A19E95] shrink-0 mr-2">Select Artisan Lineage:</span>
            {FAMOUS_LINEAGES.map((family) => (
              <button
                key={family.id}
                onClick={() => handleSelectFamily(family.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                  selectedFamilyId === family.id
                    ? 'bg-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-[#A19E95] hover:text-white border border-white/10'
                }`}
              >
                {family.familyName} ({family.generationsCount} Gens)
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Family Overview Banner */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#FF7A00] font-semibold">{selectedFamily.craftName}</span>
                <h4 className="text-base font-bold text-white">{selectedFamily.familyName}</h4>
                <p className="text-xs text-[#A19E95] max-w-2xl leading-relaxed">{selectedFamily.description}</p>
              </div>
              <div className="shrink-0 text-right sm:border-l sm:border-white/10 sm:pl-4 space-y-1">
                <span className="text-[11px] font-mono text-[#A19E95] block">Lineage Founded</span>
                <strong className="text-xs font-bold text-white block">{selectedFamily.establishedEra}</strong>
                <span className="text-[11px] font-mono text-[#FF7A00] block">{selectedFamily.region}</span>
              </div>
            </div>

            {/* Interactive Generational Horizontal Timeline / Tree Track */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#A19E95] block">
                Click a generational node to inspect master portfolio and listen to dialect voice notes:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {selectedFamily.members.map((member) => {
                  const isSelected = activeMemberId === member.id;
                  return (
                    <button
                      key={member.id}
                      onClick={() => {
                        setActiveMemberId(member.id);
                        setIsPlayingAudio(false);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between relative group ${
                        isSelected
                          ? 'bg-[#FF7A00]/15 border-[#FF7A00] shadow-[0_0_20px_rgba(255,122,0,0.25)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            isSelected ? 'bg-[#FF7A00] text-white' : 'bg-white/10 text-[#A19E95]'
                          }`}>
                            Gen {member.generation}
                          </span>
                          {member.isLiving && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Living Master" />
                          )}
                        </div>

                        <strong className="text-xs font-bold text-white block leading-snug line-clamp-2 min-h-[32px] pt-1">
                          {member.name}
                        </strong>
                        <span className="text-[10px] text-[#A19E95] line-clamp-2 min-h-[28px] leading-snug">
                          {member.title}
                        </span>
                      </div>

                      <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#A19E95]">
                        <span>{member.era.split('–')[0]}</span>
                        <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-0.5 text-[#FF7A00]' : 'text-white/20'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Generational Master Detail Focus Card */}
            {activeMember && (
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-6 bg-[#08080A] border border-white/15 shadow-xl space-y-5"
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                  {/* Master Info */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] text-xs font-mono font-bold border border-[#FF7A00]/30">
                        Generation {activeMember.generation} Master
                      </span>
                      <span className="text-xs font-mono text-[#A19E95]">{activeMember.era}</span>
                      {activeMember.isLiving ? (
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Active Living Lineage
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-[#A19E95] bg-white/5 px-2 py-0.5 rounded-full">
                          Historical Pillar
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white">{activeMember.name}</h3>
                    <p className="text-sm text-[#FF7A00] font-mono font-medium">{activeMember.title}</p>

                    <div className="space-y-1 text-xs text-[#A19E95] leading-relaxed pt-1">
                      <strong className="text-white block font-mono text-xs">Pioneering Contribution to Craft:</strong>
                      <p>{activeMember.contribution}</p>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#A19E95]">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>Signature Heritage Motif: <strong className="text-white">{activeMember.signatureMotif}</strong></span>
                    </div>
                  </div>

                  {/* Native Dialect Voice Note Player Card */}
                  <div className="w-full md:w-80 p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#FF7A00] font-semibold flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Oral Tradition Audio</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#A19E95]">
                        Dialect: {activeMember.dialect}
                      </span>
                    </div>

                    {/* Simulated Waveform & Play Button */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-black/60 border border-white/10">
                      <button
                        onClick={handleToggleVoice}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isPlayingAudio
                            ? 'bg-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,122,0,0.5)]'
                            : 'bg-white/10 text-white hover:bg-[#FF7A00]'
                        }`}
                        title="Listen to Elder Oral Voice Note"
                      >
                        {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <div className="flex-1 flex items-center gap-1 h-6">
                        {[18, 24, 14, 28, 22, 12, 26, 16, 20, 10, 24, 18, 14].map((h, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${isPlayingAudio ? Math.max(4, (h * (idx % 2 === 0 ? 1.2 : 0.7))) : 6}px` }}
                            className={`flex-1 rounded-full transition-all duration-150 ${
                              isPlayingAudio ? 'bg-[#FF7A00]' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] font-mono text-[#A19E95]">
                        {isPlayingAudio ? '0:18' : '0:34'}
                      </span>
                    </div>

                    {/* Verbatim Dialect Transcript & English Translation */}
                    <div className="space-y-1 text-xs bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] font-mono text-[#A19E95] block">Verbatim Oral Transcript:</span>
                      <p className="text-xs italic text-white/90 leading-relaxed font-serif">
                        {activeMember.voiceTranscript}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
