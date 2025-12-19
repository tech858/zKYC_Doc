import DocPageLayout from '../../_components/DocPageLayout';

export default function WhyChooseZkycPage() {
  return (
    <DocPageLayout
      badge="Get started"
      title="Why choose zKYC?"
      description="zKYC reduces repeated document uploads, lowers privacy risk, and speeds up onboarding across products."
    >

      <section className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">The problem</h3>
          <p className="text-slate-300 leading-relaxed">Repeated document uploads create friction and risk.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">The solution</h3>
          <p className="text-slate-300 leading-relaxed">
            zKYC issues proofs instead of raw documents so platforms can verify without storing sensitive files.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Advantages</h2>
        <ul className="space-y-3 text-slate-300 leading-relaxed">
          <li className="flex items-start">
            <span className="mr-2 text-blue-400">•</span>
            <span><strong className="text-white">Reusability:</strong> one proof, many platforms.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-400">•</span>
            <span><strong className="text-white">Privacy:</strong> share proofs, not documents.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-400">•</span>
            <span><strong className="text-white">Compliance-ready:</strong> supports KYC/AML controls.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-400">•</span>
            <span><strong className="text-white">Conversion:</strong> faster onboarding with fewer steps.</span>
          </li>
        </ul>
      </section>
    </DocPageLayout>
  );
}

