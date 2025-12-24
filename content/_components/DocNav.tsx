import Link from "next/link";

const links = [
  {
    href: "/docs/flow-architecture/01-macro-architecture",
    label: "Macro architecture",
  },
  {
    href: "/docs/flow-architecture/02-provided-ui-components",
    label: "Provided UI components",
  },
 
];

export default function DocNav() {
  return (
    <nav className="not-prose flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
