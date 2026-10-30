import { cvpr2026Papers, icml2026Papers, type ConferencePaper } from "./conference-data";
import { digests, type DigestPaper } from "./digest-data";
import { nature2026Papers } from "./nature-2026-data";
import { iclr2026Papers, neurips2026Papers, eccv2026Papers } from "./new-conference-data";

export type LibraryPaper = {
  id: string;
  title: string;
  authors: string;
  source: string;
  href: string;
  pdfUrl?: string;
  tags: string[];
  abstractZh: string;
  relevance: string;
  limitation?: string;
  introZh?: string;
  grade: "A" | "B" | "追踪";
  action?: string;
  collection: string;
  publishedLabel: string;
};

function slugPart(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function digestPaperId(paper: DigestPaper) {
  const arxivId = paper.href.match(/arxiv\.org\/abs\/([^/?#]+)/)?.[1];
  if (arxivId) return `arxiv-${arxivId.replace(/\./g, "-")}`;
  const doiTail = paper.href.match(/(?:doi\.org\/)(.+)$/)?.[1];
  if (doiTail) return `doi-${slugPart(decodeURIComponent(doiTail))}`;
  return `brief-${slugPart(paper.title).slice(0, 72)}`;
}

export function venuePaperId(paper: ConferencePaper) {
  return `${slugPart(paper.conference)}-${paper.year}-${slugPart(paper.id)}`;
}

function pdfFromHref(href: string) {
  if (/\.pdf(?:$|[?#])/i.test(href)) return href;
  if (href.includes("arxiv.org/abs/")) return href.replace("/abs/", "/pdf/");
  if (href.includes("openreview.net/forum?")) return href.replace("/forum?", "/pdf?");
  if (href.includes("openaccess.thecvf.com") && href.includes("/html/")) {
    return href.replace("/html/", "/papers/").replace(/_paper\.html$/, "_paper.pdf");
  }
  return undefined;
}

const digestLibrary: LibraryPaper[] = digests.flatMap((digest) =>
  digest.papers.map((paper) => ({
    id: digestPaperId(paper),
    title: paper.title,
    authors: paper.authors,
    source: paper.source,
    href: paper.href,
    pdfUrl: pdfFromHref(paper.href),
    tags: paper.tags,
    abstractZh: paper.abstractZh,
    relevance: paper.relevance,
    limitation: paper.limitation,
    grade: paper.grade,
    action: paper.action,
    collection: "脑解码论文简报",
    publishedLabel: digest.date,
  })),
);

function fromVenue(paper: ConferencePaper): LibraryPaper {
  return {
    id: venuePaperId(paper),
    title: paper.title,
    authors: paper.authors,
    source: paper.source,
    href: paper.href,
    pdfUrl: pdfFromHref(paper.href) ?? (paper.review ? pdfFromHref(paper.review) : undefined) ?? (paper.preprint ? pdfFromHref(paper.preprint) : undefined),
    tags: paper.tags,
    abstractZh: paper.abstractZh,
    relevance: paper.relevance,
    limitation: paper.limitation,
    introZh: paper.introZh,
    grade: paper.level,
    collection: paper.conference,
    publishedLabel: String(paper.year),
  };
}

const venueLibrary = [...nature2026Papers, ...cvpr2026Papers, ...icml2026Papers, ...iclr2026Papers, ...neurips2026Papers, ...eccv2026Papers].map(fromVenue);

export const paperLibrary: LibraryPaper[] = [...digestLibrary, ...venueLibrary].filter(
  (paper, index, papers) => papers.findIndex((candidate) => candidate.id === paper.id) === index,
);

export function getLibraryPaper(id: string) {
  return paperLibrary.find((paper) => paper.id === id);
}

export function paperReadingHref(id: string) {
  return `/papers/${id}`;
}
