"use client";

import { useState } from "react";
import { digests } from "./digest-data";

const issues = [...digests].sort((a, b) => b.date.localeCompare(a.date));
const years = [...new Set(issues.map((issue) => issue.date.slice(0, 4)))];

export function DigestArchive({ selectedDate, onSelect }: { selectedDate: string; onSelect: (date: string) => void }) {
  const [year, setYear] = useState(issues[0].date.slice(0, 4));
  const [openMonth, setOpenMonth] = useState(issues[0].date.slice(0, 7));
  const [expanded, setExpanded] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const yearIssues = issues.filter((issue) => issue.date.startsWith(year));
  const months = [...new Set(yearIssues.map((issue) => issue.date.slice(0, 7)))];

  return <div className="digestArchive">
    <div className="archiveHeader"><p className="eyebrow">BRIEF ARCHIVE</p><h2>简报归档</h2></div>
    <label className="archiveYear">年份<select aria-label="归档年份" value={year} onChange={(event) => {
      const nextYear = event.target.value;
      setYear(nextYear);
      setOpenMonth(issues.find((issue) => issue.date.startsWith(nextYear))!.date.slice(0, 7));
      setExpanded(false);
    }}>{years.map((value) => <option key={value} value={value}>{value} 年</option>)}</select></label>
    <nav aria-label="简报日期">
      {months.map((month) => {
        const all = yearIssues.filter((issue) => issue.date.startsWith(month));
        const filtered = all.filter((issue) => showEmpty || issue.kept > 0);
        const visible = expanded ? filtered : filtered.slice(0, 5);
        const isOpen = openMonth === month;
        return <section className="archiveMonth" key={month}>
          <button className="archiveMonthToggle" aria-expanded={isOpen} aria-controls={`archive-${month}`} onClick={() => { setOpenMonth(isOpen ? "" : month); setExpanded(false); }}>
            <span>{isOpen ? `${year} 年 ` : ""}{Number(month.slice(5))} 月</span><small>{all.length} 期</small><span aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div id={`archive-${month}`} className="archiveDates">
            {visible.map((issue) => <button key={issue.date} className={`archiveDate ${issue.date === selectedDate ? "active" : ""}`} aria-current={issue.date === selectedDate ? "date" : undefined} aria-label={`${issue.date}，${issue.kept} 篇${issue.date === issues[0].date ? "，最新一期" : ""}`} onClick={() => onSelect(issue.date)}>
              <time dateTime={issue.date}>{issue.date.slice(5).replace("-", ".")}</time>
              {issue.date === issues[0].date && <em>最新</em>}
              <small>{issue.kept} 篇</small>
            </button>)}
            {filtered.length === 0 && <p className="archiveEmpty">本月无新增论文</p>}
            {filtered.length > 5 && <button className="archiveMore" onClick={() => setExpanded(!expanded)}>{expanded ? "收起" : `展开本月全部（共 ${filtered.length} 期）`}</button>}
          </div>}
        </section>;
      })}
    </nav>
    <label className="archiveEmptyToggle"><input type="checkbox" checked={showEmpty} onChange={(event) => setShowEmpty(event.target.checked)} />显示无新增期次</label>
  </div>;
}
