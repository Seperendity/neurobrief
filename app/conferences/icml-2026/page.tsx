"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { icml2026Papers } from "../../conference-data";
import { ThemeToggle } from "../../theme-toggle";
import { paperReadingHref, venuePaperId } from "../../paper-library";

const themeGroups = [
  { label: "全部主题", tags: [] },
  { label: "统一基础模型", tags: ["基础模型", "统一预训练", "统一模型", "多模态"] },
  { label: "脑到视觉/语言", tags: ["brain-to-text", "视觉解码", "图像到脑信号"] },
  { label: "跨被试与迁移", tags: ["跨数据集", "跨范式", "少样本", "数据效率"] },
  { label: "生成与合成", tags: ["条件生成", "扩散模型", "生成模型"] },
  { label: "神经机制发现", tags: ["机制发现", "神经表征", "脑编码"] },
];

export default function Icml2026Page() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("全部主题");

  const papers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const selected = themeGroups.find((group) => group.label === theme) ?? themeGroups[0];
    return icml2026Papers.filter((paper) => {
      const matchesTheme = selected.tags.length === 0 || paper.tags.some((tag) => selected.tags.includes(tag));
      const haystack = [paper.title, paper.authors, paper.introZh, paper.abstractZh, paper.relevance, ...paper.tags].join(" ").toLowerCase();
      return matchesTheme && (!needle || haystack.includes(needle));
    });
  }, [query, theme]);

  return (
    <main className="conferencePage icmlPage">
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand brandLink" href="/"><span className="brandmark">N</span><div><strong>NeuroDecode Brief</strong><small>脑解码论文简报</small></div></Link>
          <nav className="topnav" aria-label="专题导航"><Link href="/conferences/cvpr-2026">CVPR 2026</Link><Link href="/conferences/icml-2026" aria-current="page">ICML 2026</Link><Link href="/reading-list">我的阅读</Link></nav>
          <div className="headerActions"><ThemeToggle /><Link className="backLink" href="/">← 返回简报首页</Link></div>
        </div>
      </header>

      <div className="conferencePageShell">
        <nav className="breadcrumb" aria-label="面包屑"><Link href="/">精选期刊与顶会专题</Link><span>/</span><strong>ICML 2026</strong></nav>

        <section className="conferenceHero">
          <div>
            <p className="eyebrow">ICML 2026 · CURATED NEUROSCIENCE PAPERS</p>
            <h1>ICML 2026 × 脑科学</h1>
            <p>这是站内筛选后的年度专题库，不是官方论文列表的跳转页。当前只保留与统一脑基础模型、脑信号到图像/文本、跨被试泛化、可控生成或模型驱动神经科学发现直接相关的主会论文。</p>
          </div>
          <div className="conferenceCount"><strong>{icml2026Papers.length}</strong><span>篇已核实收录</span><small>A 级 {icml2026Papers.filter((paper) => paper.level === "A").length} 篇 · B 级 {icml2026Papers.filter((paper) => paper.level === "B").length} 篇</small></div>
        </section>

        <section className="conferenceScope">
          <div><strong>收录口径</strong><span>ICML 2026 主会录用 + 与核心研究方向直接相关</span></div>
          <div><strong>排除</strong><span>工作坊单列、纯临床分类、一般生理信号、仅有宽泛“AI + 脑”连接的论文</span></div>
          <div><strong>更新方式</strong><span>仅在专题维护时回查官方主会列表；不随三天一期的论文简报自动改动</span></div>
        </section>

        <div className="conferenceToolbar">
          <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、作者、脑信号、模型或研究关系" /></label>
          <div className="themeFilters" role="group" aria-label="主题筛选">
            {themeGroups.map((group) => <button key={group.label} className={theme === group.label ? "active" : ""} onClick={() => setTheme(group.label)}>{group.label}</button>)}
          </div>
        </div>

        <div className="conferenceResultsHeader"><div><p className="eyebrow">CURATED PAPERS</p><h2>筛选结果</h2></div><span>{papers.length} / {icml2026Papers.length} 篇</span></div>

        <section className="conferenceArchiveList">
          {papers.map((paper, index) => (
            <article className="conferenceArchiveCard" key={paper.id}>
              <div className="conferenceCardIndex"><span>{String(index + 1).padStart(2, "0")}</span><strong>{paper.level}</strong></div>
              <div className="conferenceCardBody">
                <div className="conferenceMeta"><span>ICML 2026</span><span>{paper.level === "A" ? "直接命中核心主题" : "明确方法连接"}</span></div>
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
                  <a className="readLink" href={paper.href} target="_blank" rel="noreferrer">OpenReview 原文 ↗</a>
                  {paper.preprint && <a className="readLink secondary" href={paper.preprint} target="_blank" rel="noreferrer">arXiv 版本 ↗</a>}
                </div>
              </div>
            </article>
          ))}
          {papers.length === 0 && <div className="empty">当前条件下没有论文，请清除关键词或切换主题。</div>}
        </section>

        <section className="conferenceMethodNote">
          <p className="eyebrow">EDITORIAL NOTE</p>
          <h2>这个专题如何维护</h2>
          <p>ICML 论文只有在确认主会身份且通过主题筛选后才进入本页；同一工作出现 arXiv、OpenReview 和正式论文集版本时合并为一条，并优先保留最新或正式版本。顶会专题仅在你明确要求时集中回查和更新，不纳入每三天一次的日常论文简报流程。</p>
        </section>
      </div>

      <footer>NeuroDecode Brief · ICML 2026 脑科学专题</footer>
    </main>
  );
}
