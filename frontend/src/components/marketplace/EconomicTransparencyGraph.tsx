import React from 'react';
import { ShieldCheck, Info, PieChart, Sparkles } from 'lucide-react';

interface EconomicTransparencyGraphProps {
  priceInr?: number;
}

export const EconomicTransparencyGraph: React.FC<EconomicTransparencyGraphProps> = ({
  priceInr = 18500
}) => {
  const breakdown = [
    {
      label: 'Direct Master Artisan Compensation',
      percentage: 68,
      amount: Math.round(priceInr * 0.68),
      color: '#FF7A00',
      desc: 'Paid directly to the creator without wholesale agent cuts',
    },
    {
      label: 'Natural Raw Materials & Extraction',
      percentage: 18,
      amount: Math.round(priceInr * 0.18),
      color: '#10B981',
      desc: 'Sourcing wild castor oil, vegetable indigo, pure silver wire & teak',
    },
    {
      label: 'Village Guild Apprentice & Welfare Fund',
      percentage: 8,
      amount: Math.round(priceInr * 0.08),
      color: '#3B82F6',
      desc: 'Training youth and preserving endangered lineages across generations',
    },
    {
      label: 'Zero-Plastic Archival Eco-Packaging & Transit',
      percentage: 6,
      amount: Math.round(priceInr * 0.06),
      color: '#8B5CF6',
      desc: 'Biodegradable handmade paper box & insurance against damage',
    },
    {
      label: 'PARAMPARA Platform Commission',
      percentage: 0,
      amount: 0,
      color: '#6B7280',
      desc: '100% Non-Profit Open Culture Archive (Zero intermediary commission)',
    },
  ];

  return (
    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-[#FF7A00]" />
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
            100% Economic Fair-Wage Transparency
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
          0% Platform Cut
        </span>
      </div>

      {/* Segmented Horizontal Progress Bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex bg-black/40 border border-white/10">
        <div style={{ width: '68%' }} className="bg-[#FF7A00] h-full" title="68% Master Artisan" />
        <div style={{ width: '18%' }} className="bg-emerald-500 h-full" title="18% Raw Materials" />
        <div style={{ width: '8%' }} className="bg-blue-500 h-full" title="8% Guild Fund" />
        <div style={{ width: '6%' }} className="bg-purple-500 h-full" title="6% Packaging" />
      </div>

      {/* Breakdown Items */}
      <div className="space-y-1.5 text-xs font-mono">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-black/30 border border-white/5">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-white truncate">{item.label}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-white/60">({item.percentage}%)</span>
              <strong className="text-white font-bold">₹{item.amount.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Verified by National Craft Economics & Primary Evidence Ledger</span>
      </div>
    </div>
  );
};
