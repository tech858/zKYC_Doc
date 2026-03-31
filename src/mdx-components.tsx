import AskAI from '@/components/ask-ai';
import CopyCode from '@/components/copy-code';
import KycCodeBlock from '@/components/kyc-code-block';
import PackageManagerTabs from '@/components/package-manager-tabs';
import PipManagerTabs from '@/components/pip-manager-tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    CopyCode,
    AskAI,
    KycCodeBlock,
    PackageManagerTabs,
    PipManagerTabs,
    ...components,
  };
}
