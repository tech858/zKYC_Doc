import DocPageLayout from '../../_components/DocPageLayout';

export default function WhatIsZkycPage() {
  return (
    <DocPageLayout
      badge="Get started"
      title="What is zKYC?"
      description="zKYC lets users verify their identity once and reuse a cryptographic proof instead of sharing raw documents across services."
    >

      <section className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Why it matters</h3>
          <p className="text-slate-300 leading-relaxed">
            Traditional KYC flows are repetitive, slow, and expose sensitive documents to every service. zKYC flips the
            model — verify once, then share minimal proofs.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Key benefits</h3>
          <ul className="space-y-2.5 text-slate-300 leading-relaxed">
            <li className="flex items-start">
              <span className="mr-2 text-blue-400">•</span>
              <span>Privacy-first: personal data stays protected.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-400">•</span>
              <span>Reusable proofs: one verification, many uses.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-400">•</span>
              <span>Faster onboarding: fewer steps for users.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">How it works</h2>
        <ol className="space-y-3 text-slate-300 leading-relaxed">
          <li className="flex items-start">
            <span className="mr-3 font-semibold text-blue-400">1.</span>
            <span>The user completes verification in zKYC once.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 font-semibold text-blue-400">2.</span>
            <span>zKYC issues a small cryptographic proof.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 font-semibold text-blue-400">3.</span>
            <span>Partner services validate the proof without seeing original documents.</span>
          </li>
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2 mt-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">For developers</h3>
          <p className="text-slate-200 leading-relaxed">
            Integrate once with the SDK and accept proofs — no need to process raw identity files in your app.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">For product teams</h3>
          <p className="text-slate-200 leading-relaxed">
            Reduce drop-offs by removing repeated KYC steps and offer a privacy-first flow that builds trust.
          </p>
        </div>
      </section>
    </DocPageLayout>
  );
}

