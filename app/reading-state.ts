"use client";

import { useMemo, useSyncExternalStore } from "react";

export type PaperReadingState = {
  favorite?: boolean;
  later?: boolean;
  read?: boolean;
  updatedAt?: string;
};

export type ReadingLibraryState = Record<string, PaperReadingState>;

const storageKey = "neurodecode-reading-library";
const changeEvent = "neurodecode-reading-library-change";
const emptySnapshot = "{}";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(storageKey) ?? emptySnapshot;
}

function parseSnapshot(snapshot: string): ReadingLibraryState {
  try {
    return JSON.parse(snapshot) as ReadingLibraryState;
  } catch {
    return {};
  }
}

export function useReadingLibrary() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => emptySnapshot);
  const library = useMemo(() => parseSnapshot(snapshot), [snapshot]);

  const update = (paperId: string, field: "favorite" | "later" | "read") => {
    const current = parseSnapshot(getSnapshot());
    const nextValue = !current[paperId]?.[field];
    const next = {
      ...current,
      [paperId]: {
        ...current[paperId],
        [field]: nextValue,
        updatedAt: new Date().toISOString(),
      },
    };
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(changeEvent));
  };

  return { library, update };
}
