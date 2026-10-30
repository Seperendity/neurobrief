import type { ConferencePaper } from "./conference-data";
import { iclr2026Papers as iclr } from "./iclr-2026-data";
import { neurips2026Papers as neurips } from "./neurips-2026-data";
import { eccv2026Papers as eccv } from "./eccv-2026-data";

// Preserve editorial order within each modality; fMRI remains the first entry point.
function modalityRank(paper: ConferencePaper) {
  const tags = paper.tags.join(" ").toLowerCase();
  if (tags.includes("fmri")) return /eeg|meg|ecog/.test(tags) ? 1 : 0;
  if (tags.includes("eeg")) return 2;
  if (tags.includes("meg")) return 3;
  return 4;
}

function prioritize(papers: ConferencePaper[]) {
  return [...papers].sort((a, b) => modalityRank(a) - modalityRank(b));
}

export const iclr2026Papers = prioritize(iclr);
export const neurips2026Papers = prioritize(neurips);
export const eccv2026Papers = prioritize(eccv);
