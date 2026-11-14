import React from 'react';
import { ShieldCheck, HeartHandshake, BookOpen, AlertCircle, Scale, Users, Mail, Award, IndianRupee, Landmark } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-editorial text-ink">About PARAMPARA AI</h1>
        <p className="text-sm text-muted leading-relaxed">
          Preserving the sacred connection between India’s living crafts, ancestral knowledge, and the master artisans who sustain them across generations.
        </p>
      </div>

      {/* Core Mission */}
      <div className="bg-surface rounded-lg p-8 border border-border shadow-subtle space-y-4">
        <h2 className="text-2xl font-editorial text-ink">Our Mission: Preserving India's Living Intangible Heritage</h2>
        <p className="text-xs sm:text-sm text-ink/90 leading-relaxed">
          Traditional Indian crafts are not merely decorative artifacts or commercial souvenirs. They represent centuries of indigenous chemistry, botanical dyeing knowledge, non-ferrous metallurgy, and family lineages passed down by oral memory.
        </p>
        <p className="text-xs sm:text-sm text-ink/90 leading-relaxed">
          When generic AI models attempt to explain Indian cultural crafts, they often hallucinate historical origins, confuse distinct regional traditions, or misattribute tribal techniques. 
          PARAMPARA AI operates as a <strong>controlled, primary-evidence-grounded archive connected directly to an artisan empowerment studio</strong>. AI models (Gemini 3.8 Flash and Gemini 3.5 Transcribe) act strictly as preliminary draftsmen—final verification rests in human hands.
        </p>
      </div>

      {/* Five Ethical Safeguards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-editorial text-ink">The Five Indian Heritage Trust Safeguards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-md p-6 border border-border shadow-subtle space-y-2">
            <div className="flex items-center gap-2 text-terracotta font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>1. Refusal to Issue Bogus Authenticity Badges</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Optical image classification can suggest visual motif matches, but cannot verify age or test metallurgic purity without physical inspection. We explicitly flag all AI suggestions as non-certifying visual hypotheses.
            </p>
          </div>

          <div className="bg-surface rounded-md p-6 border border-border shadow-subtle space-y-2">
            <div className="flex items-center gap-2 text-sage font-bold text-sm">
              <HeartHandshake className="w-5 h-5" />
              <span>2. Contributor Consent & Guild Attribution</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Artisans choose whether their work is attributed individually (e.g. Padma Shri Shah Rashid Qadri), to a collective guild (e.g. Swarnamukhi Chitrakar Sangham), or protected under restricted community access.
            </p>
          </div>

          <div className="bg-surface rounded-md p-6 border border-border shadow-subtle space-y-2">
            <div className="flex items-center gap-2 text-navy font-bold text-sm">
              <Scale className="w-5 h-5" />
              <span>3. GI Act 1999 & Claim-Level Grounding</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Grounded in the Geographical Indications of Goods Act, 1999. Every factual claim is tagged individually as <em>curator_reviewed</em>, <em>community_confirmed</em>, or <em>source_attached</em>.
            </p>
          </div>

          <div className="bg-surface rounded-md p-6 border border-border shadow-subtle space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <BookOpen className="w-5 h-5" />
              <span>4. Grounded Refusal in RAG</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              When a visitor asks a question not documented in verified Indian archives (IGNCA, ASI, National Crafts Museum), our assistant explicitly admits: <em>"The archive does not contain verified records on this topic."</em>
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Grounding */}
      <div className="bg-surface rounded-lg p-8 border border-border shadow-subtle space-y-4">
        <h3 className="text-xl font-editorial text-ink">Institutional References & Archival Ground Truth</h3>
        <p className="text-xs text-muted leading-relaxed">
          PARAMPARA AI indexes primary research publications, GI application specifications, and museum monographs from official Indian authorities:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink/90 pt-1">
          <li className="p-3 rounded-md bg-paper border border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span>Intellectual Property India (GI Registry)</span>
          </li>
          <li className="p-3 rounded-md bg-paper border border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span>National Crafts Museum & Hastkala Academy</span>
          </li>
          <li className="p-3 rounded-md bg-paper border border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span>Development Commissioner (Handicrafts), MoT</span>
          </li>
          <li className="p-3 rounded-md bg-paper border border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span>Indira Gandhi National Centre for the Arts (IGNCA)</span>
          </li>
        </ul>
      </div>

      {/* Zero Commission Charter in INR */}
      <div className="p-8 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
          <IndianRupee className="w-5 h-5" />
          <span>Zero Commission Artisan Direct Charter</span>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          PARAMPARA AI is built as a cultural public good and non-commercial technology foundation. 
          Artisans set their own pricing in Indian Rupees (₹). We charge <strong>0% transaction fees</strong> on customer enquiries, commission orders, or masterclass bookings. All payments proceed directly to the artisan's verified bank or UPI account.
        </p>
      </div>

      {/* Takedown & Correction Request */}
      <div className="bg-surface rounded-lg p-6 border border-border text-xs text-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-ink">Need to request a correction or content takedown?</h4>
          <p className="mt-0.5">Living knowledge holders and guilds can request immediate reviews of any archived claim.</p>
        </div>
        <a
          href="mailto:curator@parampara.ai"
          className="px-5 py-2.5 rounded-md bg-terracotta text-white font-semibold text-xs whitespace-nowrap shadow-sm hover:bg-terracotta-hover transition-colors"
        >
          Contact Curator Desk
        </a>
      </div>
    </div>
  );
};
