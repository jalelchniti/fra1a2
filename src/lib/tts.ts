// Global TTS helpers to enforce French voice/locale across the app.
let installed = false;
let cachedFrenchVoice: SpeechSynthesisVoice | null = null;

const pickFrenchVoice = (): SpeechSynthesisVoice | null => {
  if (cachedFrenchVoice) return cachedFrenchVoice;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang?.toLowerCase().startsWith('fr')) ?? null;
  cachedFrenchVoice = voice;
  return voice;
};

const ensureFrenchVoice = (utterance: SpeechSynthesisUtterance) => {
  // Always speak with French locale so translated text sounds natural.
  utterance.lang = 'fr-FR';
  const voice = pickFrenchVoice();
  if (voice) utterance.voice = voice;
};

export const installFrenchTtsGuard = () => {
  if (installed) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  installed = true;

  const synth = window.speechSynthesis;
  const originalSpeak = synth.speak.bind(synth);

  // Keep French voice cache in sync when the browser finishes loading voices.
  const refreshVoice = () => {
    cachedFrenchVoice = null;
    pickFrenchVoice();
  };
  synth.addEventListener?.('voiceschanged', refreshVoice);
  refreshVoice();

  // Wrap speak to force French locale/voice whenever something calls it.
  (synth as any).speak = (utterance: SpeechSynthesisUtterance) => {
    ensureFrenchVoice(utterance);
    originalSpeak(utterance);
  };
};
