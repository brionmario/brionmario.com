#!/usr/bin/env node
/**
 * Medium export diff — reports which exported articles are not yet in content/blog.
 *
 * A Medium export is a full dump, not a delta, so most re-exports contain
 * nothing new. Running medmark anyway is churn at best; at worst a post whose
 * title changed since the last import lands at a fresh slug and leaves the old
 * directory behind as a duplicate.
 *
 * Matching is by normalised title, not slug, on purpose: medmark derives slugs
 * from `titleForSlug` and the result does not survive a naive slugify
 * ("Branding On Steroids" is on disk as branding-on-steroids-asgar).
 *
 * Replies are excluded with the same `graf--title` rule as medium-replies.js.
 *
 * Usage (see .claude/skills/update-site-data):
 *   node scripts/medium-new-posts.js <export>/posts content/blog
 */

import { readdirSync, readFileSync, existsSync, statSync } from "fs"
import { join } from "path"

const [dir, blogDir] = process.argv.slice(2)

if (!dir || !blogDir) {
  console.error(
    "usage: node scripts/medium-new-posts.js <export>/posts <content/blog>"
  )
  process.exit(1)
}

/** Strip to letters and digits so punctuation and case can't cause a false "new". */
const norm = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")

const exported = []
for (const name of readdirSync(dir).sort()) {
  if (!name.endsWith(".html") || name.startsWith("draft_")) continue
  const html = readFileSync(join(dir, name), "utf8")
  if (!html.includes("graf--title")) continue // a reply, not an article
  const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1]?.trim() ?? ""
  exported.push({ name, title })
}

const onDisk = new Set()
for (const entry of readdirSync(blogDir)) {
  const file = join(blogDir, entry, "index.md")
  if (!existsSync(file) || !statSync(file).isFile()) continue
  const title = /^title:\s*"(.*)"\s*$/m.exec(readFileSync(file, "utf8"))?.[1]
  if (title) onDisk.add(norm(title))
}

const fresh = exported.filter((p) => !onDisk.has(norm(p.title)))

console.log(
  `${exported.length} articles in export, ${onDisk.size} posts on disk`
)
if (fresh.length === 0) {
  console.log("no new posts — skip the medmark run")
} else {
  console.log(`${fresh.length} new:`)
  for (const p of fresh) console.log(`  + ${p.title}\n    ${p.name}`)
}
