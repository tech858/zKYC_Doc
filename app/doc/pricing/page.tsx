import { CheckIcon, MinusIcon, PlusIcon } from '../_components/icons';
import DocPageLayout from '../_components/DocPageLayout';

const rows = [
  { feature: 'Initial deposit', values: ['$100', 'Let’s talk', 'Let’s talk'] },
  { feature: 'Document verification + OCR', values: ['check', 'check', 'check'] },
  { feature: 'Facial verification (liveness)', values: ['check', 'check', 'check'] },
  { feature: 'Zero-knowledge proofs', values: ['check', 'check', 'check'] },
  { feature: 'AML screening', values: ['minus', 'plus', 'check'] },
  { feature: 'Address verification', values: ['minus', 'plus', 'check'] },
  { feature: 'Video verification', values: ['minus', 'minus', 'check'] },
  { feature: 'Ongoing monitoring', values: ['minus', 'minus', 'plus'] },
  { feature: 'Cost per verification', values: ['$1.20', '$1.85', 'Let’s talk'] },
];

export default function PricingPage() {
  return (
    <DocPageLayout
      badge="Pricing"
      title="Plans at a glance"
      description="Compare verification coverage and costs across zKYC plans."
    >

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 mb-10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-4 font-semibold text-white">Feature</th>
              <th className="px-4 py-4 font-semibold text-white">Basic</th>
              <th className="px-4 py-4 font-semibold text-white">Standard</th>
              <th className="px-4 py-4 font-semibold text-white">Full KYC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row) => (
              <tr key={row.feature} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-4 font-medium text-slate-200">{row.feature}</td>
                {row.values.map((value, idx) => (
                  <td key={`${row.feature}-${idx}`} className="px-4 py-4 text-slate-200">
                    {renderValue(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 leading-relaxed">
        <h3 className="font-semibold text-white mb-3">Notes</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Minimum monthly spend for Pay-As-You-Go applies if usage is below $100.</li>
          <li>Feature pricing may change; we'll notify you ahead of updates.</li>
        </ul>
      </section>
    </DocPageLayout>
  );
}

function renderValue(value: string) {
  if (value === 'check') {
    return <CheckIcon className="h-5 w-5 text-emerald-300" />;
  }
  if (value === 'minus') {
    return <MinusIcon className="h-5 w-5 text-slate-400" />;
  }
  if (value === 'plus') {
    return <PlusIcon className="h-5 w-5 text-amber-300" />;
  }
  return value;
}

