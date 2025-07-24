'use client';

import { useEffect, useState, useRef } from 'react';

interface TypingPageProps {
  sampleText: string;
}

export function TypingPage({ sampleText }: TypingPageProps) {
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [done, setDone] = useState(false);

  const [mistakeCount, setMistakeCount] = useState(0);
  const [currentErrors, setCurrentErrors] = useState(0);
  const [alreadyCounted, setAlreadyCounted] = useState<boolean[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

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

      // Fehler im aktuellen Text zählen
      let liveErrors = 0;
      for (let i = 0; i < newText.length; i++) {
        if (newText[i] !== sampleText[i]) liveErrors++;
      }
      setCurrentErrors(liveErrors);

      // Fertig
      if (newText.length === sampleText.length && start) {
        const end = now;
        setEndTime(end);
        setElapsedTime((end - start) / 1000);
        setDone(true);
      }

      // Scroll zur Cursor-Position
      setTimeout(() => {
        const cursorEl = containerRef.current?.querySelector('.bg-accent');
        if (cursorEl) {
          cursorEl.scrollIntoView({ behavior: 'smooth',
      block: 'start',     // ⬅️ scrollt bis ganz nach oben
      inline: 'nearest', });
        }
      }, 0);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputText, done, startTime, alreadyCounted, sampleText]);

  useEffect(() => {
    if (!startTime || done) return;

    const interval = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, done]);

  const getWPM = () => {
    if (!startTime || !endTime) return null;
    const minutes = (endTime - startTime) / 1000 / 60;
    const words = sampleText.trim().split(/\s+/).length;
    return Math.round(words / minutes);
  };

  const getCPM = () => {
    if (!startTime || !endTime) return null;
    const minutes = (endTime - startTime) / 1000 / 60;
    const charactersTyped = inputText.length;
    return Math.round(charactersTyped / minutes);
  };

  return (
    <div className="p-8 mx-auto cursor-text outline-none" tabIndex={0}>
      <div className="w-1/2 flex flex-row items-center justify-center mx-auto gap-8">
        <div className="mb-4 flex flex-col items-center">
          <h2 className="text-2xl mb-3">Fehler aktuell:{' '}</h2>
          <span className="text-3xl mb-5">{currentErrors}</span>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <h2 className="text-2xl mb-3">Zeit:{' '}</h2>
          <span className="text-3xl mb-5 font-semibold text-center">
        {elapsedTime.toFixed(2)} s
          </span>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <h2 className="text-2xl mb-3">Fehler gesamt:{' '}</h2>
          <span className="text-3xl mb-5">{mistakeCount}</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="text-lg font-mono mb-6 select-none h-48 overflow-auto p-4 rounded shadow-inner"
      >
        {sampleText.split('').map((char, idx) => {
          const typed = inputText[idx];
          let className = '';

          if (typed != null) {
            className = typed === char ? 'text-green-600' : 'text-red-600';
          } else if (idx === inputText.length) {
            className = 'bg-accent underline';
          }

          return (
            <span key={idx} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <div className="mt-6 text-lg space-y-1 flex items-center justify-center mx-auto gap-8">
        {done && (
          <>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl mb-3">Worte pro Minute</h2>
              <span className="text-3xl mb-5  font-semibold">{getWPM()}</span>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl mb-3">Zeichen pro Minute</h2>
              <span className="text-3xl mb-5 font-semibold">{getCPM()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
