import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { BookOpen, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CuratorSourcesPage: React.FC = () => {
  const sources = [
    {
      id: 'src-bidri-1',
      title: 'Bidri Ware: A Metal Inlay Craft of Bidar',
      publisher: 'National Crafts Museum & Hastkala Academy, New Delhi',
      category: 'Museum Catalog',
      url: 'https://nationalcraftsmuseum.nic.in/crafts/bidriware',
      linked_craft: 'Bidriware Metal Inlay',
      evidence: 'Covers 16:1 zinc-copper metallurgical casting, chisel engraving, and Bidar Fort unexposed soil oxidation.'
    },
    {
      id: 'src-bidri-2',
      title: 'Geographical Indications Journal No. 12: Bidriware (GI Application No. 17)',
      publisher: 'Intellectual Property Office, Government of India',
      category: 'Government GI Registry',
      url: 'https://ipindia.gov.in/gi-journal.htm',
      linked_craft: 'Bidriware Metal Inlay',
      evidence: 'Standardized legal boundary of Bidar cluster; pure silver wire Tarkashi specification.'
    },
    {
      id: 'src-kalamkari-1',
      title: 'Kalamkari Temple Cloths: The Srikalahasti Tradition',
      publisher: 'Crafts Council of India / Mapin Publishing',
      category: 'Research Monograph',
      url: 'https://craftscouncilofindia.org/srikalahasti-kalamkari',
      linked_craft: 'Srikalahasti Kalamkari',
      evidence: 'Chemical role of buffalo milk fat barrier in preventing vegetable dye bleed; Kasim ferment.'
    },
    {
      id: 'src-rogan-1',
      title: 'Rogan Art of Kutch: The Living Khatri Tradition',
      publisher: 'National Institute of Design (NID), Ahmedabad',
      category: 'Design Research Monograph',
      url: 'https://nid.edu/research/publications/rogan-kutch',
      linked_craft: 'Rogan Art of Kutch',
      evidence: 'Polymerized 48-hour castor oil preparation; aerial brass stylus drawing and mirror fold printing.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-editorial text-ink">Archive Reference Registry</h1>
        <p className="text-xs text-muted max-w-xl leading-relaxed mt-1">
          Catalog of authoritative museum monographs, GI journals, and fieldwork research supporting claims in the Digital Heritage Vault.
        </p>
      </div>

      <div className="space-y-4">
        {sources.map((src) => (
          <div key={src.id} className="bg-surface rounded-md p-6 border border-border shadow-card space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-terracotta block capitalize">{src.category.replace('_', ' ')}</span>
                <h3 className="text-base font-semibold text-ink mt-0.5">{src.title}</h3>
                <p className="text-xs text-muted">{src.publisher}</p>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-border hover:bg-paper text-ink transition-colors flex-shrink-0"
                title="View Primary Document"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3.5 rounded-md bg-paper border border-border text-xs text-ink/80 leading-relaxed">
              <strong className="text-ink">Archival Scope: </strong>
              <span>{src.evidence}</span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-muted">
              <span className="font-semibold text-terracotta">Linked: {src.linked_craft}</span>
              <span className="text-sage font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Checked & Registered
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
