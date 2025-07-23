'use client';

import { useEffect, useState } from 'react';

const sampleText = 'The quick brown fox jumps over the lazy dog.';

export default function TypingPage() {
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [done, setDone] = useState(false);

  const [mistakeCount, setMistakeCount] = useState(0); // alle Fehler, auch wenn korrigiert
  const [currentErrors, setCurrentErrors] = useState(0); // aktuelle Live-Fehler im Text
  const [alreadyCounted, setAlreadyCounted] = useState<boolean[]>([]); // pro Zeichen gemerkt

  // ⌨️ Tasteneingaben verarbeiten
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (done) return;

      const now = Date.now();
      let start = startTime;

      if (!startTime) {
        start = now;
        setStartTime(now);
      }

      let newText = inputText;

      if (e.key === 'Backspace') {
        newText = newText.slice(0, -1);
      } else if (e.key.length === 1) {
        if (inputText.length >= sampleText.length) return;

        const nextIndex = inputText.length;
        const correctChar = sampleText[nextIndex];

        if (e.key !== correctChar) {
          if (!alreadyCounted[nextIndex]) {
            setMistakeCount((prev) => prev + 1);
            const updated = [...alreadyCounted];
            updated[nextIndex] = true;
            setAlreadyCounted(updated);
          }
        }

        newText += e.key;
      } else {
        return;
      }

      setInputText(newText);

      // Fehler im aktuellen Text neu zählen
      let liveErrors = 0;
      for (let i = 0; i < newText.length; i++) {
        if (newText[i] !== sampleText[i]) liveErrors++;
      }
      setCurrentErrors(liveErrors);

      // Stoppen, wenn Text vollständig
      if (newText.length === sampleText.length && start) {
        const end = now;
        setEndTime(end);
        setElapsedTime((end - start) / 1000);
        setDone(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputText, done, startTime, alreadyCounted]);

  // ⏱ Live-Zeit aktualisieren
  useEffect(() => {
    if (!startTime || done) return;

    const interval = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, done]);

  // 🧮 WPM = Wörter pro Minute
  const getWPM = () => {
    if (!startTime || !endTime) return null;
    const minutes = (endTime - startTime) / 1000 / 60;
    const words = sampleText.trim().split(/\s+/).length;
    return Math.round(words / minutes);
  };

  // 🧮 CPM = Zeichen pro Minute
  const getCPM = () => {
    if (!startTime || !endTime) return null;
    const minutes = (endTime - startTime) / 1000 / 60;
    const charactersTyped = inputText.length;
    return Math.round(charactersTyped / minutes);
  };

  return (
    <div className="p-8 max-w-xl mx-auto cursor-text" tabIndex={0}>
      <h1 className="text-2xl font-bold mb-4">Tippe den Text</h1>

      <p className="text-lg font-mono mb-6 select-none">
        {sampleText.split('').map((char, idx) => {
          const typed = inputText[idx];
          let className = '';

          if (typed != null) {
            className = typed === char ? 'text-green-600' : 'text-red-600';
          } else if (idx === inputText.length) {
            className = 'bg-yellow-300 underline';
          }

          return (
            <span key={idx} className={className}>
              {char}
            </span>
          );
        })}
      </p>

      <div className="mt-6 text-lg space-y-1">
        <p>
          ❌ Fehler aktuell im Text:{' '}
          <span className="text-red-600 font-bold">{currentErrors}</span>
        </p>
        <p>
          ✅ Fehler gemacht insgesamt:{' '}
          <span className="text-orange-600 font-bold">{mistakeCount}</span>
        </p>
        <p>
          ⏱ Zeit:{' '}
          <span className="text-blue-600 font-semibold">
            {elapsedTime.toFixed(2)} s
          </span>
        </p>
        {done && (
          <>
            <p>
              🏁 WPM:{' '}
              <span className="text-green-700 font-semibold">{getWPM()}</span>
            </p>
            <p>
              📈 CPM:{' '}
              <span className="text-purple-700 font-semibold">{getCPM()}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
