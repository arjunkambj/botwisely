Ingestion Design (Sources → Knowledge)

Source Types

- Website: crawl from root URLs, follow sitemap/robots rules, include/exclude globs, depth.
- Files: upload PDFs/Docs; extract text server-side; store in Convex storage.
- Text: raw text blocks; internal mini-CMS for small snippets.
- Q&A: curated pairs for high-precision answers.

MVP Supported Formats (3–5 most common)

- PDF (.pdf): parse with `pdf-parse` (Node). Fallback: Apache Tika server. If image-only pages detected, mark as "needs OCR" (skip OCR in MVP).
- Word (.docx): parse with `mammoth` (docx→HTML→text). Fallback: Apache Tika.
- Web pages (HTML): fetch via Exa Crawl API (free trial), extract main content. Normalize HTML→text.
- Markdown (.md): parse with `remark`/`unified` and strip to text.
- Plain text (.txt): direct ingestion.

Optional (post-MVP): PPTX via Tika, CSV via `csv-parse` (convert to Q&A or knowledge bullets), image OCR via Tesseract/managed OCR.

Pipeline Stages

1) Crawl/Collect: fetch pages/files; dedupe by canonical URL/hash.
2) Parse: extract text/metadata (title, headings, links, source type).
3) Chunk: split into token-aware chunks; capture overlap for coherence.
4) Embed: create vectors per chunk with `textEmbeddingModel` (per convex_docs/context.mdx).
5) Index: write embeddings via agent vector index; link back to chunks/docs.
6) Validate: mark ingestionJobs as succeeded/failed; report stats to UI.

Reliability (convex_docs/workflows.mdx, action_retriver.mdx)

- Use Workflow component to orchestrate multi-step ingestion with retries & idempotency.
- Use Action Retrier for flaky external fetch/parsers.
- Cap concurrency with Workpool for spiky jobs.

Data Model

- sources → websiteSources/fileSources/textSources/qnaSources
- documents → chunks → vectorIndex (embeddingId)
- ingestionJobs track each stage; UI subscribes for progress.

UI Mapping

- Sources page: tabs for Website/Files/Text/Q&A; per-tab config + run/sync.
- Knowledge page: list documents/chunks; filters (source, date, status), reindex.

Security

- Validate domains for website sources; enforce allowedOrigins for embed queries.
- Store file metadata; virus-scan hook (optional) before parse.

Vendors & OSS Options (chosen: Exa + LlamaIndex)

- Website crawling:
  - Exa Crawl API (chosen): fast, high-quality content extraction with main-text focus; great for quick wins.
  - Firecrawl (optional): cloud or self-host; JS rendering, sitemap support.
  - Crawlee (+ Playwright) (optional/OSS): full control, higher maintenance.
- PDF/DOC parsing:
  - LlamaParse (LlamaIndex) (chosen for complex docs): excellent on complex PDFs/tables; limited free credits — use sparingly.
  - Targeted libs (Node): `pdf-parse`/`pdfjs-dist` (PDF), `mammoth` (docx→HTML), `remark` (MD), `textract` (varied).
  - Apache Tika (server) (fallback): broad format support; self-host; no per-doc cost.
- OCR for scanned docs:
  - AWS Textract / Azure Document Intelligence / Google Document AI: high accuracy, tables/forms; paid.
  - Tesseract (local/`tesseract.js`): OSS fallback; slower, lower accuracy.

Embeddings (model choices)

- OpenAI `text-embedding-3-small` (1536-dim, cheap) → default.
- OpenAI `text-embedding-3-large` (3072-dim) → best accuracy if budget allows.
- Voyage AI `voyage-3` family → strong RAG performance.
- Cohere `embed-english-v3.0` / `multilingual-v3.0` → solid multilingual.
- Jina `jina-embeddings-v3` / Nomic `nomic-embed-text-v1.5` → OSS-friendly.

Notes

- Keep a single embedding model per bot; store `vectorDimension` with model name; migrate via re-embed jobs if changed.

Low-cost default pipeline (MVP)

- Parser order:
  - PDF → `pdf-parse` (Node) → text.
  - DOCX → `mammoth` (Node) → HTML → text.
  - Others (PPTX, XLSX, RTF) → try `textract`; if missing deps, fallback to Tika server.
  - If text ratio is low or pages are images → skip OCR in MVP; mark as "needs OCR" and surface in UI.
- Optional self-host:
  - Apache Tika server (single container) for broad formats without per-doc cost.
- Paid fallback (only when needed):
  - LlamaParse (selected) for flagged hard docs (respect free credits); managed OCR (Textract/Doc AI) for scanned docs.
- Cost controls:
  - Max pages per document (e.g., 200) in MVP; chunk early and allow resume.
  - De-dup by sha256 and content hash; reuse previous embeddings.
- Rate-limit ingestion per org/bot and queue with Convex Workflow.

Free-tier services to start fast

- Exa Crawl API (web): quality main-content extraction; generous free trial for MVP testing.
- Firecrawl (web, optional): free plan to handle JS-heavy sites; use when Exa struggles.
- LlamaParse (PDF, chosen): small free quota; use for complex PDFs and tables only.
- Self-hosted Apache Tika: free, one container, covers many file types without per-doc costs.
