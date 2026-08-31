import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // Backstory generation endpoint
  app.post('/api/generate-backstory', async (req, res) => {
    try {
      const {
        name,
        fullName,
        characterClass,
        race,
        background,
        alignment,
        signatureAbility,
        quote,
      } = req.body;

      const ai = getGenAI();
      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: `Write a compelling, unique, exactly one-to-two-sentence fantasy origin backstory for the following RPG character:
Name: ${fullName || name || 'Adventurer'}
Race: ${race || 'Human'}
Class: ${characterClass || 'Hero'}
Background: ${background || 'Wanderer'}
Alignment: ${alignment || 'Neutral'}
Signature Ability: ${signatureAbility || 'Mastery'}
Quote: "${quote || ''}"

Requirements:
- Exactly 1 or 2 sentences in length.
- Atmospheric, evocative, and epic fantasy tone fitting an ancient alchemist's chronicle.
- Do NOT include any quotation marks around the entire response. Do NOT include markdown headers or bullet points. Just return the 1-2 sentence origin story.`,
            config: {
              temperature: 0.85,
            },
          });

          const text = response.text?.trim();
          if (text) {
            return res.json({
              success: true,
              backstory: text,
              source: 'gemini',
            });
          }
        } catch (genError) {
          console.warn('Gemini backstory generation API call returned error:', genError);
        }
      }

      return res.json({
        success: true,
        backstory: null,
        source: 'procedural-fallback',
      });
    } catch (error: any) {
      console.error('Server error generating backstory:', error);
      res.status(500).json({ error: error?.message || 'Failed to generate backstory' });
    }
  });

  // Portrait generation endpoint
  app.post('/api/generate-portrait', async (req, res) => {
    try {
      const {
        name,
        characterClass,
        race,
        signatureAbility,
        variation = 0,
        prompt: clientPrompt,
      } = req.body;

      const prompt =
        clientPrompt ||
        `Vibrant cartoon video game style concept art character portrait of a fantasy ${race || 'Human'} ${characterClass || 'Warrior'} named "${name || 'Hero'}". Iconic ${characterClass} attire, vibrant colors, signature ability ${signatureAbility || 'combat prowess'}. 2D RPG video game avatar portrait, bold outlines, dynamic magical highlights, expressive cartoon features, stylized fantasy digital game illustration, clean dark background with atmospheric class glow.`;

      const ai = getGenAI();
      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-image',
            contents: {
              parts: [{ text: prompt }],
            },
            config: {
              imageConfig: {
                aspectRatio: '1:1',
              },
            },
          });

          const candidates = response.candidates;
          if (candidates && candidates.length > 0) {
            for (const part of candidates[0].content?.parts || []) {
              if (part.inlineData && part.inlineData.data) {
                const mime = part.inlineData.mimeType || 'image/png';
                const imageUrl = `data:${mime};base64,${part.inlineData.data}`;
                return res.json({
                  success: true,
                  imageUrl,
                  prompt,
                  source: 'gemini',
                });
              }
            }
          }
        } catch (genError) {
          console.warn('Gemini image generation API call returned error:', genError);
          // Fall back gracefully below
        }
      }

      // Return a status indicating fallback to procedural stylized artwork on client
      return res.json({
        success: true,
        imageUrl: null,
        prompt,
        source: 'procedural-fallback',
      });
    } catch (error: any) {
      console.error('Server error generating portrait:', error);
      res.status(500).json({ error: error?.message || 'Failed to generate portrait' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LoreForge Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
