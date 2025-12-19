import DocNav from '../../_components/DocNav';

export default function Terms() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-blue-600/25 px-3 py-1 text-xs font-semibold text-blue-100">
          Support
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Terms and conditions</h1>
        <p className="text-lg text-slate-300">Last updated: August 24, 2025</p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-6 text-slate-200">
          <Section title="Agreement">
            By using zKYC you agree to these terms. If you disagree, please discontinue use.
          </Section>

          <Section title="Service description">
            zKYC provides identity verification tooling and reusable proofs to help businesses meet KYC/AML requirements.
          </Section>

          <Section title="Accounts">
            You are responsible for keeping account credentials secure and for actions taken under your account.
          </Section>

          <Section title="Payments">
            Subscription fees are billed as agreed. Pricing changes will be communicated in advance.
          </Section>

          <Section title="Prohibited use">
            Do not use the service for unlawful activity, abuse the API, or attempt to disrupt service operation.
          </Section>

          <Section title="Liability">
            zKYC is provided “as is.” To the maximum extent allowed by law, we disclaim warranties and limit liability
            for indirect or consequential damages.
          </Section>

          <Section title="Contact">
            Questions? Email <a href="mailto:info.zkyc@gmail.com" className="text-blue-200 hover:underline">info.zkyc@gmail.com</a>.
          </Section>
        </div>
      </div>

      <DocNav />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="text-slate-200">{children}</div>
    </section>
  );
}

