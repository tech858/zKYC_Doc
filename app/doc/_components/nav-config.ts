export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  title: string;
  links: NavLink[];
};

export const navSections: NavSection[] = [
  {
    title: 'Get Started',
    links: [
      { label: 'Overview', href: '/doc' },
      { label: 'What is zKYC?', href: '/doc/get-started/what-is-zkyc' },
      { label: 'Why choose zKYC?', href: '/doc/get-started/why-choose-zkyc' },
    ],
  },
  {
    title: 'Flow Architecture',
    links: [
      { label: 'Macro architecture', href: '/doc/flow-architecture/macro-architecture' },
      { label: 'Provided UI components', href: '/doc/flow-architecture/providedui-components' },
      { label: 'Next steps for devs', href: '/doc/flow-architecture/next-steps-for-dev' },
    ],
  },
  {
    title: 'Integration',
    links: [
      { label: 'SDK integration', href: '/doc/sdk-integration' },
      { label: 'Demo project', href: '/doc/demo' },
    ],
  },
  {
    title: 'Pricing',
    links: [{ label: 'Plans', href: '/doc/pricing' }],
  },
  {
    title: 'Support',
    links: [
      { label: 'Privacy policy', href: '/doc/support/privacy' },
      { label: 'Terms', href: '/doc/support/terms' },
    ],
  },
];

