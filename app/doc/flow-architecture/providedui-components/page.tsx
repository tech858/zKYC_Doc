import Image from 'next/image';
import DocNav from '../../_components/DocNav';

const extensions = [
  {
    name: 'zkPass TransGate',
    url: 'https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma',
    qr: '/zkpass_wallet_connect.png',
  },
  {
    name: 'zkPass Schema Validator',
    url: 'https://chromewebstore.google.com/detail/zkpass-schema-validator/kpcbjghknfclbkejkdllpjhhheppaoca',
    qr: '/zkpass_schema_validator_extension.png',
  },
];

export default function ProvidedUiComponentsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-blue-600/25 px-3 py-1 text-xs font-semibold text-blue-100">
          Flow architecture
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Provided UI components</h1>
        <p className="max-w-3xl text-lg text-slate-300">
          Use the hosted zKYC experience to keep sensitive data inside a trusted environment while giving users a clear,
          guided flow.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
        <h2 className="text-2xl font-semibold text-white">Start a new verification</h2>
        <p className="text-slate-300">
          Redirect users to the hosted UI to begin. The flow collects required details and optional OCR/liveness steps in
          one place.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {extensions.map((ext) => (
            <div key={ext.name} className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <h3 className="text-lg font-semibold text-white">{ext.name}</h3>
              <a
                href={ext.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-sm text-blue-200 hover:underline"
              >
                Install from Chrome Web Store
              </a>
              <div className="mt-3">
                <Image
                  src={ext.qr}
                  alt={`${ext.name} QR`}
                  width={180}
                  height={180}
                  className="h-auto w-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
        <h2 className="text-2xl font-semibold text-white">Key screens</h2>
        <div className="space-y-6">
          <Step
            title="Launch & connect"
            description="Users open the extension, connect (optional) wallet, and jump into the zKYC portal."
            image="/zkpass_extension.png"
          />
          <Step
            title="Upload documents"
            description="Users submit identity documents; OCR can be enabled to streamline capture."
            image="/zKYCaid_document_upload.png"
          />
          <Step
            title="Liveness detection"
            description="Optional camera-based liveness check to ensure a real user is present."
            image="/zKYC_live.png"
          />
          <Step
            title="Generate proof"
            description="Once credentials are verified, the user triggers proof generation for reuse."
            image="/zKYC_verif_final.png"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
        <h2 className="text-2xl font-semibold text-white">Reuse a proof</h2>
        <p className="text-slate-300">
          With a proof ID, users can skip re-verification and immediately present the stored proof in the hosted UI.
        </p>
        <Image
          src="/zKYC_verify_proof.png"
          alt="Reuse proof screen"
          width={1200}
          height={720}
          className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900/50"
        />
        <p className="text-slate-300">
          All UI components stay inside the zkPass environment, so your application never handles raw identity data,
          reducing compliance scope.
        </p>
      </section>

      <DocNav />
    </div>
  );
}

type StepProps = {
  title: string;
  description: string;
  image: string;
};

function Step({ title, description, image }: StepProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-300 leading-relaxed">{description}</p>
      <Image
        src={image}
        alt={title}
        width={1200}
        height={720}
        className="mt-4 w-full rounded-lg border border-white/5 bg-slate-950/70"
      />
    </div>
  );
}

