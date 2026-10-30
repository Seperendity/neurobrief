"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ThemeToggle } from "../../theme-toggle";
import { getLibraryPaper, paperLibrary, paperReadingHref } from "../../paper-library";
import { useReadingLibrary } from "../../reading-state";

type ReaderMode = "guide" | "pdf";

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy unavailable");
}

export default function PaperReaderPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const paper = getLibraryPaper(id);
  const paperIndex = paper ? paperLibrary.findIndex((item) => item.id === paper.id) : -1;
  const previousPaper = paperIndex > 0 ? paperLibrary[paperIndex - 1] : undefined;
  const nextPaper = paperIndex >= 0 && paperIndex < paperLibrary.length - 1 ? paperLibrary[paperIndex + 1] : undefined;
  const { library, update } = useReadingLibrary();
  const state = paper ? library[paper.id] ?? {} : {};
  const [mode, setMode] = useState<ReaderMode>("guide");
  const [fontScale, setFontScale] = useState(1);
  const [activeSection, setActiveSection] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [copyState, setCopyState] = useState("复制引用");

  const sections = useMemo(() => {
    if (!paper) return [];
    return [
      paper.introZh ? { id: "overview", label: "论文概览" } : null,
      { id: "abstract", label: "中文摘要" },
      { id: "relevance", label: "研究关系" },
      paper.limitation ? { id: "limitation", label: "局限与核查" } : null,
      { id: "source", label: "来源与原文" },
    ].filter((section): section is { id: string; label: string } => Boolean(section));
  }, [paper]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "guide") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [mode, sections]);

  if (!paper) {
    return (
      <main className="readerPage readerNotFound">
        <p className="eyebrow">PAPER NOT FOUND</p>
        <h1>没有找到这篇论文</h1>
        <p>该论文可能已被合并、改名或从专题中移除。</p>
        <Link className="primaryTextLink" href="/">返回论文简报</Link>
      </main>
    );
  }

  const citation = `${paper.authors}. ${paper.title}. ${paper.source}. ${paper.href}`;
  const readerStyle = { "--reader-scale": fontScale } as CSSProperties;

  const copyCitation = async () => {
    try {
      await copyText(citation);
      setCopyState("已复制");
      window.setTimeout(() => setCopyState("复制引用"), 1800);
    } catch {
      setCopyState("复制失败");
    }
  };

  return (
    <main className="readerPage" style={readerStyle}>
      <div className="readingProgress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <header className="topbar readerTopbar">
        <div className="topbarInner">
          <Link className="brand brandLink" href="/"><span className="brandmark">N</span><div><strong>NeuroDecode Brief</strong><small>论文阅读模式</small></div></Link>
          <nav className="topnav" aria-label="阅读导航"><Link href="/">论文简报</Link><Link href="/reading-list">我的阅读</Link></nav>
          <div className="headerActions"><ThemeToggle /><Link className="backLink" href="/">← 返回首页</Link></div>
        </div>
      </header>

      <div className="readerShell">
        <nav className="breadcrumb" aria-label="面包屑"><Link href="/">论文简报</Link><span>/</span><span>{paper.collection}</span><span>/</span><strong>阅读</strong></nav>

        <article className="readerArticle">
          <header className="readerHero">
            <div className="readerKicker"><span className={`grade grade-${paper.grade}`}>{paper.grade}</span><span>{paper.collection} · {paper.publishedLabel}</span>{paper.action && <span>{paper.action}</span>}</div>
            <h1>{paper.title}</h1>
            <p className="readerAuthors">{paper.authors}</p>
            <p className="readerSource">{paper.source}</p>
            <div className="tags">{paper.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="readerActions" aria-label="论文操作">
              <button className={state.favorite ? "active" : ""} aria-pressed={Boolean(state.favorite)} onClick={() => update(paper.id, "favorite")}>{state.favorite ? "★ 已收藏" : "☆ 收藏"}</button>
              <button className={state.later ? "active" : ""} aria-pressed={Boolean(state.later)} onClick={() => update(paper.id, "later")}>{state.later ? "✓ 已加入稍后读" : "＋ 稍后读"}</button>
              <button className={state.read ? "active" : ""} aria-pressed={Boolean(state.read)} onClick={() => update(paper.id, "read")}>{state.read ? "✓ 已读" : "○ 标记已读"}</button>
              <button onClick={copyCitation}>{copyState}</button>
              <a href={paper.href} target="_blank" rel="noreferrer">官方原文 ↗</a>
            </div>
          </header>

          <div className="readerModeBar">
            <div role="tablist" aria-label="阅读模式">
              <button role="tab" aria-selected={mode === "guide"} className={mode === "guide" ? "active" : ""} onClick={() => setMode("guide")}>中文导读</button>
              <button role="tab" aria-selected={mode === "pdf"} className={mode === "pdf" ? "active" : ""} disabled={!paper.pdfUrl} onClick={() => paper.pdfUrl && setMode("pdf")}>原文 PDF {!paper.pdfUrl && "· 暂不可嵌入"}</button>
            </div>
            {mode === "guide" && <div className="fontControls" aria-label="正文字号"><span>字号</span><button aria-label="减小字号" onClick={() => setFontScale((value) => Math.max(.9, value - .1))}>A−</button><button aria-label="默认字号" onClick={() => setFontScale(1)}>A</button><button aria-label="增大字号" onClick={() => setFontScale((value) => Math.min(1.25, value + .1))}>A＋</button></div>}
          </div>

          {mode === "guide" ? (
            <div className="readerGrid">
              <aside className="readerToc">
                <p className="eyebrow">ON THIS PAGE</p>
                <strong>阅读目录</strong>
                <nav>{sections.map((section) => <a key={section.id} className={activeSection === section.id ? "active" : ""} href={`#${section.id}`}>{section.label}</a>)}</nav>
                <div className="readerTocProgress"><span>{progress}%</span><small>页面进度</small></div>
              </aside>

              <div className="readerContent">
                {paper.introZh && <section id="overview" className="readerSection readerLead"><p className="eyebrow">OVERVIEW</p><h2>论文概览</h2><p>{paper.introZh}</p></section>}
                <section id="abstract" className="readerSection"><p className="eyebrow">ABSTRACT</p><h2>中文摘要</h2><p>{paper.abstractZh}</p></section>
                <section id="relevance" className="readerSection readerInsight"><p className="eyebrow">RESEARCH RELEVANCE</p><h2>与你研究的关系</h2><p>{paper.relevance}</p></section>
                {paper.limitation && <section id="limitation" className="readerSection readerCaution"><p className="eyebrow">LIMITATIONS</p><h2>局限与核查重点</h2><p>{paper.limitation}</p></section>}
                <section id="source" className="readerSection readerSourceSection"><p className="eyebrow">SOURCE</p><h2>来源与原文</h2><p>{paper.source}</p><p className="citationPreview">{citation}</p><div><button onClick={copyCitation}>{copyState}</button><a href={paper.href} target="_blank" rel="noreferrer">访问官方原文 ↗</a></div></section>
              </div>
            </div>
          ) : (
            <section className="pdfReader" aria-label="原文 PDF 阅读器">
              <div className="pdfReaderNotice"><span>正在站内显示开放获取 PDF</span><a href={paper.pdfUrl} target="_blank" rel="noreferrer">若无法显示，请在新窗口打开 ↗</a></div>
              <iframe src={`${paper.pdfUrl}#view=FitH&navpanes=1`} title={`${paper.title} PDF`} />
            </section>
          )}

          <nav className="paperSequence" aria-label="上一篇和下一篇论文">
            {previousPaper ? <Link href={paperReadingHref(previousPaper.id)}><span>← 上一篇</span><strong>{previousPaper.title}</strong></Link> : <span />}
            {nextPaper ? <Link href={paperReadingHref(nextPaper.id)}><span>下一篇 →</span><strong>{nextPaper.title}</strong></Link> : <span />}
          </nav>
        </article>
      </div>
      <footer>阅读状态仅保存在当前浏览器 · 暂未启用 AI 问答</footer>
    </main>
  );
}
