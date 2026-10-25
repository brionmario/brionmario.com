import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/** Long-form markdown, styled to the article scale used across the design. */
export function MarkdownBody({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h2 className="headline mt-12 mb-4 text-[clamp(1.5rem,3vw,2.1rem)]">
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2 className="headline mt-12 mb-4 text-[clamp(1.35rem,2.6vw,1.85rem)]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-9 mb-3 text-xl font-extrabold tracking-[-0.02em]">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-6 text-[17px] leading-[1.8] text-pretty text-muted-foreground">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-primary/60 text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="mb-6 ml-6 list-disc space-y-2 text-[17px] leading-[1.8] text-muted-foreground">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-6 ml-6 list-decimal space-y-2 text-[17px] leading-[1.8] text-muted-foreground">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-10 border-l-[3px] border-primary pl-6 [&>p]:m-0 [&>p]:text-[clamp(1.2rem,2.4vw,1.6rem)] [&>p]:leading-[1.35] [&>p]:font-bold [&>p]:tracking-[-0.02em] [&>p]:text-foreground">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes("language-")
          return isBlock ? (
            <code className="font-mono text-[13px]">{children}</code>
          ) : (
            <code className="bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="my-7 overflow-x-auto bg-card p-5 font-mono text-[13px] leading-relaxed">
            {children}
          </pre>
        ),
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={typeof src === "string" ? src : ""}
            alt={alt ?? ""}
            className="my-8 w-full"
            loading="lazy"
          />
        ),
        hr: () => <hr className="my-10 border-border" />,
        strong: ({ children }) => (
          <strong className="font-extrabold text-foreground">{children}</strong>
        ),
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="eyebrow bg-card px-4 py-3 text-left text-foreground">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-t border-border px-4 py-3 text-muted-foreground">
            {children}
          </td>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
