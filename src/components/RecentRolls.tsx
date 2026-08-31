import React from 'react';
import { Character } from '../types';
import { History, Trash2, User } from 'lucide-react';

interface RecentRollsProps {
  history: Character[];
  onSelect: (character: Character) => void;
  onClear: () => void;
  currentId?: string;
}

export const RecentRolls: React.FC<RecentRollsProps> = ({
  history,
  onSelect,
  onClear,
  currentId,
}) => {
  if (history.length <= 1) return null;

  return (
    <div
      id="recent-characters-section"
      className="w-full max-w-xl mx-auto mt-6 p-4 rounded-xl border border-[#332619] bg-[#14100c]/80 backdrop-blur-sm shadow-md"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-serif">
          <History className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Alchemist's Chronicle ({history.length})</span>
        </div>
        <button
          id="clear-history-btn"
          onClick={onClear}
          title="Clear History"
          className="text-[10px] uppercase tracking-widest text-[#a89c8e]/70 hover:text-[#e06c55] transition-colors flex items-center gap-1 cursor-pointer font-serif"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {history.map((char) => {
          const isSelected = char.id === currentId;
          return (
            <button
              key={char.id}
              id={`history-item-${char.id}`}
              onClick={() => onSelect(char)}
              className={`px-3 py-2 rounded-lg text-left border shrink-0 transition-all text-xs flex items-center gap-2.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#241c14] border-[#c5a059] text-white shadow-[0_0_10px_rgba(197,160,89,0.2)]'
                  : 'bg-[#18130f] border-[#332619] text-[#a89c8e] hover:border-[#c5a059]/60 hover:text-[#f5ebd7]'
              }`}
            >
              {char.portraitUrl ? (
                <img
                  src={char.portraitUrl}
                  alt={char.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-md object-cover border border-[#c5a059]/60 shrink-0"
                />
              ) : (
                <div className="w-7 h-7 rounded-md bg-[#241c14] border border-[#332619] flex items-center justify-center text-[#c5a059]/60 shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="min-w-0">
                <div className="font-cinzel font-bold text-[#f5ebd7] truncate max-w-[105px]">
                  {char.name}
                </div>
                <div className="text-[10px] text-[#e5c179] font-medium tracking-wide font-sans">
                  {char.characterClass} • Lvl {char.level}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
