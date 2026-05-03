import Parser from "rss-parser"

export interface BlogPost {
  id: string
  title: string
  link: string
  pubDate: string
  categories: string[]
  contentSnippet: string
  thumbnail?: string
}

type CustomItem = {
  "media:thumbnail": { $: { url: string } }
  "media:content": { $: { url: string } }
}

const MEDIUM_RSS = "https://medium.com/feed/@brionmario"

export async function fetchMediumPosts(limit = 6): Promise<BlogPost[]> {
  try {
    const parser = new Parser<Record<string, unknown>, CustomItem>({
      customFields: {
        item: [
          ["media:thumbnail", "media:thumbnail"],
          ["media:content", "media:content"],
        ],
      },
    })

    const feed = await parser.parseURL(MEDIUM_RSS)

    return feed.items.slice(0, limit).map((item) => {
      const thumbnail =
        item["media:thumbnail"]?.["$"]?.url ??
        item["media:content"]?.["$"]?.url ??
        undefined

      return {
        id: item.guid ?? item.link ?? crypto.randomUUID(),
        title: item.title ?? "",
        link: item.link ?? "",
        pubDate: item.pubDate ?? "",
        categories: item.categories ?? [],
        contentSnippet: (item.contentSnippet ?? "").slice(0, 180).trim(),
        thumbnail,
      }
    })
  } catch {
    return []
  }
}
