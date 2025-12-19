import Link from 'next/link';
import DocNav from './_components/DocNav';

export default function DocsHome() {
  return (
    <div className="space-y-10">
      <header className="space-y-4 mb-10">
        <p className="inline-flex rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-200">
          Documentation
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl leading-tight">Get started with zKYC</h1>
        <p className="max-w-3xl text-lg text-slate-300 leading-relaxed">
          Build a privacy-first KYC experience with reusable proofs. Start with the concepts, then follow the SDK
          integration steps to plug zKYC into your product.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <Link
          href="/doc/get-started/what-is-zkyc"
          className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
        >
          <h3 className="text-xl font-semibold text-white mb-2">What is zKYC?</h3>
          <p className="text-slate-300 leading-relaxed">
            Understand how zero-knowledge proofs make identity verification reusable and privacy-preserving.
          </p>
        </Link>

        <Link
          href="/doc/get-started/why-choose-zkyc"
          className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Why choose zKYC?</h3>
          <p className="text-slate-300 leading-relaxed">See how zKYC reduces onboarding friction while improving trust.</p>
        </Link>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Quick links</h2>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/doc/sdk-integration" 
            className="rounded-md bg-blue-600/20 px-4 py-2 text-blue-100 hover:bg-blue-600/30 transition-all"
          >
            SDK integration
          </Link>
          <Link 
            href="/doc/demo" 
            className="rounded-md bg-purple-600/20 px-4 py-2 text-purple-100 hover:bg-purple-600/30 transition-all"
          >
            Demo project
          </Link>
          <Link 
            href="/doc/pricing" 
            className="rounded-md bg-emerald-600/20 px-4 py-2 text-emerald-100 hover:bg-emerald-600/30 transition-all"
          >
            Pricing
          </Link>
        </div>
      </section>

      <DocNav />
    </div>
  );
}

