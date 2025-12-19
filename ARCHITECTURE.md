# Architecture Guide

This document explains the architecture and structure of the zKYC documentation site, focusing on maintainability and ease of adding new content.

## Overview

The project is built with Next.js 16 App Router and is optimized for static content delivery. The architecture is designed for:

- **Maintainability**: Clear separation of concerns and reusable components
- **Scalability**: Easy to add new pages and sections
- **Performance**: Optimized for static generation and fast loading
- **Consistency**: Global layout and standardized page structures

## Project Structure

```
app/
├── _components/          # Global shared components
│   ├── GlobalHeader.tsx  # Site-wide header navigation
│   ├── PageHeader.tsx    # Reusable page header component
│   └── PageLayout.tsx    # Generic page layout wrapper
├── doc/
│   ├── _components/      # Documentation-specific components
│   │   ├── DocPageLayout.tsx  # Documentation page layout (includes DocNav)
│   │   ├── DocShell.tsx       # Layout wrapper with sidebar for doc pages
│   │   ├── DocNav.tsx         # Previous/Next navigation
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   └── nav-config.ts      # Navigation configuration
│   ├── layout.tsx        # Doc section layout (wraps pages with DocShell)
│   └── [sections]/       # Documentation pages organized by section
├── layout.tsx            # Root layout (includes GlobalHeader)
└── page.tsx              # Home page
```

## Layout Hierarchy

1. **Root Layout** (`app/layout.tsx`)
   - Provides HTML structure and global styles
   - Includes `GlobalHeader` for site-wide navigation
   - Applies global font variables and base styles

2. **Doc Layout** (`app/doc/layout.tsx`)
   - Wraps all documentation pages with `DocShell`
   - Provides sidebar navigation and consistent doc page structure

3. **Page Layouts**
   - `PageLayout`: Generic layout for any page (header + content)
   - `DocPageLayout`: Specialized for doc pages (header + content + DocNav)

## Adding a New Documentation Page

### Step 1: Create the page file

Create a new file following the Next.js App Router convention:

```
app/doc/[section]/[page-name]/page.tsx
```

### Step 2: Use DocPageLayout

Use the `DocPageLayout` component for consistent structure:

```tsx
import DocPageLayout from '../../_components/DocPageLayout';

export default function MyNewPage() {
  return (
    <DocPageLayout
      badge="Section Name"        // Optional: Category badge
      title="Page Title"          // Required: Main heading
      description="Page description" // Optional: Subtitle/description
      metadata="Additional info"  // Optional: Extra metadata (e.g., last updated)
    >
      {/* Your page content here */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">Section Title</h2>
        <p className="text-slate-300">Content goes here...</p>
      </section>
    </DocPageLayout>
  );
}
```

### Step 3: Add to Navigation

Update `app/doc/_components/nav-config.ts` to include your new page:

```tsx
export const navSections: NavSection[] = [
  {
    title: 'Your Section',
    links: [
      { label: 'Your New Page', href: '/doc/section/your-page-name' },
      // ... other links
    ],
  },
];
```

The navigation order in `nav-config.ts` determines the previous/next navigation flow.

## Adding a Non-Documentation Page

For pages outside the `/doc` section (e.g., `/about`, `/contact`):

1. Create the page file: `app/[section]/page.tsx`
2. Use `PageLayout` instead of `DocPageLayout`:

```tsx
import PageLayout from '../_components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout
      title="About"
      description="Learn about zKYC"
    >
      {/* Content */}
    </PageLayout>
  );
}
```

## Static Generation

The project is configured for static export (`output: 'export'` in `next.config.ts`), which means:

- All pages are pre-rendered at build time
- No server runtime required
- Optimized for CDN delivery
- Perfect for static documentation sites

To build:

```bash
npm run build
```

This generates a fully static `out/` directory that can be deployed to any static hosting service.

## Component Guidelines

### When to create a new component

- **Reusable across multiple pages**: Create in `app/_components/`
- **Doc-specific**: Create in `app/doc/_components/`
- **Page-specific**: Define locally in the page file

### Styling conventions

- Use Tailwind CSS utility classes
- Consistent spacing: `space-y-10` for main sections, `space-y-6` for subsections
- Color scheme: `slate-950` background, `slate-100/200/300` for text, `white/5` or `white/10` for borders/bg
- Cards: `rounded-2xl border border-white/10 bg-white/5 p-6`

## Configuration Files

- `next.config.ts`: Next.js configuration (static export, optimizations)
- `app/doc/_components/nav-config.ts`: Navigation structure
- `package.json`: Dependencies and scripts

## Best Practices

1. **Consistency**: Always use `DocPageLayout` for doc pages
2. **Navigation**: Keep `nav-config.ts` updated when adding pages
3. **Metadata**: Add page-specific metadata using Next.js metadata API when needed
4. **Performance**: Images should use Next.js Image component (configured for static export)
5. **Accessibility**: Use semantic HTML and proper heading hierarchy

## Future Enhancements

Potential improvements:

- Content management system integration
- Search functionality
- Versioned documentation
- Analytics integration
- Multi-language support

