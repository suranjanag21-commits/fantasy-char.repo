import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Dices,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Character, CharacterClassType } from './types';
import { generateFantasyCharacter } from './utils/generator';
import { soundManager } from './utils/audio';
import { CharacterCard } from './components/CharacterCard';
import { RecentRolls } from './components/RecentRolls';
import { fetchCharacterPortrait, generateStylizedGamePortrait } from './utils/portraitGenerator';
import { fetchCharacterBackstory, generateProceduralBackstory } from './utils/backstoryGenerator';

const CLASS_OPTIONS: (CharacterClassType | 'All')[] = [
  'All',
  'Warrior',
  'Mage',
  'Rogue',
  'Paladin',
  'Ranger',
  'Bard',
  'Cleric',
  'Druid',
  'Warlock',
  'Monk',
];

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [history, setHistory] = useState<Character[]>([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState<CharacterClassType | 'All'>('All');
  const [isRolling, setIsRolling] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [portraitVariation, setPortraitVariation] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Generate backstory helper for current character
  const handleBackstoryGeneration = useCallback(async () => {
    if (!character || isGeneratingBackstory) return;
    setIsGeneratingBackstory(true);
    if (soundEnabled) {
      soundManager.playRollDice();
    }

    try {
      const backstory = await fetchCharacterBackstory(character);
      const updatedChar: Character = {
        ...character,
        backstory,
      };

      setCharacter(updatedChar);
      setHistory((prev) =>
        prev.map((c) => (c.id === character.id ? updatedChar : c))
      );

      if (soundEnabled) {
        soundManager.playChime();
      }
    } catch (err) {
      console.error('Failed to generate backstory:', err);
      const fallbackBackstory = generateProceduralBackstory(character);
      const updatedChar: Character = {
        ...character,
        backstory: fallbackBackstory,
      };
      setCharacter(updatedChar);
      setHistory((prev) =>
        prev.map((c) => (c.id === character.id ? updatedChar : c))
      );
    } finally {
      setIsGeneratingBackstory(false);
    }
  }, [character, isGeneratingBackstory, soundEnabled]);

  // Generate portrait helper for a specific character
  const handlePortraitGeneration = useCallback(
    async (targetChar: Character, variationInc: number = 0) => {
      if (!targetChar) return;
      setIsGeneratingPortrait(true);
      if (soundEnabled) {
        soundManager.playRollDice();
      }

      const nextVariation = portraitVariation + variationInc + 1;
      setPortraitVariation(nextVariation);

      try {
        const { imageUrl, prompt } = await fetchCharacterPortrait(targetChar, nextVariation);
        const updatedChar: Character = {
          ...targetChar,
          portraitUrl: imageUrl,
          portraitPrompt: prompt,
        };

        setCharacter(updatedChar);
        setHistory((prev) =>
          prev.map((c) => (c.id === targetChar.id ? updatedChar : c))
        );

        if (soundEnabled) {
          soundManager.playChime();
        }
      } catch (err) {
        console.error('Failed to create portrait:', err);
        // Fallback directly
        const fallbackUrl = generateStylizedGamePortrait(targetChar, nextVariation);
        const updatedChar: Character = {
          ...targetChar,
          portraitUrl: fallbackUrl,
        };
        setCharacter(updatedChar);
        setHistory((prev) =>
          prev.map((c) => (c.id === targetChar.id ? updatedChar : c))
        );
      } finally {
        setIsGeneratingPortrait(false);
      }
    },
    [portraitVariation, soundEnabled]
  );

  // Generate initial character on mount with matching portrait
  useEffect(() => {
    const initialChar = generateFantasyCharacter();
    const initialPortrait = generateStylizedGamePortrait(initialChar, 0);
    const charWithPortrait: Character = {
      ...initialChar,
      portraitUrl: initialPortrait,
    };
    setCharacter(charWithPortrait);
    setHistory([charWithPortrait]);
  }, []);

  const handleGenerate = () => {
    if (isRolling) return;
    setIsRolling(true);

    if (soundEnabled) {
      soundManager.playRollDice();
    }

    // Tactile animation delay
    setTimeout(() => {
      const preferred = selectedClassFilter === 'All' ? undefined : selectedClassFilter;
      const newChar = generateFantasyCharacter(preferred);
      const portraitUrl = generateStylizedGamePortrait(newChar, Math.floor(Math.random() * 100));
      const charWithPortrait: Character = {
        ...newChar,
        portraitUrl,
      };

      setCharacter(charWithPortrait);
      setHistory((prev) => [charWithPortrait, ...prev.slice(0, 9)]);
      setIsRolling(false);

      if (soundEnabled) {
        soundManager.playChime();
      }
    }, 280);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
  };

  return (
    <div
      id="app-root-container"
      className="min-h-screen alchemist-workbench-bg text-[#d8cfc4] flex flex-col justify-between selection:bg-[#c5a059]/30 selection:text-white font-sans relative overflow-x-hidden"
    >
      {/* Ancient Alchemical Transmutation Circle & Candlelight Ambient Backdrops */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-b from-[#c5a059]/10 via-[#d97706]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/4 -left-32 w-80 h-80 bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 -right-32 w-96 h-96 bg-[#c5a059]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Background Alchemical Watermark Glyph */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-[0.035] -z-10 animate-runic-aura">
        <svg viewBox="0 0 200 200" fill="none" stroke="#c5a059" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="85" />
          <polygon points="100,15 175,145 25,145" />
          <polygon points="100,185 25,55 175,55" />
          <circle cx="100" cy="100" r="45" />
          <circle cx="100" cy="100" r="30" strokeDasharray="2,2" />
        </svg>
      </div>

      {/* Nav Header styled as Alchemist's Guild Grimoire */}
      <nav
        id="app-header"
        className="h-20 border-b border-[#332619] bg-[#0c0907]/90 backdrop-blur-md flex items-center justify-between px-6 sm:px-12 sticky top-0 z-30 shadow-lg shadow-black/40"
      >
        <div className="flex items-center gap-3">
          <div
            id="app-logo-badge"
            className="w-9 h-9 bg-gradient-to-br from-[#e5c179] to-[#9b7835] rotate-45 flex items-center justify-center shadow-md shadow-[#c5a059]/30 border border-[#fef08a]/50"
          >
            <div className="w-6 h-6 border border-[#14100c] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#14100c] -rotate-45" />
            </div>
          </div>
          <div>
            <span
              id="app-main-title"
              className="text-lg sm:text-xl font-cinzel-decorative tracking-widest text-[#f5ebd7] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              LoreForge
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-[#c5a059]/80 font-serif">
              Alchemist's Character Grimoire
            </span>
          </div>
        </div>

        {/* Right Nav Action controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-6 text-[11px] uppercase tracking-[0.2em] text-[#a89c8e] opacity-80 font-serif">
            <span className="hover:text-[#c5a059] transition-colors cursor-default">Arcana</span>
            <span className="hover:text-[#c5a059] transition-colors cursor-default">Bestiary</span>
            <span className="hover:text-[#c5a059] transition-colors cursor-default">Grimoire</span>
          </div>

          <button
            id="sound-toggle-btn"
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-2 rounded-lg border border-[#3d3120] bg-[#18130f] hover:border-[#c5a059] hover:text-[#c5a059] text-[#a89c8e] transition-colors cursor-pointer shadow-sm"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#e5c179]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#71717a]" />
            )}
          </button>
        </div>
      </nav>

      {/* Main Sanctuary / Generation Section */}
      <main
        id="main-character-generator-section"
        className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center relative z-10"
      >
        {/* Subtle Ornamental Gold Corner Accents */}
        <div className="hidden lg:block absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-[#c5a059] opacity-30 pointer-events-none"></div>
        <div className="hidden lg:block absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-[#c5a059] opacity-30 pointer-events-none"></div>

        {/* Class Affinity Filter Pills */}
        <div id="class-filter-container" className="w-full max-w-xl mb-6">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] opacity-90 font-bold font-serif">
              ✦ Transmutation Archetype
            </span>
            <span className="text-xs text-[#a89c8e]">
              Focus: <strong className="text-[#f5ebd7] font-serif">{selectedClassFilter}</strong>
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {CLASS_OPTIONS.map((cls) => {
              const active = selectedClassFilter === cls;
              return (
                <button
                  key={cls}
                  id={`filter-class-${cls.toLowerCase()}`}
                  onClick={() => setSelectedClassFilter(cls)}
                  className={`px-3 py-1 rounded-lg text-xs tracking-wider uppercase transition-all border shrink-0 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#c5a059] to-[#d8b368] text-[#0c0c0b] font-bold border-[#c5a059] shadow-md shadow-[#c5a059]/25'
                      : 'bg-[#18130f] text-[#a89c8e] border-[#332619] hover:border-[#c5a059]/60 hover:text-[#f5ebd7]'
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Character Display Card with Magical Glowing Border & Portrait */}
        <CharacterCard
          character={character}
          isGenerating={isRolling}
          isGeneratingPortrait={isGeneratingPortrait}
          isGeneratingBackstory={isGeneratingBackstory}
          onGeneratePortrait={() => character && handlePortraitGeneration(character, 0)}
          onRegeneratePortrait={() => character && handlePortraitGeneration(character, 1)}
          onGenerateBackstory={handleBackstoryGeneration}
        />

        {/* Summon Action Button (Alchemical Workbench Transmutation Ritual) */}
        <div className="mt-8 flex flex-col items-center w-full max-w-xl">
          <motion.button
            id="generate-character-btn"
            onClick={handleGenerate}
            disabled={isRolling}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-b from-[#1c1610] to-[#120e0a] border border-[#c5a059] text-[#e5c179] uppercase tracking-[0.3em] text-xs sm:text-sm font-cinzel rounded-xl overflow-hidden hover:text-[#0c0c0b] transition-colors duration-300 cursor-pointer shadow-[0_0_25px_rgba(197,160,89,0.25)] hover:shadow-[0_0_35px_rgba(197,160,89,0.45)]"
          >
            {/* Sliding Gold Background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059] via-[#e5c179] to-[#c5a059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-0"></div>

            <div className="relative z-10 font-bold flex items-center justify-center gap-3">
              <motion.div
                animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.35, repeat: isRolling ? Infinity : 0, ease: 'linear' }}
              >
                <Dices className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c179] group-hover:text-[#0c0c0b]" />
              </motion.div>
              <span>{isRolling ? 'Transmuting Essence...' : 'Summon Legend'}</span>
              <Sparkles className="w-3.5 h-3.5 opacity-80" />
            </div>
          </motion.button>

          <p id="keyboard-hint" className="text-[11px] uppercase tracking-widest text-[#a89c8e]/70 mt-3 text-center font-serif">
            ✦ Channel the workbench ether to forge a randomized name, class & visage ✦
          </p>
        </div>

        {/* History / Recent Summons Section */}
        <RecentRolls
          history={history}
          onSelect={(char) => setCharacter(char)}
          onClear={() => character && setHistory([character])}
          currentId={character?.id}
        />
      </main>

      {/* Footer */}
      <footer
        id="app-footer"
        className="min-h-16 bg-[#0c0907] border-t border-[#332619] flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 py-3 gap-2"
      >
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest opacity-60 text-[#a89c8e] font-serif">
            Alchemist's Crucible Session
          </span>
          <span className="text-xs font-mono text-[#c5a059]">
            ID: 884-AX-SUMMON
          </span>
        </div>

        <div className="text-[11px] text-[#a89c8e]/70 tracking-wider font-serif">
          LoreForge • Ancient Alchemist Workbench Edition
        </div>
      </footer>
    </div>
  );
}
