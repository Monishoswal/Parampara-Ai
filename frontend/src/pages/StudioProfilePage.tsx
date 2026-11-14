import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, ShieldCheck, Save, CheckCircle2 } from 'lucide-react';

export const StudioProfilePage: React.FC = () => {
  const { showToast } = useApp();
  const [profile, setProfile] = useState({
    name: 'Shah Rashid Ahmed Qadri',
    collective: 'Tarkashi Heritage Guild of Bidar',
    region: 'Bidar, Karnataka',
    specialization: 'Pure Silver Wire Tarkashi & Aftaba Inlay',
    experienceYears: 42,
    bio: 'Third-generation master artisan from Bidar, dedicated to training young women and youths in authentic Bahmani silver inlay techniques without chemical shortcuts.',
    contactVisibility: 'enquiry_only',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Artisan profile updated successfully', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-editorial text-ink">Artisan Profile Settings</h1>
        <p className="text-xs text-muted mt-1">Manage public attribution, collective affiliations, and bio.</p>
      </div>

      <form onSubmit={handleSave} className="bg-surface rounded-lg p-8 border border-border shadow-subtle space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <img
            src="/images/heritage/artisan_bidriware.jpg"
            alt="Artisan Avatar"
            className="w-16 h-16 rounded-md object-cover border-2 border-terracotta"
          />
          <div>
            <h3 className="text-base font-bold text-ink">{profile.name}</h3>
            <span className="text-xs text-sage font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Master Knowledge Holder
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Public Maker Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Collective or Guild Name</label>
            <input
              type="text"
              value={profile.collective}
              onChange={(e) => setProfile({ ...profile, collective: e.target.value })}
              className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Region / Cluster</label>
              <input
                type="text"
                value={profile.region}
                onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Years of Experience</label>
              <input
                type="number"
                value={profile.experienceYears}
                onChange={(e) => setProfile({ ...profile, experienceYears: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Specialization</label>
            <input
              type="text"
              value={profile.specialization}
              onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
              className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Biography & Heritage Pedigree</label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink leading-relaxed focus:outline-none focus:border-terracotta resize-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};

