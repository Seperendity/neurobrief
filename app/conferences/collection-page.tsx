"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ConferencePaper } from "../conference-data";
import { ThemeToggle } from "../theme-toggle";
import { paperReadingHref, venuePaperId } from "../paper-library";

const themes = [
  { label: "全部主题", terms: [] },
  { label: "基础模型与统一建模", terms: ["基础模型", "预训练", "统一", "自监督"] },
  { label: "脑到视觉 / 语言", terms: ["视觉解码", "brain-to", "重建", "文本解码"] },
  { label: "跨被试与迁移", terms: ["跨被试", "泛化", "迁移", "少样本"] },
  { label: "神经表征与机制", terms: ["表征", "编码", "机制", "神经动力学"] },
];
const modalities = ["全部模态", "fMRI", "EEG", "MEG", "ECoG / 其他"];

export function ConferenceCollectionPage({ name, papers, description }: { name: string; papers: ConferencePaper[]; description: string }) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("全部主题");
  const [modality, setModality] = useState("全部模态");
  const filtered = useMemo(() => papers.filter((paper) => {
    const text = [paper.title, paper.authors, paper.introZh, paper.abstractZh, ...paper.tags].join(" ").toLowerCase();
    const selected = themes.find((item) => item.label === theme) ?? themes[0];
    const signals = paper.tags.join(" ");
    const matchesModality = modality === "全部模态" || (modality === "ECoG / 其他"
      ? /ecog|seeg|颅内|单神经元|神经群体|spike|动物|钙成像/i.test(signals) || !/fmri|eeg|meg/i.test(signals)
      : signals.toLowerCase().includes(modality.toLowerCase()));
    return text.includes(query.trim().toLowerCase()) && matchesModality && (!selected.terms.length || selected.terms.some((term) => text.includes(term.toLowerCase())));
  }), [papers, query, theme, modality]);

  return <main className={`conferencePage ${name.toLowerCase()}Page`}>
    <header className="topbar"><div className="topbarInner">
      <Link className="brand brandLink" href="/"><span className="brandmark">N</span><div><strong>NeuroDecode Brief</strong><small>脑解码论文简报</small></div></Link>
      <nav className="topnav" aria-label="专题导航">
        {["ICLR", "NeurIPS", "ECCV"].map((venue) => <Link key={venue} href={`/conferences/${venue.toLowerCase()}-2026`} aria-current={name === venue ? "page" : undefined}>{venue} 2026</Link>)}
        <Link href="/#venues">全部专题</Link>
      </nav>
      <div className="headerActions"><ThemeToggle /><Link className="backLink" href="/">← 返回首页</Link></div>
    </div></header>
    <div className="conferencePageShell">
      <nav className="breadcrumb" aria-label="面包屑"><Link href="/#venues">精选期刊与顶会专题</Link><span>/</span><strong>{name} 2026</strong></nav>
      <section className="conferenceHero">
        <div><p className="eyebrow">{name.toUpperCase()} 2026 · BRAIN SCIENCE</p><h1>{name} 2026 × 脑科学</h1><p>{description}</p></div>
        <div className="conferenceCount"><strong>{papers.length}</strong><span>篇脑科学论文</span><small>更新于 2026.10.20 · 主会录用</small></div>
      </section>
      <div className="conferenceToolbar">
        <label><span aria-hidden="true">⌕</span><input aria-label="搜索专题论文" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、作者、脑信号或方法" /></label>
        <div className="themeFilters" role="group" aria-label="脑信号模态">{modalities.map((item) => <button key={item} className={modality === item ? "active" : ""} aria-pressed={modality === item} onClick={() => setModality(item)}>{item}</button>)}</div>
        <div className="themeFilters" role="group" aria-label="主题筛选">{themes.map((item) => <button key={item.label} className={theme === item.label ? "active" : ""} aria-pressed={theme === item.label} onClick={() => setTheme(item.label)}>{item.label}</button>)}</div>
      </div>
      <div className="conferenceResultsHeader"><div><p className="eyebrow">CURATED PAPERS</p><h2>脑科学论文</h2></div><span>{filtered.length} / {papers.length} 篇</span></div>
      <section className="conferenceArchiveList">{filtered.map((paper, index) => <article className="conferenceArchiveCard" key={paper.id}>
        <div className="conferenceCardIndex"><span>{String(index + 1).padStart(2, "0")}</span><strong>{paper.level}</strong></div>
        <div className="conferenceCardBody">
          <div className="conferenceMeta"><span>{name} 2026</span><span>{paper.level === "A" ? "重点阅读" : "方法与表征"}</span></div>
          <h2><Link href={paperReadingHref(venuePaperId(paper))}>{paper.title}</Link></h2>
          <p className="authors">{paper.authors}</p><p className="source">{paper.source}</p>
          <div className="tags">{paper.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p className="paperIntro">{paper.introZh}</p>
          <div className="abstractBlock"><strong>完整中文摘要</strong><p>{paper.abstractZh}</p></div>
          <details><summary>研究关系与局限</summary>
            <div className="relevance"><strong>与你研究的关系</strong><p>{paper.relevance}</p></div>
            <div className="limitation"><strong>局限与核查重点</strong><p>{paper.limitation}</p></div>
          </details>
          <div className="conferenceLinks"><Link className="readLink primaryReadLink" href={paperReadingHref(venuePaperId(paper))}>网页内阅读 →</Link><a className="readLink" href={paper.href} target="_blank" rel="noreferrer">会议原文 ↗</a>{paper.review && <a className="readLink secondary" href={paper.review} target="_blank" rel="noreferrer">OpenReview ↗</a>}{paper.preprint && <a className="readLink secondary" href={paper.preprint} target="_blank" rel="noreferrer">预印本 ↗</a>}</div>
        </div>
      </article>)}{!filtered.length && <div className="empty">当前条件下没有论文，请切换模态、主题或清除关键词。</div>}</section>
      <section className="conferenceMethodNote"><p className="eyebrow">ABOUT THIS COLLECTION</p><h2>围绕真实脑信号与神经表征</h2><p>收录以真实脑记录或神经表征为研究对象的主会论文，优先 fMRI 与含 fMRI 的多模态工作，再展示 EEG、MEG 等相关研究。论文分级表示本站阅读建议，不代表会议奖项。专题按需维护，预印本与会议版本合并展示。</p></section>
    </div><footer>NeuroDecode Brief · {name} 2026 脑科学专题</footer>
  </main>;
}
