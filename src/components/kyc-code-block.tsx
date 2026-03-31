import { codeToHtml } from "shiki";
import CopyButton from "./copy-button";

interface KycCodeBlockProps {
  title?: string;
  code: string;
}

function detectLang(title?: string): string {
  if (!title) return "typescript";
  if (title.endsWith(".py")) return "python";
  if (title.endsWith(".ts") || title.endsWith(".tsx")) return "typescript";
  if (title.endsWith(".json")) return "json";
  if (title.endsWith(".sh")) return "bash";
  return "typescript";
}

export default async function KycCodeBlock({ title, code }: KycCodeBlockProps) {
  const lang = detectLang(title);
  const html = await codeToHtml(code, { lang, theme: "github-dark" });

  return (
    <div className="not-prose overflow-hidden rounded-xl shadow-lg">
      <div className="flex items-center justify-between bg-neutral-900/70 px-4 py-2 text-sm">
        <span className="font-medium text-neutral-100">{title ?? ""}</span>
        <CopyButton code={code} />
      </div>
      <div
        className="overflow-x-auto text-sm [&>pre]:px-4 [&>pre]:py-4 [&>pre]:bg-[#0d1117]!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
