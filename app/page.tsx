"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { featuredConferencePapers } from "./conference-data";
import { iclr2026Papers, neurips2026Papers, eccv2026Papers } from "./new-conference-data";
import { nature2026Papers } from "./nature-2026-data";
import { DigestArchive } from "./digest-archive";
import { ThemeToggle } from "./theme-toggle";
import { digests } from "./digest-data";
import { digestPaperId, paperReadingHref, venuePaperId } from "./paper-library";


const conferenceHubs = [
  { name: "领域发展", label: "统一多模态脑编解码", status: "2005–2026 · 5 阶段", href: "/topics/neural-decoding-evolution" },
  { name: "Nature", label: "正刊及相关子刊", status: "2026 · 16 篇", href: "/venues/nature-2026" },
  { name: "CVPR", label: "计算机视觉", status: "2026 · 17 篇", href: "/conferences/cvpr-2026" },
  { name: "ICLR", label: "脑表征与基础模型", status: `2026 · ${iclr2026Papers.length} 篇`, href: "/conferences/iclr-2026" },
  { name: "ICML", label: "机器学习", status: "2026 · 24 篇", href: "/conferences/icml-2026" },
  { name: "NeurIPS", label: "脑建模与神经表征", status: `2026 · ${neurips2026Papers.length} 篇`, href: "/conferences/neurips-2026" },
  { name: "ECCV", label: "脑到视觉与视频", status: `2026 · ${eccv2026Papers.length} 篇`, href: "/conferences/eccv-2026" },
];

const featuredVenuePapers = [
  ...featuredConferencePapers,
  ...iclr2026Papers.filter((paper) => paper.level === "A"),
  ...neurips2026Papers.filter((paper) => paper.level === "A"),
  ...eccv2026Papers.filter((paper) => paper.level === "A"),
  ...nature2026Papers.filter((paper) => paper.level === "A"),
];

const topicGroups = [
  { label: "全部主题", terms: [] },
  { label: "统一基础模型", terms: ["基础模型", "多模态", "缺失模态", "对比学习", "多尺度表征"] },
  { label: "脑到图像 / 文本 / 视频", terms: ["CLIP", "文本对齐", "脑激活图", "brain-to-image", "brain-to-text", "brain-to-video"] },
  { label: "跨被试泛化", terms: ["跨被试", "跨 session", "分布对齐", "LoRA"] },
  { label: "可控生成", terms: ["可控生成", "扩散编辑", "条件生成"] },
  { label: "模型驱动发现", terms: ["机制发现", "神经表征", "鲁棒表征"] },
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(digests[0].date);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("全部主题");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const digest = digests.find((d) => d.date === selectedDate) ?? digests[0];
  const featuredPaper = featuredVenuePapers[featuredIndex] ?? featuredVenuePapers[0];
  // Older issues use their paper-level findings, never the retrieval audit paragraph.
  const readingHighlights = digest.readingHighlights ?? digest.papers.slice(0, 3).map((paper) => ({
    title: paper.title,
    text: paper.relevance.replace(/^论文事实[：:]\s*/, "").split(/研究推断[：:]/)[0].trim(),
  }));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setFeaturedIndex(Math.floor(Math.random() * featuredVenuePapers.length));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const papers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const selectedTopic = topicGroups.find((group) => group.label === tag) ?? topicGroups[0];
    return digest.papers.filter((paper) => {
      const haystack = [paper.title, paper.authors, paper.abstractZh, paper.relevance, ...paper.tags].join(" ").toLowerCase();
      const matchesTopic = selectedTopic.terms.length === 0 || selectedTopic.terms.some((term) => haystack.includes(term.toLowerCase()));
      return matchesTopic && (!needle || haystack.includes(needle));
    });
  }, [digest, query, tag]);

  return (
    <main>
      <a className="skipLink" href="#latest">跳到最新简报</a>
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand brandLink" href="/">
            <span className="brandmark">N</span>
            <div><strong>NeuroDecode Brief</strong><small>脑解码论文简报</small></div>
          </Link>
          <nav className="topnav" aria-label="主导航">
            <a href="#latest">最新简报</a>
            <a href="#venues">期刊与顶会</a>
            <Link href="/topics/neural-decoding-evolution">领域发展</Link>
            <Link href="/reading-list">我的阅读</Link>
          </nav>
          <div className="headerActions">
            <ThemeToggle />
            <span className="status"><i /> 每3天更新 · 北京时间 08:30</span>
          </div>
        </div>
      </header>

      <div className="shell">
        <aside className="archive">
          <DigestArchive selectedDate={selectedDate} onSelect={(date) => { setSelectedDate(date); setTag("全部主题"); setQuery(""); }} />
          <div className="asideVenues">
            <p className="eyebrow">YEARLY COLLECTIONS</p>
            <strong>专题阅读</strong>
            <Link href="/topics/neural-decoding-evolution"><span>领域发展</span><small>5 阶段</small></Link>
            <Link href="/venues/nature-2026"><span>Nature Portfolio</span><small>16 篇</small></Link>
            <Link href="/conferences/cvpr-2026"><span>CVPR</span><small>17 篇</small></Link>
            <Link href="/conferences/icml-2026"><span>ICML</span><small>24 篇</small></Link>
            <Link href="/conferences/iclr-2026"><span>ICLR</span><small>{iclr2026Papers.length} 篇</small></Link>
            <Link href="/conferences/neurips-2026"><span>NeurIPS</span><small>{neurips2026Papers.length} 篇</small></Link>
            <Link href="/conferences/eccv-2026"><span>ECCV</span><small>{eccv2026Papers.length} 篇</small></Link>
          </div>
        </aside>

        <section className="content" id="latest">
          <div className="hero">
            <div className="heroCopy">
              <p className="eyebrow">NEURAL DECODING RESEARCH INTELLIGENCE</p>
              <h1>脑解码论文简报</h1>
              <p>追踪统一多模态脑编解码、脑信号到图像/文本/视频、跨被试泛化、可控生成与模型驱动的神经科学发现。</p>
              <div className="focusTracks" aria-label="重点追踪方向">
                <span>统一基础模型</span><span>脑到图像 / 文本 / 视频</span><span>跨被试泛化</span><span>可控生成</span><span>机制发现</span>
              </div>
            </div>
            <div className="dateCard"><span>本期 · {digest.date.slice(0, 4)}</span><strong>{digest.date.slice(5)}</strong></div>
          </div>

          <div className="issueSummary">
            <section className="issueGuide" aria-label="本期阅读导读">
              <div className="issueGuideHeader">
                <h2>本期阅读导读</h2>
                <span className="issueGuideMeta">{digest.kept} 篇 · A 级 {digest.papers.filter((p) => p.grade === "A").length} 篇 · B 级 {digest.papers.filter((p) => p.grade === "B").length} 篇</span>
              </div>
              {readingHighlights.length > 0 ? <ul>{readingHighlights.map((item) => <li key={item.title}><strong>{item.title}</strong><p>{item.text}</p></li>)}</ul> : <p>本期暂无值得重点阅读的高相关新增论文，可从左侧归档继续阅读往期内容。</p>}
            </section>
          </div>

          <div className="toolbar">
            <label><span aria-hidden="true">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索标题、作者、方法或研究关系" /></label>
            <select value={tag} onChange={(e) => setTag(e.target.value)} aria-label="主题筛选">
              {topicGroups.map((group) => <option key={group.label}>{group.label}</option>)}
            </select>
          </div>

          <div className="sectionHeading"><div><p className="eyebrow">PRIORITY READING</p><h2>本期重点阅读</h2></div><span>{papers.length} 篇</span></div>

          <div className="paperList">
            {papers.map((paper, index) => (
              <article className="paper" key={paper.title}>
                <div className="paperBody">
                  <div className="paperTop"><div><span className={`grade grade-${paper.grade}`}>{paper.grade}</span><span className="paperIndex">{String(index + 1).padStart(2, "0")}</span></div><span className="action">{paper.action}</span></div>
                  <h3><Link href={paperReadingHref(digestPaperId(paper))}>{paper.title}</Link></h3>
                  <div className="paperMeta"><p className="authors">{paper.authors}</p><p className="source">{paper.source}</p></div>
                  <div className="tags">{paper.tags.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="abstractBlock"><div className="blockLabel"><strong>中文摘要</strong><span>完整摘要翻译</span></div><p>{paper.abstractZh}</p></div>
                  <div className={`paperNotes ${paper.limitation ? "hasLimitation" : ""}`}>
                    <div className="relevance"><strong>与你研究的关系</strong><p>{paper.relevance}</p></div>
                    {paper.limitation && <div className="limitation"><strong>局限与核查重点</strong><p>{paper.limitation}</p></div>}
                  </div>
                  <div className="paperFooter"><Link className="readLink primaryReadLink" href={paperReadingHref(digestPaperId(paper))}>网页内阅读 <span>→</span></Link><a className="readLink" href={paper.href} target="_blank" rel="noreferrer">官方原文 <span>↗</span></a></div>
                </div>
              </article>
            ))}
            {papers.length === 0 && <div className="empty">当前日期没有匹配的论文，请更换关键词或主题。</div>}
          </div>

          <section className="conferenceSection" id="venues">
            <div className="sectionHeading"><div><p className="eyebrow">CURATED JOURNALS &amp; CONFERENCES</p><h2>精选期刊与顶会专题</h2></div><span>按年度与发表渠道追踪</span></div>
            <p className="conferenceIntro">按发表渠道阅读脑科学研究，结合 <Link href="/topics/neural-decoding-evolution">领域发展</Link> 理解技术脉络。本次新增 ICLR、NeurIPS 与 ECCV 2026，聚焦真实脑信号、脑编解码与神经表征。</p>
            <div className="conferenceHubs">
              {conferenceHubs.map((hub) => hub.href ? (
                <Link key={hub.name} href={hub.href}><strong>{hub.name}</strong><span>{hub.label}</span><small>{hub.status} →</small></Link>
              ) : (
                <div className="conferenceHubPending" key={hub.name}><strong>{hub.name}</strong><span>{hub.label}</span><small>{hub.status}</small></div>
              ))}
            </div>
            <div className="conferenceCarousel" aria-live="polite">
              <div className="carouselBar">
                <div><span>随机精选</span><small>每次进入随机展示，可用箭头切换</small></div>
                <div className="carouselControls">
                  <button aria-label="上一篇精选论文" onClick={() => setFeaturedIndex((featuredIndex - 1 + featuredVenuePapers.length) % featuredVenuePapers.length)}>←</button>
                  <span>{featuredIndex + 1} / {featuredVenuePapers.length}</span>
                  <button aria-label="下一篇精选论文" onClick={() => setFeaturedIndex((featuredIndex + 1) % featuredVenuePapers.length)}>→</button>
                </div>
              </div>
              <div className="conferenceList">
                <article className="conferencePaper" key={featuredPaper.id}>
                  <div className="conferenceMeta"><span>{featuredPaper.conference} {featuredPaper.year}</span><span>{featuredPaper.level} 级重点</span></div>
                  <h3><Link href={paperReadingHref(venuePaperId(featuredPaper))}>{featuredPaper.title}</Link></h3>
                  <p className="authors">{featuredPaper.authors}</p>
                  <p className="source">{featuredPaper.source}</p>
                  <div className="tags">{featuredPaper.tags.map((item) => <span key={item}>{item}</span>)}</div>
                  <p className="conferenceIntroZh">{featuredPaper.introZh}</p>
                  <div className="abstractBlock"><strong>中文摘要</strong><p>{featuredPaper.abstractZh}</p></div>
                  <div className="relevance"><strong>与你研究的关系</strong><p>{featuredPaper.relevance}</p></div>
                  <div className="featuredLinks"><Link className="readLink primaryReadLink" href={paperReadingHref(venuePaperId(featuredPaper))}>网页内阅读 →</Link><Link className="readLink" href={['ICML', 'CVPR', 'ICLR', 'NeurIPS', 'ECCV'].includes(featuredPaper.conference) ? `/conferences/${featuredPaper.conference.toLowerCase()}-2026` : "/venues/nature-2026"}>进入 {featuredPaper.conference} 2026 专题 →</Link></div>
                </article>
              </div>
            </div>
          </section>

        </section>
      </div>
      <footer>NeuroDecode Brief · 论文去重、期刊与顶会专题、分级阅读</footer>
    </main>
  );
}
