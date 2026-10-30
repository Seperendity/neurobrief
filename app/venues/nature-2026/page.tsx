"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { nature2026Papers } from "../../nature-2026-data";
import { ThemeToggle } from "../../theme-toggle";
import { paperReadingHref, venuePaperId } from "../../paper-library";

const themeGroups = [
  { label: "全部", tags: [] },
  { label: "Nature 正刊", venues: ["Nature"] },
  { label: "Nature Neuroscience", venues: ["Nature Neuroscience"] },
  { label: "Nature Machine Intelligence", venues: ["Nature Machine Intelligence"] },
  { label: "多模态解码", tags: ["brain-to-text", "视觉解码", "多模态", "多模态对齐", "语义空间"] },
  { label: "模型驱动发现", tags: ["机制发现", "数字孪生", "闭环实验", "可解释模型", "神经表征"] },
  { label: "数据与观点", venues: ["Scientific Data"], tags: ["观点文章"] },
];

export default function Nature2026Page() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("全部");

  const papers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const selected = themeGroups.find((group) => group.label === theme) ?? themeGroups[0];
    return nature2026Papers.filter((paper) => {
      const venueMatch = selected.venues?.includes(paper.conference) ?? false;
      const tagMatch = selected.tags?.some((tag) => paper.tags.includes(tag)) ?? false;
      const matchesTheme = selected.label === "全部" || venueMatch || tagMatch;
      const haystack = [paper.title, paper.authors, paper.conference, paper.introZh, paper.abstractZh, paper.relevance, ...paper.tags].join(" ").toLowerCase();
      return matchesTheme && (!needle || haystack.includes(needle));
    });
  }, [query, theme]);

  return (
    <main className="conferencePage naturePage">
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand brandLink" href="/"><span className="brandmark">N</span><div><strong>NeuroDecode Brief</strong><small>脑解码论文简报</small></div></Link>
          <nav className="topnav" aria-label="专题导航"><Link href="/conferences/cvpr-2026">CVPR 2026</Link><Link href="/conferences/icml-2026">ICML 2026</Link><Link href="/reading-list">我的阅读</Link></nav>
          <div className="headerActions"><ThemeToggle /><Link className="backLink" href="/">← 返回简报首页</Link></div>
        </div>
      </header>

      <div className="conferencePageShell">
        <nav className="breadcrumb" aria-label="面包屑"><Link href="/">精选期刊与顶会专题</Link><span>/</span><strong>Nature Portfolio 2026</strong></nav>

        <section className="conferenceHero">
          <div>
            <p className="eyebrow">NATURE PORTFOLIO 2026 · CURATED NEUROSCIENCE PAPERS</p>
            <h1>Nature Portfolio 2026 × 脑科学</h1>
            <p>这是站内筛选后的年度专题库。优先收录 Nature 正刊、Nature Neuroscience 与 Nature Machine Intelligence，并仅补充与统一脑编解码、多模态对齐、生成式神经解码、跨被试泛化或模型驱动神经发现直接相关的其他 Nature Portfolio 论文。</p>
          </div>
          <div className="conferenceCount"><strong>{nature2026Papers.length}</strong><span>篇已核实收录</span><small>A 级 {nature2026Papers.filter((paper) => paper.level === "A").length} 篇 · B 级 {nature2026Papers.filter((paper) => paper.level === "B").length} 篇</small></div>
        </section>

        <section className="conferenceScope">
          <div><strong>收录口径</strong><span>2026 年 Nature Portfolio 官方论文页 + 与你的核心研究方向直接相关</span></div>
          <div><strong>排除</strong><span>一般临床分类、睡眠分期、情绪识别、纯结构影像及仅有宽泛 AI 连接的工作</span></div>
          <div><strong>更新方式</strong><span>年度专题只在你明确要求时集中回查；不随三天一期的简报自动改动</span></div>
        </section>

        <div className="conferenceToolbar">
          <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、作者、期刊、脑信号、模型或研究关系" /></label>
          <div className="themeFilters" role="group" aria-label="主题筛选">
            {themeGroups.map((group) => <button key={group.label} className={theme === group.label ? "active" : ""} onClick={() => setTheme(group.label)}>{group.label}</button>)}
          </div>
        </div>

        <div className="conferenceResultsHeader"><div><p className="eyebrow">CURATED PAPERS</p><h2>筛选结果</h2></div><span>{papers.length} / {nature2026Papers.length} 篇</span></div>

        <section className="conferenceArchiveList">
          {papers.map((paper, index) => (
            <article className="conferenceArchiveCard" key={paper.id}>
              <div className="conferenceCardIndex"><span>{String(index + 1).padStart(2, "0")}</span><strong>{paper.level}</strong></div>
              <div className="conferenceCardBody">
                <div className="conferenceMeta"><span>{paper.conference} · 2026</span><span>{paper.level === "A" ? "直接命中核心主题" : "明确方法连接"}</span></div>
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
                <div className="conferenceLinks"><Link className="readLink primaryReadLink" href={paperReadingHref(venuePaperId(paper))}>网页内阅读 →</Link><a className="readLink" href={paper.href} target="_blank" rel="noreferrer">Nature 官方原文 ↗</a></div>
              </div>
            </article>
          ))}
          {papers.length === 0 && <div className="empty">当前条件下没有论文，请清除关键词或切换主题。</div>}
        </section>

        <section className="conferenceMethodNote">
          <p className="eyebrow">EDITORIAL NOTE</p>
          <h2>这个专题如何维护</h2>
          <p>所有条目均回到 Nature 官方论文页核对标题、发表日期、文章类型和摘要。专题不以“属于 Nature Portfolio”作为质量保证，而是按与你的研究方向的直接相关性分为 A/B 两级。同一工作如存在预印本与正式期刊版，专题只保留正式版本。年度期刊与顶会专题仅在你明确要求时更新；三天一期的常规简报仍会独立检索新发表的 Nature 论文。</p>
        </section>
      </div>

      <footer>NeuroDecode Brief · Nature Portfolio 2026 脑科学专题</footer>
    </main>
  );
}
