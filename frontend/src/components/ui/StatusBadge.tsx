import React from 'react';
import { ClaimStatus } from '../../types';
import { ShieldCheck, BookOpen, Users, Sparkles, AlertTriangle, Lock, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: ClaimStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  switch (status) {
    case 'curator_reviewed':
      return (
        <span className={`inline-flex items-center rounded-full bg-sage-light text-sage border border-sage/40 ${sizeClasses[size]}`}>
          {showIcon && <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-sage" />}
          Curator Reviewed
        </span>
      );
    case 'source_attached':
      return (
        <span className={`inline-flex items-center rounded-full bg-navy-light text-navy border border-navy/30 ${sizeClasses[size]}`}>
          {showIcon && <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-navy" />}
          Source Attached
        </span>
      );
    case 'community_confirmed':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-300 ${sizeClasses[size]}`}>
          {showIcon && <Users className="w-3.5 h-3.5 flex-shrink-0 text-amber-700" />}
          Community Confirmed
        </span>
      );
    case 'contributor_provided':
      return (
        <span className={`inline-flex items-center rounded-full bg-orange-50 text-orange-800 border border-orange-300 ${sizeClasses[size]}`}>
          {showIcon && <Clock className="w-3.5 h-3.5 flex-shrink-0 text-orange-700" />}
          Contributor Provided
        </span>
      );
    case 'ai_suggested':
      return (
        <span className={`inline-flex items-center rounded-full bg-purple-50 text-purple-800 border border-purple-200 ${sizeClasses[size]}`}>
          {showIcon && <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-purple-600" />}
          AI Suggestion (Draft)
        </span>
      );
    case 'disputed':
      return (
        <span className={`inline-flex items-center rounded-full bg-rose-50 text-rose-800 border border-rose-300 ${sizeClasses[size]}`}>
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-rose-600" />}
          Disputed Claim
        </span>
      );
    case 'restricted':
      return (
        <span className={`inline-flex items-center rounded-full bg-stone-100 text-stone-700 border border-stone-300 ${sizeClasses[size]}`}>
          {showIcon && <Lock className="w-3.5 h-3.5 flex-shrink-0 text-stone-600" />}
          Restricted Cultural Knowledge
        </span>
      );
    case 'verified_open':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 ${sizeClasses[size]}`}>
          {showIcon && <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />}
          Verified Open
        </span>
      );
    case 'closing_soon':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-300 ${sizeClasses[size]}`}>
          {showIcon && <Clock className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />}
          Closing Soon
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center rounded-full bg-stone-100 text-stone-700 border border-border ${sizeClasses[size]}`}>
          {status}
        </span>
      );
  }
};
