"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cvpr2026Papers } from "../../conference-data";
import { ThemeToggle } from "../../theme-toggle";
import { paperReadingHref, venuePaperId } from "../../paper-library";

const themeGroups = [
  { label: "全部主题", tags: [] },
  { label: "统一编解码", tags: ["统一编解码", "基础模型", "多模态数据集", "EEG–fMRI"] },
  { label: "图像/视频/3D", tags: ["brain-to-image", "brain-to-video", "brain-to-3D", "生成式解码"] },
  { label: "跨被试泛化", tags: ["跨被试", "跨扫描仪", "测试时适配", "领域泛化"] },
  { label: "fMRI", tags: ["fMRI"] },
  { label: "EEG", tags: ["EEG", "EEG/MEG", "EEG–fMRI"] },
];

export default function Cvpr2026Page() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("全部主题");

  const papers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const selected = themeGroups.find((group) => group.label === theme) ?? themeGroups[0];
    return cvpr2026Papers.filter((paper) => {
      const matchesTheme = selected.tags.length === 0 || paper.tags.some((tag) => selected.tags.some((wanted) => tag.includes(wanted)));
      const haystack = [paper.title, paper.authors, paper.introZh, paper.abstractZh, paper.relevance, ...paper.tags].join(" ").toLowerCase();
      return matchesTheme && (!needle || haystack.includes(needle));
    });
  }, [query, theme]);

  return (
    <main className="conferencePage cvprPage">
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand brandLink" href="/"><span className="brandmark">N</span><div><strong>NeuroDecode Brief</strong><small>脑解码论文简报</small></div></Link>
          <nav className="topnav" aria-label="专题导航"><Link href="/conferences/cvpr-2026" aria-current="page">CVPR 2026</Link><Link href="/conferences/icml-2026">ICML 2026</Link><Link href="/reading-list">我的阅读</Link></nav>
          <div className="headerActions"><ThemeToggle /><Link className="backLink" href="/">← 返回简报首页</Link></div>
        </div>
      </header>

      <div className="conferencePageShell">
        <nav className="breadcrumb" aria-label="面包屑"><Link href="/">精选期刊与顶会专题</Link><span>/</span><strong>CVPR 2026</strong></nav>

        <section className="conferenceHero">
          <div>
            <p className="eyebrow">CVPR 2026 · CURATED NEUROSCIENCE PAPERS</p>
            <h1>CVPR 2026 × 脑科学</h1>
            <p>先以 fMRI、EEG、MEG、ECoG、brain decoding、neural representation 等关键词召回，再逐篇核查方法与实验；只保留与统一脑编解码、脑信号到图像/视频/三维内容、跨被试泛化、多模态生成或模型驱动神经科学发现直接相关的主会论文。</p>
          </div>
          <div className="conferenceCount"><strong>{cvpr2026Papers.length}</strong><span>篇已核实收录</span><small>A 级 {cvpr2026Papers.filter((paper) => paper.level === "A").length} 篇 · B 级 {cvpr2026Papers.filter((paper) => paper.level === "B").length} 篇</small></div>
        </section>

        <section className="conferenceScope">
          <div><strong>来源</strong><span>CVPR 2026 主会论文 + CVF Open Access 原文核查</span></div>
          <div><strong>筛选</strong><span>关键词只负责召回，最终依据研究问题、脑信号模态、模型和实验相关性逐篇判断</span></div>
          <div><strong>更新方式</strong><span>仅在专题维护时集中回查；不随三天一期的论文简报自动改动</span></div>
        </section>

        <div className="conferenceToolbar">
          <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、作者、fMRI、EEG、模型或研究关系" /></label>
          <div className="themeFilters" role="group" aria-label="主题筛选">
            {themeGroups.map((group) => <button key={group.label} className={theme === group.label ? "active" : ""} onClick={() => setTheme(group.label)}>{group.label}</button>)}
          </div>
        </div>

        <div className="conferenceResultsHeader"><div><p className="eyebrow">CURATED PAPERS</p><h2>筛选结果</h2></div><span>{papers.length} / {cvpr2026Papers.length} 篇</span></div>

        <section className="conferenceArchiveList">
          {papers.map((paper, index) => (
            <article className="conferenceArchiveCard" key={paper.id}>
              <div className="conferenceCardIndex"><span>{String(index + 1).padStart(2, "0")}</span><strong>{paper.level}</strong></div>
              <div className="conferenceCardBody">
                <div className="conferenceMeta"><span>CVPR 2026</span><span>{paper.level === "A" ? "直接命中核心主题" : "明确方法连接"}</span></div>
                <h2><Link href={paperReadingHref(venuePaperId(paper))}>{paper.title}</Link></h2>
                <p className="authors">{paper.authors}</p>
                <p className="source">{paper.source}</p>
                <div className="tags">{paper.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className="paperIntro">{paper.introZh}</p>
                <details>
                  <summary>展开中文摘要与研究解读</summary>
                  <div className="abstractBlock"><strong>中文摘要</strong><p>{paper.abstractZh}</p></div>
                  <div className="relevance"><strong>与你研究的关系</strong><p>{paper.relevance}</p></div>
                  <div className="limitation"><strong>局限与核查重点</strong><p>{paper.limitation}</p></div>
                </details>
                <div className="conferenceLinks">
                  <Link className="readLink primaryReadLink" href={paperReadingHref(venuePaperId(paper))}>网页内阅读 →</Link>
                  <a className="readLink" href={paper.href} target="_blank" rel="noreferrer">CVF 会议原文 ↗</a>
                  {paper.preprint && <a className="readLink secondary" href={paper.preprint} target="_blank" rel="noreferrer">预印本 ↗</a>}
                </div>
              </div>
            </article>
          ))}
          {papers.length === 0 && <div className="empty">当前条件下没有论文，请清除关键词或切换主题。</div>}
        </section>

        <section className="conferenceMethodNote">
          <p className="eyebrow">EDITORIAL NOTE</p>
          <h2>筛选不是简单关键词匹配</h2>
          <p>fMRI、EEG 等关键词用于扩大召回范围；收录前仍要确认论文是否真正处理脑信号，并与统一模型、生成式解码、跨被试迁移或神经表征发现存在直接连接。纯临床诊断、一般生理信号分类和宽泛的“AI + 脑”工作不纳入本页。</p>
        </section>
      </div>

      <footer>NeuroDecode Brief · CVPR 2026 脑科学专题</footer>
    </main>
  );
}
