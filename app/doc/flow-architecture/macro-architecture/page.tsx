import DocPageLayout from '../../_components/DocPageLayout';

export default function MacroArchitecturePage() {
  return (
    <DocPageLayout
      badge="Flow architecture"
      title="Macro architecture flow"
      description="A high-level look at how zKYC handles verification, proof generation, and reuse across multiple services."
    >
      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">End-to-end lifecycle</h3>
          <ol className="space-y-3 text-slate-300 leading-relaxed">
            <li className="flex items-start">
              <span className="mr-3 font-semibold text-blue-400">1.</span>
              <span>User starts verification in the secure zKYC environment.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-semibold text-blue-400">2.</span>
              <span>zKYC performs document + optional liveness checks.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-semibold text-blue-400">3.</span>
              <span>A reusable proof is issued and linked to the user/session.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-semibold text-blue-400">4.</span>
              <span>Partners validate the proof via the SDK or API without touching raw documents.</span>
            </li>
          </ol>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Artifacts</h3>
          <p className="text-slate-300 leading-relaxed">
            Proofs are small cryptographic attestations that confirm the verification outcome. They can be validated
            without revealing underlying documents, letting you meet compliance needs while keeping user data private.
          </p>
        </div>
      </section>
    </DocPageLayout>
  );
}

