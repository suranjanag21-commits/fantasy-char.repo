import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Wand2,
  Sword,
  Sun,
  Compass,
  Music,
  Sparkles,
  Leaf,
  Flame,
  Zap,
  Copy,
  Check,
  Scroll,
  FlameKindling,
  RefreshCw,
  Image as ImageIcon,
  Wand,
  BookOpen,
  Feather,
} from 'lucide-react';
import { Character, CharacterClassType } from '../types';

interface CharacterCardProps {
  character: Character | null;
  isGenerating: boolean;
  isGeneratingPortrait?: boolean;
  isGeneratingBackstory?: boolean;
  onGeneratePortrait?: () => void;
  onRegeneratePortrait?: () => void;
  onGenerateBackstory?: () => void;
}

const CLASS_ICONS: Record<CharacterClassType, React.ComponentType<{ className?: string }>> = {
  Warrior: Shield,
  Mage: Wand2,
  Rogue: Sword,
  Paladin: Sun,
  Ranger: Compass,
  Bard: Music,
  Cleric: Sparkles,
  Druid: Leaf,
  Warlock: Flame,
  Monk: Zap,
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isGenerating,
  isGeneratingPortrait = false,
  isGeneratingBackstory = false,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
}) => {
  const [copied, setCopied] = useState(false);

  if (!character) {
    return (
      <div
        id="empty-state-card"
        className="w-full max-w-xl mx-auto p-10 rounded-2xl border border-[#262624] bg-[#121210] text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#c5a059] opacity-30"></div>
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#c5a059] opacity-30"></div>

        {/* Empty State Card */}
        <div className="w-14 h-14 mx-auto mb-4 bg-[#1e1711] border border-[#c5a059]/60 flex items-center justify-center text-[#c5a059] rotate-45 shadow-[0_0_15px_rgba(197,160,89,0.2)]">
          <div className="w-10 h-10 border border-[#3d3120] flex items-center justify-center -rotate-45">
            <Sparkles className="w-5 h-5 animate-pulse text-[#e5c179]" />
          </div>
        </div>
        <h3 id="empty-state-title" className="text-xl font-cinzel-decorative text-[#f5ebd7] tracking-wider mb-2 uppercase">
          Alchemical Crucible Awaits
        </h3>
        <p id="empty-state-desc" className="text-[#a89c8e] text-xs max-w-md mx-auto tracking-wide leading-relaxed font-sans">
          Summon a legend from the ether to reveal their Name, Class, primary virtues, and forged history.
        </p>
      </div>
    );
  }

  const IconComponent = CLASS_ICONS[character.characterClass] || Shield;
  const hasPortrait = Boolean(character.portraitUrl);

  const handleCopy = () => {
    const textToCopy = `Fantasy Character: ${character.fullName}
Class: ${character.characterClass} (${character.classInfo.role})
Race: ${character.race} | Alignment: ${character.alignment}
Level: ${character.level}
Signature Ability: ${character.classInfo.signatureAbility}
Stats: STR ${character.stats.strength} | DEX ${character.stats.dexterity} | CON ${character.stats.constitution} | INT ${character.stats.intelligence} | WIS ${character.stats.wisdom} | CHA ${character.stats.charisma}
Quote: "${character.quote}"${character.backstory ? `\nOrigin Backstory: ${character.backstory}` : ''}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={character.id}
        id="character-display-card"
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.99 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-xl mx-auto rounded-2xl border border-[#3d3120]/80 bg-[#14100c]/90 backdrop-blur-sm arcane-glow-border shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Decorative Alchemical Gold Corner Brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#c5a059] opacity-60 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#c5a059] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#c5a059] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#c5a059] opacity-60 pointer-events-none"></div>

        {/* Top Header Card Area */}
        <div className="p-6 sm:p-8 border-b border-[#2e2316] text-center relative z-10 bg-gradient-to-b from-[#1c1611]/80 to-[#14100c]/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                id="character-class-icon-container"
                className={`w-9 h-9 rounded-lg flex items-center justify-center border shadow-sm ${character.classInfo.colorTheme.badge}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <span
                id="character-level-badge"
                className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded border border-[#3d3120] bg-[#1a140f] text-[#c5a059] shadow-inner"
              >
                LVL {character.level}
              </span>
              <span
                id="character-race-badge"
                className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#3d3120] bg-[#1a140f] text-[#d8cfc4]"
              >
                {character.race}
              </span>
            </div>

            <button
              id="copy-character-btn"
              onClick={handleCopy}
              title="Copy Character Profile"
              className="p-2 rounded-lg border border-[#3d3120] bg-[#1a140f] hover:border-[#c5a059] hover:text-[#c5a059] text-[#a89c8e] transition-colors duration-200 cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#5ec99b]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Eyebrow & Hero Character Name with Fantasy Font */}
          <p className="text-[#c5a059] text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-2 opacity-90 font-serif">
            ✦ Chronicle of the Realm ✦
          </p>

          <h2
            id="character-name-display"
            className="font-cinzel-decorative text-2xl sm:text-3xl lg:text-4xl text-[#f5ebd7] tracking-wider mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(197,160,89,0.3)]"
          >
            {character.fullName}
          </h2>

          {/* Class Display with flanking gold rules */}
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 my-2">
            <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#c5a059] opacity-70"></div>
            <span
              id="character-class-display"
              className="text-base sm:text-lg font-serif italic text-[#e5c179] tracking-wider"
            >
              {character.characterClass} • {character.classInfo.role}
            </span>
            <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#c5a059] opacity-70"></div>
          </div>

          <p id="character-class-description" className="text-xs text-[#c2b6a6] max-w-lg mx-auto mt-2 leading-relaxed font-sans">
            {character.classInfo.description}
          </p>
        </div>

        {/* Character Portrait Section */}
        <div
          id="character-portrait-container"
          className="p-6 sm:p-8 border-b border-[#2e2316] bg-[#0f0c09]/95 relative z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold flex items-center gap-1.5 font-serif">
              <ImageIcon className="w-3.5 h-3.5 text-[#c5a059]" />
              Alchemist's Scrying Glass • {character.characterClass}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#a89c8e]/80">
              Style: Video-Game Cartoon
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Portrait Frame with Alchemical Accents */}
            <div
              id="portrait-frame"
              className="relative w-48 h-48 sm:w-52 sm:h-52 shrink-0 rounded-2xl border-2 border-[#3d3120] bg-[#16120e] overflow-hidden shadow-xl flex items-center justify-center group shadow-[#c5a059]/10"
            >
              {/* Corner accents on image frame */}
              <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#c5a059] z-20 pointer-events-none"></div>
              <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#c5a059] z-20 pointer-events-none"></div>
              <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#c5a059] z-20 pointer-events-none"></div>
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#c5a059] z-20 pointer-events-none"></div>

              {isGeneratingPortrait ? (
                <div
                  id="portrait-loading-state"
                  className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#141412] text-center"
                >
                  <RefreshCw className="w-8 h-8 text-[#c5a059] animate-spin mb-3" />
                  <span className="text-xs font-serif text-white uppercase tracking-wider mb-1">
                    Forging Portrait...
                  </span>
                  <span className="text-[10px] text-[#a1a1aa] tracking-wide">
                    Channeling {character.characterClass} visage
                  </span>
                </div>
              ) : hasPortrait ? (
                <div className="w-full h-full relative">
                  <img
                    id="character-portrait-img"
                    src={character.portraitUrl}
                    alt={`${character.fullName} ${character.characterClass} portrait`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b]/40 to-transparent p-2 text-center">
                    <span className="text-[9px] uppercase tracking-widest text-[#c5a059] font-mono">
                      {character.race} • {character.characterClass}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  id="portrait-placeholder"
                  className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#141412]/80"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1c1c18] border border-[#262624] flex items-center justify-center text-[#c5a059]/60 mb-2">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-serif text-white/80 uppercase tracking-wider mb-1">
                    Uncharted Visage
                  </span>
                  <span className="text-[10px] text-[#a1a1aa]/60 max-w-[140px] leading-tight">
                    Generate a cartoon or video-game style portrait
                  </span>
                </div>
              )}
            </div>

            {/* Portrait Details & Action Buttons */}
            <div className="flex-1 flex flex-col justify-between self-stretch text-center sm:text-left">
              <div>
                <h4 className="text-sm font-cinzel text-[#f5ebd7] font-bold uppercase tracking-wider mb-1">
                  {character.characterClass} Visage & Regalia
                </h4>
                <p className="text-xs text-[#c2b6a6] leading-relaxed mb-4 font-sans">
                  {hasPortrait
                    ? `Alchemically transmuted concept portrait capturing ${character.name}'s ${character.race} heritage and ${character.characterClass} battle regalia.`
                    : `Forge a vibrant video-game cartoon avatar matching the ${character.characterClass}'s signature weapons, mystical aura, and class colors.`}
                </p>
              </div>

              {/* Portrait Control Buttons: Generate portrait & Regenerate portrait */}
              <div className="flex flex-wrap gap-2.5 items-center justify-center sm:justify-start">
                <button
                  id="generate-portrait-btn"
                  onClick={onGeneratePortrait}
                  disabled={isGeneratingPortrait}
                  className={`px-4 py-2.5 rounded-lg font-serif text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                    !hasPortrait
                      ? 'bg-gradient-to-r from-[#c5a059] to-[#d8b368] text-[#0c0c0b] font-bold border-[#c5a059] shadow-lg shadow-[#c5a059]/25 hover:brightness-110'
                      : 'bg-[#1c1611] hover:bg-[#251d16] hover:border-[#c5a059]/80 text-[#d8cfc4] border-[#3d3120]'
                  } ${isGeneratingPortrait ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <Wand className="w-3.5 h-3.5" />
                  <span>Generate portrait</span>
                </button>

                <button
                  id="regenerate-portrait-btn"
                  onClick={onRegeneratePortrait}
                  disabled={isGeneratingPortrait}
                  className={`px-4 py-2.5 rounded-lg font-serif text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                    hasPortrait
                      ? 'bg-gradient-to-r from-[#c5a059] to-[#d8b368] text-[#0c0c0b] font-bold border-[#c5a059] shadow-lg shadow-[#c5a059]/25 hover:brightness-110'
                      : 'bg-[#1c1611] hover:bg-[#251d16] hover:border-[#c5a059]/80 text-[#d8cfc4] border-[#3d3120]'
                  } ${isGeneratingPortrait ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                  <span>Regenerate portrait</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Character Attributes & Stats Grid */}
        <div className="p-6 sm:p-8 space-y-6 relative z-10 bg-gradient-to-b from-[#14100c] to-[#120e0a]">
          <div id="character-attributes-section">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059]/80 font-semibold font-serif">
                ✦ Innate Attributes
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#c5a059]">
                Primary Stat: <strong className="text-[#f5ebd7]">{character.classInfo.primaryStat}</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: 'Strength', short: 'STR', val: character.stats.strength },
                { label: 'Dexterity', short: 'DEX', val: character.stats.dexterity },
                { label: 'Constitution', short: 'CON', val: character.stats.constitution },
                { label: 'Intelligence', short: 'INT', val: character.stats.intelligence },
                { label: 'Wisdom', short: 'WIS', val: character.stats.wisdom },
                { label: 'Charisma', short: 'CHA', val: character.stats.charisma },
              ].map((stat) => {
                const isHigh = stat.val >= 16;
                return (
                  <div
                    key={stat.short}
                    id={`stat-box-${stat.short.toLowerCase()}`}
                    className={`py-3 px-2 rounded-lg border text-center transition-all ${
                      isHigh
                        ? 'bg-[#241c14] border-[#c5a059]/60 text-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.15)]'
                        : 'bg-[#18130f] border-[#332619] text-[#d8cfc4]'
                    }`}
                  >
                    <div className="text-[9px] uppercase tracking-widest text-[#a89c8e] mb-0.5 font-mono">
                      {stat.short}
                    </div>
                    <div className="text-lg font-cinzel font-bold text-[#f5ebd7]">
                      {stat.val}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signature Ability & Lore */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div
              id="character-ability-box"
              className="p-3.5 rounded-lg bg-[#18130f] border border-[#332619]"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#c5a059] mb-1 font-serif">
                <FlameKindling className="w-3 h-3 text-[#c5a059]" />
                Signature Ability
              </div>
              <p className="text-xs text-[#f5ebd7] font-medium">
                {character.classInfo.signatureAbility}
              </p>
            </div>

            <div
              id="character-lore-box"
              className="p-3.5 rounded-lg bg-[#18130f] border border-[#332619]"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#c5a059] mb-1 font-serif">
                <Scroll className="w-3 h-3 text-[#c5a059]" />
                Allegiance & Lore
              </div>
              <p className="text-xs text-[#f5ebd7] font-medium truncate">
                {character.background} • {character.alignment}
              </p>
            </div>
          </div>

          {/* Character Quote */}
          <div
            id="character-quote-box"
            className="p-3.5 rounded-lg border border-[#332619] bg-[#16120e]/80 text-center font-garamond italic text-sm text-[#c2b6a6] leading-relaxed"
          >
            "{character.quote}"
          </div>

          {/* Alchemical Origin Story / Backstory Section */}
          <div
            id="character-backstory-section"
            className="p-4 sm:p-5 rounded-xl border border-[#3d3120] bg-gradient-to-b from-[#1a140f] to-[#120e0a] relative overflow-hidden shadow-inner"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#c5a059]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-serif font-bold text-[#e5c179]">
                  Character Origin Saga
                </span>
              </div>

              <button
                id="generate-backstory-btn"
                onClick={onGenerateBackstory}
                disabled={isGeneratingBackstory}
                className={`px-3.5 py-1.5 rounded-lg font-serif text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                  !character.backstory
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#d8b368] text-[#0c0c0b] font-bold border-[#c5a059] shadow-md shadow-[#c5a059]/20 hover:brightness-110'
                    : 'bg-[#241c14] hover:bg-[#2e2319] hover:border-[#c5a059] text-[#e5c179] border-[#3d3120]'
                } ${isGeneratingBackstory ? 'opacity-60 cursor-wait' : ''}`}
              >
                {isGeneratingBackstory ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Inscribing...</span>
                  </>
                ) : (
                  <>
                    <Feather className="w-3.5 h-3.5" />
                    <span>{character.backstory ? 'Regenerate Backstory' : 'Generate Backstory'}</span>
                  </>
                )}
              </button>
            </div>

            {character.backstory ? (
              <div
                id="character-backstory-display"
                className="p-3.5 rounded-lg border border-[#c5a059]/30 bg-[#16120e] relative"
              >
                <div className="absolute top-1.5 left-1.5 text-[#c5a059]/20 font-serif text-2xl select-none">
                  “
                </div>
                <p className="text-xs sm:text-sm text-[#f5ebd7] font-sans leading-relaxed tracking-wide relative z-10 pl-2">
                  {character.backstory}
                </p>
                <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-widest text-[#a89c8e]/60 font-serif">
                  <span>✦ Alchemical Transmutation Chronicle ✦</span>
                  <span>1-2 Sentence Lore</span>
                </div>
              </div>
            ) : (
              <div
                id="backstory-placeholder"
                className="p-3.5 rounded-lg border border-dashed border-[#332619] bg-[#14100c]/60 text-center flex flex-col items-center justify-center py-4"
              >
                <p className="text-xs text-[#a89c8e] max-w-sm leading-relaxed mb-2 font-sans">
                  No origin story inscribed yet. Click <strong className="text-[#e5c179]">"Generate Backstory"</strong> to forge a unique 1-to-2-sentence origin tale for {character.name}.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
