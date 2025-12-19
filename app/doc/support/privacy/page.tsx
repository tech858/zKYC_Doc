import DocPageLayout from '../../_components/DocPageLayout';

export default function Privacy() {
  return (
    <DocPageLayout
      badge="Support"
      title="Privacy policy"
      metadata="Last updated: August 24, 2025"
    >

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-6 text-slate-200">
          <Section title="Who we are">
            zKYC is a privacy-preserving identity verification platform built on zero-knowledge proofs. We help users
            control their data while enabling compliant verification.
          </Section>

          <Section title="Information we collect">
            <p>
              We avoid collecting personally identifiable information on the website. If you contact us, we may collect
              your email and project details. Basic analytics may capture anonymized browser data to improve the
              experience.
            </p>
          </Section>

          <Section title="How we use information">
            <ul className="list-disc space-y-2 pl-5">
              <li>Respond to inquiries and product requests.</li>
              <li>Improve website performance and UX.</li>
              <li>Send product updates if you opt-in.</li>
            </ul>
          </Section>

          <Section title="Cookies & tracking">
            We aim for minimal tracking. If non-essential cookies are used, we will show a notice and only set them with
            consent.
          </Section>

          <Section title="Data storage & security">
            Data is stored securely with limited access and strong encryption. We minimize retention and remove
            unnecessary records.
          </Section>

          <Section title="Your rights">
            <p>Depending on your jurisdiction, you may request access, correction, or deletion of your data.</p>
            <p className="mt-2">
              Contact: <a href="mailto:info.zkyc@gmail.com" className="text-blue-200 hover:underline">info.zkyc@gmail.com</a>
            </p>
          </Section>
        </div>
      </div>
    </DocPageLayout>
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

