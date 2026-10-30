"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { paperLibrary, paperReadingHref } from "../paper-library";
import { useReadingLibrary } from "../reading-state";

type ListFilter = "all" | "favorite" | "later" | "read";

const filters: { id: ListFilter; label: string }[] = [
  { id: "all", label: "全部记录" },
  { id: "favorite", label: "已收藏" },
  { id: "later", label: "稍后读" },
  { id: "read", label: "已读" },
];

export default function ReadingListPage() {
  const { library, update } = useReadingLibrary();
  const [filter, setFilter] = useState<ListFilter>("all");

  const savedPapers = useMemo(() => {
    return paperLibrary
      .filter((paper) => {
        const state = library[paper.id];
        if (!state) return false;
        if (filter === "all") return Boolean(state.favorite || state.later || state.read);
        return Boolean(state[filter]);
      })
      .sort((a, b) => (library[b.id]?.updatedAt ?? "").localeCompare(library[a.id]?.updatedAt ?? ""));
  }, [filter, library]);

  const counts = {
    all: paperLibrary.filter((paper) => {
      const state = library[paper.id];
      return Boolean(state?.favorite || state?.later || state?.read);
    }).length,
    favorite: paperLibrary.filter((paper) => library[paper.id]?.favorite).length,
    later: paperLibrary.filter((paper) => library[paper.id]?.later).length,
    read: paperLibrary.filter((paper) => library[paper.id]?.read).length,
  };

  return (
    <main className="readingListPage">
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand brandLink" href="/"><span className="brandmark">N</span><div><strong>NeuroDecode Brief</strong><small>个人阅读清单</small></div></Link>
          <nav className="topnav" aria-label="阅读清单导航"><Link href="/">论文简报</Link><Link href="/reading-list" aria-current="page">我的阅读</Link></nav>
          <div className="headerActions"><ThemeToggle /><Link className="backLink" href="/">← 返回首页</Link></div>
        </div>
      </header>

      <div className="readingListShell">
        <header className="readingListHero"><p className="eyebrow">PERSONAL READING LIBRARY</p><h1>我的阅读</h1><p>收藏、稍后阅读和已读状态仅保存在当前浏览器中，不需要登录，也不会上传到服务器。</p></header>
        <div className="readingListFilters" role="tablist" aria-label="阅读状态筛选">
          {filters.map((item) => <button key={item.id} role="tab" aria-selected={filter === item.id} className={filter === item.id ? "active" : ""} onClick={() => setFilter(item.id)}>{item.label}<span>{counts[item.id]}</span></button>)}
        </div>

        <section className="savedPaperList">
          {savedPapers.map((paper) => {
            const state = library[paper.id] ?? {};
            return <article className="savedPaper" key={paper.id}>
              <div className="savedPaperMeta"><span>{paper.collection} · {paper.publishedLabel}</span><span>{paper.grade} 级</span></div>
              <h2><Link href={paperReadingHref(paper.id)}>{paper.title}</Link></h2>
              <p>{paper.authors}</p>
              <div className="tags">{paper.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="savedPaperActions">
                <Link href={paperReadingHref(paper.id)}>继续阅读 →</Link>
                <button className={state.favorite ? "active" : ""} onClick={() => update(paper.id, "favorite")}>★ 收藏</button>
                <button className={state.later ? "active" : ""} onClick={() => update(paper.id, "later")}>＋ 稍后读</button>
                <button className={state.read ? "active" : ""} onClick={() => update(paper.id, "read")}>✓ 已读</button>
              </div>
            </article>;
          })}
          {savedPapers.length === 0 && <div className="readingListEmpty"><strong>这里还没有论文</strong><p>打开任意论文的站内阅读页，即可收藏、加入稍后读或标记已读。</p><Link href="/">浏览最新简报 →</Link></div>}
        </section>
      </div>
      <footer>NeuroDecode Brief · 你的阅读状态仅保存在当前浏览器</footer>
    </main>
  );
}
