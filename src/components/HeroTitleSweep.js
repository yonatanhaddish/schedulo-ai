"use client";

import { useEffect, useState } from "react";

const title = "Smart Scheduling. Better Teamwork.";
const highlightRadius = 2;
const stepDuration = 240;
const loopPauseDuration = 6000;

let nextCharacterIndex = 0;

const titleWords = title.split(" ").map((word) => {
  return Array.from(word).map((character) => {
    const characterIndex = nextCharacterIndex;
    nextCharacterIndex += 1;

    return { character, characterIndex };
  });
});

const characterCount = nextCharacterIndex;

function getCharacterClassName(characterIndex, activeCharacterIndex) {
  const distanceFromHighlight = Math.abs(
    characterIndex - activeCharacterIndex,
  );

  if (distanceFromHighlight === 0) {
    return "hero-title-character is-pink-vivid";
  }

  if (distanceFromHighlight <= highlightRadius) {
    return "hero-title-character is-pink-soft";
  }

  return "hero-title-character";
}

export default function HeroTitleSweep() {
  const startingIndex = -(highlightRadius + 1);
  const [activeCharacterIndex, setActiveCharacterIndex] =
    useState(startingIndex);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      return undefined;
    }

    const finishingIndex = characterCount + highlightRadius;
    let currentIndex = startingIndex;
    let timeoutId;

    const advanceHighlight = () => {
      if (currentIndex >= finishingIndex) {
        currentIndex = startingIndex;
        setActiveCharacterIndex(startingIndex);
        timeoutId = window.setTimeout(advanceHighlight, loopPauseDuration);
        return;
      }

      currentIndex += 1;
      setActiveCharacterIndex(currentIndex);
      timeoutId = window.setTimeout(advanceHighlight, stepDuration);
    };

    timeoutId = window.setTimeout(advanceHighlight, stepDuration);

    return () => window.clearTimeout(timeoutId);
  }, [startingIndex]);

  return (
    <span className="hero-title-js-sweep" aria-hidden="true">
      {titleWords.map((word, wordIndex) => (
        <span className="hero-title-word" key={wordIndex}>
          {word.map(({ character, characterIndex }) => (
            <span
              className={getCharacterClassName(
                characterIndex,
                activeCharacterIndex,
              )}
              key={characterIndex}
            >
              {character}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
