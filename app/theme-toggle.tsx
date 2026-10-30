"use client";

import { useSyncExternalStore } from "react";

type Theme = "mono" | "warm";

const storageKey = "neurodecode-theme";
const themeEvent = "neurodecode-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(themeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeEvent, callback);
  };
}

function getTheme(): Theme {
  return window.localStorage.getItem(storageKey) === "warm" ? "warm" : "mono";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "mono");

  const setTheme = (nextTheme: Theme) => {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    window.dispatchEvent(new Event(themeEvent));
  };

  return (
    <div className="themeToggle" role="group" aria-label="网页配色方案">
      <button type="button" aria-pressed={theme === "mono"} onClick={() => setTheme("mono")}>黑白</button>
      <button type="button" aria-pressed={theme === "warm"} onClick={() => setTheme("warm")}>暖色</button>
    </div>
  );
}
