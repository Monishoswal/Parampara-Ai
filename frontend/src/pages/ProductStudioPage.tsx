import React, { useState } from 'react';
import { api } from '../lib/api';
import { useApp } from '../context/AppContext';
import {
  Package,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Upload,
  Info
} from 'lucide-react';

export const ProductStudioPage: React.FC = () => {
  const { showToast } = useApp();

  const [craftId, setCraftId] = useState('bidriware');
  const [category, setCategory] = useState('Imperial Vase / Aftaba');
  const [materials, setMaterials] = useState('Zinc alloy (94%), Fine Silver Wire (99.9%), Copper');
  const [dimensions, setDimensions] = useState('14 inches height, 5.5 inches diameter');
  const [techniqueNote, setTechniqueNote] = useState('Pure silver wire cold hammered into chiseled grooves; blackened with Bidar Fort soil');
  const [priceInr, setPriceInr] = useState('18500');

  const [loading, setLoading] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<{
    suggested_title: string;
    cultural_narrative: string;
    technical_description: string;
    verified_craft_badge: string;
    materials_summary: string;
    artisan_attribution: string;
    ethical_pricing_note: string;
    guardrail_notice: string;
  } | null>(null);

  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handleGenerateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const matList = materials.split(',').map((m) => m.trim());
      const res = await api.generateProductDraft({
        artisan_name: 'Shah Rashid Ahmed Qadri',
        craft_id: craftId,
        product_category: category,
        materials_supplied: matList,
        dimensions,
        technique_note: techniqueNote,
      });
      setGeneratedDraft(res);
      showToast('Product story drafted from verified facts.', 'info');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate product draft.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    setPublishedSuccess(true);
    showToast('Product story published to your public artisan profile!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-editorial text-ink">Product Storytelling Studio</h1>
        <p className="text-xs text-muted max-w-xl leading-relaxed">
          Create dignified product showcases grounded in verified craft heritage. AI drafts the title and cultural story 
          strictly from facts you provide and approved archive records—never inventing fake antique claims or certifications.
        </p>
      </div>

      {publishedSuccess ? (
        <div className="bg-surface rounded-lg p-10 border border-border shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-md bg-sage-light text-sage flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-editorial text-ink">Product Story Published Successfully</h2>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            "{generatedDraft?.suggested_title}" is now visible on your public artisan profile with direct enquiry capability and zero commission.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setPublishedSuccess(false);
                setGeneratedDraft(null);
              }}
              className="px-5 py-2.5 rounded-md bg-terracotta text-white font-semibold text-xs shadow-sm hover:bg-terracotta-hover transition-colors"
            >
              Draft Another Product
            </button>
            <a
              href="/artisans/rashid-qadri"
              className="px-5 py-2.5 rounded-md border border-border text-ink font-semibold text-xs hover:bg-paper transition-colors"
            >
              View on Public Profile ?
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-6 bg-surface rounded-lg p-6 sm:p-8 border border-border shadow-subtle space-y-5">
            <h3 className="text-base font-bold text-ink">Artisan-Supplied Facts</h3>

            <form onSubmit={handleGenerateDraft} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Linked Verified Craft Record</label>
                <select
                  value={craftId}
                  onChange={(e) => setCraftId(e.target.value)}
                  className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none"
                >
                  <option value="bidriware">Bidriware Metal Inlay (Bidar)</option>
                  <option value="kalamkari-srikalahasti">Srikalahasti Kalamkari (Tirupati)</option>
                  <option value="rogan-art">Rogan Art of Kutch (Nirona)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Product Form / Category</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Imperial Vase, Temple Hanging, Stole"
                  className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Raw Materials Used (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="e.g. Zinc, Pure Silver Wire 99.9%, Copper"
                  className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Physical Dimensions</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 12 inches height, 5 inches width"
                  className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Technique & Process Notes</label>
                <textarea
                  rows={2}
                  value={techniqueNote}
                  onChange={(e) => setTechniqueNote(e.target.value)}
                  placeholder="e.g. Hand chiseled Tarkashi pure silver cold inlay"
                  className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Fair Price (INR) — Optional</label>
                <input
                  type="number"
                  value={priceInr}
                  onChange={(e) => setPriceInr(e.target.value)}
                  placeholder="e.g. 18500"
                  className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Generating with Gemini 3.8 Flash...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Generate Authentic Product Story</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Preview */}
          <div className="lg:col-span-6 space-y-4">
            {!generatedDraft ? (
              <div className="bg-surface rounded-lg p-10 border border-border text-center text-xs text-muted space-y-3">
                <Info className="w-8 h-8 text-muted mx-auto" />
                <h4 className="text-sm font-bold text-ink">Story Draft Preview</h4>
                <p>Fill out the factual parameters on the left and click "Generate" to inspect the AI narrative.</p>
              </div>
            ) : (
              <div className="bg-surface rounded-lg p-6 sm:p-8 border border-border shadow-card space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border/80">
                  <span className="text-xs font-bold text-sage flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    {generatedDraft.verified_craft_badge}
                  </span>
                  <span className="text-xs font-semibold text-ink">?{parseInt(priceInr || '0').toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-editorial text-ink">{generatedDraft.suggested_title}</h3>
                  <p className="text-xs text-muted font-medium">{generatedDraft.artisan_attribution}</p>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-md bg-paper border border-border">
                    <strong className="text-ink block mb-1">Cultural Narrative:</strong>
                    <p className="text-ink/80">{generatedDraft.cultural_narrative}</p>
                  </div>

                  <div className="p-3.5 rounded-md bg-paper border border-border">
                    <strong className="text-ink block mb-1">Technical Specification:</strong>
                    <p className="text-ink/80">{generatedDraft.technical_description}</p>
                  </div>
                </div>

                {/* Guardrail and Fair Trade Notes */}
                <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                  <p className="font-semibold">{generatedDraft.ethical_pricing_note}</p>
                  <p className="text-emerald-800/80">{generatedDraft.guardrail_notice}</p>
                </div>

                {/* Approve and Publish Button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handlePublish}
                    className="px-5 py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium shadow-sm transition-colors flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & publish card</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

