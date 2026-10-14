import React, { useState } from 'react';
import { ProjectItem } from '../../../types';
import { Plus, ChevronRight, X, FolderPlus } from 'lucide-react';

interface RecentProjectsSectionProps {
  projects: ProjectItem[];
  onAddProject: (title: string) => void;
  lang: 'es' | 'en';
  t: {
    recentProjects: string;
    localCount: string;
    newProject: string;
  };
}

export const RecentProjectsSection: React.FC<RecentProjectsSectionProps> = ({
  projects,
  onAddProject,
  lang,
  t,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddProject(newTitle.trim());
    setNewTitle('');
    setShowModal(false);
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-base text-white">
            {t.recentProjects}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#181C1F] text-[#D4FF3A] font-mono text-[10px] font-bold border border-white/10">
            {projects.length} {lang === 'es' ? 'Local' : 'Local'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-xs font-mono font-semibold text-[#D4FF3A] hover:underline flex items-center gap-1 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.newProject}</span>
        </button>
      </div>

      <div className="space-y-2">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-3 bg-[#181C1F] hover:bg-[#202529] border border-white/5 hover:border-white/20 rounded-2xl flex items-center justify-between gap-3 transition group cursor-pointer"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={proj.thumbnail}
                alt={proj.title}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10"
              />
              <div className="overflow-hidden">
                <h4 className="font-heading font-semibold text-sm text-white truncate">
                  {proj.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                  <span>{proj.clipsCount} clips</span>
                  <span>•</span>
                  <span>{proj.rendersCount} renders</span>
                  <span>•</span>
                  <span className="text-[#D4FF3A]">{proj.statusText}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white shrink-0 group-hover:translate-x-0.5 transition" />
          </div>
        ))}
      </div>

      {/* New Project Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181C1F] border border-white/15 rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-[#D4FF3A]" />
                <h3 className="font-heading font-bold text-white text-base">
                  {lang === 'es' ? 'Nuevo Proyecto' : 'New Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={
                  lang === 'es'
                    ? 'Nombre del proyecto (ej: Costa Brava 2026)'
                    : 'Project name (e.g. Summer Shoot 2026)'
                }
                autoFocus
                className="w-full bg-[#12181F] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-manrope focus:outline-none focus:border-[#D4FF3A]/50 transition"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  {lang === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-4 py-2 rounded-xl bg-[#D4FF3A] hover:bg-[#c2ed2c] disabled:opacity-50 text-[#0B0F12] font-heading font-bold text-xs"
                >
                  {lang === 'es' ? 'Crear' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
