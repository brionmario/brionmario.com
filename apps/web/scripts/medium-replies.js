#!/usr/bin/env node
/**
 * Medium reply detector — lists the export files that are comments, not posts.
 *
 * Medium's export drops every reply you have ever left on someone else's
 * article into the same `posts/` folder as your real articles, with the same
 * filename shape. Imported blind, they land in content/blog as two-word posts
 * ("Thanks Stefan.") that show up in the blog index.
 *
 * The discriminator is `graf--title`: Medium renders an article's title as a
 * titled graf inside the body, and a reply has no title, so it has no such
 * element. Verified against a full export — 31/31 published articles carry it,
 * 0/7 replies do. `data-field="subtitle"` looks like a candidate too but is
 * not reliable: several genuine drafts have no subtitle either.
 *
 * Prints a comma-separated list ready for medmark's `-s` / `--skip` flag.
 *
 * Usage (see .claude/skills/update-site-data):
 *   node scripts/medium-replies.js <export>/posts
 *   node scripts/medium-replies.js <export>/posts --verbose
 */

import { readdirSync, readFileSync } from "fs"
import { join } from "path"

const [dir, ...flags] = process.argv.slice(2)
const verbose = flags.includes("--verbose")

if (!dir) {
  console.error(
    "usage: node scripts/medium-replies.js <export>/posts [--verbose]"
  )
  process.exit(1)
}

// Drafts are excluded by medmark unless -d is passed, so they are not our
// problem here; judging them on the same marker would be wrong anyway.
const files = readdirSync(dir)
  .filter((name) => name.endsWith(".html") && !name.startsWith("draft_"))
  .sort()

const replies = files.filter(
  (name) => !readFileSync(join(dir, name), "utf8").includes("graf--title")
)

if (verbose) {
  console.error(`${files.length} published files, ${replies.length} replies:`)
  for (const name of replies) console.error(`  ${name}`)
}

console.log(replies.join(","))
