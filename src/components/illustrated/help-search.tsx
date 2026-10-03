"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { HELP_ARTICLES, HELP_CATEGORIES, HELP_SUPPORT_EMAIL } from "@/lib/help-center";

const PAGE_SIZE = 5;

export function HelpSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const searchInput = useRef<HTMLInputElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = HELP_ARTICLES.filter((article) => {
    const text = `${article.question} ${article.answer} ${article.category}`.toLowerCase();
    return (!category || article.category === category) && terms.every((term) => text.includes(term));
  });
  const pageCount = Math.ceil(results.length / PAGE_SIZE);

  function changePage(next: number) {
    setPage(next);
    resultsHeading.current?.focus();
  }

  function clearFilters() {
    setQuery("");
    setCategory("");
    setPage(0);
    searchInput.current?.focus();
  }

  return (
    <div className="help-browser design-container">
      <div className="help-filters" role="search" aria-label="Help Center">
        <div className="help-search-field">
          <Image src="/figma/help-search.svg" alt="" width={32} height={32} />
          <label htmlFor="help-query" className="sr-only">Search help articles</label>
          <Input
            id="help-query"
            ref={searchInput}
            type="search"
            placeholder="Search help articles"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage(0); }}
            aria-controls="help-results"
          />
        </div>
        <span className="help-filter-or" aria-hidden="true">Or</span>
        <div className="help-category-field">
          <label htmlFor="help-category" className="sr-only">Help category</label>
          <select
            id="help-category"
            value={category}
            data-selected={Boolean(category)}
            onChange={(event) => { setCategory(event.target.value); setPage(0); }}
            aria-controls="help-results"
          >
            <option value="">Category</option>
            {HELP_CATEGORIES.map((name) => <option key={name}>{name}</option>)}
          </select>
          <Image src="/figma/help-category.svg" alt="" width={32} height={32} />
        </div>
      </div>
      <section id="help-results" aria-labelledby="help-results-title">
        <h2 id="help-results-title" className="sr-only" ref={resultsHeading} tabIndex={-1}>Help articles</h2>
        <p className="sr-only" role="status">
          {results.length} {results.length === 1 ? "answer" : "answers"} found.
          {pageCount > 0 ? ` Page ${page + 1} of ${pageCount}.` : ""}
        </p>
        <div className="help-questions">
          {results.map((article, index) => (
            <article className="help-question" key={article.id} hidden={index < page * PAGE_SIZE || index >= (page + 1) * PAGE_SIZE}>
              <h3>{article.question}</h3>
              <p>{article.answer}</p>
              {article.link && <Link className="help-article-link" href={article.link.href}>{article.link.label}</Link>}
            </article>
          ))}
        </div>
        {results.length === 0 && (
          <div className="help-empty">
            <h3>No answers found</h3>
            <p>Try another keyword or category, or <a href={`mailto:${HELP_SUPPORT_EMAIL}`}>email our team</a>.</p>
            <button type="button" className="design-button design-button-outline" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
        {pageCount > 1 && (
          <nav className="help-pagination" aria-label="Help articles pagination">
            <span className="help-page-count">{page + 1} / {pageCount}</span>
            <div className="help-pagination-controls">
              <Image src="/figma/help-pagination.svg" alt="" width={147} height={14.7279} />
              <button type="button" aria-label="Previous answers" disabled={page === 0} onClick={() => changePage(page - 1)} />
              <button type="button" aria-label="Next answers" disabled={page + 1 >= pageCount} onClick={() => changePage(page + 1)} />
            </div>
          </nav>
        )}
      </section>
    </div>
  );
}
