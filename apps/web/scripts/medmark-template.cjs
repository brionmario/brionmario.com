/**
 * Medmark template for brionmario.com.
 *
 * Produces exactly the frontmatter shape that `lib/blog-local.ts` reads and
 * that every post already in `content/blog/` uses — keep the two in sync.
 *
 * Self-contained on purpose. Medmark's sample template imports
 * `frontMatterToYaml` from the `medmark` package, which only resolves when
 * medmark is a local dependency; this repo runs it through `npx` instead, so
 * the YAML writer lives here and the tool stays out of the lockfile.
 *
 * CommonJS on purpose too: `apps/web/package.json` sets `"type": "module"`, so
 * a `.js` template using `require`/`module.exports` would be parsed as ESM and
 * blow up. Hence `.cjs`.
 *
 * Usage (see .claude/skills/update-site-data):
 *   npx -y medmark@0.3.0 -i <export>/posts -o content/blog -t scripts/medmark-template.cjs
 */

/** Quote every scalar, the way the existing posts are written. */
function scalar(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
}

/**
 * Minimal YAML writer covering the shapes this frontmatter uses: scalars,
 * arrays of scalars, and arrays of flat objects (the `authors` list).
 */
function toYaml(data, indent = "") {
  const lines = []

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      if (value.length === 0) continue
      lines.push(`${indent}${key}:`)

      for (const item of value) {
        if (item && typeof item === "object") {
          // First field sits on the dash line, the rest align under it.
          const entries = Object.entries(item).filter(
            ([, v]) => v !== undefined && v !== null
          )
          entries.forEach(([k, v], index) => {
            const prefix = index === 0 ? `${indent}  - ` : `${indent}    `
            lines.push(`${prefix}${k}: ${scalar(v)}`)
          })
        } else {
          lines.push(`${indent}  - ${scalar(item)}`)
        }
      }
    } else if (typeof value === "boolean") {
      lines.push(`${indent}${key}: ${value}`)
    } else {
      lines.push(`${indent}${key}: ${scalar(value)}`)
    }
  }

  return lines.join("\n")
}

module.exports = {
  getOptions() {
    return {
      defaultCodeBlockLanguage: "js",
      // One folder per post -> content/blog/<slug>/index.md, which is the
      // layout getBlogPost() expects.
      folderForEachSlug: true,
      imagePath: "/resources",
      // Keep pointing at Medium's CDN rather than vendoring images. Those
      // hostnames are already allowed in next.config.mjs remotePatterns.
      imageStorageStrategy: "REMOTE",
    }
  },

  render(data) {
    const date = new Date(data.published)
    const prettyDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-")

    const images = (data.images ?? []).map((image) => image.mediumUrl)

    const frontMatter = toYaml({
      slug: `/posts/${data.titleForSlug}/`,
      date: prettyDate,
      title: data.title,
      description: data.description,
      authors: data.authors,
      readingTime: data.readingTime ?? "",
      draft: Boolean(data.draft),
      tags: data.tags,
      bannerImage: images[0],
      ogImage: images[0],
      images,
    })

    // The trailing blank line before the closing fence matches what medmark's
    // own writer emitted for the posts already in the repo — without it, every
    // existing post shows a one-line diff on the next import.
    return `---
${frontMatter}

---

${data.body}
`
  },
}
