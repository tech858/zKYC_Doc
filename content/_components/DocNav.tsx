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
    <nav className="glass-card not-prose flex flex-wrap gap-3 rounded-2xl p-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="glass-card inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white transition hover:border-violet-400/40 hover:bg-(--surface-violet)"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
