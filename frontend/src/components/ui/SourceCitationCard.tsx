import React from 'react';
import { SourceReference } from '../../types';
import { BookOpen, ExternalLink, BookmarkCheck } from 'lucide-react';

interface SourceCitationCardProps {
  source: SourceReference;
}

export const SourceCitationCard: React.FC<SourceCitationCardProps> = ({ source }) => {
  return (
    <div className="bg-surface rounded-md p-4 border border-border/80 shadow-subtle hover:border-terracotta/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-paper text-navy flex-shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink leading-tight">{source.source_title}</h4>
            <p className="text-xs text-muted mt-1">
              <span className="font-medium text-ink/80">{source.publisher}</span>
              {source.accessed_at && ` • Accessed ${source.accessed_at}`}
            </p>
          </div>
        </div>
        {source.source_url && (
          <a
            href={source.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta hover:text-terracotta-hover p-1 rounded hover:bg-terracotta/10 transition-colors"
            title="Open primary documentation"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      {source.notes && (
        <p className="text-xs text-muted/90 mt-3 pt-2.5 border-t border-border/60 italic leading-relaxed">
          "{source.notes}"
        </p>
      )}
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-sage font-medium">
        <BookmarkCheck className="w-3.5 h-3.5" />
        <span>Primary Archival Evidence</span>
      </div>
    </div>
  );
};
