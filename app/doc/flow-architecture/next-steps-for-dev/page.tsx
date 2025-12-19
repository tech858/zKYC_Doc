import DocNav from '../../_components/DocNav';

export default function NextStepsForDevPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-blue-600/25 px-3 py-1 text-xs font-semibold text-blue-100">
          Flow architecture
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Next steps for developers</h1>
        <p className="max-w-3xl text-lg text-slate-300">
          Move from sandbox testing to production with a clear set of checkpoints.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Checklist
          title="Evaluate in sandbox"
          items={[
            'Start with test API keys from the dashboard.',
            'Exercise different verification types (OCR, liveness, combined).',
            'Confirm redirect URLs for pending and failure outcomes.',
          ]}
        />
        <Checklist
          title="Go live safely"
          items={[
            'Switch to production keys in your deploy environment.',
            'Monitor proofs and account balance in the dashboard.',
            'Enable alerting for API failures or abnormal verification results.',
          ]}
        />
      </div>

      <DocNav />
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

